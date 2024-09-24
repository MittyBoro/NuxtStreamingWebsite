<template>
  <div :id="id">
    <slot></slot>
  </div>
</template>

<script setup>
  import PhotoSwipeLightbox from 'photoswipe/lightbox'
  import 'photoswipe/style.css'

  const { id } = defineProps({
    id: {
      type: String,
    },
  })

  if (process.client) {
    let lightbox
    let changing = false
    onMounted(() => {
      const options = {
        gallery: '#' + id,
        children: 'a',
        pswpModule: () => import('photoswipe'),
      }
      lightbox = new PhotoSwipeLightbox(options)
      lightbox.on('change', () => {
        if (changing) return
        const pswp = lightbox.pswp
        const ds = pswp?.options?.dataSource.items

        const index = pswp.currIndex
        const element = ds[index]
        const slide = pswp.currSlide
        const data = slide?.data

        if (data && !element.started) {
          element.started = true
          const img = new Image()
          img.onload = () => {
            element.setAttribute('data-pswp-width', img.naturalWidth)
            element.setAttribute('data-pswp-height', img.naturalHeight)
            data.width = img.naturalWidth
            data.height = img.naturalHeight

            changing = true
            pswp.refreshSlideContent(index)
            changing = false
          }
          img.src = data.src
        }
      })
      lightbox.init()
    })

    onUnmounted(() => {
      if (lightbox) {
        lightbox.destroy()
        lightbox = null
      }
    })
  }
</script>
