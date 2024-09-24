/**
 * options
 * - onSuccess
 * - onError
 * - successNotify - default false
 * - redirectAfterCreate - default false
 * - loadByRoute - default false


 * form:
 * - submit: METHOD
 * - remove: METHOD
 * - refresh: METHOD
 * - disable: METHOD
 * - enable: METHOD
 * - customSubmit: METHOD (run customMethod)
 *
 * - isDirty: boolean
 * - pending: boolean
 * - disabled: boolean
 * - succeeded: boolean
 * - error: string
 * - errors: object
 */

export const useApiForm = async (path, data = {}, options = {}) => {
  if (path && !path?.startsWith('/')) {
    path = '/' + path
  }
  const state = reactive({})
  const rawJson = ref(null)

  const fillState = (data) => {
    Object.assign(state, data)
    rawJson.value = JSON.stringify(state)
  }

  fillState(data)

  options = {
    onSuccess: () => {},
    onError: () => {},
    successNotify: false,
    redirectAfterCreate: false,
    loadByRoute: false,
    ...options,
  }

  const $former = {
    onInit: () => {
      form.pending = true
      form.succeeded = null
      form.error = null
      form.errors = {}
    },

    onSuccess: (data) => {
      form.succeeded = true
      form.error = null

      options.onSuccess(data)
    },

    onError: (e) => {
      const errorData = e.response?._data
      form.succeeded = false
      form.errors = errorData?.errors
        ? objectToFormErrors(errorData?.errors)
        : {}

      const message = errorData?.message || 'Неизвестная ошибка'
      useNotify().error(message)
      form.error = message

      options.onError(e)
    },

    onFinish: () => {
      form.pending = false
    },
  }

  const form = reactive({
    path: computed(() => (state.id ? `${path}/${state.id}` : path)),
    method: computed(() => (state.id ? 'PUT' : 'POST')),

    pending: false,
    isDirty: false,
    disabled: false,
    succeeded: null,
    error: null,
    errors: {},

    disable: () => (form.disabled = true),
    enable: () => (form.disabled = false),
  })

  const $fetching = async (doIt, onError = async () => {}) => {
    if (form.pending) {
      useNotify().warn('Пожалуйста, подождите')
      return
    }

    $former.onInit()
    try {
      const data = await doIt()
      if (data) {
        $former.onSuccess(data)
      }
    } catch (e) {
      $former.onError(e)
      await onError(e)
      if (e.response?.status !== 422) throw e
    } finally {
      $former.onFinish()
    }
  }

  form.getFormData = () => {
    return objectToFormData({
      ...state,
    })
  }

  // отправка формы
  form.submit = async () => {
    const formData = form.getFormData()
    await $fetching(async () => {
      const data = await $api(form.path, {
        method: form.method,
        body: formData,
      })

      if (options.successNotify) {
        useNotify().success('Сохранено')
      }
      // if (!state.id && options.redirectAfterCreate && data.id) {
      //   await navigateTo(`${path}/${data.id}`)
      // }
      fillState(data)
      return data
    })
  }

  // получение данных
  form.refresh = async () => {
    if (!state.id) return

    await $fetching(
      async () => {
        const { data } = await $api(form.path)
        fillState(data)
      },
      async (e) => {
        if (e.response?.status !== 200) {
          await navigateTo(path || '/', { external: true })
          throw e
        }
      },
    )
  }

  // удаление
  form.remove = async (callback = null) => {
    if (!state.id) return

    await $fetching(async () => {
      await $api(form.path, {
        method: 'DELETE',
      })
      useNotify().success('Удалено')
      if (callback) {
        callback()
      }

      return true
    })
  }

  //
  form.customSubmit = async (method = async () => {}) => {
    await $fetching(async () => {
      await method(state)
    })
  }

  watchEffect(() => {
    form.isDirty = JSON.stringify(state) !== rawJson.value
  })

  if (options.loadByRoute) {
    const { id } = useRoute().params
    if (id !== 'create') {
      state.id = id
      await form.refresh()
    }
  }

  return { form, state }
}
