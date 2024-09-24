import { useNotification } from '@kyvg/vue3-notification'
const { notify } = useNotification()

export const useNotify = () => {
  const notification = (options) => {
    notify({
      pauseOnHover: true,
      speed: 400,
      ...options,
    })
  }

  return {
    notify: (msg) => {
      notification({
        text: msg,
      })
    },
    success: (msg) => {
      notification({
        text: msg,
        type: 'success',
      })
    },
    warn: (msg) => {
      notification({
        text: msg,
        type: 'warn',
      })
    },
    error: (msg) => {
      notification({
        text: msg,
        type: 'error',
      })
    },
  }
}
