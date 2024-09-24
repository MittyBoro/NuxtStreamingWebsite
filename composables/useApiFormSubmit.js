export const useApiFormSubmit = async (path, state = {}) => {
  const clonedState = Object.assign({}, state)
  state.class =
    'bg-primary-500/10 dark:bg-primary-500/10 animate-pulse pointer-events-none'
  const { form } = await useApiForm(path, clonedState, {
    onSuccess: (data) => {
      Object.assign(state, data)
    },
  })
  await form.submit()
  state.class = ''
}
