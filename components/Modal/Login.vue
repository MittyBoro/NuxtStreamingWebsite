<template>
  <ModalLayoutSmall>
    <AppLogo class="modal__logo" />
    <div class="modal__subtitle">Вход для участников</div>

    <form class="form form-grid" @submit.prevent="submit">
      <input
        type="text"
        class="field__input"
        placeholder="Имя пользователя"
        name="username"
        autocomplete="username"
        v-model="state.username"
      />
      <LazyFieldPassword
        placeholder="Пароль"
        autocomplete="current-password"
        name="password"
        v-model="state.password"
      />
      <label class="field__checkbox-label">
        <input
          type="checkbox"
          name="remember"
          v-model="state.remember"
          class="field__checkbox"
        />
        <span>Запомнить меня</span>
      </label>
      <span class="field__error">{{ form.error }}</span>
      <Button :loading="form.pending" button>Войти</Button>
      <AppTelegramAuth />
      <div class="modal__bottom">
        <div class="link" @click.passive="setModal('registration')">
          Регистрация
        </div>
        <div class="link" @click.passive="setModal('forgot-password')">
          Забыли пароль?
        </div>
      </div>
    </form>
  </ModalLayoutSmall>
</template>

<script setup>
  const { login } = useApiAuth()
  const { form, state } = await useApiForm(
    null,
    {
      username: '',
      password: '',
      remember: true,
    },
    {
      onSuccess: () => {
        reloadNuxtApp({ path: '/' })
        useNotify().success('Добро пожаловать')
        closeModal()
      },
    },
  )

  const submit = async () => {
    await form.customSubmit(login)
  }
</script>

<style lang="scss" scoped></style>
