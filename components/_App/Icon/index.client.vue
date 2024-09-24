<template>
  <span class="icon">
    <LazyIconCSS v-if="css" :name="name" />
    <LazyIcon v-else :name="name" />
  </span>
</template>

<script setup>
  const { name, css } = defineProps({
    name: {
      type: String,
    },
    css: {
      type: Boolean,
      default: true,
    },
  })
</script>
