<template>
  <section ref="sectionRef">
    <div id="videos"></div>
    <div id="albums"></div>
    <div class="container" :class="{ 'loading-box': pending }">
      <LazyPageTitleRow>
        <template #title>
          <h2 v-if="activeTab == 'videos'">
            Все видео с моделью {{ actor.name }}
          </h2>
          <h2 v-else>Фото с моделью {{ actor.name }}</h2>
        </template>
        <template #right>
          <div class="buttons-list">
            <Button
              class="button button-mini preloading"
              @click.passive="setTab('videos')"
              :class="{ 'button-alt': activeTab != 'videos' }"
            >
              <AppIcon name="i-mdi-play-box-multiple-outline" />
              <span>Видео</span>
            </Button>
            <Button
              class="button-mini preloading"
              @click.passive="setTab('albums')"
              :class="{ 'button-alt': activeTab != 'albums' }"
            >
              <AppIcon name="i-mdi-camera-enhance-outline" />
              <span>Альбомы</span>
            </Button>
          </div>

          <LazyDropDownList :list="sortingList" disableHref />
        </template>
      </LazyPageTitleRow>

      <VideoList
        v-if="activeTab == 'videos'"
        :list="content.videos.list"
        :meta="content.videos.meta"
        :loadNextPage="loadNextPage"
      />
      <AlbumList
        v-if="activeTab == 'albums'"
        :list="content.albums.list"
        :meta="content.albums.meta"
        :loadNextPage="loadNextPage"
      />
    </div>
  </section>
</template>

<script setup>
  const route = useRoute()
  const sectionRef = ref(null)
  const sortingList = useAppConfig().sorting.videos

  const { actor } = defineProps({
    actor: {
      type: Object,
    },
  })

  const activeTab = computed(() => {
    return route.hash == '#albums' ? 'albums' : 'videos'
  })

  const content = reactive({
    videos: {},
    albums: {},
  })

  const { list, meta, pending, loadNextPage } = await useApiList(activeTab, {
    actors: actor.id,
  })

  watchEffect(() => {
    if (list.value) {
      content[activeTab.value] = reactive({
        list: list.value,
        meta: meta.value,
      })
    }
  })

  const setTab = (tabName) => {
    navigateTo({
      hash: tabName === 'albums' ? '#albums' : '#videos',
    })
  }

  onMounted(() => {
    watchEffect(() => {
      if (meta) {
        window.scrollTopValue = sectionRef.value.offsetTop
      }
    })
  })
</script>
