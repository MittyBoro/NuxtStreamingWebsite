<template>
  <div class="field">
    <div class="field__title" v-if="title">{{ title }}</div>
    <textarea
      class="field__input field__textarea"
      @input="input"
      rows="5"
      v-model="model"
      ref="textareaRef"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script setup>
  const { title, placeholder } = defineProps({
    title: String,
    placeholder: String,
  })

  const textareaRef = ref(null)

  const input = (e) => {
    resizeTextarea()
  }

  const model = defineModel()

  const resizeTextarea = () => {
    const textarea = textareaRef.value
    textarea.style.height = '110px'
    textarea.style.height = `${textarea.scrollHeight + 2}px`
  }
</script>

<style lang="scss" scoped></style>
