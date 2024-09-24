<template>
  <span class="card-lines" :class="{ 'card-lines--active': active }">
    <span class="card-lines__child card-lines__first">
      <VideoCardLinesSvg />
      <VideoCardLinesSvg />
    </span>
    <span class="card-lines__child card-lines__second">
      <VideoCardLinesSvg />
      <VideoCardLinesSvg />
    </span>
  </span>
</template>

<script setup>
  const { active, duration } = defineProps({
    active: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: String,
      default: '1.5s',
    },
  })
</script>

<style lang="scss" scoped>
  .card-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 3;
    &--active svg {
      animation: stroke v-bind(duration) linear;
    }
    &__child {
      position: absolute;
      inset: 0;
    }
    &__second {
      transform: rotate(180deg);
    }
    &__child svg {
      position: absolute;
      inset: 0;
      overflow: visible;
      stroke-width: 2;
      stroke: var(--primary);
      width: 100%;
      height: 100%;
      stroke-dasharray: 2 10;
      stroke-dashoffset: 14;
      opacity: 0;
      @include media-breakpoint-up(lg) {
        &:nth-child(1) {
          stroke: var(--primary);
          mix-blend-mode: hard-light;
          opacity: 0.7 !important;
        }
        &:nth-child(2) {
          stroke-width: 5px;
          filter: blur(6px);
        }
        // &:nth-child(2) {
        //   stroke-width: 6px;
        //   filter: blur(20px);
        // }
        // &:nth-child(3) {
        //   stroke-width: 5px;
        //   filter: blur(6px);
        // }
        // &:nth-child(4) {
        //   stroke-width: 10px;
        //   filter: blur(56px);
        // }
      }
    }
  }

  @keyframes stroke {
    30%,
    75% {
      opacity: 1;
    }

    100% {
      // stroke-dashoffset: 10.7;
      stroke-dashoffset: 9;
      opacity: 0;
    }
  }
</style>
