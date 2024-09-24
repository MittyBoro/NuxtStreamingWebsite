<template>
  <AppDelimiter />

  <ol class="container breadcrumbs">
    <li v-for="(item, i) in list" :key="item.title">
      <NuxtLink v-if="item.to" :to="item.to" class="preloading">
        {{ item.title }}
      </NuxtLink>
      <span v-else class="preloading">{{ item.title }}</span>
      <AppIcon
        v-if="i < list.length - 1"
        name="i-mdi-chevron-right"
        class="preloading"
      />
    </li>
  </ol>
</template>

<script setup>
  const route = useRoute()
  const props = defineProps({
    list: {
      type: Array,
      default: () => [],
    },
  })

  const list = computed(() => {
    const list = [
      {
        title: 'Project',
        to: '/',
      },
      ...props.list,
    ]

    if (!route.query.page || route.query.page < 2) {
      list[list.length - 1].to = undefined
    }

    return list
  })

  const schemaBreadcrumbs = computed(() =>
    list.value.map((item) => ({
      name: item.title,
      item: item.to,
    })),
  )

  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: schemaBreadcrumbs.value,
    }),
  ])
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    text-align: center;
    margin-top: var(--space-lg);
    font-size: var(--text-sm);
    :deep(.icon) {
      margin: 0 0 0 var(--space-xs);
    }
    li {
      display: inline;
      margin: 0 0 0 var(--space-xs);
      margin-bottom: 3px;
    }
  }
</style>
