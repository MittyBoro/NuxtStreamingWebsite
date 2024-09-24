<template>
  <div
    :class="{ hover: item.id && currentTouch == item.id, loading: !item.id }"
    class="card-video"
  >
    <AppLink
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @touchmove="hovered = true"
      :to="`/videos/${item.slug}`"
      class="card card-hovering"
      :class="{ 'card-premium': item.is_premium }"
      :check="item.slug"
    >
      <div v-if="item.is_ru_voice" class="ru-voice button button-nano">
        Русская озвучка
      </div>
      <AppIconPremium
        v-show="item.is_premium"
        class="icon-premium"
        animated
        colored
      />
      <VideoTrailer
        v-if="showTrailer"
        class="card-video__video object-cover transition duration-alt"
        :src="item.trailer"
        :hovered="hovered"
        :duration="duration"
      />
      <span class="card-video__image card__image transition duration-alt">
        <AdaptiveImage
          v-if="Object.keys(item.preview || {}).length"
          :src="item.preview"
          class="object-cover"
          :title="item.title"
          :disableLazy="index < 3 && enableH3"
          sizes="sm:440px 2xl:536px 300px"
          width="16"
          height="9"
        />
        <ClientOnly v-else>
          <AppIcon name="i-solar-videocamera-record-bold-duotone" />
        </ClientOnly>
      </span>
      <span class="card__info card-video__info">
        <span class="preloading">
          <AppIcon name="i-mdi-clock-outline" />
          <span>{{ secondToTime(item.duration) }}</span>
          <span v-if="!item.id">...</span>
        </span>
        <span style="flex-grow: 0" class="preloading">
          <AppIcon name="i-mdi-calendar" />
          <HumanizeDate :date="item.published_at" />
          <span v-if="!item.id">...</span>
        </span>
        <span v-if="item.views > 1000" class="preloading">
          <AppIcon name="i-mdi-eye" />
          <span>{{ formatNumberViews(item.views) }}</span>
          <span v-if="!item.id">...</span>
        </span>
        <span class="preloading">
          <AppIcon name="i-mdi-thumb-up-outline" />
          <span>{{ item.rating || 0 }}%</span>
          <span v-if="!item.id">...</span>
        </span>
      </span>

      <VideoCardLines v-if="showTrailer" duration="1.2s" :active="hovered" />
    </AppLink>
    <div class="card-video__name preloading">
      <component :is="enableH3 ? 'h3' : 'span'">
        <AppLink :to="`/videos/${item.slug}`" :check="item.slug">
          {{ item.title }}
        </AppLink>
        <span v-if="!item.id">...</span>
      </component>
    </div>
  </div>
</template>

<script setup>
  const { item } = defineProps({
    item: {
      type: Object,
    },
    index: Number,
    enableH3: Boolean,
  })
  const currentTouch = defineModel('currentTouch')

  const duration = '.7s'

  const hovered = ref(false)

  const showTrailer = ref(false)

  watch(
    () => hovered.value,
    () => {
      if (!item.trailer) {
        return
      }
      currentTouch.value = hovered.value ? item.id : null
      showTrailer.value = true
    },
  )
</script>

<style lang="scss" scoped>
  .card-video {
    display: flex;
    flex-direction: column;

    &.hover {
      .ru-voice {
        opacity: 0;
      }
      .card-video {
        &__image,
        &__video {
          transition-delay: v-bind(duration);
          pointer-events: none;
        }

        &__video {
          opacity: 1;
        }
        &__info,
        &__image {
          opacity: 0;
        }
        &__info {
          transform: translateY(10px);
          span {
            flex-grow: 1;
          }
        }
      }
    }

    &__image,
    &__video,
    &__info {
      border-radius: inherit;
    }

    &__image,
    &__video {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }
    &__image {
      :deep(img) {
        width: 537px;
        @include media-breakpoint-down(xxxl) {
          width: 440px;
        }
        @include media-breakpoint-down(xxl) {
          width: 354px;
        }
        @include media-breakpoint-down(xl) {
          width: 452px;
        }
        @include media-breakpoint-down(lg) {
          width: 332px;
        }
        @include media-breakpoint-down(md) {
          width: 420px;
        }
        @include media-breakpoint-down(sm) {
          max-width: 100%;
          width: 420px;
        }
      }
    }
    &__name {
      display: block;
      margin: 0 0;
      font-weight: 600;
      font-size: var(--text-sm);
      h2 {
        display: flex;
      }
    }

    .icon-premium {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 1.5em;
      z-index: 3;
    }
    .ru-voice {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 0.3rem 0.35rem;
      border-radius: 0.5rem 0;
      height: auto;
      transition: opacity 0.2s;
      pointer-events: none;
      text-transform: uppercase;
      background: var(--body-bg);
      color: var(--primary);
      opacity: 0.95;
      z-index: 3;
    }
  }

  .card {
    overflow: visible;
    aspect-ratio: 16/9;
    margin-bottom: 0.75rem;
    &-premium {
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(-135deg, #000 30px, #0000 200px);
        opacity: 0.5;
        z-index: 2;
        pointer-events: none;
      }
    }
    &__info {
      display: flex;
      justify-content: space-between;
      gap: 0 var(--space-sm);
      color: var(--body-color);
      & > span {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        white-space: nowrap;
        &:nth-child(2) {
          overflow: hidden;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
