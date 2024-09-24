<template>
  <div class="field" :class="attrs.class">
    <div class="field__title" v-if="title">{{ title }}</div>
    <input
      type="text"
      class="field__input"
      v-bind="attrs"
      v-model="model"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
  defineOptions({
    inheritAttrs: false,
  })
  const { title, placeholder } = defineProps({
    title: String,
    placeholder: String,
  })

  const model = defineModel()

  const attrs = useAttrs()
</script>

<style lang="scss" scoped></style>
