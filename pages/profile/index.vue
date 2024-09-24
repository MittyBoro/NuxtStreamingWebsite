<template>
  <LazyProfileMain>
    <LazyAvatar
      class="profile__avatar"
      :src="user.avatar"
      shadow="5px"
      original
    />
    <div class="profile__title">
      <span>{{ user.name }}</span>
      <LazyAppIconPremium
        v-if="user.has_premium"
        colored
        class="icon-premium"
      />
    </div>

    <div class="profile__user-info">
      <div class="dotted-row">
        <b>Никнейм:</b>
        <span class="dotted-line"></span>
        <span>{{ user.username }}</span>
      </div>
      <div class="dotted-row">
        <b>Email:</b>
        <span class="dotted-line"></span>
        <span>{{ user.email }}</span>
      </div>
      <div v-if="userGender" class="dotted-row">
        <b>Пол:</b>
        <span class="dotted-line"></span>
        <span>{{ userGender }}</span>
      </div>
      <div class="dotted-row">
        <b>Дата регистрации:</b>
        <span class="dotted-line"></span>
        <span>{{ formatDate(user.created_at) }}</span>
      </div>
      <div v-if="user.has_premium" class="dotted-row">
        <b>До окончания подписки:</b>
        <span class="dotted-line"></span>
        <span>{{ countdown(user.premium_expiry_at) }}</span>
      </div>
      <div v-if="user.has_ban" class="dotted-row" style="color: #f00">
        <b>До окончания блокировки:</b>
        <span class="dotted-line"></span>
        <span>{{ countdown(user.ban_expiry_at) }}</span>
      </div>
    </div>
    <div v-if="user.has_premium" class="profile__buttons">
      <Button @click.passive="setModal('premium')">Продлить премиум</Button>
    </div>
  </LazyProfileMain>
</template>

<script setup>
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  useSeoMeta({
    title: 'Мой профиль',
  })

  const user = useApiUser()

  const genders = useAppConfig().genders

  const userGender = computed(
    () => genders.find((gender) => gender.key === user.value.gender)?.value,
  )
</script>

<style lang="scss" scoped>
  .profile {
    &__avatar {
      display: none;
      @include media-breakpoint-down(md) {
        display: flex;
        margin: auto;
        width: 8rem;
        margin-bottom: var(--space-sm);
      }
    }
    &__title {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      @include media-breakpoint-down(md) {
        display: block;
        text-align: center;
        margin: 0 auto var(--space-md);
        .icon-premium {
          margin-left: var(--space-xs);
        }
      }
    }
    &__user-info {
      display: grid;
      gap: var(--space-sm);
      font-size: var(--text-sm);
      max-width: 400px;
    }
  }
</style>
