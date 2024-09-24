<template>
  <AppLink
    :check="item.slug"
    :to="`/videos/${item.slug}`"
    class="card-video-mini"
    :class="{ loading: !item.id }"
  >
    <span class="card card-video__image card__image">
      <AdaptiveImage
        v-if="Object.keys(item.preview || {}).length"
        :src="item.preview"
        class="object-cover"
        :title="item.title"
        sizes="160px"
      />
      <ClientOnly v-else>
        <AppIcon name="i-solar-videocamera-record-bold-duotone" />
      </ClientOnly>
      <div v-if="item.is_ru_voice" class="ru-voice" title="Русская озвучка">
        <AppIcon name="i-mdi-microphone" />
      </div>
    </span>
    <span class="card-video__right">
      <span class="card-video__name preloading">
        <AppIconPremium
          v-if="item.is_premium"
          class="icon-premium"
          animated
          colored
        />
        <span>{{ item.title }}</span>
      </span>

      <span class="card-video__info">
        <span class="preloading">
          <AppIcon v-if="item.id" name="i-mdi-clock-outline" />
          <span>{{ secondToTime(item.duration) }}</span>
        </span>
        <span v-if="item.views > 1000" class="preloading">
          <AppIcon v-if="item.id" name="i-mdi-eye" />
          <span>{{ formatNumber(item.views) }}</span>
        </span>
        <span class="preloading">
          <AppIcon v-if="item.id" name="i-mdi-thumb-up-outline" />
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
      .ru-voice {
        position: absolute;
        top: 2px;
        left: 7px;
        color: var(--primary);
        filter: drop-shadow(0 0 7px #000);
        z-index: 3;
        .icon {
          font-size: 14px;
          line-height: 1;
        }
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
      .icon-premium {
        position: relative;
        margin-right: 5px;
      }
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
