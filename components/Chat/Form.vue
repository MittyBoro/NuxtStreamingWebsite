<template>
  <form @submit.prevent="form.submit" class="chat__card card">
    <div class="card__inner form-grid">
      <div class="profile__subtitle">Создать новый чат</div>
      <LazyFieldInput v-model="state.subject" placeholder="Тема" required />
      <LazyFieldTextarea
        v-model="state.text"
        placeholder="Сообщение"
        required
      />
      <div class="button__row">
        <Button :loading="form.pending" button>Отправить</Button>
      </div>
    </div>
  </form>
</template>

<script setup>
  const { form, state } = await useApiForm(
    '../chats/chats',
    {
      subject: '',
      text: '',
    },
    {
      onSuccess: ({ meta }) => {
        state.subject = ''
        state.text = ''

        if (meta.id) {
          navigateTo(`/chats/${meta.id}`)
        } else {
          useNotify().warn('Сообщение не было отправлено')
        }
      },
    },
  )
</script>

<style lang="scss" scoped>
  .profile__subtitle {
    margin-bottom: 0;
  }
</style>
