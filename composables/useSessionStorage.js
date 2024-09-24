export default function useSessionStorage(key, defaultValue = null) {
  const state = useState('useSessionStorage-' + key, () => defaultValue)

  if (!process.client || !sessionStorage) {
    return state
  }

  let keys = ref([])
  keys = useState('useSessionStorage-watch-keys', () => [])
  state.value = JSON.parse(sessionStorage.getItem(key)) ?? defaultValue

  // Watch only if there are no other watchers
  if (!keys.value.includes(key)) {
    watch(
      () => state.value,
      (newValue) => {
        if (newValue === undefined) {
          // clear the state
          keys.value = keys.value.filter((v) => v !== key)
          try {
            sessionStorage.removeItem(key)
          } catch (e) {}
        } else {
          // set state
          keys.value.push(key)
          try {
            sessionStorage.setItem(key, JSON.stringify(state.value))
          } catch (e) {}
        }
      },
    )
  }

  return state
}
