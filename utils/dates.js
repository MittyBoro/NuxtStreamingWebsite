import dayjs from 'dayjs'

import { default as localeRU } from 'dayjs/locale/ru'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.extend(calendar)

dayjs.locale(localeRU)

export const formatDate = (date) => {
  return dayjs(date).format('lll').replace('г.,', ' ')
}
export const formatDay = (date) => {
  return dayjs(date).format('LL').replace('г.', '')
}
export const birthdayToday = (date) => {
  return dayjs(date).isSame(dayjs(), 'day')
}

export const humanizeDate = (date, withoutSuffix = false) => {
  return dayjs().to(date, withoutSuffix)
}

export const countdown = (targetDate) => {
  const diff = dayjs(targetDate).diff(dayjs(), 'minute')

  if (diff < 0) {
    return 'время истекло'
  }

  const months = Math.floor(diff / 43200)
  const days = Math.floor((diff % 43200) / 1440)
  const hours = Math.floor((diff % 1440) / 60)
  const minutes = Math.floor(diff % 60)

  const monthsWord = declension(months, ['месяц', 'месяца', 'месяцев'])
  const daysWord = declension(days, ['день', 'дня', 'дней'])
  const hoursWord = declension(hours, ['час', 'часа', 'часов'])
  const minutesWord = declension(minutes, ['минута', 'минуты', 'минут'])

  let result = ''
  if (months > 0) {
    result += `${months} ${monthsWord} `
  }
  if (days > 0) {
    result += `${days} ${daysWord} `
  }
  if (hours > 0 && days < 2 && months < 1) {
    result += `${hours} ${hoursWord} `
  }
  if (minutes > 0 && hours < 2 && days < 1 && months < 1) {
    result += `${minutes} ${minutesWord} `
  } else {
    result = result.trim()
  }

  return result
}

export function secondsToISO8601(seconds) {
  return dayjs.duration(seconds, 's').toISOString()
}

export const secondToTime = (number) => {
  const pad = (n) => String(n || 0).padStart(2, '0')

  let hours = Math.floor(number / 3600)
  let minutes = Math.floor((number - hours * 3600) / 60)
  let seconds = number - hours * 3600 - minutes * 60

  let string = `${pad(minutes)}:${pad(seconds)}`
  return hours ? `${pad(hours)}:${string}` : string
}

export function getZodiacSign(date) {
  const zodiacSigns = [
    { sign: 'Козерог', emoji: '♑', start: '01-01', end: '01-19' },
    { sign: 'Водолей', emoji: '♒', start: '01-20', end: '02-18' },
    { sign: 'Рыбы', emoji: '♓', start: '02-19', end: '03-20' },
    { sign: 'Овен', emoji: '♈', start: '03-21', end: '04-19' },
    { sign: 'Телец', emoji: '♉', start: '04-20', end: '05-20' },
    { sign: 'Близнецы', emoji: '♊', start: '05-21', end: '06-20' },
    { sign: 'Рак', emoji: '♋', start: '06-21', end: '07-22' },
    { sign: 'Лев', emoji: '♌', start: '07-23', end: '08-22' },
    { sign: 'Дева', emoji: '♍', start: '08-23', end: '09-22' },
    { sign: 'Весы', emoji: '♎', start: '09-23', end: '10-22' },
    { sign: 'Скорпион', emoji: '♏', start: '10-23', end: '11-21' },
    { sign: 'Стрелец', emoji: '♐', start: '11-22', end: '12-21' },
    { sign: 'Козерог', emoji: '♑', start: '12-22', end: '12-31' },
  ]

  const givenDate = dayjs(date)

  for (let i = 0; i < zodiacSigns.length; i++) {
    const { sign, emoji, start, end } = zodiacSigns[i]
    const startDate = dayjs(start, 'MM-DD').year(givenDate.year())
    const endDate = dayjs(end, 'MM-DD').year(givenDate.year())

    if (
      givenDate.isSame(startDate) ||
      givenDate.isSame(endDate) ||
      (givenDate.isAfter(startDate) && givenDate.isBefore(endDate))
    ) {
      return `${sign} ${emoji}`
    }
  }

  return '??'
}

export const daysUntilDate = (date) => {
  const now = dayjs()
  const targetDate = dayjs(date)

  const differenceInDays = targetDate.diff(now, 'day')

  return differenceInDays
}
