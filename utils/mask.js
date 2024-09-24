export function pageWithMask(
  original,
  maskValues,
  sortComputed,
  sortPaths = [],
) {
  if (!sortComputed) sortComputed = computed(() => '')

  const page = reactive(JSON.parse(JSON.stringify(original)))
  const route = useRoute()
  const maskRegex = /%mask%/g
  const maskTitleRegex = /%mask_title%/g
  const maskSortRegex = /%mask_sort%/g
  const sortPattern = /\{\{(.+?)\}\}/g

  const titleValue = maskValues.title || maskValues.name || ''

  const isSortApply = () => {
    return sortPaths.some((r) => route.fullPath.includes(r))
  }
  watch(
    () => route.fullPath,
    () => {
      if (isSortApply()) {
        page.canonical = canonicalUrl(['o', 'country'])
      } else {
        page.canonical = canonicalUrl()
      }
      for (const [key, value] of Object.entries(original)) {
        if (typeof value !== 'string') continue

        const maskValue = maskValues[key] || ''

        let newValue = value || ''

        if (sortPattern.test(newValue)) {
          newValue = newValue.replace(sortPattern, (match, content) => {
            const parts = content.split('||').map((part) => part.trim())
            return isSortApply() && parts[1] ? parts[1] : parts[0]
          })
        }

        if (maskRegex.test(newValue)) {
          newValue = newValue.replace(maskRegex, maskValue)
        }
        if (maskTitleRegex.test(newValue)) {
          newValue = newValue.replace(maskTitleRegex, titleValue)
        }
        if (maskSortRegex.test(newValue)) {
          newValue = newValue.replace(maskSortRegex, sortComputed.value)
        }

        page[key] = newValue.charAt(0).toUpperCase() + newValue.slice(1)
      }

      // прописать текст пагинации
      if (route.query.page > 1) {
        const pageTitle = 'Страница ' + route.query.page + ' — '
        if (page.meta_title) {
          page.meta_title = pageTitle + page.meta_title
        }
        if (page.meta_description) {
          page.meta_description = pageTitle + page.meta_description
        }
      }
    },
    { immediate: true },
  )

  return page
}
