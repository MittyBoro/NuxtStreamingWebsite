<template>
  <div class="single-albums__wrapper">
    <LazySEOAlbumSingle :page="page" :album="album" />
    <section class="container single-albums__container">
      <LazyAlbumGallery :album="album" class="single-albums__gallery" />
      <LazyAlbumInfo :album="album" class="single-albums__info" />
      <LazyCommentList :list="album.comments" class="single-albums__comments" />
    </section>

    <section v-if="similar?.length" id="content" class="container">
      <LazyAppDelimiter />
      <LazyPageTitleRow>
        <template #title>Похожие альбомы</template>
      </LazyPageTitleRow>
      <LazyAlbumList :list="similar" />
    </section>

    <section class="container">
      <!-- <LazyPageDescription :text="page.description" /> -->
      <LazyPageBreadcrumbs
        :list="[
          { title: 'Фото', to: '/albums' },
          { title: album.title, to: `/albums/${route.params.slug}` },
        ]"
      />
    </section>
  </div>
</template>

<script setup>
  const route = useRoute()
  const user = useApiUser()

  const { page: album } = await useApiPage(`../albums/${route.params.slug}`)

  onMounted(() => {
    if (user.value?.has_premium) {
      setTimeout(refresh, 5)
    }
  })

  const { page: originalPage } = await useApiPage(`albums-slug`)

  const page = pageWithMask(originalPage.value, album.value)

  provide('able', {
    type: 'album',
    id: album.value.id,
  })

  const { list: similar } = await useApiList('albums', {
    similar: album.value.id,
    per_page: 15,
  })
</script>

<style lang="scss" scoped>
  .single-albums {
    &__title {
      font-weight: 600;
      margin-bottom: var(--space-base);
    }
    &__container {
      margin-top: -0.5rem;
      display: grid;
      grid-template-columns: 9fr 5fr;
      align-items: start;

      grid-template-areas:
        'g i'
        'c i';
      gap: var(--gap);
      @include media-breakpoint-down(lg) {
        grid-template-columns: 1fr;
        grid-template-areas:
          'g '
          'i'
          'c';
      }
    }
    &__gallery {
      grid-area: g;
    }
    &__info {
      grid-area: i;
    }
    &__comments {
      grid-area: c;
    }
  }
  .right-col {
    grid-column-start: 8;
    grid-row: 1 / 3;
  }
</style>
