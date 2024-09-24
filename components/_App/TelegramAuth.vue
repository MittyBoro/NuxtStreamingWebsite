<template>
  <div class="telegram-button">
    <div ref="target"></div>
  </div>
</template>

<script setup>
  const { baseUrl } = useRuntimeConfig().public.sanctum

  const authUrl =
    baseUrl +
    '/../auth/telegram?referrer_id=' +
    (useCookie('referrer_id').value || '')

  const target = ref(null)
  const initButtonTelegram = () => {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute(
      'src',
      'https://telegram.org/js/telegram-widget.js?22',
    )
    recaptchaScript.async = true
    recaptchaScript.setAttribute('data-telegram-login', '___bot')
    recaptchaScript.setAttribute('data-auth-url', authUrl)
    recaptchaScript.setAttribute('data-size', 'large')
    recaptchaScript.setAttribute('data-request-access', 'write')

    target.value.appendChild(recaptchaScript)
  }
  onMounted(() => {
    if (process.client) {
      initButtonTelegram()
    }
  })
</script>

<style lang="scss" scoped>
  .telegram-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>
