<template>
  <div class="actor-list">
    <LazyAppEmpty v-if="!list?.length" />
    <template v-for="(item, i) in list" :key="item.id">
      <ActorCard :item="item" :index="i" :enableH3="enableH3" />
    </template>
    <LazyAppPagination :meta="meta" :loadNextPage="loadNextPage" />
  </div>
</template>

<script setup>
  defineProps({
    list: Array,
    meta: Object,
    pending: Boolean,
    loadNextPage: Function,
    enableH3: Boolean,
  })
</script>

<style lang="scss" scoped>
  .actor-list {
    display: grid;
    gap: var(--gap);
    grid-template-columns: repeat(5, 1fr);

    @include media-breakpoint-down(xxxl) {
      grid-template-columns: repeat(4, 1fr);
    }
    @include media-breakpoint-down(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
    @include media-breakpoint-down(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
