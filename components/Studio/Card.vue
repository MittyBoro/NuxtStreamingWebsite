<template>
  <div
    class="card card-studio"
    :class="{ loading: !item.id }"
    @click.passive="navigateTo(`/studios/${item.slug}`)"
  >
    <AppLink
      :check="item.slug"
      :to="`/studios/${item.slug}`"
      class="card__image card-studio__image"
    >
      <AdaptiveImage
        v-if="Object.keys(item.preview || {}).length"
        :src="item.preview"
        class="object-cover"
        :title="`логотип студии ${item.title}`"
        sizes="sm:385px 412px"
        :disableLazy="index < 4"
      />
      <ClientOnly v-else>
        <AppIcon name="i-mdi-movie-open-play-outline" class="icon" />
      </ClientOnly>
    </AppLink>
    <span class="card__info card-studio__info">
      <span class="card-studio__title preloading">
        <component :is="enableH3 ? 'h3' : 'span'">
          {{ item.title }}
        </component>
      </span>
      <span class="preloading">{{ item.video_count }} видео</span>
    </span>
  </div>
</template>

<script setup>
  defineProps({
    item: {
      type: Object,
      default: {},
    },
    index: Number,
    enableH3: Boolean,
  })
</script>

<style lang="scss" scoped>
  .card-studio {
    aspect-ratio: 4/3;
    cursor: pointer;
    a {
      color: inherit;
      transition: none;
    }
    @include media-breakpoint-down(md) {
      aspect-ratio: 4/2;
    }
    &:hover {
      .card-studio__info {
        color: var(--black);
        &::before {
          background: var(--secondary);
          opacity: 1;
        }
      }
    }
    &__image {
      position: absolute;
      inset: 0;
    }
    &__info {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--gap);
      span {
        white-space: nowrap;
      }
    }
    &__title {
      font-size: var(--text-base);
      font-weight: 600;
    }
  }
</style>
