export default function useLocalStorage(key, defaultValue = null) {
  const state = useState(key, () => defaultValue)

  if (!process.client || !localStorage) {
    return state
  }

  let keys = ref([])
  keys = useState('useLocalState-watch-keys', () => [])
  state.value = JSON.parse(localStorage.getItem(key))

  // Watch only if there are no other watchers
  if (!keys.value.includes(key)) {
    watch(
      () => state.value,
      (newValue) => {
        if (newValue === undefined) {
          // clear the state
          keys.value = keys.value.filter((v) => v !== key)
          try {
            localStorage.removeItem(key)
          } catch (e) {}
        } else {
          // set state
          keys.value.push(key)
          try {
            localStorage.setItem(key, JSON.stringify(state.value))
          } catch (e) {}
        }
      },
    )
  }

  return state
}
