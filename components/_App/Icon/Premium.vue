<template>
  <AppIcon
    name="ic:baseline-diamond"
    class="icon-diamond"
    :class="{ 'animation-blink': animated, colored: colored }"
  />
</template>

<script setup>
  const props = defineProps({
    animated: {
      type: Boolean,
      default: false,
    },
    colored: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style lang="scss" scoped>
  .icon-diamond {
    animation-duration: 1s;
    &.colored {
      color: var(--primary);
    }
  }
</style>
