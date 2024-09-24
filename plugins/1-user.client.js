// plugins/1-user.client.js
export default defineNuxtPlugin(async (nuxtApp) => {
  const user = useApiUser()
  if (!user.value) {
    const { refreshIdentity } = useApiAuth()
    try {
      await refreshIdentity()
    } catch (e) {}
  }
})
