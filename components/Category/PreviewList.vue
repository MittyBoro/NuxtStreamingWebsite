<template>
  <div class="categories-w-preview">
    <!--  -->
    <div class="categories-list-top">
      <LazyCategoryList :list="topCategories" />
    </div>

    <!--  -->
    <div>
      <LazyPageTitleRow>
        <template #title>
          <h2>Все категории</h2>
        </template>
      </LazyPageTitleRow>

      <LazyCategoryList
        :list="list"
        :meta="meta"
        :loadNextPage="loadNextPage"
      />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    list: Array,
    meta: Object,
    pending: Boolean,
    loadNextPage: Function,
  })

  const topCategories = useTopCategories()
</script>

<style lang="scss" scoped>
  .categories-list-top {
    margin-bottom: var(--space-lg);
    &:deep(.card-category) {
      &:nth-child(10) ~ .card-category {
        display: none;
      }
    }
  }
</style>
