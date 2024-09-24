<template>
  <section class="container">
    <div class="page__card card">
      <div class="card__inner">
        <div v-if="page?.title" class="page__title">
          <h1 v-html="page.title"></h1>
        </div>
        <article class="prose" v-html="page?.description"></article>
      </div>
    </div>

    <!--  -->
    <LazyAppTopList>
      <template #videos>
        <h2>Самые популярное за неделю</h2>
      </template>
      <template #actors>
        <h3>Люди недели</h3>
      </template>
      <template #studios>
        <h4>Топ студий</h4>
      </template>
    </LazyAppTopList>

    <LazyPageBreadcrumbs
      :list="[{ title: page?.title, to: route.params.slug }]"
    />
  </section>
</template>

<script setup>
  const route = useRoute()
  const user = useApiUser()

  if (route.params.slug.endsWith('-slug') || route.path == '/home') {
    throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' })
  }

  const { page } = await useApiPage(route.params.slug)

  if (page.value.is_auth && !user.value) {
    if (process.client) {
      useNotify().warn('Необходимо авторизоваться')
    }
    await navigateTo('/')
  }
  if (page.value.is_premium && !user.value?.has_premium) {
    if (process.client) {
      useNotify().warn('Необходим премиум')
    }
    await navigateTo('/')
  }

  setSeoPage({
    ...page.value,
  })
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
