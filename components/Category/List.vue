<template>
  <div class="category-list">
    <LazyAppEmpty v-if="!filteredList?.length" />
    <template v-for="(item, i) in filteredList" :key="item.id">
      <CategoryCard :item="item" :index="i" :enableH3="enableH3" />
    </template>
    <LazyAppPagination v-if="meta" :meta="meta" :loadNextPage="loadNextPage" />
  </div>
</template>

<script setup>
  const props = defineProps({
    list: Array,
    meta: Object,
    pending: Boolean,
    loadNextPage: Function,
    enableH3: Boolean,
  })

  const filteredList = computed(() => {
    return props.list?.filter((item) => item.preview)
  })
</script>

<style lang="scss" scoped>
  .category-list {
    display: grid;
    gap: var(--space-xs);
    grid-template-columns: repeat(5, 1fr);

    @include media-breakpoint-down(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
    @include media-breakpoint-down(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
