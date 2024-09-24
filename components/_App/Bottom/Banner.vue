<template>
  <Transition mode="out-in">
    <div class="banner" :class="{ active: isActive }">
      <div class="banner__wrapper">
        <div
          class="banner__close button button-alt"
          @click="isActive = false"
          :class="{ active: isActive }"
        >
          <AppIcon name="i-mdi-close" />
        </div>
        <div class="banner__video">
          <img src="/images/banner_desktop.jpg" alt="" class="bv-desktop" />
          <img src="/images/banner_mobile.jpg" alt="" class="bv-mobile" />
          <div class="banner__links">
            <span
              v-for="link in newMenu"
              :to="redirectUrl(link.url)"
              class="banner__link"
              @click="redirectTo(link.url)"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  const isHidden = defineModel('isBannerHidden')

  const props = defineProps({
    bottomMenu: Array,
  })

  const newMenu = Array.from([
    props.bottomMenu[0],
    props.bottomMenu[1],
    props.bottomMenu[2],
    props.bottomMenu[3],
  ])
    .filter((item) => item?.url)
    .sort((a, b) => (a?.position || 0) - (b?.position || 0))

  const isActive = ref(false)

  onMounted(() => {
    setTimeout(() => {
      isActive.value = true
    }, 100)
  })

  watch(
    () => isActive.value,
    (value) => {
      if (!value) {
        setTimeout(() => {
          isHidden.value = true
        }, 300)
      }
    },
  )
</script>

<style lang="scss" scoped>
  .banner {
    position: relative;
    overflow: hidden;
    padding-top: 10px;
    margin-top: -10px;
    transition: 0.3s;
    transition-property: visibility, opacity, transform;
    z-index: 10;
    &:not(.active) {
      opacity: 0;
      visibility: hidden;
      transform: translateY(100%);
    }
    &__wrapper {
      display: flex;
      justify-content: center;
      max-width: 100vw;
      width: 100%;
      overflow: hidden;
      background: var(--body-bg-alt);
    }
    &__video {
      position: relative;
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      width: 100%;
      pointer-events: auto;
      z-index: 2;
      // max-height: 5.077vw;
      // @include media-breakpoint-down(sm) {
      // max-height: 25.6407vw;
      // }

      .bv-desktop {
        display: block;
      }
      .bv-mobile {
        display: none;
      }
      video {
        display: block;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      @include media-breakpoint-down(lg) {
        width: 135%;
      }
      @include media-breakpoint-down(sm) {
        width: 100%;
        .bv-desktop {
          display: none;
        }
        .bv-mobile {
          display: block;
        }
      }
    }
    &__links {
      position: absolute;
      margin: auto;
      display: grid;
      // grid-template-columns: 11.23% 18.75% 19.22% 20.85% 15.15% 11.23%;
      grid-template-columns: repeat(4, 1fr);
      gap: 3%;
      width: 70%;
      height: 100%;
      z-index: 2;
      span {
        height: 100%;
        transition: all 0.2s;
        cursor: pointer;
        // background: #f55a;
        &:hover {
          background: #ffcc0033;
          box-shadow: 0 0 15px 10px #ffcc0033;
        }
      }
      @include media-breakpoint-down(sm) {
        grid-template-columns: repeat(2, 1fr);
        gap: 2px;
        width: 100%;
        // span:nth-child(1) {
        //   order: 1;
        // }
        // span:nth-child(2) {
        //   order: 3;
        // }
        // span:nth-child(3) {
        //   order: 5;
        // }
        // span:nth-child(4) {
        //   order: 2;
        // }
        // span:nth-child(5) {
        //   order: 4;
        // }
        // span:nth-child(6) {
        //   order: 6;
        // }
      }
    }

    &__close {
      position: absolute;
      top: 0;
      right: 20px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: 2px solid #7774;
      border-radius: 50%;
      background: var(--body-bg-alt);
      color: #777;
      pointer-events: auto;
      transition:
        transform 0.3s,
        opacity 0.3s;
      z-index: 3;
      &.active {
        transition-delay: 1s;
      }
      &:not(.active) {
        transform: translateX(100%);
        opacity: 0;
      }
      .icon {
        transition: 0.2s;
        transform: scale(0.7);
      }
    }
  }
</style>
