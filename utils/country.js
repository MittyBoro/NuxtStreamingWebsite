import GeoNamesDeclensions from 'ru-declensions-geo/src/geo-names-declensions'
import countryUtil from 'i18n-iso-countries'
import ruCountries from 'i18n-iso-countries/langs/ru.json'
countryUtil.registerLocale(ruCountries)

export function getCountryByCode(code) {
  if (!code) return ''
  const codeUpper = code.toUpperCase()

  if (codeUpper == 'CN') {
    return 'Китай'
  } else if (codeUpper == 'KP') {
    return 'КНДР'
  }
  return countryUtil.getName(codeUpper, 'ru', { select: 'alias' })
}

export function getCountryDeclensions(name) {
  return name ? GeoNamesDeclensions.getCases(name) : []
}

export function getCountryDeclensionsByCode(code) {
  const name = getCountryByCode(code)
  return getCountryDeclensions(name)
}

export function countriesList() {
  return countryUtil.getNames('ru', { select: 'alias' })
}
