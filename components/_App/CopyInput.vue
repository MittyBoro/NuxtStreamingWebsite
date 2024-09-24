<template>
  <div class="copy-input-row">
    <LazyFieldInput class="input" readonly v-model="props.link" />
    <Button class="button-alt" @click.passive="shareOnCopy">
      <small>{{ copyText }}</small>
    </Button>
  </div>
</template>

<script setup>
  const props = defineProps({
    link: String,
  })
  const copyText = ref('Скопировать')

  const shareOnCopy = () => {
    copyWithNotify(props.link)
    copyText.value = 'Скопировано'
    setTimeout(() => (copyText.value = 'Скопировать'), 2000)
  }
</script>

<style lang="scss" scoped>
  .copy-input-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    max-width: 600px;
  }
  .input {
    flex-grow: 1;
  }
</style>
