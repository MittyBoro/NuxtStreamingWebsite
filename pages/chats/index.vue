<template>
  <div class="chat">
    <section class="container">
      <LazyPageTitleRow>
        <template #title>{{ page.title }}</template>
      </LazyPageTitleRow>

      <LazyPageDescription :text="page.description" onlyFull />

      <ClientOnly v-if="user">
        <ChatList />
        <ChatForm />
      </ClientOnly>

      <div v-else class="chat__card card chat__guest">
        <div class="card__inner">
          <div class="chat__guest-subtitle">
            Чаты доступны только авторизованным пользователям
          </div>

          <Button
            @click.passive="setModal('login')"
            target="_blank"
            class="button button-alt"
          >
            Войти
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  const { page } = await useApiPage('chat')

  const user = useApiUser()

  useHead({
    meta: [{ name: 'robots', content: 'noindex' }],
  })
  useSeoMeta({
    title: page.value.title,
    description: page.value.description,
  })
</script>

<style lang="scss" scoped>
  :deep(.bottom-description) {
    margin: var(--space-xs) 0 var(--space-base);
  }
  .chat__guest {
    text-align: center;
    margin-top: var(--space-base);
    &-subtitle {
      margin-bottom: var(--space-sm);
    }
  }
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
