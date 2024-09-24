<template>
  <AppHeaderDropDownLayout>
    <div class="head-cats">
      <div class="head-cats__title">Самые горячие:</div>

      <LazyCategoryList :list="categories" />

      <div class="head-cats__bottom">
        <NuxtLink to="/categories" rel="nofollow" class="button button-mini">
          Все категории
        </NuxtLink>
      </div>
    </div>
  </AppHeaderDropDownLayout>
</template>

<script setup>
  const categories = useTopCategories()
</script>

<style lang="scss" scoped>
  .head-cats {
    display: grid;
    &__title {
      grid-column: 1/-1;
      padding-bottom: var(--space-xs);
      font-weight: 600;
    }
    &__bottom {
      grid-column: 1/-1;
      margin-top: 2rem;
      display: flex;
      justify-content: center;
    }
    :deep(.category-list) {
      @include media-breakpoint-up(lg) {
        grid-template-columns: repeat(7, 1fr);
      }
      .card-category:nth-child(14) ~ .card-category {
        display: none;
      }
      .card-category {
        font-size: 10px;
      }
    }
  }
</style>
