<template>
  <div class="category-list__mini">
    <template v-for="(item, i) in list" :key="item.id">
      <NuxtLink :to="`/categories/${item.slug}`" :title="item.title">
        <AppIcon name="material-symbols:label-important-outline-rounded" css />
        <span>{{ item.title }}</span>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup>
  const props = defineProps({
    list: Array,
  })
</script>

<style lang="scss" scoped>
  .category-list__mini {
    display: grid;
    gap: var(--space-xs) var(--space-md);
    grid-template-columns: repeat(6, 1fr);
    font-size: 15px;

    @include media-breakpoint-down(xxl) {
      grid-template-columns: repeat(5, 1fr);
    }
    @include media-breakpoint-down(xl) {
      grid-template-columns: repeat(4, 1fr);
    }
    @include media-breakpoint-down(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
    @include media-breakpoint-down(md) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include media-breakpoint-down(sm) {
      grid-template-columns: repeat(1, 1fr);
    }
    a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        vertical-align: middle;
        &:first-child {
          margin-right: 5px;
          opacity: 0.5;
        }
      }
    }
  }
</style>
