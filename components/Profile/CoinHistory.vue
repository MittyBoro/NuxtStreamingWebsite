<template>
  <div :class="{ 'loading-box': pending }">
    <table v-if="list.length" class="profile__referrals-list">
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>#{{ item.id }}</td>
          <td>
            <span v-if="item.referred">
              Платёж от #{{ item.referred.id }}
              {{ item.referred.name }}
            </span>
            <span v-if="item.payout">
              <span>Вывод средств #{{ item.payout.id }}</span>
              <span>
                <span
                  v-if="item.payout.status === 'pending'"
                  style="opacity: 0.5"
                >
                  на рассмотрении
                </span>
              </span>
            </span>
          </td>
          <td>
            <b
              class="prl-amount"
              :class="[item.amount > 0 ? 'positive' : 'negative']"
            >
              <span v-if="item.amount > 0">+</span>
              {{ coins(item.amount) }}
            </b>
          </td>
          <td>{{ formatDate(item.created_at) }}</td>
        </tr>
      </tbody>
    </table>
    <LazyAppEmpty v-else />
    <LazyAppPagination
      v-if="meta?.last_page > 1"
      :center="false"
      :meta="meta"
    />
  </div>
</template>

<script setup>
  const { list, meta, pending } = await useApiList('/coins')
</script>

<style lang="scss" scoped>
  .profile__referrals-list {
    font-size: var(--text-sm);
    width: 100%;
    td {
      padding: 5px;
    }
    .prl-amount {
      margin: 0 0.5rem;
      display: flex;
      &.positive {
        color: var(--green);
      }
      &.negative {
        color: var(--alert);
      }
    }
  }
</style>
