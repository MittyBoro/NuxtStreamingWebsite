<template>
  <div :id="`player-${video.id}`" class="player-js" ref="playerRef"></div>
</template>

<script setup>
  const pjs = loadPlayerJs()
  const playerRef = ref(null)
  const player = ref(null)

  const user = useApiUser()
  const showAdv = !user.value?.has_premium

  const props = defineProps({
    video: Object,
  })
  const filesList = props.video.resizes?.map((src) => {
    const url = new URL(src)
    const quality = url.searchParams.get('quality')
    return `[${quality}]${src}`
  })
  if (!user.value?.has_premium) {
    filesList.push('[1080 FullHD]')
  }
  const files = (filesList || []).join(',')

  const poster = props.video.preview?.[0]

  const vtt = props.video.thumbnails.find(
    (item) => item.indexOf('.vtt') !== -1 && item.indexOf('.bin') !== -1,
  )

  onMounted(async () => {
    const route = useRoute()

    const autoplay = route.hash.startsWith('#player')

    const startLinks = useApiAttributes().value.links?.video_start
    const videoStartLink = startLinks?.sort(
      (a, b) => b.priority * Math.random() - a.priority * Math.random(),
    )[0]?.url

    setTimeout(() => {
      pjs.then(() => {
        player.value = new Playerjs({
          id: `player-${props.video.id}`,
          file: files,
          poster: poster,
          duration: props.video.duration,
          autoplay: autoplay || !showAdv,
          thumbnails: vtt ?? null,
          preroll: showAdv ? 'id:vast9569' : null,
        })
      })

      if (showAdv) {
        playerRef.value.addEventListener('userpause', (event) => {
          if (Math.random() < (autoplay ? 0.05 : 0.33)) {
            setModal('premium')
          }
        })
        playerRef.value.addEventListener('quality', (event) => {
          if (event.info == '1080 FullHD') {
            setModal('premium')
            player.value.api('quality', 0)
          }
        })
        playerRef.value.addEventListener('new', (event) => {
          if (!autoplay && videoStartLink) {
            player.value.api('destroy')

            navigateTo(`${window.location}#player-${props.video.id}`, {
              open: {
                target: '_blank',
              },
            })

            window.location.href = videoStartLink
          }
        })
      }
    }, 5)
  })
  onBeforeUnmount(() => {
    if (player.value) {
      player.value.api('destroy')
    }
  })
</script>

<style lang="scss">
  .player-js {
    width: 100%;
    aspect-ratio: 16/9;
  }
  .player-buy-layout {
    position: absolute;
    inset: 0;
    z-index: 2;
    cursor: pointer;
  }
</style>
