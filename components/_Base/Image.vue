<template>
  <img v-bind="attrs" ref="imageRef" :loading="attrs.loading || 'lazy'" />
</template>

<script setup>
  defineOptions({
    inheritAttrs: false,
  })

  const { disableHead } = defineProps({
    disableHead: Boolean,
  })

  const attrs = useAttrs()

  if (attrs.loading === 'eager' && !disableHead) {
    useHead({
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: attrs.src,
        },
      ],
    })
  }
</script>
