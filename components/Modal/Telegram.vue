<template>
  <ModalLayoutSmall>
    <AppLogo class="modal__logo" />
    <div v-if="user" class="modal__subtitle">Привязать Telegram</div>
    <div v-else class="modal__subtitle">Войти через Telegram</div>

    <div class="modal__text">
      <template v-if="user">
        <div>Нажмите на кнопку, чтобы привязать Telegram</div>
        <div>В будущем Вы сможете входить в аккаунт без пароля</div>
      </template>
      <div v-else>Нажмите на кнопку, чтобы войти через Telegram</div>
      <div>Это безопасно, от вас потребуется только номер телефона</div>
    </div>
    <AppTelegramAuth />
  </ModalLayoutSmall>
</template>

<script setup>
  const user = useApiUser()
</script>

<style lang="scss" scoped>
  .modal__text {
    margin-bottom: var(--space-base);
    font-size: var(--text-sm);
    text-align: center;
    line-height: 1.6;
  }
</style>
