export const findOrFirst = (list, key, keyName = 'key') => {
  let item = list.find((item) => item[keyName] === key)
  return item || list[0]
}

export function stableRandomSort(key, a, b) {
  if (a === b) {
    return 0
  }
  // Используем ключ для генерации случайного порядка
  const hashA = hashCode(a.toString() + key.toString())
  const hashB = hashCode(b.toString() + key.toString())

  return hashA - hashB
}

function hashCode(str) {
  let hash = 0
  if (str.length === 0) {
    return hash
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0 // Преобразование результата в 32-битное целое число
  }
  return hash
}
