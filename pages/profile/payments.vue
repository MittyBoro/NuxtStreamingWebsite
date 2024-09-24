<template>
  <LazyProfileMain :class="{ 'loading-box': pending }">
    <div class="profile__title">История платежей</div>
    <div v-if="list.length" class="profile__balance">
      <div class="profile__balance-list">
        <template v-for="item in list">
          <div v-if="item.description">
            <small>{{ item.description }}</small>
          </div>
          <div class="dotted-row">
            <div>
              <b>
                Премиум на
                {{ item.period }}
                {{ declension(item.period, ['день', 'дня', 'дней']) }}
              </b>
            </div>
            <span class="dotted-line"></span>
            <span>{{ formatDate(item.created_at) }}</span>
            <span class="dotted-line"></span>
            <span>
              <span v-if="item.amount">
                {{ item.amount }}
                {{ item.currency }}
              </span>
              <span v-else>Бесплатно</span>
            </span>
          </div>
        </template>
        <LazyAppPagination :center="false" :meta="meta" />
      </div>
    </div>
    <LazyAppEmpty v-else />
  </LazyProfileMain>
</template>

<script setup>
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  useSeoMeta({
    title: 'Мои платежи',
  })

  const { list, meta, pending } = await useApiList('/payments')
</script>

<style lang="scss" scoped>
  .profile {
    &__total {
      display: grid;
      gap: 5px;
      margin: var(--space-base) 0 0;
    }
    &__balance {
      &-list {
        display: grid;
        font-size: var(--text-sm);
        .dotted-row {
          grid-template-columns: auto 20px auto 1fr auto;
          align-items: end;
          margin-bottom: var(--space-xs);
        }
      }
    }
  }
</style>
