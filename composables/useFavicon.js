export const useFavicon = () => {
  useHead({
    htmlAttrs: {
      lang: 'ru',
    },
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#ffcc00',
      },
      { rel: 'icon', href: '/favicon.svg' },
    ],
    meta: [
      { name: 'apple-mobile-web-app-title', content: 'ProjectName' },
      { name: 'application-name', content: 'ProjectName' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-config', content: '/browserconfig.xml' },
      { name: 'theme-color', content: '#111111' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'MobileOptimized', content: '320' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=5',
      },
    ],
  })
}
