<template>
  <div
    class="card card-actor"
    :class="{ loading: !item.id }"
    @click.passive="navigateTo(`/actors/${item.slug}`)"
  >
    <AppLink
      :check="item.slug"
      :to="`/actors/${item.slug}`"
      class="card-actor__image card__image"
    >
      <AdaptiveImage
        v-if="Object.keys(item.photo || {}).length"
        :src="item.photo"
        class="object-cover"
        :title="item.name"
        sizes="sm:312px 200px"
        :disableLazy="index < 4"
      />
      <ClientOnly v-else>
        <AppIcon name="i-mdi-image-auto-adjust" class="icon" />
      </ClientOnly>
    </AppLink>
    <AppIcon
      v-if="item.country"
      :name="`i-circle-flags-${item.country.toLowerCase()}`"
      class="card-actor__flag icon preloading"
      :css="false"
    />
    <div class="card__info card-actor__info">
      <div class="card-actor__name preloading">
        <component :is="enableH3 ? 'h3' : 'span'">
          <AppLink :check="item.slug" :to="`/actors/${item.slug}`">
            {{ name || item.name }}
          </AppLink>
        </component>
      </div>
      <AppLink
        :check="item.slug"
        :to="`/actors/${item.slug}`"
        class="card-actor__stats"
      >
        <span v-if="item.video_views" class="preloading">
          <AppIcon name="i-mdi-eye" />
          <span>{{ formatNumberViews(item.video_views, true) }}</span>
          <span v-if="!item.id">...</span>
        </span>
        <span class="preloading">
          <AppIcon name="i-mdi-thumb-up-outline" />
          <span>{{ item.rating || 0 }}%</span>
          <span v-if="!item.id">...</span>
        </span>
        <span class="preloading">
          <AppIcon name="mdi:video-outline" />
          <span>{{ formatNumber(item.video_count) }}</span>
          <span v-if="!item.id">...</span>
        </span>
      </AppLink>
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

  const name = computed(() => {
    const hasCyrillicInBrackets = /\([^\)]*[А-Яа-яЁё][^\)]*\)/.test(item.name)

    if (hasCyrillicInBrackets) {
      const match = item.name.match(/\([^\)]*[А-Яа-яЁё][^\)]*\)/)
      if (match) {
        return match[0].replace(/[()]/g, '')
      }
    } else {
      return item.name
    }
  })
</script>

<style lang="scss" scoped>
  .card-actor {
    position: relative;
    overflow: hidden;
    background: var(--body-bg-alt);
    border-radius: 1rem 0;
    cursor: pointer;
    a {
      color: inherit;
      transition: none;
    }
    &:hover {
      .card-actor__info {
        color: var(--black);
        &::before {
          background: var(--secondary);
          opacity: 1;
        }
      }
    }
    &__image {
      position: relative;
      aspect-ratio: 1/1;
      overflow: hidden;
    }
    &__flag {
      position: absolute;
      top: 15px;
      right: 20px;
      transform: scale(1.3);
    }
    &__info {
      display: block;
      padding: var(--space-xs) var(--space-sm);
      font-size: var(--text-sm);
    }
    &__name {
      font-weight: 600;
    }
    &__stats {
      display: flex;
      justify-content: space-between;
      gap: 0 var(--space-xs);
      margin-top: 0.2em;
      flex-wrap: wrap;
      color: var(--body-color);
      span {
        display: flex;
        align-items: center;
        white-space: nowrap;
        gap: 0.25rem;
      }
    }
  }
</style>
