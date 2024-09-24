<template>
  <div class="comment__wrapper" :id="`comment-${comment.id}`">
    <div
      class="comment__item"
      :class="{
        'comment--deleted': comment.is_deleted,
        'animation-blink': form.pending,
      }"
    >
      <Avatar
        class="comment__avatar"
        :src="comment.user.avatar"
        shadow="5px"
        sizes="60px"
        :title="comment.user?.name"
      />
      <div class="comment__content">
        <template v-if="!comment.is_deleted">
          <div class="comment__top">
            <div
              v-if="!onlyInfo"
              class="comment__name preloading"
              :class="{ current: comment.user.id == user?.id && !onlyInfo }"
            >
              <AppIconPremium v-if="comment.user.has_premium" class="primary" />
              {{ comment.user.name }}
            </div>
            <div class="comment__commentable preloading" v-else>
              к
              {{ getNameByType(comment.commentable.type) }}
              <NuxtLink
                class="color"
                :to="`/${comment.commentable.type}s/${comment.commentable.slug}`"
                target="_blank"
              >
                {{ comment.commentable.title || comment.commentable.name }}
              </NuxtLink>
            </div>
            <HumanizeDate class="comment__date" :date="comment.created_at" />

            <div
              v-if="comment.user.id == user?.id"
              class="comment__actions preloading"
            >
              <div class="link" @click.passive="editing">
                <AppIcon v-if="!onlyInfo" name="i-mdi-circle-edit-outline" />
              </div>
              <div class="link" @click.passive="removing">
                <AppIcon name="i-mdi-trash-can-outline" />
              </div>
            </div>
          </div>
          <template v-if="!isEditing">
            <div class="prose comment__prose preloading">
              {{ comment.body }}
            </div>
            <div class="comment__bottom" v-if="!onlyInfo">
              <div
                v-if="canComment && depth < 2"
                class="comment__reply link preloading"
                @click.passive="parentId = comment.id"
              >
                Ответить
              </div>
              <LazyAppActionRating
                class="comment__rating preloading"
                :item="comment"
                :able="{
                  id: comment.id,
                  type: 'comment',
                }"
                iconLike="i-mdi-chevron-up"
                iconDislike="i-mdi-chevron-down"
                size="nano"
                showSum
              />
            </div>
          </template>
          <template v-else>
            <LazyCommentTextarea
              class="comment__textarea"
              :id="comment.id"
              v-model:body="comment.body"
              :cancel="() => (isEditing = false)"
            />
          </template>
        </template>
        <template v-else>
          <div class="comment__top">
            <div class="comment__name">Mr. Nobody</div>
            <HumanizeDate class="comment__date" :date="comment.created_at" />
          </div>
          <div class="prose comment__prose comment__prose--deleted">
            Комментария больше не существует...
          </div>
        </template>
      </div>
      <LazyCommentTextarea
        class="comment__textarea"
        v-if="!onlyInfo && parentId == comment.id"
        :parentId="parentId"
        :cancel="() => (parentId = null)"
      />
    </div>

    <div
      v-if="!onlyInfo"
      v-for="comment in comments.filter((c) => c.parent_id == comment.id)"
      :key="comment.id"
    >
      <CommentItem
        class="comment__nested"
        :comment="comment"
        v-model:parentId="parentId"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<script setup>
  const user = useApiUser()

  const canComment = computed(() => {
    return user.value && user.value.email_verified_at
  })

  const parentId = defineModel('parentId')

  const props = defineProps({
    comment: Object,
    onlyInfo: Boolean,
    depth: {
      type: Number,
      default: 0,
    },
  })
  const { onlyInfo, depth } = props
  const comment = ref(props.comment)

  const comments = onlyInfo ? [] : inject('comments')
  const emit = defineEmits(['updateActiveId'])

  const isEditing = ref(false)

  const getNameByType = (type) => {
    switch (type) {
      case 'video':
        return 'видео'
      case 'album':
        return 'фотоальбому'
      case 'actor':
        return 'актеру'
      default:
        return ''
    }
  }

  const editing = () => {
    isEditing.value = true
    parentId.value = null
  }
  const { form } = await useApiForm('comments', {
    id: comment.value.id,
  })

  const removing = async () => {
    if (confirm('Удалить комментарий?')) {
      await form.remove(() => {
        comment.value.is_deleted = true
      })
    }
  }
</script>

<style lang="scss" scoped>
  .comment {
    &__wrapper {
      margin-bottom: var(--space-sm);
      background: #7777770a;
      border-radius: 1rem 0;
    }
    &__item {
      display: grid;
      grid-template-columns: min-content 1fr;
      align-items: start;
      padding: var(--space-sm);
      gap: var(--space-sm);
      @include media-breakpoint-down(md) {
        gap: var(--space-xs);
      }
    }
    &__avatar {
      width: 60px;
      @include media-breakpoint-down(md) {
        width: 55px;
        transform: scale(0.8);
      }
    }
    &__content {
      width: 100%;
      .comment__textarea {
        margin-top: var(--space-sm);
      }
    }
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-xs) var(--space-base);
      margin-top: var(--space-xs);

      @include media-breakpoint-down(md) {
        align-self: flex-start;
        flex-wrap: wrap;
      }
    }
    &__name {
      display: flex;
      align-items: center;
      gap: var(--space-nano);
      font-weight: 600;
      @include media-breakpoint-down(md) {
        width: 100%;
      }
      &.current {
        color: var(--primary);
      }
      .icon {
        margin-top: 1px;
      }
    }
    &__commentable {
      font-size: var(--text-xs);
      font-weight: 600;
      @include media-breakpoint-down(md) {
        width: 100%;
      }
    }
    &__date {
      margin-left: auto;
      color: var(--body-color-alt);
      font-size: var(--text-sm);
      @include media-breakpoint-down(md) {
        margin: 0 auto 0 0;
      }
    }
    &__actions {
      display: flex;
      align-items: center;
      align-self: center;
      gap: var(--space-nano);
    }
    &__prose {
      margin: var(--space-xs) 0;
      white-space: pre-line;
    }
    &__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-base);
    }
    &__reply {
      font-size: var(--text-sm);
      font-weight: 600;
    }
    &__rating {
      margin-left: auto;
    }
    &__favorite {
      display: flex;
      align-items: center;
      gap: var(--space-nano);
      font-size: var(--text-sm);
      margin-left: auto;
      &-count {
        font-size: var(--text-xs);
        font-weight: 600;
      }
    }

    &__textarea {
      grid-column: 2/-1;
      @include media-breakpoint-down(md) {
        grid-column: 1/-1;
      }
    }

    &__nested {
      margin-top: var(--space-xs);
      margin-left: var(--space-base);
      @include media-breakpoint-down(md) {
        margin-left: var(--space-xs);
      }
    }
    &--deleted {
      opacity: 0.5;
    }
  }
</style>
