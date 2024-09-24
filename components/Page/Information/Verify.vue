<template>
  <LazyPageInformationLayout
    v-if="user && !user.email_verified_at && !user.has_ban"
    class="container"
    :class="{ 'animation-blink': sending }"
  >
    <div class="prose">
      <p>
        Для работы с сайтом необходимо подтвердить ваш email:
        <code>{{ user.email }}</code>
      </p>
      <p>Если вам не пришло письмо — проверьте папку «СПАМ»</p>
      <div class="button-row">
        <Button class="button-mini" @click.passive="resendEmailVerification">
          Отправить код повторно
        </Button>
      </div>
    </div>
  </LazyPageInformationLayout>
</template>

<script setup>
  const user = useApiUser()

  const sending = ref(false)

  const resendEmailVerification = async () => {
    sending.value = true
    try {
      await $api('/../auth/email/verification-notification', {
        method: 'POST',
      })
      useNotify().success('Письмо отправлено')
    } catch (error) {
      useNotify().error(error.message)
    } finally {
      sending.value = false
    }
  }
</script>

<style lang="scss" scoped>
  .button-row {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  p {
    margin-bottom: 0.75rem;
  }
</style>
