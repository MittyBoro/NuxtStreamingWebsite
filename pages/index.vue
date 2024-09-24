<template>
  <div class="container" :class="{ 'loading-box': pending }">
    <LazySEOVideoList :page="page" :list="list" :meta="meta" />
    <LazyPageTitleRow style="display: block">
      <template #title>
        <h1 v-if="route.query.o === 'rating'">
          {{ page.title }}
        </h1>
        <div v-else class="home-grid">
          <template v-for="button in topButtonsList" :key="button.key">
            <div
              v-if="!button.hidden || route.query.o === button.key"
              class="button button-mini"
              :class="{
                'button-alt': route.query.o !== button.key,
                color: route.query.o !== button.key && button.key === 'premium',
              }"
              @click.passive="navigateTo({ query: button.query })"
            >
              <AppIcon
                v-if="button.icon"
                :name="button.icon"
                class="icon-diamond animation-blink"
              />
              <component :is="route.query.o === button.key ? 'h1' : 'span'">
                {{ button.label }}
              </component>
            </div>
          </template>
        </div>
      </template>
    </LazyPageTitleRow>
    <!-- 
      <LazyPageCategoriesSlider :list="categories" class="home__categories" />
     -->

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
    <LazyPageDescription :text="page.description" delimiter onlyFull />
  </div>
</template>

<script setup>
  const { listSorting, titleMask } = useSorting('videos')

  const props = useApiAttributes().value?.props
  const defaultSort = props?.home_sort || 'top'

  listSorting.forEach((item) => {
    if (item.query) {
      item.query.o = item.key === defaultSort ? undefined : item.key
    }
  })

  const route = useRoute()
  watchEffect(async () => {
    if (!route.query.o) {
      route.query.o = defaultSort
    } else if (route.query.o === defaultSort && !route.query.page) {
      await navigateTo({ query: { o: undefined } })
    }
  })

  const topButtonsList = ref([
    {
      key: 'top',
      label: 'Топ видео',
      query: { o: defaultSort === 'top' ? undefined : 'top' },
    },
    {
      key: 'latest',
      label: 'Новые',
      query: { o: defaultSort === 'latest' ? undefined : 'latest' },
    },
    {
      key: 'premium',
      icon: 'ic:baseline-diamond',
      label: 'Премиум',
      query: { o: defaultSort === 'premium' ? undefined : 'premium' },
    },
    {
      key: 'ru',
      label: 'Русская озвучка',
      query: { o: defaultSort === 'ru' ? undefined : 'ru' },
    },
    {
      key: 'views',
      label: 'Просмотры',
      query: { o: defaultSort === 'views' ? undefined : 'views' },
    },
    {
      key: 'rating',
      label: 'Самое горячее',
      hidden: true,
      query: { o: 'rating' },
    },
  ])

  const { page: originalPage } = await useApiPage('home')
  const { list, meta, pending, loadNextPage } = await useApiList(
    'videos',
    computed(() => ({
      per_page: useAppConfig().videosPerPage,
      pre_order: route.query.o === 'top' ? 'home_top' : undefined,
    })),
  )

  const sortPaths = ['o=rating', 'o=views', 'o=latest', 'o=premium'].filter(
    (str) => !str.includes(defaultSort),
  )

  const page = pageWithMask(
    originalPage.value,
    {},
    computed(() => titleMask.value.toLowerCase()),
    sortPaths,
  )

  const maskedPage = JSON.parse(JSON.stringify(page))

  watchEffect(async () => {
    if (route.query.o === 'rating') {
      const { page: ratingPage } = await useApiPage('o=rating')
      page.title = ratingPage.value.title
      page.description = ratingPage.value.description
      page.meta_title = ratingPage.value.meta_title
      page.meta_description = ratingPage.value.meta_description
    } else {
      page.title = maskedPage.title
      page.description = maskedPage.description
      page.meta_title = maskedPage.meta_title
      page.meta_description = maskedPage.meta_description
    }
  })
</script>

<style lang="scss" scoped>
  :deep(.title-row__head) {
    width: 100%;
    max-width: 100% !important;
  }
  .home-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    width: 100%;
  }
</style>
