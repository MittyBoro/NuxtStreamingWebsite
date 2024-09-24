<template>
  <div class="container" :class="{ 'loading-box': pending }">
    <LazyPageTitleRow>
      <template #title>
        <h1>{{ title }}</h1>
      </template>
      <template #right>
        <div class="buttons-list">
          <Button
            v-if="tabs.includes('videos')"
            class="button button-mini"
            @click.passive="setTab('videos')"
            :class="{ 'button-alt': activeTab != 'videos' }"
          >
            <AppIcon name="i-mdi-play-box-multiple-outline" />
            <span>Видео</span>
          </Button>
          <Button
            v-if="tabs.includes('albums')"
            class="button-mini"
            @click.passive="setTab('albums')"
            :class="{ 'button-alt': activeTab != 'albums' }"
          >
            <AppIcon name="i-mdi-image-multiple-outline" />
            <span>Альбомы</span>
          </Button>
          <Button
            v-if="tabs.includes('actors')"
            class="button-mini"
            @click.passive="setTab('actors')"
            :class="{ 'button-alt': activeTab != 'actors' }"
          >
            <AppIcon name="i-mdi-face-woman-shimmer-outline" />
            <span>Модели</span>
          </Button>
        </div>
      </template>
    </LazyPageTitleRow>

    <LazyVideoList
      v-if="activeTab == 'videos'"
      :list="content.videos"
      :meta="meta"
    />
    <LazyAlbumList
      v-if="activeTab == 'albums'"
      :list="content.albums"
      :meta="meta"
    />
    <LazyActorList
      v-if="activeTab == 'actors'"
      :list="content.actors"
      :meta="meta"
    />

    <!--  -->
    <LazyAppTopList>
      <template #videos>
        <h2>ТОП недели</h2>
      </template>
      <template #categories>
        <h2>Тренды</h2>
      </template>
      <template #actors>
        <h2>Популярные модели</h2>
      </template>
      <template #studios>
        <h2>Популярные студии</h2>
      </template>
    </LazyAppTopList>
  </div>
</template>

<script setup>
  const route = useRoute()

  const word = computed(() => {
    return route.query.q?.trim()
  })

  if (!word.value) {
    throw createError({
      statusCode: 404,
      message: 'Страница не найдена',
    })
  }

  const tabs = ref(['videos', 'albums', 'actors'])

  const activeTab = computed(() => {
    return tabs.value.includes(route.query.type) ? route.query.type : 'videos'
  })

  const title = computed(() => {
    switch (activeTab.value) {
      case 'videos':
        return `Видео по запросу «${word.value}»`
      case 'albums':
        return `Альбомы по запросу «${word.value}»`
      case 'actors':
        return `Модели по запросу «${word.value}»`
    }
  })

  setSeoPage({
    meta_title: title.value,
    canonical: true,
    is_index: false,
  })

  /**
   * Get additional data
   */

  const query = computed(() => ({
    q: word.value,
  }))
  const content = reactive({
    videos: [],
    albums: [],
    actors: [],
  })

  const { meta, list, pending } = await useApiList(activeTab, query)

  watchEffect(() => {
    if (list.value) {
      content[activeTab.value] = list.value
    }

    if (!list.value?.length) {
      if (!list.value?.length) {
        switch (activeTab.value) {
          case 'videos':
            navigateTo({ query: { q: word.value, type: 'albums' } })
            break
          case 'albums':
            navigateTo({ query: { q: word.value, type: 'actors' } })
            break
        }
      }
    }
  })

  const setTab = async (tabName) => {
    await navigateTo({
      query: {
        type: tabName || undefined,
        page: undefined,
        q: route.query.q,
      },
    })
  }

  // закинуть в поисковые запросы
  let timerId = null
  onMounted(() => {
    const isSearched = useLocalStorage('searched-' + route.query.q, false)
    if (!isSearched.value) {
      timerId = setTimeout(async () => {
        await $api('/search_queries', {
          method: 'POST',
          body: {
            query: route.query.q,
          },
        })
        isSearched.value = true
      }, 10000)
    }
  })

  onBeforeUnmount(() => {
    if (timerId) {
      clearTimeout(timerId)
    }
  })
</script>

<style lang="scss" scoped>
  .title-mini {
    font-weight: 600;
  }
</style>
