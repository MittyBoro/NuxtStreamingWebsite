<template>
  <div class="card" id="comments">
    <div class="card__inner">
      <div class="comments__title preloading">
        <span id="comment-total">
          {{ comments.length }}
        </span>
        {{
          declension(comments.length, [
            'комментарий',
            'комментария',
            'комментариев',
          ])
        }}
      </div>
      <div v-if="wokeUp && user?.email_verified_at">
        <LazyCommentTextarea v-if="!parentId" v-model:parentId="parentId" />
      </div>
      <div v-else class="comments__disabled">
        <div v-show="!user">
          <span @click="setModal('login')" class="link primary">Войдите</span>
          или
          <span @click="setModal('registration')" class="link primary">
            зарегистрируйтесь
          </span>
          чтобы оставлять комментарии
        </div>
        <div v-show="user">
          Подтвердите свою почту, чтобы оставлять комментарии
        </div>
      </div>

      <div
        class="comments__list"
        :class="{ 'comments__list--short': !showAll }"
      >
        <template
          v-for="comment in comments.filter((c) => !c.parent_id)"
          :key="comment.id"
        >
          <CommentItem :comment="comment" v-model:parentId="parentId" />
        </template>
      </div>
      <ClientOnly>
        <Button
          v-if="!showAll"
          class="button-alt-mini comments__show-more preloading"
          @click.passive="showAll = true"
        >
          показать все
        </Button>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
  const user = useApiUser()

  const wokeUp = useWokeUp()

  const { list } = defineProps({
    list: {
      type: Array,
      default: () => [],
    },
  })

  const comments = ref(list)
  const parentId = ref(null)

  provide('comments', comments)

  const showAll = ref(user?.value || comments.value?.length < 3)
</script>

<style lang="scss" scoped>
  .comments__title {
    margin-bottom: var(--space-base);
    font-weight: 600;
  }

  .comments__list--short {
    overflow: hidden;
    max-height: 400px;
    mask-image: linear-gradient(
      to bottom,
      #000,
      #000 calc(100% - 50px),
      transparent calc(100%)
    );
  }
  .comments__show-more {
    margin-top: var(--space-base);
  }
  .comments__disabled {
    color: var(--body-color-alt);
    font-size: var(--text-sm);
    & ~ .comments__list:not(:empty) {
      margin-top: var(--space-md);
    }
  }
</style>
