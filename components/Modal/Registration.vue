<template>
  <ModalLayoutBig>
    <div class="modal__registration-top">
      <div class="modal__title">Регистрируйся бесплатно</div>
      <div class="modal__subtitle">
        и получи возможность стать
        <br />
        премиум участником
        <b style="font-weight: 800">со скидкой до 70%!</b>
      </div>
    </div>

    <form
      class="form form-grid form modal__registration"
      @submit.prevent="form.submit"
    >
      <input
        type="text"
        class="field__input"
        placeholder="Имя"
        autocomplete="name"
        name="name"
        v-model="state.name"
      />
      <input
        type="text"
        class="field__input"
        placeholder="Никнейм (логин)"
        autocomplete="username"
        name="username"
        v-model="state.username"
        pattern="[a-zA-Z0-9_\-\.]{3,32}"
        @keyup="handleInputOnKeyup"
      />
      <input
        type="email"
        class="field__input"
        placeholder="Email"
        autocomplete="email"
        name="email"
        v-model="state.email"
        @keyup="handleInputOnKeyup"
        @change="usernameFromEmail"
      />

      <LazyFieldPassword
        placeholder="Пароль"
        v-model="state.password"
        name="password"
        autocomplete="new-password"
      />
      <span class="field__error">{{ form.error }}</span>
      <Button
        class="modal__registration-button button-alt"
        :loading="form.pending"
        button
      >
        Регистрация
      </Button>

      <AppTelegramAuth />

      <div class="modal__registration-bottom">
        <div class="link" @click.passive="setModal('login')">
          Уже усть аккаунт?
        </div>
      </div>
    </form>
  </ModalLayoutBig>
</template>

<script setup>
  const { refreshIdentity } = useApiAuth()
  const handleInputOnKeyup = () => {
    state.username = state.username.toLowerCase()
    state.email = state.email.toLowerCase()
  }

  const usernameFromEmail = () => {
    if (!state.username) {
      state.username = state.email?.split('@')[0]
    }
  }

  const { form, state } = await useApiForm(
    '/../auth/register',
    {
      name: '',
      username: '',
      email: '',
      password: '',
      referrer_id: useCookie('referrer_id').value,
    },
    {
      onSuccess: () => {
        refreshIdentity()
        navigateTo('/')
        useNotify().success('Регистрация прошла успешно')
        closeModal()
      },
    },
  )

  watch(
    () => state.email,
    (email) => {
      if (email.includes('icloud.com')) {
        form.error =
          'Мы наблюдаем проблемы с icloud. Рекомендуем воспользоваться другим email для регистрации'
      }
    },
  )
</script>

<style lang="scss" scoped>
  .modal__registration {
    &-top {
      margin: var(--space-sm) auto var(--space-base);
    }
    &-button {
      margin-top: var(--space-base);
    }
    &-bottom {
      display: flex;
      justify-content: center;
      margin-top: auto;
      font-size: var(--text-sm);
    }
  }
</style>
