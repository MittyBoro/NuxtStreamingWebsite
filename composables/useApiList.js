export async function useApiList(path, apiQuery = {}, options = {}) {
  const route = useRoute()
  const query = computed(() => ({
    order: route.query.o,
    page: route.query.page,
    ...(apiQuery.value ? { ...apiQuery.value } : { ...apiQuery }),
  }))
  const { data, pending, error, refresh } = await useApi(path, {
    query: query,
    ...options,
  })

  const list = computed(() => data.value?.data || [])
  const meta = computed(() => data.value?.meta)

  const loading = ref(false)

  const loadNextPage = async () => {
    if (
      !meta.value?.last_page ||
      meta.value.current_page >= meta.value.last_page ||
      loading.value
    ) {
      return
    }
    loading.value = true
    list.value.push(...Array(2).fill({}))

    meta.value.current_page++
    const { data } = await $api(isComputed(path) ? path.value : path, {
      query: {
        ...query.value,
        page: meta.value.current_page,
      },
    })
    list.value.splice(-2)
    loading.value = false
    list.value.push(...data)
  }

  return {
    list,
    meta,
    pending,
    loadNextPage,
    error,
    refresh,
  }
}
