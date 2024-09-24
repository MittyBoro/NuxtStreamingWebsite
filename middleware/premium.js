export default defineNuxtRouteMiddleware(() => {
  const user = useApiUser()

  if (!user.value?.has_premium) {
    if (process.client) {
      useNotify().error('Страница доступна только премиум пользователям')
    }
    return navigateTo('/')
  }
})
