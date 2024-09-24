export const injectAble = () => {
  const { id, type } = inject('able')

  if (!id || !type) {
    throw new Error('Able data is not provided')
  }
  return { id, type }
}
