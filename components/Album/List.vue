<template>
  <div class="album-list">
    <LazyAppEmpty v-if="!list?.length" />
    <template v-for="(item, i) in list" :key="item.id">
      <AlbumCard :item="item" :index="i" :enableH3="enableH3" />
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
  .album-list {
    display: grid;
    gap: var(--gap);
    grid-template-columns: repeat(3, 1fr);
    @include media-breakpoint-down(lg) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include media-breakpoint-down(md) {
      grid-template-columns: 1fr;
    }
  }
</style>
