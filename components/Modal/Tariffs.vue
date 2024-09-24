<template>
  <ModalLayoutBig>
    <form
      @submit.prevent="() => buy('coupon')"
      class="form form-grid modal__tariffs"
      :class="{ loading: form.pending }"
    >
      <div class="modal__registration-top">
        <div class="modal__title">Выбери свой тариф</div>
        <div class="modal__subtitle">чтобы продлить премиум</div>

        <div class="tariffs__list">
          <template v-for="(tariff, i) in tariffs" :key="tariff.id">
            <div
              class="tariffs__item"
              :class="{ active: tariff.id === state.tariff_id }"
              @click.passive="state.tariff_id = tariff.id"
            >
              <div v-if="i === tariffs.length - 2" class="tariffs__hit">
                хит продаж
              </div>
              <div class="tariffs__title">{{ tariff.title }}</div>
              <div class="tariffs__amount-day">
                <span class="tariffs__amount-big">
                  {{ formatNumber(tariff.per_day) }}
                </span>
                <span>{{ symbol(tariff.currency) }}/день</span>
              </div>
              <div class="tariffs__amount-row">
                <div class="tariffs__amount-old">
                  <span v-if="tariff.amount < tariff.old_amount">
                    {{ formatNumber(tariff.old_amount) }}
                    <span>{{ symbol(tariff.currency) }}</span>
                  </span>
                  <span v-else>​</span>
                </div>
                <template v-if="tariff.new_amount">
                  <div class="tariffs__amount-old old-2">
                    {{ formatNumber(tariff.amount) }}
                    <span>{{ symbol(tariff.currency) }}</span>
                  </div>
                  <div class="tariffs__amount">
                    {{ formatNumber(tariff.new_amount) }}
                    <span>{{ symbol(tariff.currency) }}</span>
                  </div>
                </template>
                <div v-else class="tariffs__amount">
                  {{ formatNumber(tariff.amount) }}
                  <span>{{ symbol(tariff.currency) }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="modal__title" v-if="!tariffs.length">
          <small>Тарифов не найдено</small>
        </div>
        <div class="tariffs__button-row" v-else>
          <Button
            class="button-alt"
            :loading="form.pending"
            @click.passive="buy('tariff')"
            button
          >
            Купить
          </Button>
        </div>
        <div v-if="state.coupon_key === undefined" class="tariffs__button-row">
          <div class="button button-alt" @click="state.coupon_key = ''">
            Есть промокод?
          </div>
        </div>
        <div v-else class="tariffs__button-row">
          <input
            type="text"
            class="field__input"
            v-model="state.coupon_key"
            placeholder="Промокод"
          />
          <Button
            class="button"
            :loading="form.pending"
            @click.passive="buy('coupon')"
            button
          >
            Активировать
          </Button>
        </div>
      </div>
    </form>
  </ModalLayoutBig>
</template>

<script setup>
  const { data } = await $api('/tariffs')

  const promoPercent = useApiAttributes().value.promotions?.percent

  const newAmount = (amount) => {
    return parseFloat((amount - (amount / 100) * promoPercent).toFixed(1))
  }

  const symbol = (currency) => {
    return useApiAttributes().value.currencies[currency]?.symbol || '??'
  }

  const tariffs = ref([])

  tariffs.value = data.map((tariff) => {
    const oldAmount = computed(() =>
      parseFloat(
        Math.max(...tariffs.value.map((tariff) => tariff.per_day)) *
          tariff.period,
      ).toFixed(1),
    )
    let perDay = parseFloat(tariff.amount / tariff.period).toFixed(1)

    if (promoPercent) {
      perDay = newAmount(perDay)
      tariff.new_amount = newAmount(tariff.amount)
    }
    return {
      ...tariff,
      per_day: perDay,
      old_amount: oldAmount,
    }
  })

  const buy = (type) => {
    if (type == 'coupon') {
      state.tariff_id = undefined
    } else {
      state.coupon_key = undefined
    }
    form.submit()
  }

  const { form, state } = await useApiForm(
    '/payments',
    {
      tariff_id: tariffs.value[tariffs.value.length - 2]?.id || null,
      coupon_key: undefined,
    },
    {
      onSuccess: async (data) => {
        if (data.redirect) {
          if (data.redirect === '/') {
            navigateTo('/')
          } else {
            useNotify().success('Перенаправляем на страницу оплаты')
            await navigateTo(data.redirect, { external: true })
          }

          if (state.coupon_key) {
            useNotify().success('Промокод активирован')
          }

          closeModal()
          useApiAuth().refreshIdentity()
        } else {
          useNotify().error('Неизвестная ошибка')
        }
      },
    },
  )
</script>

<style lang="scss" scoped>
  .modal__tariffs {
    &.loading {
      pointer-events: none;
    }
  }
  .modal__tariffs {
    @include media-breakpoint-down(md) {
      .modal__title {
        font-size: var(--text-md);
      }
    }
  }
  .tariffs {
    &__list {
      display: flex;
      flex-wrap: wrap;
      margin-top: var(--space-md);
      gap: var(--space-sm);
      @include media-breakpoint-down(md) {
        margin-top: var(--space-sm);
      }
    }
    &__item {
      position: relative;
      padding: var(--space-sm);
      box-shadow: 0 0 0 3px var(--border-color);
      text-align: center;
      cursor: pointer;
      transition-duration: var(--duration);
      transition-property: background, color, box-shadow;
      overflow: hidden;
      border-radius: 1rem 0;
      min-width: 160px;
      flex: 1;
      @include media-breakpoint-only(xl) {
        min-width: 250px;
      }
      @include media-breakpoint-only(md) {
        min-width: 210px;
      }
      @include media-breakpoint-down(md) {
        min-width: 150px;
      }
      &.active {
        box-shadow: 0 0 0 4px var(--primary);
        background: var(--body-bg-alt);
        color: var(--body-color);
        .tariffs__hit {
          box-shadow: 0 0 0 3px var(--primary);
        }
      }
    }
    &__hit {
      position: absolute;
      top: 16px;
      right: -40px;
      transform: rotate(45deg);
      text-align: center;
      background: #111;
      box-shadow: 0 0 0 3px var(--border-color);
      padding: 5px 40px;
      font-size: 9px;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--primary);
      transition: var(--duration) all;
    }
    &__title {
      padding-bottom: var(--space-sm);
      margin-bottom: var(--space-sm);
      font-weight: 600;
      font-size: var(--text-md);
      white-space: nowrap;
      border-bottom: 1px solid var(--border-color);
    }
    &__amount {
      font-weight: 600;
      font-size: var(--text-md);
      &-big {
        font-weight: 600;
        font-size: var(--text-lg);
        margin-right: 0.2em;
      }
      &-row {
        @include media-breakpoint-down(md) {
          margin-bottom: var(--space-xs);
        }
      }
      &-day {
        font-size: var(--text-base);
        margin: var(--space-base) 0 var(--space-base);
        @include media-breakpoint-down(md) {
          margin: var(--space-xs) 0 0;
        }
      }
      &-old {
        padding: 0 0.5em;
        font-size: var(--text-sm);
        text-decoration: line-through;
        text-decoration-thickness: 2px;
        font-weight: 600;
        opacity: 0.5;
        &.old-2 {
          font-size: var(--text-base);
        }
      }
    }
    &__button-row {
      display: flex;
      justify-content: center;
      margin-top: var(--space-md);
      gap: var(--space-sm);
      .button {
        min-width: 220px;
      }
    }
  }
</style>
