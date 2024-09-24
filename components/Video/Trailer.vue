<template>
  <video muted loop preload="none" playsinline ref="videoRef">
    <source :src="props.src" type="video/mp4" />
  </video>
</template>

<script setup>
  const props = defineProps({
    src: String,
    hovered: Boolean,
    duration: [String],
  })

  const videoRef = ref(null)

  onMounted(() => {
    watch(
      () => props.hovered,
      () => {
        if (!videoRef.value) {
          return
        }

        if (props.hovered) {
          videoRef.value.preload = 'auto'
          setTimeout(
            () => {
              videoRef.value?.play()
            },
            parseFloat(props.duration) * 1000,
          )
        } else {
          setTimeout(() => {
            if (videoRef.value) {
              videoRef.value.pause()
              videoRef.value.currentTime = 0
            }
          }, 400)
        }
      },
      {
        immediate: true,
      },
    )
  })
</script>

<style lang="scss" scoped>
  video {
    pointer-events: none;
  }
</style>
