<template>
  <ModalLayoutBig>
    <div class="modal__premium-content">
      <div class="modal__title">Оформить</div>
      <Image src="/images/premium.png" class="modal__premium-image" />

      <div class="modal__premium-features">
        <div class="modal__premium-features-item">
          <div class="modal__premium-features-circle">
            <Image src="/images/mi-1.png" />
          </div>
          <div class="modal__premium-features-text">
            Полное отсутствие рекламы
          </div>
        </div>
        <div class="modal__premium-features-item">
          <div class="modal__premium-features-circle">
            <Image src="/images/mi-2.png" />
          </div>
          <div class="modal__premium-features-text">
            Доступ ко всем PREMIUM видео
          </div>
        </div>
        <div class="modal__premium-features-item">
          <div class="modal__premium-features-circle">
            <Image src="/images/mi-3.png" />
          </div>
          <div class="modal__premium-features-text">
            Доступ к 4K UltraHD видео
          </div>
        </div>
        <div class="modal__premium-features-item">
          <div class="modal__premium-features-circle">
            <Image src="/images/mi-4.png" />
          </div>
          <div class="modal__premium-features-text">
            Заказ озвучки на любимый ролик
          </div>
        </div>
        <div class="modal__premium-features-item">
          <div class="modal__premium-features-circle">
            <Image src="/images/mi-5.png" />
          </div>
          <div class="modal__premium-features-text">
            Русские
            <br />
            субтитры
          </div>
        </div>
        <div class="modal__premium-features-item">
          <div class="modal__premium-features-circle">
            <Image src="/images/mi-6.png" />
          </div>
          <div class="modal__premium-features-text">Возможность заработать</div>
        </div>
      </div>
      <div class="modal__premium-buttons">
        <div
          class="button button-alt modal__premium-button-dark"
          @click.passive="setModal('registration')"
        >
          Попробовать премиум
        </div>
        <div
          class="button button-alt modal__premium-button"
          @click.passive="setModal('registration')"
        >
          Регистрация
        </div>
      </div>
    </div>
  </ModalLayoutBig>
</template>

<script setup></script>

<style lang="scss" scoped>
  .modal__premium {
    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      @include media-breakpoint-down(xl) {
        height: auto;
      }
    }
    &-image {
      margin: var(--space-xs) 0 var(--space-lg);
      max-width: 330px;
      animation: pulse-mini 0.7s infinite;
      @include media-breakpoint-down(xl) {
        margin: 0 0 var(--space-md);
        max-width: 200px;
      }
    }
    &-features {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-base) 5%;
      text-align: center;
      margin-bottom: var(--space-sm);
      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 28%;
        @include media-breakpoint-down(md) {
          width: 47%;
        }
      }
      &-circle {
        pointer-events: none;
        @include media-breakpoint-down(md) {
          width: 5rem;
        }
      }
      &-text {
        margin-top: var(--space-xs);
        font-size: 0.9rem;
        font-weight: 800;
        max-width: 200px;
      }
    }
    &-buttons {
      display: flex;
      gap: var(--space-sm);
      margin-top: auto;
      @include media-breakpoint-down(xl) {
        padding-top: var(--space-base);
      }
      @include media-breakpoint-down(md) {
        display: grid;
      }
    }
  }
  .button-alt {
    background: #000;
    color: #fff;
    &:hover {
      color: var(--primary) !important;
    }
  }
  .modal__premium-button-dark {
    background-image: url('~/assets/images/bg_dark_gold.png');
    background-size: cover;
  }
  @keyframes pulse-mini {
    0%,
    100% {
      transform: scale(1);
    }
    65% {
      transform: scale(1.01);
    }
  }
</style>
