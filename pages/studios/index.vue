<template>
  <div class="container" :class="{ 'loading-box': pending }">
    <LazySEOStudioList :page="page" :list="list" :meta="meta" />

    <div class="title-studios">
      <LazyPageTitleRow>
        <template #title>
          <h1>{{ page.title }}</h1>
        </template>
        <template #right>
          <LazySearch
            placeholder="Найти студию..."
            v-model="searchQuery"
            path="/studios"
            allowEmpty
          />

          <LazyDropDownList :list="listSorting" />
          <LazyPageDescription :text="page.description" />
        </template>
      </LazyPageTitleRow>
    </div>

    <!--  -->
    <LazyStudioList :list="list" :meta="meta" :loadNextPage="loadNextPage" />

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
    <LazyPageBreadcrumbs :list="[{ title: 'Студии', to: '/studios' }]" />
  </div>
</template>

<script setup>
  const route = useRoute()
  const searchQuery = ref(route.query.q || '')

  const { page: originalPage } = await useApiPage('studios')

  const { listSorting, titleMask } = useSorting('studios')
  const { list, meta, pending, loadNextPage } = await useApiList(
    'studios',
    computed(() => ({ q: route.query.q })),
  )

  if (process.server) {
    originalPage.value.title += ' %mask%'
  }

  const replaceState = reactive({
    title: ' по запросу «' + searchQuery.value + '»',
  })

  watchEffect(() => {
    if (searchQuery.value) {
      replaceState.title = ' по запросу «' + searchQuery.value + '»'
    } else {
      replaceState.title = ''
    }
  })

  const page = pageWithMask(
    originalPage.value,
    replaceState,
    computed(() => titleMask.value?.toLowerCase()),
    ['o=title'],
  )
</script>

<style lang="scss" scoped>
  .title-studios {
    :deep(.title-row) {
      padding-bottom: var(--space-sm);
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
