<template>
  <div class="single-video__wrapper">
    <LazySEOVideoSingle :video="video" :page="page" />
    <!-- <section class="container single-video__tags">
      <LazyPageCategoriesSlider v-if="isDesktop" :list="categoriesTop" />
    </section> -->

    <!--  -->
    <section class="container single-video__container">
      <LazyVideoSingle :video="video" class="single-video__video" />

      <div v-if="similar.right.length" class="single-video__similar">
        <LazyVideoListMini title="Также смотрят" :list="similar.right" />
      </div>

      <CommentList class="single-video__comments" :list="video.comments" />
    </section>

    <!--  -->
    <section v-if="similar.bottom?.length" class="container" id="content">
      <LazyAppDelimiter />
      <LazyPageTitleRow>
        <template #title>
          <h2 class="flex aic">Похожие видео</h2>
        </template>
      </LazyPageTitleRow>
      <LazyVideoList :list="similar.bottom" />
    </section>

    <!--  -->
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

    <section class="container">
      <LazyPageBreadcrumbs
        :list="[
          ...(firstCategory
            ? [
                {
                  title: firstCategory.title,
                  to: `/categories/${firstCategory.slug}`,
                },
              ]
            : []),
          { title: video.title, to: `/videos/${route.params.slug}` },
        ]"
      />
    </section>
  </div>
</template>

<script setup>
  const route = useRoute()
  const user = useApiUser()

  const { page: video, refresh } = await useApiPage(
    `../videos/${route.params.slug}`,
  )

  onMounted(() => {
    if (user.value?.has_premium) {
      setTimeout(refresh, 5)
    }
  })

  const { page: originalPage } = await useApiPage(`actors-slug`)
  // const categoriesTop = computed(() => video.value.categories?.slice(0, 15))

  const firstCategory = computed(() => {
    return video.value.categories[0]
  })

  const page = pageWithMask(originalPage.value, video.value)

  provide('able', {
    type: 'video',
    id: video.value.id,
  })

  /**
   * Get similar
   */
  const { list: similarList } = await useApiList('videos', {
    similar: video.value.id,
    per_page: 15,
  })

  const isDesktop = useIsDesktop()

  const similar = computed(() => {
    const list =
      similarList.value?.sort((a, b) =>
        stableRandomSort(video.value.id, a.id, b.id),
      ) || []

    if (!isDesktop.value) {
      return {
        right: isDesktop.value === null ? Array(2).fill({}) : [],
        bottom: list.slice(0, 8),
      }
    } else {
      return {
        right: list.slice(6, -1),
        bottom: list.slice(0, 6),
      }
    }
  })
</script>

<style lang="scss" scoped>
  .single-video {
    &__container {
      display: grid;
      grid-template-columns: 9fr 5fr;

      grid-template-areas:
        'v s'
        'c s';
      gap: var(--gap);
      @include media-breakpoint-down(lg) {
        grid-template-columns: 1fr;
        grid-template-areas: 'v' 'c' 's';
      }
    }
    &__tags {
      height: 28px;
      margin-bottom: var(--space-base);
      @include media-breakpoint-down(lg) {
        display: none;
      }
    }
    &__video {
      grid-area: v;
    }
    &__similar {
      grid-area: s;
      @include media-breakpoint-down(lg) {
        display: none;
      }
    }
    &__comments {
      grid-area: c;
    }
  }
</style>
