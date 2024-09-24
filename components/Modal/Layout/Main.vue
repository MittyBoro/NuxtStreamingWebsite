<template>
  <div class="modal" ref="modalRef">
    <div
      class="modal__overlay"
      ref="modalOverlayRef"
      @click.passive="closeModal"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup>
  const modalRef = ref(null)
  const modalOverlayRef = ref(null)

  const setOverlayHeight = () => {
    modalOverlayRef.value.style.height = `${modalRef.value.scrollHeight}px`
  }
  onMounted(() => {
    useHead({
      htmlAttrs: {
        style: `overflow: hidden;`,
      },
    })
    modalRef.value.addEventListener('resize', setOverlayHeight, {
      passive: true,
    })
    modalRef.value.addEventListener('scroll', setOverlayHeight, {
      passive: true,
    })
  })
  onBeforeUnmount(() => {
    useHead({
      htmlAttrs: {
        style: null,
      },
    })
  })
</script>

<style lang="scss">
  .modal {
    position: fixed;
    inset: 0;
    display: flex;
    padding: var(--space-md) 0;
    overflow: auto;
    z-index: 99999;

    opacity: 1;
    visibility: visible;

    &__logo {
      max-width: 270px;
      margin: 0 auto;
      margin-bottom: var(--space-base);
    }
    &__title {
      margin-bottom: var(--space-sm);
      font-size: var(--text-md);
      text-align: center;
      font-weight: 600;
      @include media-breakpoint-down(md) {
        margin-top: var(--space-xs);
      }
    }
    &__subtitle {
      margin-bottom: var(--space-base);
      font-size: var(--text-base);
      font-weight: 600;
      text-align: center;
    }
    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 100%;
      margin: auto;
      background: #000;
      cursor: pointer;
      opacity: 0.8;
    }
    &__content {
      position: relative;
      background: var(--body-bg);
      margin: auto;
      transition: transform 0.2s;
      max-width: 100vw;
      box-shadow: 0 10px 30px rgba(#000, 0.05);
      .button-alt {
        overflow: hidden;
        &::before {
          position: absolute;
          inset: 0;
          content: '';
          background: #777;
          opacity: 0.05;
          mix-blend-mode: difference;
        }
      }
    }
    &__close {
      position: absolute;
      top: 0.7em;
      right: 0.7em;
      font-size: 1.3rem;
      z-index: 130;
      cursor: pointer;
      pointer-events: all;
    }
    &__inner {
      padding: var(--space-md);
    }
    &__bottom {
      display: flex;
      justify-content: space-between;
      margin-top: var(--space-xs);
      font-size: var(--text-sm);
    }
    .field__error,
    .field__success {
      text-align: center;
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 200ms;
    .modal__content {
      transition: transform 400ms;
    }
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    .modal__content {
      transform: translateY(-50px);
    }
  }
</style>
