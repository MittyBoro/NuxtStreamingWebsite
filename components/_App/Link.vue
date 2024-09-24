<template>
  <component :is="!!check ? NuxtLink : 'span'" :to="check ? to : undefined">
    <slot></slot>
  </component>
</template>

<script setup>
  import { NuxtLink } from '#components'

  const props = defineProps({
    check: String,
    to: String,
  })
</script>
