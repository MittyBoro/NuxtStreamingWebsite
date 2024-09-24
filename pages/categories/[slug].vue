<template>
  <div class="container" :class="{ 'loading-box': pending }">
    <LazyAppActionViews hidden />
    <LazySEOVideoList :page="page" :list="list" :meta="meta" />
    <LazyPageTitleRow>
      <template #title>
        <h1>{{ !route.query.o ? (category.h1 ?? page.title) : page.title }}</h1>
      </template>
      <template #right>
        <LazySortingPremium />
        <LazyDropDownList :list="listSorting" />
      </template>
    </LazyPageTitleRow>

    <!--  -->
    <LazyVideoList :list="list" :meta="meta" :loadNextPage="loadNextPage" />

    <!--  -->
    <LazyAppTopList>
      <template #videos>
        <h2>ТОП недели</h2>
      </template>
      <template #categories>
        <h3>Тренды</h3>
      </template>
      <template #actors>
        <h4>Популярные модели</h4>
      </template>
      <template #studios>
        <h6>Популярные студии</h6>
      </template>
      <template #top_categories>
        <h2>Другие популярные категории</h2>
      </template>
    </LazyAppTopList>

    <!--  -->
    <LazyPageDescription :text="page.description" delimiter onlyFull />

    <!--  -->
    <LazyPageBreadcrumbs
      :list="[
        { title: 'Категории', to: '/categories' },
        { title: category.title, to: `/categories/${route.params.slug}` },
      ]"
    />
  </div>
</template>

<script setup>
  const route = useRoute()
  const { listSorting, titleMask } = useSorting('videos')

  const { page: category } = await useApiPage(
    `../categories/${route.params.slug}`,
  )
  const { page: originalPage } = await useApiPage('categories-slug')

  const { list, meta, pending, loadNextPage } = await useApiList('videos', {
    per_page: useAppConfig().videosPerPage,
    categories: category.value.id,
  })
  console.log('category', category)

  const page = pageWithMask(
    originalPage.value,
    category.value,
    computed(() => titleMask.value.toLowerCase()),
    ['o=rating', 'o=views'],
  )

  provide('able', {
    type: 'category',
    id: category.value.id,
  })
</script>
