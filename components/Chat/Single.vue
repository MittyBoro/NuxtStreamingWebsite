<template>
  <div class="chat__card card" id="chat">
    <div class="card__inner">
      <div class="profile__subtitle color" v-if="user.role == 'admin'">
        Вы являетесь администратором, пройдите в панель управления
      </div>
      <div class="chat__subject">
        <span>
          Тема:
          <span>{{ meta.subject }}</span>
        </span>
        <NuxtLink to="/chats">
          <AppIcon name="i-mdi-keyboard-backspace" />
          <span class="chat__back-text"> Назад</span>
        </NuxtLink>
      </div>
      <div class="chat__window card">
        <div class="chat__inner" ref="chatRef">
          <div
            v-if="meta.current_page < meta.last_page"
            class="chat__more link"
            @click.passive="page = meta.current_page + 1"
          >
            Предыдущие сообщения
          </div>
          <template v-for="message in list" :key="message.id">
            <ChatMessage :message="message" :participants="meta.participants" />
          </template>
        </div>
      </div>
      <form @submit.prevent="submit" class="chat__bottom">
        <LazyFieldTextarea
          v-model="state.text"
          class="chat__textarea"
          placeholder="Сообщение"
          @keyup.enter.prevent="submit"
        />
        <div class="buttons-col">
          <label
            :disabled="form.pending"
            button
            class="chat__button button button-alt-mini button-square"
          >
            <input
              type="file"
              style="display: none"
              multiple
              @change="setFiles"
            />
            <AppIcon name="i-mdi-paperclip-plus" />
          </label>
          <Button
            :loading="form.pending"
            :disabled="form.pending"
            button
            class="chat__button button-mini button-square"
          >
            <AppIcon name="i-mdi-send" />
          </Button>
        </div>
        <div class="chat__files" v-if="state.files.length">
          <div
            class="chat__file"
            v-for="(file, i) in state.files"
            :key="state.files"
          >
            <span>{{ file.name }}</span>
            <span class="link cf-remove" @click.passive="removeFile(i)">
              <AppIcon name="i-mdi-close" />
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { useLaravelEcho } from '~/composables/client/useLaravelEcho'

  import sound from '/sounds/message.mp3'
  const soundMsg = new Audio(sound)

  const $Echo = useLaravelEcho()

  const chatRef = ref(null)
  const chatId = useRoute().params.id
  const user = useApiUser()
  const page = defineModel('page')

  const props = defineProps({
    list: Array,
    meta: Object,
    chatId: String,
  })

  const { form, state } = await useApiForm(
    `../chats/chats/${chatId}/message`,
    {
      text: '',
      files: [],
    },
    {
      onError: () => {
        const msg = props.list.pop()
        state.text = msg.text
        state.files = msg.files
      },
    },
  )

  const setFiles = (event) => {
    Array.from(event.target.files).forEach((file, i) => {
      if (i > 5) {
        useNotify().error('Можно выбрать не более 5-ти файлов')
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        useNotify().error('Файл должен быть не более 10 МБ')
        return
      }
      state.files.push({
        file: file,
        name: file.name,
        url: URL.createObjectURL(file),
      })
    })
  }
  const removeFile = (i) => {
    state.files.splice(i, 1)
  }

  const scrollToBottom = () => {
    chatRef.value.scrollTop = chatRef.value.scrollHeight
  }

  const submit = async (e) => {
    if (e.shiftKey || e.ctrlKey || !state.text.trim()) return

    props.list.push({
      user_id: user.value.id,
      text: state.text,
      files: state.files,
      created_at: new Date().toISOString(),
    })
    setTimeout(() => {
      state.text = ''
      state.files = []
    }, 1)
    setTimeout(() => {
      scrollToBottom()
    }, 100)
    await form.submit()
  }

  const addToParticipants = (user) => {
    if (!props.meta.participants.find((item) => item.id == user.id)) {
      props.meta.participants.push(user)
    }
  }

  watch(
    () => state.text,
    (val) => {
      $Echo.private(`chat.${chatId}`).whisper('typing', {
        name: user.value.name,
        text: val,
      })
    },
  )

  const markRead = async () => {
    await $api('../chats/chats/' + chatId, {
      method: 'PUT',
    })
  }

  let readingTimer = null
  onMounted(() => {
    readingTimer = setTimeout(markRead, 1500)
    setTimeout(() => {
      scrollToElement('#chat')
      scrollToBottom()
    }, 400)

    $Echo
      .join(`chat.${chatId}`)
      .here((users) => {
        users.forEach(addToParticipants)
      })
      .joining((user) => {
        addToParticipants(user)
      })
      .listen('.new_message', ({ chatMessage: message }) => {
        props.list.push(message)

        markRead()
        soundMsg.play()
        setTimeout(() => {
          scrollToBottom()
        }, 10)
      })
  })

  onUnmounted(() => {
    $Echo.leave(`chat.${chatId}`)
    clearTimeout(readingTimer)
  })
</script>

<style lang="scss" scoped>
  .chat {
    &__subject {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-sm);
      margin-bottom: var(--space-base);
      font-weight: 600;
      a {
        display: flex;
        align-items: center;
        font-size: var(--text-sm);
        @include media-breakpoint-down(md) {
          font-size: var(--text-base);
        }
      }
    }
    @include media-breakpoint-down(md) {
      &__back-text {
        display: none;
      }
    }

    &__window {
      display: flex;
      flex-direction: column;
    }
    &__chat {
      position: relative;
      height: 100%;
      @include media-breakpoint-down(md) {
        margin: 0 calc(var(--space-base) * -1);
        border-radius: 0;
      }
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(
          to bottom,
          var(--body-bg),
          #0000 var(--space-base),
          #0000 calc(100% - var(--space-base)),
          var(--body-bg)
        );
      }
    }
    &__inner {
      max-height: 60vh;
      min-height: 300px;
      background: var(--body-bg);
      padding: var(--space-base) var(--space-base);
      overflow-y: auto;
      @include media-breakpoint-down(md) {
        padding: var(--space-sm);
      }
    }

    &__more {
      margin-bottom: var(--space-base);
      font-size: var(--text-sm);
      text-align: center;
      @include media-breakpoint-down(md) {
        font-size: var(--text-base);
      }
    }

    &__bottom {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: flex-end;
      margin-top: auto;
      padding-top: var(--space-base);
      @include media-breakpoint-down(md) {
        padding-top: var(--space-sm);
      }
      .buttons-col {
        display: grid;
        gap: var(--space-xs);
      }
    }
    &__textarea :deep(textarea) {
      max-height: 100px;
      border-bottom-right-radius: 0;
    }
    &__button {
      display: flex;
      margin-left: var(--space-xs);
      span {
        transform: scale(1.5);
      }
    }
    &__files {
      margin-top: var(--space-xs);
      font-size: var(--text-sm);
    }
    &__file {
      display: flex;
      justify-content: space-between;
      gap: 5px;
      max-width: 150px;
      .cf-remove {
        cursor: pointer;
        &:hover {
          color: var(--alert);
        }
      }
    }
  }
</style>
