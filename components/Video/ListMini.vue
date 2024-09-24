<template>
  <div class="videos-mini-list">
    <div class="videos-mini-list__title preloading" v-if="title">
      {{ title }}
    </div>
    <template v-for="item in visibleList" :key="item.id">
      <VideoCardMini :item="item" />
    </template>
    <template v-if="list.length >= shortCount">
      <div
        class="button button-alt-mini preloading"
        @click.passive="showedAll = !showedAll"
      >
        <template v-if="!showedAll">Показать ещё</template>
        <template v-else>Скрыть</template>
      </div>
    </template>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: String,
    shortCount: {
      type: Number,
      default: 4,
    },
    list: {
      type: Array,
      default: [],
    },
  })

  const { list, title, shortCount } = toRefs(props)

  const showedAll = ref(false)

  const visibleList = computed(() => {
    let videosCount = Math.min(
      list.value.length,
      showedAll.value ? list.value.length : shortCount.value,
    )
    return list.value.slice(0, videosCount)
  })
</script>

<style lang="scss" scoped>
  .videos-mini-list {
    display: grid;
    gap: var(--space-base);
    &__title {
      font-weight: 600;
    }
  }
</style>
