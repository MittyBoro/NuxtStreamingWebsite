export const useModal = () =>
  useState('modal', () => reactive({ active: false }))

export const closeModal = () => {
  const modal = useModal()
  modal.value.active = false
}

export const setModal = (key) => {
  const modal = useModal()

  modal.value.active = key
}
