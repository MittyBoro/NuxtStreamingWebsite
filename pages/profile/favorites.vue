<template>
  <LazyProfileMain :class="{ 'loading-box': pending }">
    <LazyPageTitleRow>
      <template #title>
        <div class="profile__title profile__favorites-title">
          Любимые
          <span v-if="activeTab == 'video'">видео</span>
          <span v-else-if="activeTab == 'album'">альбомы</span>
          <span v-else-if="activeTab == 'actor'">модели</span>
        </div>
      </template>
      <template #right>
        <div class="buttons-list">
          <Button
            class="button button-mini"
            @click.passive="setTab('video')"
            :class="{ 'button-alt': activeTab != 'video' }"
          >
            <AppIcon name="i-mdi-play-box-multiple-outline" />
            <span>Видео</span>
          </Button>
          <Button
            class="button-mini"
            @click.passive="setTab('album')"
            :class="{ 'button-alt': activeTab != 'album' }"
          >
            <AppIcon name="i-mdi-image-multiple-outline" />
            <span>Альбомы</span>
          </Button>
          <Button
            class="button-mini"
            @click.passive="setTab('actor')"
            :class="{ 'button-alt': activeTab != 'actor' }"
          >
            <AppIcon name="i-mdi-face-woman-shimmer-outline" />
            <span>Модели</span>
          </Button>
        </div>
      </template>
    </LazyPageTitleRow>

    <div
      v-if="list.length"
      class="profile__favorites-list"
      :class="{ 'profile__favorites--actors': activeTab == 'actor' }"
    >
      <template v-for="(item, i) in list" :key="item.id">
        <LazyProfileFavoriteItem :item="item" :activeTab="activeTab" />
        <div class="profile__favorites-delimiter"></div>
      </template>
    </div>
    <LazyAppEmpty v-else />
    <LazyAppPagination :center="false" :meta="meta" />
  </LazyProfileMain>
</template>

<script setup>
  useSeoMeta({
    title: 'Моё избранное',
  })
  definePageMeta({
    middleware: ['sanctum:auth'],
  })

  const getActiveType = () => route.query.type || 'video'

  const route = useRoute()

  const activeTab = ref(getActiveType())

  /**
   * Get additional data
   */
  const query = computed(() => ({
    type: getActiveType(),
  }))

  const { list, meta, pending } = await useApiList('/favorites', query)
  watch(
    () => list.value,
    () => {
      activeTab.value = getActiveType()
    },
  )

  const setTab = (tabName) => {
    navigateTo({
      query: {
        type: tabName === 'video' ? undefined : tabName,
        page: undefined,
      },
    })
  }
</script>

<style lang="scss" scoped>
  .profile__favorites {
    &-list {
      display: grid;
      gap: var(--space-sm);
      margin: var(--space-md) 0 var(--space-base);
    }
    &-delimiter {
      border-bottom: 1px solid var(--border-color);
      &:last-child {
        display: none;
      }
    }
    &--actors {
      .profile__favorites-delimiter {
        display: none;
      }
    }
  }
</style>
