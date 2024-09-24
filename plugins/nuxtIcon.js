export default defineNuxtPlugin(async (nuxtApp) => {
  const nuxtIconApiUrl = nuxtApp.$config.public.nuxtIconApiUrl
  if (nuxtIconApiUrl) {
    const config = useAppConfig()
    config.nuxtIcon.iconifyApiOptions.url = nuxtIconApiUrl
  }
})
