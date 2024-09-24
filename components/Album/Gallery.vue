<template>
  <div class="single-albums__gallery">
    <LazyAppGallery
      id="albums"
      class="card single-albums__card single-albums__img-wrap"
    >
      <div v-if="!allowShow" class="buy-premium-layout">
        <AdaptiveImage
          v-if="Object.keys(album.preview || {}).length"
          :src="album.preview"
          class="object-cover"
          :title="album.title"
          original
        />
        <div class="buy-premium-layout-content">
          <p>
            Этот альбом доступен только для пользователей с PREMIUM аккаунтом
          </p>
          <Button @click.passive="setModal('premium')">
            Попробовать премиум
          </Button>
        </div>
      </div>
      <swiper-container
        v-show="allowShow"
        :navigation="true"
        :slides-per-view="1"
        :init="false"
        ref="swiperRef"
        @progress="onProgress"
      >
        <swiper-slide v-for="(item, index) in album.gallery" :key="index">
          <LazyAppGalleryLink
            class="card card-hovering single-albums__img-wrap"
            :key="index"
            :item="item"
            :title="album.title + ' - ' + (index + 1)"
            bigSrc
          />
        </swiper-slide>
      </swiper-container>
    </LazyAppGallery>
    <div class="single-albums__thumbs" :class="{ 'albums-blur': !allowShow }">
      <div
        class="card card-hovering single-albums__img-wrap"
        v-for="(item, index) in album.gallery"
        :key="index"
        :class="{ active: activeIndex == index }"
        rel="noreferrer"
        @click.passive="slideTo(index)"
      >
        <span class="card__image">
          <AdaptiveImage
            :src="item"
            class="object-cover"
            :title="album.title"
            sizes="md:210px sm:170px 100px"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { register } from 'swiper/element'
  import { Navigation } from 'swiper/modules'

  register()

  const { album } = defineProps({
    album: {
      type: Object,
    },
  })
  const user = useApiUser()
  const allowShow = computed(() => user.value?.has_premium || !album.is_premium)

  const swiperRef = ref(null)
  const activeIndex = ref(0)

  const params = {
    modules: [Navigation],
  }

  onMounted(() => {
    Object.assign(swiperRef.value, params)
    swiperRef.value.initialize()
  })

  const slideTo = (index) => {
    swiperRef.value.swiper.slideTo(index)
    activeIndex.value = index
  }

  const onProgress = (e) => {
    const [swiper] = e.detail
    activeIndex.value = swiper.activeIndex
  }
</script>

<style lang="scss">
  .albums-blur {
    pointer-events: none;
    img,
    picture {
      filter: blur(10px);
      transform: scale(1.1);
    }
  }
</style>
<style lang="scss" scoped>
  .single-albums {
    &__gallery {
      position: relative;
      min-width: 1px;
      width: 100%;
      min-height: 1px;
      max-width: 100%;
    }
    &__img-wrap {
      display: block;
      aspect-ratio: 16/9;
      min-height: 1px;
      overflow: hidden;
      &.active {
        box-shadow: 0 0 0 2px var(--primary);
        img {
          opacity: 0.5;
        }
      }
    }
    &__thumbs {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-sm);
      margin-top: var(--space-sm);
      @include media-breakpoint-down(md) {
        gap: var(--space-xs);
      }
    }
  }
  .btn-tabs {
    .b-line {
      height: 100%;
      width: 1px;
      background: var(--bg-secondary-color);
    }
  }
  .icon-row {
    display: flex;
    gap: 20px;
    .btn {
      padding-right: 20px;
      padding-left: 20px;
      .icon {
        margin-right: 0.5rem;
        font-size: 1.5em;
      }
    }
    .icon-item {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 12px;
      &::before {
        content: '';
        position: absolute;
        top: 7px;
        right: 0;
        bottom: 7px;
        border-right: 1px solid #7773;
      }
      .icon {
        font-size: 40px;
      }
    }
  }
  .styled-text {
    font-size: 14px;
  }
  .actor-item {
    font-weight: 600;
  }
  .ava-circle {
    width: 40px;
    height: 40px;
    border-width: 0;
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      box-shadow: inset 0 0 0 3px currentColor;
      opacity: 0.75;
    }
  }
  .s-img {
    aspect-ratio: 16/9;
  }

  swiper-container::part(button-prev),
  swiper-container::part(button-next) {
    position: absolute;
    top: var(--swiper-navigation-top-offset, 50%);
    width: calc(var(--swiper-navigation-size) / 44 * 27);
    height: var(--swiper-navigation-size);
    margin-top: calc(0px - (var(--swiper-navigation-size) / 2));
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    filter: drop-shadow(0 0 3px #000);
  }
  swiper-container::part(button-prev) {
    left: var(--swiper-navigation-sides-offset, 10px);
    right: auto;
  }
  swiper-container::part(button-next) {
    right: var(--swiper-navigation-sides-offset, 10px);
    left: auto;
  }
</style>
