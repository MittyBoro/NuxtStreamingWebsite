let isListening = false
export const useIsDesktop = () => {
  const isDesktop = useState('isDesktop', () => null)

  if (!isListening && process.client) {
    isListening = true
    const event = () => {
      isDesktop.value = window.innerWidth >= 992
    }
    onMounted(() => {
      window.addEventListener('resize', event, { passive: true })
      window.addEventListener('orientationchange', event, { passive: true })
      event()
    })
    onUnmounted(() => {
      window.removeEventListener('resize', event)
      window.removeEventListener('orientationchange', event)
    })
  }

  return isDesktop
}
