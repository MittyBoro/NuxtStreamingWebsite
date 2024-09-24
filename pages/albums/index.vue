<template>
  <div class="container" :class="{ 'loading-box': pending }">
    <LazySEOAlbumList :page="page" :list="list" :meta="meta" />
    <LazyPageTitleRow>
      <template #title>
        <h1>{{ page.title }}</h1>
      </template>
      <template #right>
        <LazySortingPremium />
        <LazyDropDownList :list="listSorting" disableHref />
      </template>
    </LazyPageTitleRow>

    <!--  -->
    <LazyAlbumList :list="list" :meta="meta" :loadNextPage="loadNextPage" />

    <!--  -->
    <LazyPageDescription :text="page.description" delimiter />

    <!--  -->
    <LazyPageBreadcrumbs :list="[{ title: 'Фото', to: '/albums' }]" />
  </div>
</template>

<script setup>
  const { listSorting, titleMask } = useSorting('videos')

  const { page: originalPage } = await useApiPage('albums')
  const { list, meta, pending, loadNextPage } = await useApiList('albums', {
    per_page: useAppConfig().videosPerPage,
  })

  const page = pageWithMask(
    originalPage.value,
    {},
    computed(() => titleMask.value.toLowerCase()),
    ['o=rating', 'o=views'],
  )
</script>

<style lang="scss" scoped></style>
