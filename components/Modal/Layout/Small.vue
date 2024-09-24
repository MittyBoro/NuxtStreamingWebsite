<template>
  <ModalLayoutMain>
    <div class="modal__content card">
      <AppIcon
        name="i-mdi-close"
        class="modal__close link"
        @click.passive="closeModal()"
      />
      <div class="modal__inner">
        <slot></slot>
      </div>
    </div>
  </ModalLayoutMain>
</template>

<script setup></script>

<style lang="scss">
  .modal__content {
    max-width: 480px;
  }
</style>
