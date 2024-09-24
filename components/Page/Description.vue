<template>
  <AppDelimiter v-if="delimiter && hasText(trimmedText)" />
  <div v-if="hasText(trimmedText)">
    <div
      v-for="item in content"
      class="card bottom-description"
      :class="{ full: full }"
      @click="toggle"
    >
      <div class="card__inner preloading">
        <div class="prose" v-html="item"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    text: String,
    delimiter: Boolean,
    onlyFull: Boolean,
  })

  const full = ref(props.onlyFull)

  const trimmedText = computed(() => {
    return props.text ? String(props.text).trim() : ''
  })
  const content = trimmedText.value.split(/(?=<h2)/)

  const toggle = () => {
    if (props.onlyFull || content.length > 1) return
    full.value = !full.value
  }

  const hasText = (text) => {
    return text.replace(/<[^>]*>/g, '').trim().length
  }
</script>

<style lang="scss" scoped></style>
