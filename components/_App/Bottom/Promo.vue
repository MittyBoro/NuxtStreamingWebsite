<template>
  <div
    class="banner__promo"
    v-if="showPromo"
    @click.passive="setModal('premium')"
  >
    <div class="container">
      <div class="promo-text">
        <div
          class="prose"
          :style="{ animationDuration: promoSpeed }"
          v-html="promotions.text"
        ></div>
      </div>
      <div class="banner__promo-countdown">
        <div class="banner__promo-countdown-item">{{ countdown.days }}</div>
        <div class="banner__promo-countdown-item">{{ countdown.hours }}</div>
        <div class="banner__promo-countdown-item">
          {{ countdown.minutes }}
        </div>
        <div class="banner__promo-countdown-item">
          {{ countdown.seconds }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const promoSpeed = ref(0)
  // promo
  const promotions = useApiAttributes().value.promotions

  promoSpeed.value = String(promotions?.text).length * 0.09 + 's'

  const countdown = reactive({})

  const showPromo = computed(() => {
    if (!promotions || !promotions.to) return false
    const to = new Date(promotions.to)
    if (new Date() > to) return false
    return true
  })

  const setCountdown = () => {
    if (!showPromo.value) return
    const now = new Date()
    const diff = new Date(promotions.to) - now
    if (diff < 0) {
      countdown.days = '00'
      countdown.hours = '00'
      countdown.minutes = '00'
      countdown.seconds = '00'
      return
    }
    countdown.days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
      2,
      '0',
    )
    countdown.hours = String(
      Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    ).padStart(2, '0')
    countdown.minutes = String(
      Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    ).padStart(2, '0')
    countdown.seconds = String(
      Math.floor((diff % (1000 * 60)) / 1000),
    ).padStart(2, '0')
    setTimeout(setCountdown, 1000)
  }

  onMounted(() => {
    setCountdown()
  })
</script>

<style lang="scss" scoped>
  .banner {
    &__promo {
      position: relative;
      z-index: 15;
      padding: 0.4rem 0;
      background: var(--primary);
      width: 100%;
      animation: blinkBG 1s infinite;
      overflow: hidden;
      pointer-events: all;
      cursor: pointer;
      @include media-breakpoint-down(sm) {
        padding: 0.2rem 0;
      }
      .promo-text {
        display: flex;
        overflow: hidden;
        @include media-breakpoint-down(sm) {
          --mask-start: transparent;
          --mask-end: transparent;
          margin: 0 -15px;
          mask-image: linear-gradient(
            to right,
            var(--mask-start) 0,
            #000 15px,
            #000 calc(100% - 15px),
            var(--mask-end) 100%
          );
        }
      }
      .prose {
        font-size: 14px;
        line-height: 1.3;
        font-weight: 600;

        @include media-breakpoint-down(sm) {
          font-size: 11px;
          line-height: 1.2;

          animation: text 1s infinite linear;
          padding-left: 100%;
          white-space: nowrap;
          @keyframes text {
            0% {
              transform: translate(0, 0);
            }

            100% {
              transform: translate(-100%, 0);
            }
          }
        }
      }
      &-countdown {
        display: flex;
        font-weight: 800;
        width: 6.5em;
        flex-shrink: 0;
        &-item {
          &::after {
            content: ':';
          }
          &:last-child {
            &::after {
              content: '';
            }
          }
        }
      }
      .container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        justify-content: center;
        gap: 1rem;
        color: #000;
        width: 100%;
      }
    }
  }
  @keyframes blinkBG {
    0% {
      background: #fff;
    }
    50% {
      background: var(--primary);
    }
    100% {
      background: #fff;
    }
  }
</style>
