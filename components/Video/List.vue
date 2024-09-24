<template>
  <div class="video-list">
    <LazyAppEmpty v-if="!list?.length" />
    <template v-for="(item, i) in list" :key="item.id">
      <VideoCard
        v-model:currentTouch="currentTouch"
        :item="item"
        :index="i"
        :enableH3="enableH3"
      />
    </template>
    <LazyAppPagination v-if="meta" :meta="meta" :loadNextPage="loadNextPage" />
  </div>
</template>

<script setup>
  const currentTouch = ref(null)

  defineProps({
    list: Array,
    meta: Object,
    pending: Boolean,
    loadNextPage: Function,
    enableH3: Boolean,
  })
</script>

<style lang="scss" scoped>
  .video-list {
    display: grid;
    gap: var(--space-md) var(--space-base);
    grid-template-columns: repeat(3, 1fr);
    @include media-breakpoint-down(xl) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include media-breakpoint-down(md) {
      grid-template-columns: 1fr;
      gap: var(--space-base);
    }
  }
</style>
