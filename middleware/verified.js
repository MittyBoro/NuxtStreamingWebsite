export default defineNuxtRouteMiddleware(() => {
  const user = useApiUser()

  if (!user.value) return navigateTo('/')

  if (!user.value.email_verified_at) {
    return navigateTo('/')
  }
})
