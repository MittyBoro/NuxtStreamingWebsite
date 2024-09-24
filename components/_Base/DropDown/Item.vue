<template>
  <NuxtLink
    :to="item.o === 'latest' || disableHref ? null : to"
    :class="{ active: item.key === activeSort.key }"
    @click.prevent="navigateTo(to)"
    class="dropdown--link"
  >
    <slot></slot>
  </NuxtLink>
</template>

<script setup>
  const props = defineProps({
    item: Object,
    routeKey: String,
    activeSort: Object,
    disableHref: Boolean,
  })

  const to = computed(() => {
    let query = isComputed(props.item.query)
      ? props.item.query.value
      : props.item.query
    return { query: { ...query, page: undefined } }
  })
</script>
