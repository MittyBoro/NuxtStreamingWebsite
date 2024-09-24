<template>
  <form @submit.prevent="form.submit" class="form form-grid">
    <div class="profile__subtitle">Основные настройки</div>
    <div class="field">
      <div class="field__title">Аватар</div>
      <ProfileInputAvatar v-model="state.avatar" />
    </div>
    <div class="field">
      <div class="field__title">
        <span>Ваш email</span>
        <span> {{ user.email }} </span>
        <span
          class="link color"
          @click.passive="showEmailEditor = !showEmailEditor"
        >
          изменить
        </span>
      </div>
      <LazyFieldInput
        v-if="showEmailEditor"
        title="Новый email"
        type="email"
        v-model="state.new_email"
        required
      />
    </div>
    <LazyFieldInput title="Ваше имя" v-model="state.name" required />
    <LazyFieldSelect title="Пол" v-model="state.gender" :options="genders" />
    <LazyFieldSelect
      title="Валюта"
      v-model="state.currency"
      :options="currencies"
      required
    />
    <LazyFieldSelect
      title="Страна"
      v-model="state.country"
      :options="countries"
    />

    <div v-if="state.telegram_id" class="field__title" style="display: flex">
      <span style="display: flex; align-items: center">
        Telegram 
        <AppIcon name="i-mdi-telegram" />
        : 
      </span>
      <span>{{ state.telegram_id }}</span>
      <span
        style="margin-left: auto"
        class="link color"
        @click.passive="state.telegram_id = ''"
      >
        [отвязать]
      </span>
    </div>

    <div class="field__error">{{ form.error }}</div>
    <Button :loading="form.pending" button>Сохранить</Button>
  </form>
</template>

<script setup>
  const props = defineProps({
    user: Object,
    refresh: Function,
  })

  const genders = useAppConfig().genders.map((gender) => [
    gender.key,
    gender.value,
  ])

  const currencies = Object.values(useApiAttributes().value.currencies).map(
    (currency) => [currency.key, `${currency.key}, ${currency.symbol}`],
  )

  const countries = {
    null: 'Не указана',
    ...countriesList(),
  }

  const { form, state } = await useApiForm(
    'users',
    {
      ...props.user,
      type: 'profile',
    },
    {
      successNotify: true,
      onSuccess: () => {
        showEmailEditor.value = false
        state.new_email = ''
        useNotify().success('Профиль обновлен')
        props.refresh()
      },
    },
  )

  const showEmailEditor = ref(false)
</script>

<style lang="scss" scoped></style>
