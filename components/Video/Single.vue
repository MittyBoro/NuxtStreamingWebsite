<template>
  <div class="card card-content">
    <VideoPlayer :video="video" />
    <div class="card__inner">
      <!-- title-row -->
      <div class="card-content__title-row">
        <div class="card-content__title preloading">
          <h1>{{ video.title }}</h1>
          <a
            href="/categories/ozvuckoi"
            v-if="video.is_ru_voice"
            class="button button-alt-nano ru-voice"
            title="Больше с озвучкой"
          >
            Озвучка
          </a>
        </div>
        <div class="card-content__note card-content__note-title">
          <div class="preloading">
            <AppIcon name="i-mdi-eye" class="mr-1" />
            <LazyAppActionViews :views="video.views" />
          </div>
          <div class="preloading">
            <AppIcon name="i-mdi-calendar" class="mr-1" />
            <HumanizeDate :date="video.published_at" />
          </div>
        </div>
      </div>

      <!-- second row -->
      <div class="card-content__actions">
        <div class="card-content__note card-content__note-action">
          <div class="preloading">
            <AppIcon name="i-mdi-eye" class="mr-1" />
            <LazyAppActionViews :views="video.views" disableAction />
          </div>
          <div class="preloading">
            <AppIcon name="i-mdi-calendar" class="mr-1" />
            <HumanizeDate :date="video.published_at" />
          </div>
        </div>
        <!-- actions -->
        <div class="card-content__actions-wrap">
          <LazyAppActionRating :item="video" />
          <LazyAppActionFavorite class="button-alt-mini" :item="video" />
        </div>

        <!-- tabs -->
        <div class="buttons-list card-content__buttons-right">
          <div
            class="button button-alt-mini preloading"
            :class="{ active: activeTab == 'info' }"
            @click.passive="activeTab = 'info'"
          >
            <AppIcon name="i-mdi-information-outline" />
            <span>Инфо</span>
          </div>
          <div
            class="button button-alt-mini preloading"
            :class="{ active: activeTab == 'screenshots' }"
            @click.passive="activeTab = 'screenshots'"
          >
            <AppIcon name="i-mdi-image-multiple-outline" />
            <span class="screenshots-text">Скриншоты</span>
            <span class="screenshots-text-alt">Фото</span>
          </div>
          <div
            class="button button-alt-mini preloading"
            :class="{ active: activeTab == 'share' }"
            @click.passive="activeTab = 'share'"
          >
            <AppIcon name="i-mdi-share-variant" />
            <span>Поделиться</span>
          </div>
        </div>
      </div>

      <!-- information -->
      <div class="card-content__text" v-show="activeTab == 'info'">
        <LazyActorListMini v-if="video.actors?.length" :list="video.actors" />

        <div
          v-if="video.description"
          v-html="video.description"
          class="prose preloading"
        ></div>

        <div class="card-content__tags-list" v-if="video.studios.length">
          <div class="card-content__subtitle preloading">Студии:</div>
          <div class="tags">
            <NuxtLink
              class="button button-alt-mini"
              v-for="studio in video.studios"
              :key="studio.id"
              :to="`/studios/${studio.slug}`"
            >
              <span class="preloading">{{ studio.title }}</span>
            </NuxtLink>
          </div>
        </div>

        <div class="card-content__tags-list" v-if="video.categories.length">
          <div class="card-content__subtitle preloading">Категории:</div>
          <AppCategoriesList :list="video.categories" />
        </div>
      </div>

      <!-- screenshots -->
      <template v-if="wokeUp">
        <LazyAppGallery
          class="card-content__screenshots"
          id="screenshots"
          v-if="activeTab == 'screenshots'"
        >
          <LazyAppGalleryLink
            v-if="video.screenshots?.length"
            v-for="(image, index) in video.screenshots"
            :key="index"
            :item="image"
            :title="video.title + ' -  ' + (index + 1)"
          />
          <div v-else class="card-content__title grid-col-full">
            Скриншоты отсутствуют
          </div>
        </LazyAppGallery>
      </template>

      <!-- share -->
      <div class="card-content__text" v-show="activeTab == 'share'">
        <LazyAppShare
          :title="video.title"
          :description="video.meta_description"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  const activeTab = ref('info')

  defineProps({
    video: {
      type: Object,
    },
  })

  const wokeUp = useWokeUp()
</script>

<style lang="scss" scoped>
  .card-content {
    &__title {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--space-xs);
      .ru-voice {
        padding: 0.35rem 0.5rem;
        border-radius: 0.5rem 0;
        height: auto;
        transition: opacity 0.2s;
        text-transform: uppercase;
      }
    }
    &__screenshots {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-sm);
      @include media-breakpoint-down(md) {
        gap: var(--space-xs);
      }
    }
    &__screenshot-item :deep(.card__image) {
      aspect-ratio: 16/9;
      cursor: pointer;
    }
  }
  .screenshots-text-alt {
    display: none;
  }

  @include media-breakpoint-down(lg) {
    .card-content__buttons-right {
      margin: 0;
      flex-wrap: nowrap;
      grid-column: 1 / -1;
      .button {
        flex: 1;
        width: auto;
      }
    }
  }
  @include media-breakpoint-down(md) {
    .screenshots-text {
      display: none;
    }
    .screenshots-text-alt {
      display: inline;
    }
  }

  .card-content__note-title {
    display: flex;
  }
  .card-content__note-action {
    display: none;
  }
  @include media-breakpoint-down(lg) {
    .card-content__note-title {
      display: none;
    }
    .card-content__note-action {
      display: flex;

      @include media-breakpoint-down(md) {
        justify-content: space-between;
        grid-column: 1 / -1;
      }
    }
    .card-content__actions {
      &-wrap {
        @include media-breakpoint-down(md) {
          justify-content: space-between;
        }
      }
      @include media-breakpoint-down(lg) {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: var(--space-sm) var(--space-xs);
        margin-bottom: var(--space-base);
      }
    }
  }
</style>
