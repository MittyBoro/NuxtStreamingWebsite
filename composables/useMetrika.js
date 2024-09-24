export const useMetrika = () => {
  const { initialize } = useGtag()
  const config = useRuntimeConfig().public

  let isLoaded = false
  let timerId

  const loadAll = () => {
    if (isLoaded) {
      return
    }

    document.removeEventListener('mouseenter', loadAll)

    isLoaded = true
    clearTimeout(timerId)

    if (config.gtag?.id) {
      initialize(config.gtag.id)
    }
    if (config.yandexMetrikaId) {
      loadYandexMetrika(config.yandexMetrikaId)
    }
  }

  const loadFallback = () => {
    timerId = setTimeout(loadAll, 6500)
  }

  if (process.client) {
    document.addEventListener('wokeUp', loadAll, {
      once: true,
      passive: true,
    })
    loadFallback()
  }
}

function loadYandexMetrika(metrikaId) {
  ;(function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        ;(m[i].a = m[i].a || []).push(arguments)
      }
    m[i].l = 1 * new Date()
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return
      }
    }
    ;(k = e.createElement(t)),
      (a = e.getElementsByTagName(t)[0]),
      (k.async = 1),
      (k.src = r),
      a.parentNode.insertBefore(k, a)
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

  ym(metrikaId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  })
}
