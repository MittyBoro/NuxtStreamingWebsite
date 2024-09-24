export function declension(number, words) {
  const cases = [2, 0, 1, 1, 1, 2]
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ]
}

export const coins = (value) => {
  return (
    formatNumber(value) + ' ' + declension(value, ['койн', 'койна', 'койнов'])
  )
}

export const formatNumber = (number) => {
  return (number || 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

export const formatNumberViews = (number, withK = false) => {
  if (number < 1000) {
    return '1k'
  }

  if (withK) {
    if (number >= 1000000) {
      return formatNumber((number / 1000000).toFixed(0)) + 'm'
    } else if (number >= 1000) {
      return formatNumber((number / 1000).toFixed(0)) + 'k'
    }
  }

  return formatNumber(number)
}
