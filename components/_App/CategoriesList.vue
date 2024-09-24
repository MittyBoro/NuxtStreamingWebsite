<template>
  <div v-if="list?.length">
    <div class="tags" :class="{ 'tags--hidden': isHidden }" ref="tagsRef">
      <NuxtLink
        v-for="category in list"
        :key="category.id"
        class="button button-alt-mini"
        :to="`/categories/${category.slug}`"
      >
        <span class="preloading">{{ category.title }}</span>
      </NuxtLink>
    </div>
    <span class="link preloading" @click.passive="isHidden = !isHidden">
      <span v-if="isHidden">показать все</span>
      <span v-else>скрыть</span>
    </span>
  </div>
</template>

<script setup>
  const { list } = defineProps({
    list: {
      type: Array,
      default: () => [],
    },
  })

  const isHidden = ref(true)

  const tagsRef = ref(null)

  const updHeight = () => {
    isHidden.value = tagsRef.value?.offsetHeight >= 100
  }

  onMounted(() => {
    updHeight()
  })
</script>

<style lang="scss" scoped>
  .tags {
    max-height: 1000px;
    transition: max-height 0.3s;
  }
  .tags--hidden {
    overflow: hidden;
    max-height: 100px;
    mask-image: linear-gradient(
      to bottom,
      #000,
      #0007 calc(100% - 40px),
      transparent calc(100%)
    );
  }
  .link {
    display: inline-block;
    font-size: var(--text-xs);
    font-weight: 600;
    margin-top: var(--space-xs);
    color: var(--primary);
  }
</style>
