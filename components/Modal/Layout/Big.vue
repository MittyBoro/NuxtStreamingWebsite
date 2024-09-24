<template>
  <ModalLayoutMain>
    <div class="container modal__premium-container">
      <div class="modal__content modal__premium card">
        <AppIcon
          name="i-mdi-close"
          class="modal__close"
          @click.passive="closeModal()"
        />

        <div class="modal__premium-left">
          <Image
            class="modal__premium-logo"
            src="/images/logo-dark.svg"
            alt=""
          />
          <div
            class="modal__premium-info"
            v-for="(info, index) in bzInfo"
            :key="index"
            v-show="currentIndex === index"
          >
            <div class="modal__premium-text">{{ info.top }}</div>
            <div class="modal__premium-int button">{{ info.middle }}</div>
            <div class="modal__premium-text">{{ info.bottom }}</div>
          </div>
          <div class="modal__premium-footer">
            <NuxtLink to="/">Какой-то тайтл</NuxtLink>
          </div>
        </div>

        <div class="modal__inner modal__premium-inner">
          <slot></slot>
        </div>
      </div>
    </div>
  </ModalLayoutMain>
</template>

<script setup>
  const apiAttributes = useApiAttributes()

  const bzInfo = reactive([
    {
      top: 'Уже более',
      middle: parseInt(apiAttributes.value.counts.users / 10) * 10,
      bottom: 'пользователей',
    },
    {
      top: 'Уже более',
      middle: parseInt(apiAttributes.value.counts.videos / 10) * 10,
      bottom: 'видео',
    },
    {
      top: 'Уже более',
      middle: apiAttributes.value.counts.photos || 1000,
      bottom: 'фотографий',
    },
  ])

  const currentIndex = ref(0)

  onMounted(() => {
    setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % bzInfo.length
    }, 5000)
  })
</script>

<style lang="scss" scoped>
  .modal {
    @include media-breakpoint-up(xl) {
      padding: 120px 0;
    }
    ::selection {
      background: var(--black);
      color: var(--white);
    }
  }
  .modal__content {
    display: grid;
    grid-template-columns: 477px 1fr;
    min-height: 706px;
    background: var(--primary);
    @include media-breakpoint-down(xl) {
      grid-template-columns: 1fr;
      min-height: auto;
      .modal__premium-left {
        display: none;
      }
    }
  }
  .modal__premium {
    padding: 20px 0;
    overflow: visible;
    border-radius: 60px 0 30px 60px;
    max-width: 1260px;
    width: 100%;
    color: var(--black);
    @include media-breakpoint-down(xl) {
      border-radius: 1rem 0;
      .modal__inner {
        padding: var(--space-md);
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: -112px;
      left: -81px;
      width: 598px;
      aspect-ratio: 598/908;
      background: url(~/assets/images/modal_black.png);
      background-size: contain;
      pointer-events: none;
      @include media-breakpoint-down(xl) {
        display: none;
      }
    }
    &-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
    }
    &-left {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      padding: 40px 0 0;
    }
    &-logo {
      max-width: 240px;
      margin-bottom: 40px;
    }
    &-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin: auto;
      font-weight: 600;
      filter: drop-shadow(0 0 30px #161616);
      user-select: none;
    }
    &-text {
      font-size: 1.4rem;
      position: relative;
      z-index: 2;
    }
    &-int {
      margin: 12px 0;
      font-size: 35px;
      height: 80px;
      max-width: 200px;
      pointer-events: none;
      font-family: 'Unbounded';
      font-weight: 900;
      padding-top: 4px;
      line-height: 1;
      background: url(~/assets/images/bg_gold.png);
      background-size: cover;
      min-width: 200px;
      box-shadow: 0px 0px 67.94px 11.06px rgba(255, 162, 0, 0.79);
    }
    &-footer {
      font-size: var(--text-sm);
      padding: 30px 0 0;
    }
    &-inner {
      padding-left: var(--space-lg);
      padding-right: var(--space-lg);
    }
    .modal__logo {
      display: none;
      @include media-breakpoint-down(xl) {
        display: flex;
        width: 180px;
        margin-bottom: var(--space-md);
      }
    }
  }
  .modal__bottom {
    justify-content: center;
  }
  .modal__reg-image {
    position: relative;
    img {
      position: absolute;
      inset: 0;
    }
  }
  .modal-left-info {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    padding: 70px 30px 40px;
    text-align: center;
  }
  .modal__title-wrap {
    margin: 0 auto var(--space-sm);
  }
  .ml {
    &__int {
      font-size: var(--text-md);
      font-weight: 600;
      color: var(--primary);
      margin-bottom: var(--space-xs);
    }
    &__text {
      font-size: var(--text-sm);
      color: var(--white);
    }
  }
  :deep(.modal__title) {
    font-size: var(--text-lg);
    font-size: 35px;
    margin-top: -20px;
  }
  :deep(.link) {
    &:hover {
      color: #fff;
    }
  }
</style>
