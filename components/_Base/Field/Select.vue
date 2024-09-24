<template>
  <div class="field" :class="attrs.class">
    <div class="field__title" v-if="props.title">{{ props.title }}</div>
    <select class="field__input" v-bind="attrs" v-model="model">
      <option v-for="option in options" :key="option[0]" :value="option[0]">
        {{ option[1] }}
      </option>
    </select>
  </div>
</template>

<script setup>
  defineOptions({
    inheritAttrs: false,
  })
  const props = defineProps({
    title: String,
    options: [Array, Object],
  })

  const options = ref(props.options)

  if (!Array.isArray(options.value)) {
    options.value = Object.entries(options.value)
  }

  const model = defineModel()

  const attrs = useAttrs()
</script>

<style lang="scss" scoped></style>
