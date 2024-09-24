export async function useApiPage(slug, options = {}) {
  const { data, error, pending, refresh } = await useApi(
    () => `/pages/${slug}`,
    options,
  )

  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
    })
  }

  const page = computed(() => data.value?.data)

  return { page, pending, refresh, error }
}
