<template>
  <div
    class="card card-hovering card-album"
    :class="{ loading: !item.id }"
    @click.passive="navigateTo(`/albums/${item.slug}`)"
    custom
  >
    <AppLink
      :check="item.slug"
      :to="`/albums/${item.slug}`"
      class="card__image card-album__image"
    >
      <AppIconPremium
        v-show="item.is_premium"
        class="icon-premium"
        animated
        colored
      />
      <AdaptiveImage
        v-if="Object.keys(item.preview || {}).length"
        :src="item.preview"
        class="object-cover"
        :title="item.title"
        sizes="xl:563px 412px"
        :disableLazy="index < 3"
      />
      <ClientOnly v-else>
        <AppIcon name="i-ic-twotone-photo-camera-front" class="icon" />
      </ClientOnly>
    </AppLink>
    <div class="card__info card-album__info">
      <div class="card-album__name preloading">
        <component :is="enableH3 ? 'h3' : 'span'">
          <AppLink :check="item.slug" :to="`/albums/${item.slug}`">
            {{ item.title }}
          </AppLink>
        </component>
      </div>
      <AppLink
        :check="item.slug"
        :to="`/albums/${item.slug}`"
        class="card-album__bottom"
      >
        <span class="preloading">
          <AppIcon name="i-mdi-image-multiple-outline" />
          <span>{{ item.gallery_count }}</span>
        </span>
        <span class="preloading">
          <AppIcon name="i-mdi-clock-outline" />
          <HumanizeDate :date="item.published_at" />
        </span>
        <span class="preloading">
          <AppIcon name="i-mdi-eye" />
          <span>{{ formatNumber(item.views) }}</span>
        </span>
        <span class="preloading">
          <AppIcon name="i-mdi-thumb-up-outline" />
          <span>{{ item.rating || 100 }}%</span>
        </span>
      </AppLink>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    item: Object,
    index: Number,
    enableH3: Boolean,
  })
</script>

<style lang="scss" scoped>
  .card-album {
    aspect-ratio: 4/3;
    cursor: pointer;
    a {
      color: inherit;
      transition: none;
    }
    &:hover {
      .card__info {
        color: var(--black);
        &::before {
          background: var(--secondary);
          opacity: 1;
        }
      }
    }
    .icon-premium {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 1.5em;
      z-index: 3;
    }
    &__info {
      color: var(--body-color);
    }
    &__image {
      position: absolute;
      inset: 0;
    }
    &__name {
      font-weight: 600;
      margin-bottom: var(--space-xs);
    }
    &__bottom {
      display: flex;
      justify-content: space-between;
      gap: inherit;
      span {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }
  }
</style>
