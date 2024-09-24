<template>
  <Transition>
    <div class="header__dropdown blackhole">
      <div class="container">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup></script>

<style lang="scss" scoped>
  .header__dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    margin-top: 1px;
    padding: 2.5rem 0 3rem;
    background: var(--body-bg-alt);
    z-index: 2;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 200ms;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
