export async function useApi(path, options = {}) {
  return await useFetch(path, {
    $fetch: $api,
    ...options,
  })
}
