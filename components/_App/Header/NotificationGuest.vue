<template>
  <DropDown
    class="preloading"
    v-model:active="active"
    :hovering="false"
    :isList="false"
  >
    <template #default>
      <div
        class="hn-bell link"
        :class="{ 'active color': active }"
        @click.passive="onBellClick"
      >
        <AppIcon name="i-mdi-bell-outline" />
        <div v-if="notifications.unread_count" class="chip">
          {{ notifications.unread_count }}
        </div>
      </div>
    </template>
    <template #list>
      <div class="hn-list">
        <div class="hn-item">
          <div class="hni-description">
            Авторизуйтесь или зарегистрируйтесь, чтобы оценивать материалы и
            писать комментарии
          </div>
          <div class="hni-bottom">
            <div class="hni-actions">
              <div
                @click.passive="setModal('registration')"
                target="_blank"
                class="button button-alt-nano"
              >
                Регистрация
                <AppIcon name="i-mdi-at" />
              </div>
              <div
                @click="setModal('telegram')"
                target="_blank"
                class="button button-alt-nano"
              >
                Через Telegram
                <AppIcon name="i-mdi-telegram" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DropDown>
</template>

<script setup>
  const active = ref(false)

  const guestCount = useLocalStorage('guestNotificationsCount', 1)
  const notifications = ref({
    unread_count: parseInt(guestCount.value),
    count: 1,
  })

  const onBellClick = () => {
    notifications.value.unread_count = 0
    guestCount.value = 0
    active.value = !active.value
  }
</script>
