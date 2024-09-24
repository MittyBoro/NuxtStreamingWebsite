<template>
  <Transition>
    <div v-show="show" class="card actor__filter">
      <div class="card__inner">
        <!--  -->
        <div class="af-item">
          <div class="af-title">Пол</div>
          <LazyActorFilterDropDownList
            :list="meta.gender"
            byKey="gender"
            :isMale="isMale"
            emptyName="Все"
          />
        </div>

        <!--  -->
        <div class="af-item">
          <div class="af-title">Страна</div>
          <LazyActorFilterCountry :list="meta.country" />
        </div>

        <!--  -->
        <div class="af-item">
          <div class="af-title">Этничность</div>
          <LazyActorFilterDropDownList
            :list="meta.ethnicity"
            byKey="ethnicity"
            emptyName="Любая"
          />
        </div>

        <!--  -->
        <div class="af-item">
          <div class="af-title">Цвет волос</div>
          <LazyActorFilterDropDownList
            :list="meta.hair_color"
            byKey="hair_color"
            emptyName="Любые волосы"
          />
        </div>

        <!--  -->
        <div class="af-item af-item-order">
          <div class="af-title">Возраст</div>
          <FieldRange
            :min="meta.min_age"
            :max="meta.max_age"
            v-model:minValue="range.min"
            v-model:maxValue="range.max"
          />
        </div>

        <!--  -->
        <!-- <div class="af-item">
        <div class="af-title">Татуировки</div>
        <LazyActorFilterDropDownList
          :list="meta.tattoos"
          byKey="tattoos"
          emptyName="Не выбрано"
          :yesOrNo="['C тату', 'Без тату']"
        />
        </div> -->

        <!--  -->
        <div
          class="af-item"
          :class="{ disabled: route.query.gender === 'male' }"
        >
          <div class="af-title">Размер груди</div>
          <LazyActorFilterDropDownList
            :list="meta.boob_size"
            byKey="boob_size"
            emptyName="Любая грудь"
          />
        </div>

        <!--  -->
        <div
          class="af-item"
          :class="{ disabled: route.query.gender === 'male' }"
        >
          <div class="af-title">Тип груди</div>
          <LazyActorFilterDropDownList
            :list="meta.fake_boobs"
            byKey="fake_boobs"
            emptyName="Любая грудь"
            :yesOrNo="['Силикон', 'Натуральная']"
          />
        </div>

        <!--  -->
        <div class="af-item">
          <div class="af-title">Типаж</div>
          <LazyActorFilterDropDownList
            :list="meta.features"
            byKey="features"
            emptyName="Любые"
          />
        </div>

        <div class="af-item" @click="navigateTo('/actors')" style="order: 98">
          <div class="af-title"> </div>
          <div class="button button-alt button-mini">
            <span>Сбросить</span>
          </div>
        </div>

        <div class="af-item" style="order: 99">
          <div class="af-title"> </div>
          <div class="button button-mini" @click="show = false">
            <span>Скрыть фильтр</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  const route = useRoute()
  const props = defineProps({
    meta: Object,
  })
  const isMale = computed(() => route.query.gender === 'male')

  const show = defineModel('show')

  const range = reactive({
    min: route.query.min_age ?? props.meta.min_age,
    max: route.query.max_age ?? props.meta.max_age,
  })

  let timerId = null

  watch(
    () => range,
    () => {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        navigateTo(
          {
            query: {
              ...route.query,
              min_age: range.min,
              max_age: range.max,
            },
          },
          {
            replace: true,
          },
        )
      }, 700)
    },
    { deep: true },
  )

  watch(
    () => route.query.gender,
    (value) => {
      if (value === 'male') {
        navigateTo(
          {
            query: {
              ...route.query,
              boob_size: undefined,
              fake_boobs: undefined,
            },
          },
          {
            replace: true,
          },
        )
      }
    },
    { immediate: true },
  )
</script>

<style lang="scss" scoped>
  .actor__filter {
    width: 100%;
    overflow: visible;
  }
  .af-item {
    display: grid;
    gap: 0.3em;
    width: 100%;
    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  @include media-breakpoint-down(lg) {
    .af-item-order {
      order: 50;
    }
  }
  .af-title {
    font-size: var(--text-sm);
    padding: 0 1.7em;
    font-weight: 600;
    @include media-breakpoint-down(xl) {
      padding: 0 1.4em;
      font-size: var(--text-xs);
    }
  }
  .card__inner {
    display: grid;
    align-items: start;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-sm) var(--space-base);
    @include media-breakpoint-down(lg) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include media-breakpoint-down(sm) {
      gap: var(--space-sm) var(--space-sm);
    }
  }
</style>
