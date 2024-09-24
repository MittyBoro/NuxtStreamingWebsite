<template>
  <DropDown position="right">
    <template #default>
      <div class="button button-alt-mini">
        <span class="preloading">
          <slot name="item" :item="activeSort">
            {{ activeSort.name }}
          </slot>
        </span>
        <AppIcon name="i-mdi-chevron-down" class="arrow preloading" />
      </div>
    </template>
    <template #list>
      <template v-for="item in list" :key="item.key">
        <DropDownItem
          :item="item"
          :routeKey="routeKey"
          :activeSort="activeSort"
          :disableHref="disableHref"
        >
          <slot name="item" :item="item">{{ item.name }}</slot>
        </DropDownItem>
      </template>
    </template>
  </DropDown>
</template>

<script setup>
  const route = useRoute()

  const { list, routeKey } = defineProps({
    list: {
      type: Array,
      default: () => [],
    },
    routeKey: {
      type: String,
      default: 'o',
    },
    disableHref: {
      type: Boolean,
      default: false,
    },
  })

  const activeSort = computed(() => {
    return list.find((el) => route.query[routeKey] == el.key) || list[0]
  })
</script>

<style lang="scss" scoped>
  .preloading {
    display: inherit;
    flex: inherit;
    gap: inherit;
    align-items: inherit;
    justify-content: inherit;
    max-width: 100%;
  }
  .arrow {
    margin-left: auto;
  }
</style>
