<template>
  <div class="container page-categories">
    <LazySEOPage :page="page" />

    <!--  -->
    <LazyAppTopList delimiterHidden>
      <template #categories>
        <h1>{{ page.title }}</h1>
      </template>
    </LazyAppTopList>

    <!--  -->
    <LazyPageDescription :text="page.description" onlyFull />

    <!--  -->
    <LazyPageBreadcrumbs :list="[{ title: page.title, to: '/categories' }]" />
  </div>
</template>

<script setup>
  const { page } = await useApiPage('tags')
</script>

<style lang="scss" scoped>
  .page-categories {
    :deep(.title-row) {
      .search__field-dropdown {
        font-size: var(--text-xs);
      }
      .search__input {
        background: var(--body-bg-alt);
        min-height: 2rem;
        height: 2rem;
        border-radius: 1em 0;
      }
      .bottom-description {
        margin: 0;
        width: 100%;
      }
      @include media-breakpoint-down(sm) {
        display: grid;
        justify-content: stretch;
        .search__field-dropdown {
          order: 5;
        }
      }
    }
  }
</style>
