<template>
  <div>
    <TransitionGroup>
      <template v-if="!isAuthenticated">
        <ModalLogin v-if="modal.active == 'login'" />
        <ModalRegistration v-if="modal.active == 'registration'" />
        <ModalForgotPassword v-if="modal.active == 'forgot-password'" />
        <ModalPremium v-if="modal.active == 'premium'" />
      </template>
      <template v-else>
        <ModalTariffs v-if="modal.active == 'tariffs'" />
      </template>
      <ModalTelegram v-if="modal.active == 'telegram'" />
      <ModalResetPassword v-if="modal.active == 'reset-password'" />
    </TransitionGroup>
  </div>
</template>

<script setup>
  const modal = useModal()

  const { isAuthenticated } = useApiAuth()

  const route = useRoute()

  watch(
    () => modal.value.active,
    (activeModal) => {
      if (activeModal == 'premium' && isAuthenticated.value) {
        setModal('tariffs')
      }
      if (activeModal == 'tariffs' && !isAuthenticated.value) {
        setModal('premium')
      }
    },
  )

  onMounted(() => {
    if (route.path?.startsWith('/password-reset')) {
      setModal('reset-password')
    }
    if ('buy-premium' in route.query) {
      setModal('premium')
      navigateTo({ query: { 'buy-premium': undefined } })
    }
    if ('error' in route.query) {
      useNotify().error(route.query.error)
      navigateTo({ query: { error: undefined } })
    }
  })
</script>

<style lang="scss" scoped></style>
