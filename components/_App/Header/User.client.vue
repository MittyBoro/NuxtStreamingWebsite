<template>
  <DropDown>
    <template #default>
      <Avatar
        class="header__user-avatar"
        :premium="user?.has_premium"
        :src="user?.avatar"
        shadow="3px"
        :chip="!!user?.unread_messages_count"
        :title="user?.name"
      />
    </template>
    <template #list>
      <template v-if="!isAuthenticated">
        <span class="header__user-row" @click.passive="setModal('login')">
          <span>Вход</span>
        </span>
        <span
          class="header__user-row"
          @click.passive="setModal('registration')"
        >
          <span>Регистрация</span>
        </span>
        <div
          class="header__user-row header__user-row--premium"
          @click.passive="setModal('premium')"
        >
          <span>Попробовать премиум</span>
        </div>
      </template>
      <template v-else>
        <NuxtLink to="/profile" class="header__user-info">
          <div>
            <div class="header__user-name">
              <span>{{ user.name }}</span>
            </div>
            <div>Открыть профиль</div>
          </div>
        </NuxtLink>
      </template>

      <template v-if="isAuthenticated">
        <div
          v-if="!user.has_premium"
          class="header__user-row header__user-row--premium"
          @click.passive="setModal('premium')"
        >
          <AppIconPremium animated />
          <span>Купить премиум</span>
        </div>
        <div
          v-else
          class="header__user-row header__user-row--premium"
          @click.passive="setModal('premium')"
        >
          <AppIconPremium />
          <span>{{ countdown(user.premium_expiry_at) }}</span>
        </div>
        <div
          v-if="!user.telegram_id"
          class="header__user-row header__user-row--blue"
          @click.passive="setModal('telegram')"
        >
          <AppIcon name="i-mdi-telegram" />
          <span>Привязать Telegram</span>
        </div>
        <NuxtLink class="header__user-row" to="/profile/referrals">
          <AppIcon name="i-mdi-cash" />
          <span>{{ coins(user.balance) }}</span>
        </NuxtLink>
        <NuxtLink class="header__user-row" to="/profile/favorites">
          <AppIcon name="i-mdi-cards-heart-outline" />
          <span>Избранное</span>
        </NuxtLink>
        <NuxtLink class="header__user-row" to="/chats">
          <AppIcon name="i-mdi-chat-question-outline" />
          <span>
            Написать нам
            <span v-if="user?.unread_messages_count" class="badge">new</span>
          </span>
        </NuxtLink>
        <NuxtLink class="header__user-row" to="/profile/settings">
          <AppIcon name="i-mdi-cog-outline" />
          <span>Настройки</span>
        </NuxtLink>

        <div class="header__user-row" @click.passive="logout">
          <AppIcon name="i-mdi-logout" />
          <span>Выход</span>
        </div>
      </template>
    </template>
  </DropDown>
</template>

<script setup>
  const { isAuthenticated, logout } = useApiAuth()
  const user = useApiUser()
</script>
