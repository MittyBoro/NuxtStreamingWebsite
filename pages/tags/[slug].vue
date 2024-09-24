<template>
  <div class="container" :class="{ 'loading-box': pending }">
    <LazySEOVideoList :page="page" :list="list" :meta="meta" />
    <LazyPageTitleRow>
      <template #title>
        <h1>{{ page.title }}</h1>
      </template>
    </LazyPageTitleRow>

    <LazyVideoList :list="list" :meta="meta" :loadNextPage="loadNextPage" />

    <LazyPageDescription :text="page.description" />
    <LazyPageBreadcrumbs
      :list="[{ title: tag.title, to: `/tags/${route.params.slug}` }]"
    />
  </div>
</template>

<script setup>
  const route = useRoute()

  const { page: tag } = await useApiPage(`../tags/${route.params.slug}`)
  const { page: originalPage } = await useApiPage(`tags-slug`)
  const { list, meta, pending, loadNextPage } = await useApiList('videos', {
    per_page: useAppConfig().videosPerPage,
    order: `rand-${tag.value.id}`,
  })

  const page = pageWithMask(
    originalPage.value,
    tag.value,
    computed(() => ''),
  )
</script>
