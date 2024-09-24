<template>
  <div class="card card-content">
    <div class="card__inner">
      <!-- title-row -->
      <div class="single-albums__title preloading">
        <h1>{{ album.title }}</h1>
      </div>

      <div class="card-content__title-row">
        <div class="card-content__note">
          <div class="preloading">
            <AppIcon name="i-mdi-eye" class="mr-1" />
            <LazyAppActionViews :views="album.views" />
          </div>
          <div class="preloading">
            <AppIcon name="i-mdi-clock-outline" class="mr-1" />
            <HumanizeDate :date="album.published_at" />
          </div>
        </div>
      </div>

      <!-- second row -->
      <div class="card-content__actions">
        <!-- actions -->
        <LazyAppActionRating :item="album" />
        <LazyAppActionFavorite class="button-alt-mini" :item="album" />

        <!-- tabs -->
        <div class="card-content__buttons-right">
          <div
            class="button button-alt-mini preloading"
            :class="{ active: activeTab == 'share' }"
            @click.passive="activeTab = activeTab == 'share' ? 'info' : 'share'"
          >
            <AppIcon name="i-mdi-share-variant" />
            <span>Поделиться</span>
          </div>
        </div>
      </div>

      <!-- information -->
      <div class="card-content__text" v-show="activeTab == 'info'">
        <LazyActorListMini v-if="album.actors?.length" :list="album.actors" />

        <div
          v-if="album.description"
          v-html="album.description"
          class="prose preloading"
        ></div>

        <div class="card-content__tags-list" v-if="album.studios.length">
          <div class="card-content__subtitle preloading">Студии:</div>
          <div class="tags">
            <NuxtLink
              class="button button-alt-mini"
              v-for="studio in album.studios"
              :key="studio.id"
              :to="`/studios/${studio.slug}`"
            >
              <span class="preloading">{{ studio.title }}</span>
            </NuxtLink>
          </div>
        </div>

        <div class="card-content__tags-list" v-if="album.categories.length">
          <div class="card-content__subtitle preloading">Категории:</div>
          <AppCategoriesList :list="album.categories" />
        </div>
      </div>

      <!-- share -->
      <div class="card-content__text" v-show="activeTab == 'share'">
        <LazyAppShare
          :title="album.title"
          :description="album.meta_description"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  const activeTab = ref('info')

  const { album } = defineProps({
    album: {
      type: Object,
    },
  })
</script>

<style lang="scss" scoped>
  .single-albums {
    &__title {
      font-weight: 600;
      margin-bottom: var(--space-sm);
    }
  }
  .card-content__actions {
    margin-bottom: var(--space-base);
  }
</style>
