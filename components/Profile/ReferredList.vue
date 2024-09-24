<template>
  <div :class="{ 'loading-box': pending }">
    <table v-if="list.length" class="profile__referrals-list">
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>
            <span class="prl-name">#{{ item.id }} {{ item.name }}</span>
          </td>
          <td class="coins">+{{ coins(item.amount) }}</td>
          <td class="date">{{ formatDate(item.created_at) }}</td>
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
  const { list, meta, pending } = await useApiList('/users/referred')
</script>

<style lang="scss" scoped>
  .profile__referrals-list {
    font-size: var(--text-sm);
    width: 100%;
    td {
      padding: 5px;
    }
    .date {
      opacity: 0.5;
    }
    .prl-name {
      max-width: 120px;
    }
    .coins {
      white-space: nowrap;
    }
  }
</style>
