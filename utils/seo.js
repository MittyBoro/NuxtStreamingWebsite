export function setSeoPage(page) {
  disableSeoIndexByQuery()

  const { siteName } = useRuntimeConfig().public

  const canonical =
    typeof page.canonical === 'string' ? page.canonical : canonicalUrl()

  useSeoMeta({
    title: () => page.meta_title,
    ogTitle: () => page.meta_title,
    description: () => page.meta_description,
    // keywords: () => page.meta_keywords,
    ogDescription: () => page.meta_description,
    ogUrl: canonical,
    ogLocale: 'ru_RU',
    ogSiteName: siteName,
    ogType: 'website',
    ...ogImage(page.preview),
  })

  if (page.canonical) {
    useHead({
      link: [{ rel: 'canonical', href: canonical }],
    })
  }

  if (page.is_index === false) {
    useHead({
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    })
  }

  useSchemaOrg([
    defineWebSite({
      name: siteName,
    }),
  ])
}

export function schemaList(data, callback = () => {}) {
  const list = data.map((video) => ({
    item: callback(video),
  }))
  return list
}

export function disableSeoIndexByQuery() {
  const route = useRoute()
  watch(
    () => route.fullPath,
    (value) => {
      const searchParams = new URLSearchParams(value.split('?')[1])
      if (
        // searchParams.has('o') ||
        // searchParams.has('country') ||
        searchParams.has('type') ||
        searchParams.has('page')
      ) {
        useHead({
          meta: [{ name: 'robots', content: 'noindex,follow' }],
        })
      }
    },
    { immediate: true },
  )
}

export const ogImage = (preview) => {
  const { url } = useRuntimeConfig().public

  const photo = preview ? Object.values(preview)[0] : '/images/og_image.jpg'

  const img = useImage()
  const imageSrc = img(photo, {
    width: 1200,
    height: 630,
    format: 'jpg',
  })

  return {
    ogImage: url + imageSrc,
    'ogImage:width': 1200,
    'ogImage:height': 630,
  }
}
