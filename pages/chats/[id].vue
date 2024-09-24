<template>
  <div class="chat">
    <ClientOnly v-if="meta">
      <section class="container" :class="{ 'loading-box': pending }">
        <LazyChatSingle
          :list="list"
          :meta="meta"
          :chatId="chatId"
          v-model:page="messagePage"
        />
      </section>
    </ClientOnly>
  </div>
</template>

<script setup>
  const user = useApiUser()

  if (!user.value) {
    await navigateTo('/chats', { redirectCode: 302 })
  }

  useSeoMeta({
    title: 'Чат | ProjectName',
  })

  const chatId = useRoute().params.id

  const list = ref([])
  const meta = ref({})
  const messagePage = ref(1)

  const { pending } = await useApi(`../chats/chats/${chatId}`, {
    query: {
      page: messagePage,
    },
    server: false,
    watch: [() => messagePage.value],
    onResponse: ({ response: { _data } }) => {
      list.value = [...(_data.data || []), ...list.value]
      meta.value = _data.meta || {}
    },
    onResponseError: (error) => {
      if (error.response.status === 404) {
        navigateTo('/chats')
      }
    },
  })
</script>

<style lang="scss" scoped>
  .chat {
    max-width: 770px;
    margin: auto;
    &__icon {
      margin-left: 0.5em;
    }
    &__card {
      margin-bottom: var(--space-base);
    }
  }
</style>
