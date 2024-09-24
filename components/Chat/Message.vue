<template>
  <div class="chat__item">
    <Avatar class="chat__avatar" :src="user.avatar" shadow="5px" />
    <div class="chat__message">
      <div class="chat__message-top">
        <div class="chat__message-name">
          <span>{{ user.name }}</span>
          <span style="font-size: 0.8em" v-if="user.role == 'admin'">
             [админ]
          </span>
        </div>
        <div class="chat__message-date">
          {{ formatDate(message.created_at) }}
        </div>
      </div>
      <div class="chat__message-text prose">
        {{ message.text?.trim() }}
      </div>
      <div v-if="message.files?.length" class="chat__message-files">
        <NuxtLink
          v-for="file in message.files"
          :key="file.name"
          :to="file.url"
          target="_blank"
        >
          <AppIcon name="i-mdi-paperclip" />
          {{ file.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  const authUser = useApiUser()

  const props = defineProps({
    message: Object,
    participants: Array,
  })

  const user = computed(() => {
    const user = props.participants.find(
      (item) => item.id == props.message.user_id,
    )

    if (!user) {
      return {
        id: props.message.user_id,
        name: '???',
      }
    }

    if (authUser.value.id == user.id) {
      user.name = 'Вы'
    }
    return user
  })
</script>

<style lang="scss" scoped>
  .chat {
    &__item {
      display: flex;
      align-items: flex-end;
      gap: var(--space-sm);
      margin-bottom: var(--space-base);
      max-width: 100%;
      word-break: break-word;
      &:last-child {
        margin-bottom: 0;
      }
      @include media-breakpoint-down(md) {
        gap: var(--space-xs);
        margin-bottom: var(--space-sm);
      }
    }
    &__avatar {
      width: 50px;
      @include media-breakpoint-down(md) {
        width: 35px;
      }
    }
    &__message {
      padding: var(--space-sm);
      max-width: 100%;
      font-size: var(--text-sm);
      background: var(--body-bg-alt);
      border-radius: 1rem 0;
      white-space: pre-line;
      word-wrap: break-word;
      overflow-wrap: break-word;

      &-top {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--space-sm);
        margin-bottom: var(--space-xs);
      }
      &-name {
        font-weight: 600;
        font-size: var(--text-base);
      }
      &-date {
        opacity: 0.5;
      }
      &-files {
        margin-top: 5px;
        display: grid;
      }
    }
  }
</style>
