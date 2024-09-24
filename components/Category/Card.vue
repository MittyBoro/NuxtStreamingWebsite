<template>
  <div
    class="card card-category"
    :class="{ loading: !item.id }"
    @click.passive="navigateTo(`/categories/${item.slug}`)"
  >
    <AppLink
      :check="item.slug"
      :to="`/categories/${item.slug}`"
      class="card-category__image card__image"
    >
      <AdaptiveImage
        v-if="Object.keys(item.preview || {}).length"
        :src="item.preview"
        class="object-cover"
        :title="item.title"
        :disableLazy="index < 4"
      />
      <ClientOnly v-else>
        <AppIcon name="i-mdi-image-auto-adjust" class="icon" />
      </ClientOnly>
    </AppLink>
    <div class="card-category__stats">
      <AppIcon name="mdi:video-outline" />
      <span>{{ formatNumber(item.video_count) }}</span>
      <span v-if="!item.id">...</span>
    </div>
    <div class="card-category__info">
      <component :is="enableH3 ? 'h3' : 'span'">
        <AppLink :check="item.slug" :to="`/categories/${item.slug}`">
          {{ item.title }}
        </AppLink>
      </component>
    </div>
  </div>
</template>

<script setup>
  const { item, index } = defineProps({
    item: {
      type: Object,
      default: {},
    },
    index: Number,
    enableH3: Boolean,
  })
</script>

<style lang="scss" scoped>
  .card-category {
    position: relative;
    overflow: hidden;
    background: var(--body-bg-alt);
    border-radius: 1rem 0;
    color: #fff;
    font-weight: 600;
    font-size: var(--text-sm);
    cursor: pointer;
    a {
      color: inherit;
      transition: none;
    }
    &:hover {
      .card-category__stats {
        opacity: 1;
        transform: translateY(0);
      }
    }
    &__image {
      position: relative;
      aspect-ratio: 16/9;
      overflow: hidden;
    }
    &__info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      gap: var(--space-sm);
      padding: var(--space-lg) var(--space-sm) var(--space-xs);
      background: linear-gradient(to bottom, #0000, #0007);
    }
    &__stats {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;

      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.25rem;
      background: linear-gradient(to top, #0000, #0007);
      mask-image: linear-gradient(to right, transparent, #000);

      padding: var(--space-xs) var(--space-sm) var(--space-md);

      opacity: 0;
      transform: translateY(-1em);

      transition:
        transform 0.3s ease,
        opacity 0.3s ease;
    }
  }
</style>
