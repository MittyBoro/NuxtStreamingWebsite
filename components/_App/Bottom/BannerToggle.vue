<template>
  <div class="container banner__container">
    <div
      class="banner__circle active transition-all duration-alt"
      @click="isHidden = !isHidden"
      :style="{ opacity: isHidden ? 1 : 0 }"
      :class="{ paused: paused }"
    ></div>
  </div>
</template>

<script setup>
  const isHidden = defineModel('isBannerHidden')

  const paused = ref(true)

  watch(
    () => isHidden.value,
    (value) => {
      setTimeout(() => {
        paused.value = !value
      }, 300)
    },
  )

  setTimeout(() => {
    paused.value = false
  }, 1000)
</script>

<style lang="scss" scoped>
  .banner {
    &__container {
      position: relative;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      font-size: 40px;
      @include media-breakpoint-down(md) {
        display: none;
      }
    }
    &__circle {
      position: absolute;
      bottom: 0;
      margin-bottom: 15px;
      &.paused {
        animation-play-state: paused;
      }
    }
  }
</style>
