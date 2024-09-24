<template>
  <div class="container" :class="{ 'loading-box': pending }">
    <LazySEOActorList
      :page="page"
      :list="list"
      :meta="meta"
      :filterCount="filterCount"
    />
    <LazyPageTitleRow>
      <template #title>
        <h1>{{ page.title }}</h1>
      </template>
      <template #right>
        <LazyDropDownList :list="listSorting" />

        <div
          class="button button-alt-mini"
          :class="{ active: showFilter }"
          @click="showFilter = !showFilter"
        >
          <span class="preloading">
            <span>Фильтр</span>
            <span v-if="filterCount > 1"> ({{ filterCount }})</span>
          </span>
          <AppIcon
            :name="showFilter ? `i-mdi-minus` : `i-mdi-plus`"
            class="arrow preloading"
          />
        </div>
        <LazyActorFilter
          v-model:show="showFilter"
          v-model:title="subTitle"
          :meta="meta"
        />
      </template>
    </LazyPageTitleRow>

    <!--  -->
    <LazyActorList :list="list" :meta="meta" :loadNextPage="loadNextPage" />

    <!--  -->
    <LazyAppTopList>
      <template #categories>
        <h2>Тренды</h2>
      </template>
      <template #actors>
        <h3>Популярные модели</h3>
      </template>
      <template #studios>
        <h4>Популярные студии</h4>
      </template>
    </LazyAppTopList>

    <!--  -->
    <LazyPageDescription :text="page.description" delimiter />

    <!--  -->
    <LazyPageBreadcrumbs :list="[{ title: 'Актёры', to: '/actors' }]" />
  </div>
</template>

<script setup>
  const route = useRoute()

  const filterCount = computed(() => {
    let count = 0
    let keys = [
      'gender',
      'country',
      'ethnicity',
      'hair_color',
      'min_age',
      'max_age',
      'boob_size',
      'fake_boobs',
      'features',
    ]
    Object.keys(route.query).forEach((key) => {
      if (keys.includes(key)) {
        count++
      }
    })
    return count
  })

  const showFilter = ref(filterCount.value > 0)
  const subTitle = ref('')

  const { listSorting, titleMask } = useSorting('actors')
  const { page: originalPage } = await useApiPage('actors')

  listSorting.forEach((item) => {
    item.query = {
      ...route.query,
      ...item.query,
      page: undefined,
    }
  })

  const query = computed(() => ({
    per_page: 20,

    gender: route.query.gender,
    country: route.query.country,
    ethnicity: route.query.ethnicity,
    hair_color: route.query.hair_color,
    min_age: route.query.min_age,
    max_age: route.query.max_age,
    boob_size: route.query.boob_size,
    fake_boobs: route.query.fake_boobs,
    features: route.query.features,
  }))
  const { list, meta, pending, loadNextPage } = await useApiList(
    'actors',
    query,
  )

  const page = pageWithMask(
    originalPage.value,
    {},
    computed(
      () =>
        actorKeysToString(route.query) ||
        (route.query.o ? titleMask.value?.toLowerCase() : ''),
    ),
    [
      'gender=',
      'country=',
      'ethnicity=',
      'hair_color=',
      'min_age=',
      'max_age=',
      'boob_size=',
      'fake_boobs=',
      'features=',
      'o=rating',
      'o=name',
    ],
  )

  if (process.server && !list.value.length) {
    setResponseStatus(useRequestEvent(), 404)
  }
</script>
