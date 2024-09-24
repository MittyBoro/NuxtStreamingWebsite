<template>
  <div>
    <div class="player">
      <Image
        v-if="video.preview?.['original.webp']"
        :src="video.preview['original.webp']"
        class="object-cover player-preview"
        :title="video.title"
        loading="eager"
      />
      <!-- sizes="2xl:1111px xl:854px sm:710px 412px" -->
      <div v-if="!allowShow" class="buy-premium-layout">
        <video
          v-if="video.trailer"
          muted
          loop
          preload="none"
          playsinline
          autoplay
        >
          <source :src="video.trailer" type="video/mp4" />
        </video>
        <div class="buy-premium-layout-content">
          <p>Это видео доступно только для пользователей с PREMIUM аккаунтом</p>
          <Button @click.passive="setModal('premium')">
            Попробовать PREMIUM
          </Button>
        </div>
      </div>
      <div v-else-if="!hasVideo" class="player-empty">
        <div>
          <div>
            Мы только загружаем видео на наш сервер
            <br />
            Пожалуйста, подождите
          </div>
          <AppIcon name="i-mdi-dots-circle" class="icon animation-round" />
        </div>
      </div>
      <ClientOnly v-else>
        <VideoPlayerJs :video="video" />
      </ClientOnly>
    </div>

    <AppExternalVideo v-if="!user?.has_premium" name="banner_under_video">
      <template #fallback>
        <div class="card__inner card__inner-premium">
          <div class="preloading">
            Смотри больше контента в высоком качестве с PREMIUM аккаунтом
          </div>
          <Button class="button-alt-mini" @click.passive="setModal('premium')">
            Попробовать PREMIUM
          </Button>
        </div>
      </template>
    </AppExternalVideo>
  </div>
</template>

<script setup>
  const user = useApiUser()

  const props = defineProps({
    video: Object,
  })

  const allowShow = computed(
    () => user.value?.has_premium || !props.video.is_premium,
  )
  const hasVideo = computed(() => props.video.resizes?.length)
</script>

<style lang="scss" scoped>
  .player {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #070707;
    width: 100%;
    aspect-ratio: 16/9;
    color: #fff;
    overflow: hidden;
    .player-preview {
      position: absolute;
      opacity: 0.3;
      filter: blur(5px);
      transform: scale(1.05);
    }
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .player-empty {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding: var(--space-lg) var(--space-base) var(--space-base);
    text-align: center;
    font-size: var(--text-md);
    font-weight: 600;
    @include media-breakpoint-down(md) {
      font-size: var(--text-base);
    }
    .icon {
      margin-top: 10px;
      font-size: 3em;
      animation-duration: 1.8s;
      animation-timing-function: ease-in-out;
    }
  }
  .card__inner-premium {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-weight: 800;
    font-size: 15px;
    gap: 5px 10px;
    background: var(--primary);
    color: #111;
    @include media-breakpoint-down(md) {
      font-size: var(--text-sm);
      text-align: center;
      justify-content: center;
    }
  }
</style>
