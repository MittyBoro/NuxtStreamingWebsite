<template>
  <div class="information blackhole">
    <div class="information-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .information {
    margin-top: var(--space-md);
  }
  .information-content {
    position: relative;
    padding: 1.25rem 2rem;
    margin-left: auto;
    margin-right: auto;
    max-width: 40rem;
    background: var(--body-bg-alt);
    font-size: var(--text-sm);
    font-weight: 600;
    border-radius: 1.5rem 0;
    text-align: center;
    // border: 2px solid var(--primary);
    p {
      margin-bottom: 0.75rem;
    }
  }
</style>
