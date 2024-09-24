export const useApiUser = () =>
  computed(() => useSanctumUser()?.value?.data ?? null)
