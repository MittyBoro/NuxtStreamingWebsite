<template>
  <DropDownList :list="listForTemplate" :routeKey="byKey">
    <template #item="{ item }">
      <span>{{ item.name }}</span>
    </template>
  </DropDownList>
</template>

<script setup>
  const route = useRoute()

  const props = defineProps({
    list: Array,
    byKey: String,
    emptyName: {
      type: String,
      default: 'Любые',
    },
    isMale: Boolean,
    yesOrNo: Array,
  })

  const listForTemplate = computed(() => {
    const newList =
      props.list
        ?.map((item) =>
          reactive({
            key: item,
            name: !props.yesOrNo
              ? translateKeyByGender(item, props.isMale, true)
              : translateYesNo(item, props.yesOrNo[0], props.yesOrNo[1]),
            query: computed(() => ({
              ...route.query,
              [props.byKey]: item,
            })),
          }),
        )
        .sort((a, b) => {
          return a.name.localeCompare(b.name, 'ru')
        }) || []

    return [
      {
        key: 'xx',
        name: props.emptyName,
        query: computed(() => ({
          ...route.query,
          [props.byKey]: undefined,
        })),
      },
    ].concat(newList)
  })
</script>

<style lang="scss" scoped>
  :deep(.button) {
    justify-content: start;
  }
</style>
