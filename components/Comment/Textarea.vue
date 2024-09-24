<template>
  <div>
    <div class="comment__textarea">
      <form
        @submit.prevent="form.submit"
        class="comment__textarea-inner preloading"
      >
        <LazyFieldTextarea
          placeholder="Оставить комментарий"
          v-model="state.body"
          required
        />
        <div class="comment__textarea-bottom">
          <Button
            class="button-mini comment__button"
            :loading="form.pending"
            button
          >
            Отправить
          </Button>
          <div
            v-if="cancel"
            class="button button-alt-mini comment__button comment__button-cancel"
            @click.passive="cancel"
          >
            Отмена
          </div>
        </div>
      </form>
    </div>
    <LazyAppDelimiter class="comment__delimiter" />
  </div>
</template>

<script setup>
  const body = defineModel('body', {
    type: String,
    default: '',
  })

  const { id, parentId, cancel } = defineProps({
    id: {
      type: Number,
      default: null,
    },
    parentId: {
      type: Number,
      default: null,
    },
    cancel: {
      type: Function,
      default: null,
    },
  })

  const { id: commentable_id, type: commentable_type } = injectAble()

  const comments = inject('comments')

  const { form, state } = await useApiForm(
    'comments',
    {
      id,
      body: body.value || '',
      parent_id: parentId,
      commentable_id,
      commentable_type,
    },
    {
      onSuccess({ data }) {
        if (data) {
          comments.value.unshift(data)
          state.body = ''
        }
        if (id) {
          body.value = state.body
        }
        if (cancel) {
          cancel()
        }
      },
    },
  )
</script>

<style lang="scss" scoped>
  .comment {
    &__textarea {
      position: relative;
      &-inner {
        position: relative;
      }
      &-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: var(--space-xs);
      }
    }
    &__button-cancel {
      background: transparent;
    }
    &__delimiter {
      margin: var(--space-base) 0;
    }
  }
</style>
