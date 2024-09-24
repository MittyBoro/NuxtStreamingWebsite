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
        :class="{ 'active color': active, 'animation-blink': loading }"
        @click.passive="active = !active"
      >
        <AppIcon name="i-mdi-bell-outline" />
        <div v-if="notifications.unread_count" class="chip">
          {{ notifications.unread_count }}
        </div>
      </div>
    </template>
    <template #list>
      <div class="hn-list">
        <div class="hn-title">
          <span v-if="notifications.unread_count">
            Новые уведомления ({{ notifications.unread_count }})
          </span>
          <span v-else-if="notifications.count">
            Все уведомления ({{ notifications.count }})
          </span>
          <span v-else style="margin: auto">Нет уведомлений</span>
          <span
            v-if="notifications.count"
            @click.passive="deleteNotifications"
            class="link"
          >
            Очистить
            <AppIcon name="i-mdi-close" />
          </span>
        </div>

        <div
          @mouseover="readNotifications"
          v-for="n in notifications.list"
          :key="n.id"
          class="hn-item"
          :class="{ unread: !n.read_at, 'animation-blink': loading }"
        >
          <div class="hni-title">{{ n.data.title }}</div>
          <div v-if="n.data.description" class="hni-description">
            {{ n.data.description }}
          </div>
          <div class="hni-bottom">
            <div class="hni-actions">
              <NuxtLink
                v-if="n.data.url"
                :to="n.data.url"
                class="button button-alt-nano"
              >
                {{ n.data.url_text || 'Открыть' }}
              </NuxtLink>
              <NuxtLink
                v-if="n.data.panel_url"
                :to="n.data.panel_url"
                target="_blank"
                class="button button-alt-nano"
              >
                Открыть в ПУ
                <AppIcon name="i-mdi-arrow-top-right-bold-box-outline" />
              </NuxtLink>
            </div>
            <div v-if="n.created_at" class="hni-date">
              {{ formatDate(n.created_at) }}
            </div>
          </div>
        </div>

        <div
          @click.passive="loadMore"
          v-if="notifications.current_page < notifications.last_page"
          class="hn-load-more link"
        >
          Предыдущие
        </div>
      </div>
    </template>
  </DropDown>
</template>

<script setup>
  import { useLaravelEcho } from '~/composables/client/useLaravelEcho'
  import sound from '/sounds/notification.mp3'
  const soundMsg = new Audio(sound)

  const active = ref(false)
  const loading = ref(false)

  const user = useApiUser()
  const $Echo = useLaravelEcho()

  const notifications = computed(
    () =>
      user.value?.notifications ?? {
        unread_count: 0,
        count: 0,
      },
  )

  const loadMore = async () => {
    notifications.value.current_page++
    const { data } = await $api(
      `/../v1/users/me/?page=${notifications.value.current_page}`,
    )
    notifications.value.list.push(...data.notifications.list)
  }

  const readNotifications = async () => {
    if (!user.value.notifications?.unread_count || loading.value) return
    loading.value = true
    await $api('../v1/users/me/notifications', {
      method: 'POST',
    })
    loading.value = false

    notificationsSetRead()
    $Echo.private(`users.${user.value.id}`).whisper('notifications_read')
  }
  const deleteNotifications = async () => {
    loading.value = true
    await $api('../v1/users/me/notifications', {
      method: 'DELETE',
    })
    loading.value = false

    notificationsSetDeleted()
    $Echo.private(`users.${user.value.id}`).whisper('notifications_deleted')
  }
  const notificationsSetRead = () => {
    user.value.notifications.unread_count = 0
    user.value.notifications.list?.forEach((n) => {
      if (!n.read_at) {
        n.read_at = new Date().toISOString()
      }
    })
  }
  const notificationsSetDeleted = () => {
    user.value.notifications.list = []
    user.value.notifications.unread_count = 0
    user.value.notifications.count = 0
    user.value.notifications.last_page = 0
  }

  onMounted(() => {
    $Echo
      .private(`users.${user.value.id}`)
      .notification((notification) => {
        useNotify().notify(notification.title)
        notifications.value.unread_count++
        notifications.value.count++

        notifications.value.list.unshift({
          id: Math.random(),
          data: notification,
          created_at: new Date().toISOString(),
        })

        soundMsg.play()
      })
      .listen('.unread_messages_changed', ({ unread_messages_count }) => {
        user.value.unread_messages_count = unread_messages_count
      })
      .listenForWhisper('notifications_read', (e) => {
        notificationsSetRead()
      })
      .listenForWhisper('notifications_deleted', (e) => {
        notificationsSetDeleted()
      })
  })
  onBeforeUnmount(() => {
    if (user.value) {
      $Echo.leave(`users.${user.value.id}`)
    }
  })
</script>
