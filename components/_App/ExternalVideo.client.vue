<template>
  <div
    v-if="showBanner && banner?.url && banner?.files?.length"
    class="card__e-video"
    @click="redirectTo(banner.url)"
  >
    <video muted loop preload="none" playsinline autoplay>
      <source :src="videoSrc" type="video/mp4" />
    </video>
  </div>
  <slot v-else name="fallback"></slot>
</template>

<script setup>
  const props = defineProps({
    name: String,
  })

  const user = useApiUser()
  const isDesktop = useIsDesktop()

  const bannersUnderVideo = useApiAttributes().value.links[props.name]?.sort(
    (a, b) => b.priority * Math.random() - a.priority * Math.random(),
  )

  const banner = bannersUnderVideo?.[0]

  const videoSrc = computed(() => {
    if (!banner?.files?.length) {
      return null
    }
    if (!banner.files[1]) {
      return banner.files[0]
    }
    if (isDesktop.value) {
      return banner.files[0]
    } else {
      return banner.files[1]
    }
  })

  const pagesViewed = useLocalStorage('pagesViewed', 0)

  const wokeUp = useWokeUp()

  const showBanner = computed(
    () => !user.value?.has_premium && pagesViewed.value > 2 && wokeUp.value,
  )
</script>

<style lang="scss" scoped>
  .card__e-video {
    cursor: pointer;
    video {
      width: 100%;
    }
  }
</style>
