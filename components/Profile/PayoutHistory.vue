<template>
  <div v-if="list.length" :class="{ 'loading-box': pending }">
    <table class="profile__referrals-list">
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>#{{ item.id }}</td>
          <td>Вывод {{ coins(item.amount) }} в {{ item.currency }}</td>
          <td>
            <span style="opacity: 0.5">
              <span v-if="item.status === 'success'">выплачено</span>
              <span v-else-if="item.status === 'pending'">на рассмотрении</span>
              <span v-else-if="item.status === 'canceled'">отменено</span>
            </span>
          </td>
          <td>
            <NuxtLink :to="`/chats/${item.chat_id}`" class="link color">
              [открыть чат]
            </NuxtLink>
          </td>
          <td>{{ formatDate(item.created_at) }}</td>
        </tr>
      </tbody>
    </table>
    <LazyAppPagination
      v-if="meta?.last_page > 1"
      :center="false"
      :meta="meta"
    />
  </div>
</template>

<script setup>
  const { list, meta, pending } = await useApiList('/payouts')
</script>

<style lang="scss" scoped>
  .profile__referrals-list {
    font-size: var(--text-sm);
    width: 100%;
    td {
      padding: 5px;
    }
  }
  .dotted-row {
    display: flex;
    flex-wrap: wrap;
    // white-space: nowrap;
    .dotted-line {
      flex-grow: 1;
    }
    .prl-amount {
      margin: 0 0.5rem;
      &.positive {
        color: var(--green);
      }
      &.negative {
        color: var(--alert);
      }
    }
  }
</style>
