<template>
  <template v-if="originalSrc">
    <picture
      v-if="original && (src['2x.jpeg'] || src['original.jpeg'])"
      v-bind="attrs"
    >
      <source
        :srcset="`${src['2x.webp'] || originalSrc} 2x, ${src['1x.webp']} 1x`"
        type="image/webp"
      />
      <source
        :srcset="`${src['2x.jpeg'] || originalSrc} 2x, ${src['1x.jpeg']} 1x`"
        type="image/jpeg"
      />
      <img
        :src="originalSrc"
        :alt="alt"
        :title="title"
        :loading="!disableLazy ? undefined : 'eager'"
      />
    </picture>
    <NuxtPicture
      v-else
      format="webp,jpg"
      :src="originalSrc"
      :class="attrs.class"
      :sizes="attrs.sizes"
      :preload="disableLazy"
      :imgAttrs="{
        alt: alt,
        title: title,
        loading: !disableLazy ? 'lazy' : undefined,
        width: attrs.width,
        height: attrs.height,
      }"
    />
  </template>
</template>

<script setup>
  const props = defineProps({
    src: Object,
    original: Boolean,
    title: String,
    disableLazy: Boolean,
  })

  defineOptions({
    inheritAttrs: false,
  })

  const title = props.title ? 'Изображение ' + props.title : ''
  const alt = props.title ? 'Фото ' + props.title : ''

  const originalSrc = computed(() => {
    if (props.src) {
      return (
        props.src['original.jpeg'] ||
        props.src['2x.jpeg'] ||
        props.src['1x.jpeg'] ||
        props.src[0]
      )
    }
  })

  const attrs = useAttrs()
</script>
