<template>
  <div v-if="list?.length" class="actors-list-mini">
    <template v-for="item in list" :key="item.id">
      <ActorCardMini :item="item" />
    </template>
  </div>
</template>

<script setup>
  defineProps({
    list: Array,
  })
</script>

<style lang="scss" scoped>
  .actors-list-mini {
    display: flex;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    flex-wrap: wrap;
    gap: var(--space-sm);
    @include media-breakpoint-down(md) {
      grid-template-columns: 1fr;
    }
  }
</style>
