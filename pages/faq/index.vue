<template>
  <section class="container">
    <LazySEOVideoList :page="page" :list="list" :meta="meta" />
    <!-- <div class="page__card card">
      <div class="card__inner">
        <div v-if="page?.title" class="page__title">
          <h1 v-html="page.title"></h1>
        </div>
        <article class="prose" v-html="page?.description"></article>
      </div>
    </div> -->
    <LazyPageTitleRow>
      <template #title>
        <h1>{{ page.title }}</h1>
      </template>
      <template #right>
        <NuxtLink to="/" class="button button-alt button-mini button-animated">
          <span class="preloading">Другие видео</span>
        </NuxtLink>
      </template>
    </LazyPageTitleRow>

    <LazyVideoList :list="list" :meta="meta" :loadNextPage="loadNextPage" />

    <!--  -->
    <LazyAppTopList>
      <template #videos>
        <h2>Самые популярные видео недели</h2>
      </template>
      <template #actors>
        <h3>Актеры недели</h3>
      </template>
      <template #studios>
        <h4>Топ студий</h4>
      </template>
      <template #categories>
        <h5>Популярные теги</h5>
      </template>
    </LazyAppTopList>

    <!--  -->
    <LazyPageDescription :text="page.description" onlyFull />

    <LazyPageBreadcrumbs
      :list="[{ title: page?.title, to: route.params.slug }]"
    />
  </section>
</template>

<script setup>
  const route = useRoute()

  const { page } = await useApiPage('faq')

  const { list, meta, pending, loadNextPage } = await useApiList(
    'videos',
    computed(() => ({
      per_page: useAppConfig().videosPerPage,
      pre_order: 'home_top',
    })),
  )
</script>

<style lang="scss" scoped>
  .page__card {
    margin: auto;
    max-width: 860px;
  }
  .page__title {
    margin-bottom: 2rem;
    h1 {
      font-size: 2.5rem;
    }
  }
</style>
