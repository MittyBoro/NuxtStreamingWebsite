<template>
  <div class="field" :class="attrs.class">
    <div class="field__title" v-if="title">{{ title }}</div>
    <div class="field__password">
      <input
        :type="isPass ? 'password' : 'text'"
        class="field__input"
        v-bind="attrs"
        v-model="model"
        minlength="6"
      />
      <div class="field__password-icon" @click.passive="isPass = !isPass">
        <AppIcon v-if="isPass" name="i-mdi-eye-off" />
        <AppIcon v-else name="i-mdi-eye" />
      </div>
    </div>
  </div>
</template>

<script setup>
  defineOptions({
    inheritAttrs: false,
  })
  const { title } = defineProps({
    title: String,
  })

  const model = defineModel()

  const attrs = useAttrs()

  const isPass = ref(true)
</script>

<style lang="scss" scoped></style>
