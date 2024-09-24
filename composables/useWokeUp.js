export const useWokeUp = () => {
  const woke = ref(false)

  if (process.server) {
    return woke
  }

  const wokeUp = inject('wokeUp')

  onMounted(() => {
    watch(
      () => wokeUp?.value,
      (value) => {
        if (value) {
          woke.value = true
        }
      },
      { immediate: true },
    )
  })

  return woke
}
