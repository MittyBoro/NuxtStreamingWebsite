<template>
  <div class="wrapper">
    <!-- <AppPreloader /> -->

    <!--  -->
    <AppNotify />

    <!--  -->
    <AppHeader />

    <!-- !!! -->
    <LazyPageInformationList />

    <!--  -->
    <main class="main">
      <slot></slot>
    </main>

    <!--  -->
    <AppFooter />

    <!--  -->
    <LazyAppModalList v-if="wokeUp" />

    <!--  -->
    <LazyAppBottom />

    <!--  -->
    <AppBottomCode />
  </div>
</template>

<script setup>
  const wokeUp = useWokeUp()
</script>

<style lang="scss" scoped>
  .main {
    position: relative;
    padding: var(--space-md) 0 var(--space-xl);
    @include media-breakpoint-down(md) {
      padding-bottom: var(--space-lg);
    }
  }
</style>

<style lang="scss">
  .col-navigation {
    display: flex;
    gap: 20px;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    a {
      transition-property: color, border;
      text-decoration: 0.25s;
    }
  }
</style>
