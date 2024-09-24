<template>
  <div class="container page-categories">
    <LazySEOPage :page="page" />

    <!--  -->
    <LazyPageTitleRow>
      <template #title>
        <h1 v-if="route.query.o !== 'alphabet'">
          Самые популярные категории
        </h1>
        <h1 v-else>Категории по алфавиту</h1>
      </template>
      <template #right>
        <LazySearch
          v-if="route.query.o !== 'alphabet'"
          placeholder="Найти категорию..."
          quickSearch
          disableForm
          :types="['categories']"
        />
        <LazyDropDownList :list="listSorting" />
      </template>
    </LazyPageTitleRow>

    <!--  -->
    <LazyCategoryPreviewList
      v-if="route.query.o !== 'alphabet'"
      :list="list"
      :meta="meta"
      :loadNextPage="loadNextPage"
    />
    <LazyCategoryAlphabetList v-else :list="list" />

    <!--  -->
    <LazyAppTopList>
      <template #videos>
        <h2>Самые популярные видео недели</h2>
      </template>
      <template #actors>
        <h2>Актеры недели</h2>
      </template>
      <template #studios>
        <h2>Топ студий</h2>
      </template>
    </LazyAppTopList>

    <!--  -->
    <LazyPageDescription :text="page.description" onlyFull />

    <!--  -->
    <LazyPageBreadcrumbs :list="[{ title: page.title, to: '/categories' }]" />
  </div>
</template>

<script setup>
  const route = useRoute()

  const { page } = await useApiPage('categories')

  const { list, meta, loadNextPage } = await useApiList('/categories', {
    per_page: route.query.o === 'alphabet' ? 1000 : 50,
  })

  const { listSorting } = useSorting('categories')
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
