<template>
  <div class="preloader" :class="{ loaded: isLoaded }">
    <NuxtLink to="/" class="preloader__logo">
      <span class="preloader__logo-side">BRA</span>
      <span class="preloader__logo-middle">
        <span class="preloader__logo-zz">ZZ</span>
        <span class="preloader__logo-play">
          <Icon name="i-mdi-play" class="icon" />
        </span>
      </span>
      <span class="preloader__logo-side">RUS</span>
    </NuxtLink>
    <div class="preloader__title">Загрузка...</div>
    <div class="preloader__progress"></div>
  </div>
</template>

<script setup>
  const router = useRouter()

  const isLoaded = ref(false)

  onMounted(() => {
    isLoaded.value = true
    setTimeout(() => {
      if (router.currentRoute.value.hash) {
        navigateTo({ hash: router.currentRoute.value.hash })
      }
    }, 500)
  })
</script>

<style lang="scss" scoped>
  .preloader {
    --animation-duration: 2s;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    inset: 0;
    z-index: 9999999;
    background: var(--body-bg);
    transition-property: opacity, visibility;
    transition-duration: 0.1s;
    &.loaded {
      opacity: 0;
      visibility: hidden;
    }
    &__logo {
      display: flex;
      font-size: var(--text-xl);
      font-weight: 800;
      color: inherit;
      &-middle {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0.3em;
        animation: round3d var(--animation-duration) infinite linear;
        color: var(--primary);
      }
      &-zz {
        animation: flipSides var(--animation-duration) infinite linear;
        transform: scale(1.3);
      }
      &-play {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        animation: flipSides var(--animation-duration) infinite linear;
        animation-delay: calc(var(--animation-duration) / -2);
        transform: rotateY(180deg) scale(2);
      }
    }
    &__title {
      margin: var(--space-base) 0;
      font-weight: 600;
      font-size: var(--text-sm);
    }
    &__progress {
      width: 5rem;
      height: 0.25rem;
      background: var(--primary);
      animation: progress var(--animation-duration) infinite;
    }
  }

  @keyframes progress {
    0% {
      transform: translateX(-10rem) scaleX(0);
    }
    50% {
      transform: translateX(0) scaleX(1);
    }
    100% {
      transform: translateX(10rem) scaleX(0);
    }
  }

  @keyframes flipZZ {
    0%,
    24.9%,
    75.1%,
    100% {
      transform: none;
    }
    25%,
    75% {
      transform: rotate(180deg);
    }
  }
  @keyframes flipSides {
    0%,
    24.9%,
    75.1%,
    100% {
      opacity: 1;
    }
    25%,
    75% {
      opacity: 0;
    }
  }
  @keyframes round3d {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
</style>
