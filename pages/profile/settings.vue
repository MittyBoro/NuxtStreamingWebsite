<template>
  <LazyProfileMain>
    <LazyPageTitleRow>
      <template #title>
        <div class="profile__title profile__favorites-title">
          Настройки аккаунта
        </div>
      </template>
      <template #right>
        <div class="buttons-list">
          <Button
            class="button button-mini"
            @click.passive="setTab('profile')"
            :class="{ 'button-alt': activeTab != 'profile' }"
          >
            <span>Основное</span>
          </Button>
          <Button
            class="button button-mini"
            @click.passive="setTab('subscriptions')"
            :class="{ 'button-alt': activeTab != 'subscriptions' }"
          >
            <span>Подписки</span>
          </Button>
          <Button
            class="button-mini"
            @click.passive="setTab('security')"
            :class="{ 'button-alt': activeTab != 'security' }"
          >
            <span>Безопасность</span>
          </Button>
        </div>
      </template>
    </LazyPageTitleRow>
    <div class="profile__form">
      <LazyProfileSettingProfile
        v-if="activeTab == 'profile'"
        :user="user"
        :refresh="refresh"
      />
      <LazyProfileSettingSubscriptions
        v-if="activeTab == 'subscriptions'"
        :user="user"
        :refresh="refresh"
      />
      <LazyProfileSettingSecurity
        v-if="activeTab == 'security'"
        :user="user"
        :refresh="refresh"
      />
    </div>
  </LazyProfileMain>
</template>

<script setup>
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  useSeoMeta({
    title: 'Редактировать профиль',
  })

  const { refreshIdentity } = useApiAuth()

  const route = useRoute()
  const activeTab = computed(() => route.query.type || 'profile')

  const { data, refresh } = await useApi('/users/me', {
    query: {
      full: true,
    },
  })
  const user = computed(() => data.value.data)

  const setTab = (tabName) => {
    navigateTo({
      query: {
        type: tabName === 'profile' ? undefined : tabName,
        page: undefined,
      },
    })
  }

  onUnmounted(() => {
    refreshIdentity()
  })
</script>

<style lang="scss" scoped>
  .profile__form {
    max-width: 400px;
    .button {
      margin-top: var(--space-sm);
    }
  }
</style>
