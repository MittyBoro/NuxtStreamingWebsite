<template>
  <LazyPageInformationLayout v-if="user?.has_ban" class="container">
    <div class="prose">
      <div>
        Ваш аккаунт заблокирован до {{ formatDate(user.ban_expiry_at) }}
      </div>
    </div>
  </LazyPageInformationLayout>
</template>

<script setup>
  const user = useApiUser()
</script>

<style lang="scss" scoped>
  .prose {
    color: #f00;
  }
</style>
