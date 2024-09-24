<template>
  <AppLink
    :check="item.slug"
    :to="`/albums/${item.slug}`"
    class="card-video-mini"
  >
    <span class="card card-video__image card__image">
      <AdaptiveImage
        v-if="Object.keys(item.preview || {}).length"
        :src="item.preview"
        class="object-cover"
        :title="item.title"
        original
      />
      <ClientOnly v-else>
        <AppIcon name="i-ic-twotone-photo-camera-front" class="icon" />
      </ClientOnly>
    </span>
    <span class="card-video__right">
      <span class="card-video__name preloading">
        {{ item.title }}
      </span>

      <span class="card-video__info">
        <span class="preloading">
          <AppIcon name="i-mdi-image-multiple-outline" />
          <span>19</span>
        </span>
        <span class="preloading">
          <AppIcon name="i-mdi-eye" />
          <span>{{ formatNumber(item.views) }}</span>
        </span>
        <span class="preloading">
          <AppIcon name="i-mdi-thumb-up-outline" />
          <span>{{ item.rating || 0 }}%</span>
        </span>
      </span>
    </span>
  </AppLink>
</template>

<script setup>
  const { item } = defineProps({
    item: {
      type: Object,
    },
  })
</script>

<style lang="scss" scoped>
  .card-video {
    &-mini {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      max-width: 450px;
      &:hover {
        color: var(--body-color-alt);
      }
    }
    &__image {
      aspect-ratio: 16/9;
      width: 10rem;
      flex-shrink: 0;
    }
    &__name {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      font-size: 0.85em;
    }
    &__info {
      display: grid;
      grid-template-columns: min-content auto;
      gap: 0.25rem 0.75rem;
      font-size: var(--text-sm);
      span {
        display: flex;
        align-items: center;
        gap: 0.25em;
      }
    }
  }
</style>
