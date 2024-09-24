export const copy = (text) => {
  navigator.clipboard.writeText(text)
}

export const copyWithNotify = (text) => {
  useNotify().success('Скопировано')
  copy(text)
}
