<template>
  <ModalLayoutSmall>
    <AppLogo class="modal__logo" />
    <div class="modal__subtitle">Восстановить пароль</div>

    <form class="form form-grid" @submit.prevent="form.submit">
      <div v-if="user" class="field__success">
        Вы уже авторизованы на сайте, можете закрыть это окно
      </div>
      <input
        type="text"
        class="field__input"
        placeholder="Ваш email"
        name="email"
        autocomplete="email"
        v-model="state.email"
        required
        readonly
      />
      <LazyFieldPassword
        placeholder="Новый пароль"
        v-model="state.password"
        name="password"
        autocomplete="new-password"
      />
      <LazyFieldPassword
        placeholder="Подтвердите пароль"
        v-model="state.password_confirmation"
        name="password_confirmation"
        autocomplete="new-password"
      />
      <template v-if="!user">
        <span class="field__error">{{ form.error }}</span>
        <Button :loading="form.pending" button>Восстановить пароль</Button>

        <div class="modal__bottom">
          <div class="link" @click.passive="setModal('login')">Вход</div>
        </div>
      </template>
    </form>
  </ModalLayoutSmall>
</template>

<script setup>
  const route = useRoute()
  const user = useApiUser()

  const { form, state } = await useApiForm(
    '/../auth/reset-password',
    {
      email: route.query?.email,
      password: '',
      password_confirmation: '',
      token: route.params?.id,
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          useNotify().success(data.status)
          setModal('login')
          navigateTo('/')
        }
      },
    },
  )
</script>

<style lang="scss" scoped>
  .modal__bottom {
    justify-content: center;
  }
</style>
