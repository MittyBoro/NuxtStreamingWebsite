<template>
  <component
    :is="button ? 'button' : 'span'"
    class="button preloading"
    :disabled="loading"
    :class="{ loading }"
  >
    <slot></slot>
  </component>
</template>

<script setup>
  const { button, loading } = defineProps({
    button: Boolean,
    loading: Boolean,
  })
</script>

<style lang="scss" scoped></style>
