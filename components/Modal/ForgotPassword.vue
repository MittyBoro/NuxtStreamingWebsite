<template>
  <ModalLayoutSmall>
    <AppLogo class="modal__logo" />
    <div class="modal__subtitle">Восстановить пароль</div>

    <form class="form form-grid" @submit.prevent="form.submit">
      <input
        type="text"
        class="field__input"
        placeholder="Ваш email"
        name="email"
        autocomplete="email"
        v-model="state.email"
        required
      />
      <span class="field__error">{{ form.error }}</span>
      <span class="field__success">{{ successText }}</span>
      <Button :loading="form.pending" button>Восстановить пароль</Button>

      <div class="modal__bottom">
        <div class="link" @click="setModal('login')">Вход</div>
      </div>
    </form>
  </ModalLayoutSmall>
</template>

<script setup>
  const successText = ref('')

  const { form, state } = await useApiForm(
    '/../auth/forgot-password',
    {
      email: '',
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          successText.value = data.status
          useNotify().success(data.status)
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
