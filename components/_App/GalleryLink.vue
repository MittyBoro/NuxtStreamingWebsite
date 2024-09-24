<template>
  <NuxtLink
    target="_blank"
    :to="item['original.jpeg'] || item[0] || item"
    :data-pswp-width="1"
    :data-pswp-height="1"
    rel="noreferrer"
    class="card card-hovering card-content__screenshot-item"
  >
    <span class="card__image">
      <AdaptiveImage :src="item" class="object-cover" :title="title" />
    </span>
  </NuxtLink>
</template>

<script setup>
  defineProps({
    item: Object,
    title: String,
  })
</script>

<style lang="scss" scoped></style>
