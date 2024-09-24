<template>
  <div
    v-if="!isPremium"
    class="button button-mini button-animated"
    :class="{ 'button-alt': !isPremium }"
    @click.passive="navigateTo({ query: { o: 'premium' } })"
  >
    <AppIconPremium animated class="preloading" />
    <span class="preloading">Premium</span>
  </div>
</template>

<script setup>
  const route = useRoute()
  const isPremium = computed(() => route.query.o == 'premium')
</script>

<style lang="scss" scoped>
  .button {
    @include media-breakpoint-down(md) {
      visibility: hidden !important;
      opacity: 0 !important;
      position: absolute;
      left: -9999px;
    }
  }
</style>
