<template>
  <form @submit.prevent="form.submit" class="form form-grid">
    <div class="profile__subtitle">Изменить пароль</div>
    <div class="field">
      <div class="field__title"></div>
      <LazyFieldPassword
        title="Действующий пароль"
        v-model="state.current_password"
        autocomplete="current-password"
        name="current-password"
        required
      />
    </div>
    <div class="field">
      <div class="field__title">Новый пароль</div>
      <LazyFieldPassword
        v-model="state.password"
        autocomplete="new-password"
        name="password"
        required
      />
    </div>
    <div class="field">
      <div class="field__title">Подтверждение пароля</div>
      <LazyFieldPassword
        v-model="state.password_confirmation"
        name="password_confirm"
        autocomplete="new-password"
        required
      />
    </div>

    <div class="field__error">{{ form.error }}</div>
    <Button :loading="form.pending" button>Сохранить</Button>
  </form>
</template>

<script setup>
  const { refreshIdentity } = useApiAuth()

  const props = defineProps({
    user: Object,
    refresh: Function,
  })

  const { form, state } = await useApiForm(
    'users',
    {
      ...props.user,
      type: 'security',
      current_password: '',
      password: '',
      password_confirmation: '',
    },
    {
      successNotify: true,
      onSuccess: async () => {
        state.current_password = ''
        state.password = ''
        state.password_confirm = ''
        useNotify().success('Пароль обновлен')

        await refreshIdentity()
        props.refresh()
      },
    },
  )
</script>

<style lang="scss" scoped></style>
