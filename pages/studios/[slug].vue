<template>
  <div class="container" :class="{ 'loading-box': pending }">
    <!--  -->
    <LazyAppActionViews hidden />
    <!--  -->
    <LazySEOVideoList :page="page" :list="list" :meta="meta" />
    <!--  -->
    <LazyPageTitleRow>
      <template #title>
        <div style="display: flex; gap: 0.75em; align-items: center">
          <h1>{{ page.title }}</h1>
          <LazyAppActionFavorite
            class="single-actor__button button-mini"
            :class="{ 'button-alt': !studio.favorite_id }"
            :item="studio"
          />
        </div>
      </template>
      <template #right>
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
        <h5>Популярные студии</h5>
      </template>
    </LazyAppTopList>

    <!--  -->
    <LazyPageDescription :text="page.description" delimiter />

    <!--  -->
    <LazyPageBreadcrumbs
      :list="[
        { title: 'Студии', to: '/studios' },
        { title: studio.title, to: `/studios/${route.params.slug}` },
      ]"
    />
  </div>
</template>

<script setup>
  const route = useRoute()
  const { listSorting, titleMask } = useSorting('videos')

  const { page: originalPage } = await useApiPage(`studios-slug`)
  const { page: studio } = await useApiPage(`../studios/${route.params.slug}`)

  const { list, meta, pending, loadNextPage } = await useApiList('videos', {
    per_page: useAppConfig().videosPerPage,
    studios: studio.value.id,
  })

  const page = pageWithMask(
    originalPage.value,
    studio.value,
    computed(() => titleMask.value),
    ['o=rating', 'o=views'],
  )

  provide('able', {
    type: 'studio',
    id: studio.value.id,
  })
</script>
