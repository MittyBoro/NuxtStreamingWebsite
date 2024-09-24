<template>
  <div v-if="list?.length" class="tags tags__slider">
    <div class="tags__nav tags__nav-prev link" ref="prevRef">
      <AppIcon name="i-mdi-chevron-left" />
    </div>
    <div class="tags__nav tags__nav-next link" ref="nextRef">
      <AppIcon name="i-mdi-chevron-right" />
    </div>
    <div class="tags__slider-inner">
      <swiper-container
        slides-per-view="auto"
        space-between="5"
        :init="false"
        ref="swiperRef"
      >
        <swiper-slide v-for="item in list" :key="item.id">
          <NuxtLink
            class="button button-alt-nano"
            :to="`/categories/${item.slug}`"
          >
            <span class="preloading">{{ item.title }}</span>
          </NuxtLink>
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script setup>
  import { register } from 'swiper/element'
  import { Navigation } from 'swiper/modules'

  register()

  const { list } = defineProps({
    list: {
      type: Array,
      default: () => [],
    },
  })

  const swiperRef = ref(null)
  const prevRef = ref(null)
  const nextRef = ref(null)

  onMounted(() => {
    if (!list?.length) {
      return
    }
    const params = {
      modules: [Navigation],

      navigation: {
        disabledClass: 'disabled',
        prevEl: prevRef.value,
        nextEl: nextRef.value,
      },
    }

    Object.assign(swiperRef.value, params)
    swiperRef.value.initialize()
  })
</script>

<style lang="scss" scoped>
  .tags {
    @include media-breakpoint-down(lg) {
      display: none;
    }
    swiper-container {
      display: flex;
      white-space: nowrap;
      gap: 5px;
    }
    &__slider {
      position: relative;
      overflow: hidden;
      margin-bottom: var(--space-base);

      &-inner {
        --mask-start: transparent;
        --mask-end: transparent;

        max-width: 100%;
        min-width: 1px;

        position: relative;
        width: 100%;

        mask-image: linear-gradient(
          to right,
          var(--mask-start) 30px,
          #000 50px,
          #000 calc(100% - 50px),
          var(--mask-end) calc(100% - 30px)
        );
      }
      @include media-breakpoint-down(lg) {
        margin-bottom: var(--space-base);
      }
    }

    swiper-slide {
      width: auto;
    }
    &__nav {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      width: 30px;
      height: 100%;
      z-index: 5;
      &.disabled {
        visibility: hidden;
      }
      &-next {
        right: 0;
      }
      &-prev.disabled ~ .tags__slider-inner {
        --mask-start: #000;
      }
      &-next.disabled ~ .tags__slider-inner {
        --mask-end: #000;
      }
    }
  }
</style>
