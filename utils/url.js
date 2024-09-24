export const canonicalUrl = (queryKeys = []) => {
  const route = useRoute()
  const { url } = useRuntimeConfig().public

  const location = url + route.fullPath
  const { origin, pathname, searchParams } = new URL(location)

  let query = ''

  if (queryKeys.length) {
    for (const [key, value] of searchParams) {
      if (!queryKeys.includes(key)) {
        searchParams.delete(key)
      }
    }

    if (searchParams.toString()) {
      query = `?${searchParams.toString()}`
    }
  }

  const newLocation = `${origin}${pathname}`.replace(/\/$/, '')
  return `${newLocation}${query}`
}

export const shareUrl = () => {
  const url = canonicalUrl() + '?utm_source=share'
  return url
}

export const redirectTo = async (url) => {
  await navigateTo(redirectUrl(url), {
    open: { target: '_blank' },
    redirectCode: 301,
  })
}

export const redirectUrl = (url) => {
  return '/to?u=' + btoa(url)
}
