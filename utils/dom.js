export function scrollToElement(selector) {
  const element = document.querySelector(selector)
  if (!element) return
  const rect = element.getBoundingClientRect()
  const scrollTop = document.documentElement.scrollTop
  const clientHeight = document.documentElement.clientHeight
  const targetScrollTop = rect.bottom + scrollTop - clientHeight
  window.scrollTo({
    top: targetScrollTop,
    behavior: 'smooth', // для плавной прокрутки
  })
}

export function isElementInViewport(element) {
  const elementRect = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth

  return (
    elementRect.top >= 0 &&
    elementRect.left >= 0 &&
    elementRect.bottom <= viewportHeight &&
    elementRect.right <= viewportWidth
  )
}
