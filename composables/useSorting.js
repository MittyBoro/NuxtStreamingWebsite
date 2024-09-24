export const useSorting = (list, routeKey = 'o') => {
  const route = useRoute()
  const listSorting = useAppConfig().sorting[list]
  const titleMask = computed(
    () =>
      (
        listSorting.find((item) => route.query[routeKey] == item.key) ||
        listSorting[0]
      )?.name || '',
  )

  return {
    listSorting,
    titleMask,
  }
}
