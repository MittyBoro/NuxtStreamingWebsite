<template>
  <form
    @submit.prevent="form.submit"
    class="profile__subscriptions form form-grid"
  >
    <div class="profile__subtitle">Управление подпиской</div>
    <ClientOnly>
      <table class="table">
        <tr>
          <th class="text-left pb-4"></th>
          <th class="pb-4" v-for="channel in subscriptions.channels">
            {{ translateChannel(channel) }}
          </th>
        </tr>
        <tr v-for="event in Object.keys(subscriptions.events)">
          <td
            :class="{
              'text-gray-500': !subscriptions.events[event],
              'font-medium': subscriptions.events[event],
            }"
          >
            {{ translateSubscriptionKey(event) }}
          </td>
          <td
            v-for="channel in subscriptions.channels"
            class="text-center py-1"
          >
            <label class="field__checkbox-label">
              <input
                :checked="userSubscriptions[`${channel}:${event}`]"
                @change="
                  userSubscriptionUpdate(channel, event, $event.target.checked)
                "
                type="checkbox"
                class="field__checkbox"
                :disabled="isDisabled(channel)"
              />
            </label>
          </td>
        </tr>
      </table>
    </ClientOnly>

    <div class="field__error">{{ form.error }}</div>
    <Button :loading="form.pending" button>Сохранить</Button>
  </form>
</template>

<script setup>
  const props = defineProps({
    user: Object,
    refresh: Function,
  })

  const { subscriptions } = useApiAttributes().value

  const { form, state } = await useApiForm(
    'users',
    {
      type: 'subscriptions',
      ...props.user,
    },
    {
      successNotify: true,
    },
  )

  const userSubscriptions = computed({
    get: () => {
      const list = {}

      state.subscriptions_list.map((x) => {
        list[`${x.channel_name}:${x.event_name}`] = true
      })
      return list
    },
  })
  const userSubscriptionUpdate = (channel, event, value) => {
    if (value) {
      state.subscriptions_list.push({
        channel_name: channel,
        event_name: event,
      })
    } else {
      state.subscriptions_list = state.subscriptions_list.filter(
        (x) => `${x.channel_name}:${x.event_name}` != `${channel}:${event}`,
      )
    }
  }

  const isDisabled = (channel) => {
    if (channel == 'telegram' && !state.telegram_id) {
      return true
    } else if (channel == 'mail' && !state.email) {
      return true
    } else {
      return false
    }
  }

  const translateChannel = (channel) => {
    switch (channel) {
      case 'telegram':
        return 'Telegram'
      case 'database':
        return 'Сайт'
      case 'mail':
        return 'Почта'
      default:
        return channel
    }
  }
</script>

<style lang="scss" scoped>
  .profile__subscriptions {
    .field__checkbox-label {
      display: flex;
      justify-content: center;
      margin: auto;
    }
    .field__checkbox {
      width: 1.5em;
      height: 1.5em;
    }
    tr {
      transition: background 0.15s ease;
      &:hover {
        background: var(--body-bg);
      }
    }
  }
</style>
