<template>
  <div class="title-row">
    <div class="title-row__head preloading">
      <slot name="title"></slot>
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .title-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;

    margin-bottom: var(--space-base);
    &__head {
      display: flex;
      align-items: center;
      margin-right: auto;
      max-width: 960px;

      font-size: var(--text-md);
      @include media-breakpoint-down(md) {
        margin: 0;
        font-size: var(--text-base);
        width: 100%;
      }
    }
    @include media-breakpoint-down(lg) {
      justify-content: space-between;
      gap: 1rem;
    }
  }
</style>
