<template>
  <div class="bottom-menu">
    <div class="container">
      <NuxtLink to="/" class="bm-item">
        <AppIcon name="i-mdi-play-box-multiple-outline" />
        <span>Видео</span>
      </NuxtLink>
      <NuxtLink to="/actors" class="bm-item">
        <AppIcon name="i-mdi-face-woman-shimmer-outline" />
        <span>Модели</span>
      </NuxtLink>
      <!-- <NuxtLink to="/albums" class="bm-item">
        <AppIcon name="i-mdi-camera-enhance-outline" />
        <span>Фото</span>
      </NuxtLink> -->
      <NuxtLink to="/studios" class="bm-item">
        <AppIcon name="i-mdi-movie-open-play-outline" />
        <span>Студии</span>
      </NuxtLink>
      <NuxtLink to="/categories" class="bm-item">
        <AppIcon name="i-mdi-format-list-bulleted-square" />
        <span>Категории</span>
      </NuxtLink>
      <div
        :style="{ visibility: showBannerToggle ? 'visible' : 'hidden' }"
        class="bm-item bm-more"
        :class="{ stopped: !isBannerHidden && showBannerToggle }"
      >
        <div class="icon">
          <div
            class="banner__circle transition-all duration-alt active"
            @click.passive="isBannerHidden = !isBannerHidden"
          ></div>
        </div>
        <span v-if="isBannerHidden && showBannerToggle">Ещё</span>
        <span v-else>Скрыть</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  const isBannerHidden = defineModel('isBannerHidden')
  defineProps({
    showBannerToggle: Boolean,
  })
</script>

<style lang="scss" scoped>
  .bottom-menu {
    position: relative;
    z-index: 15;
    background: var(--body-bg);
    border-top: 1px solid var(--border-color);
    pointer-events: all;
    display: none;
    @include media-breakpoint-down(md) {
      display: block;
    }
    .container {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }
    .bm-item {
      padding: 8px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-weight: 600;
      font-size: 9px;
      .icon {
        margin-bottom: 3px;
        font-size: 15px;
      }
    }
    .bm-more {
      &.stopped {
        color: inherit;
        .banner__circle {
          animation: none;
          transform: rotate(180deg);
          filter: grayscale(1);
          &::before {
            animation: none;
          }
        }
      }
    }
  }
</style>
