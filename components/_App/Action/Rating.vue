<template>
  <div class="rating">
    <span class="rating-int" v-if="props.showSum">
      {{ item.likes - item.dislikes }}
    </span>
    <div class="buttons-list">
      <Button
        class="button-up"
        :class="likeClass"
        @click.passive="liked = !liked"
        :loading="isLoading"
      >
        <AppIcon :name="iconLike" />
        <span v-if="item.likes && !props.showSum">
          {{ formatRatingValue(item.likes) }}
        </span>
      </Button>
      <Button
        class="button-down"
        :class="dislikeClass"
        @click.passive="disliked = !disliked"
        :loading="isLoading"
      >
        <AppIcon :name="iconDislike" />
        <span v-if="item.dislikes && !props.showSum">
          {{ formatRatingValue(item.dislikes) }}
        </span>
      </Button>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    item: Object,
    showSum: Boolean,
    able: {
      type: Object,
      default: () => injectAble(),
    },
    size: {
      type: String,
      default: 'mini',
    },
    iconLike: {
      type: String,
    },
    iconDislike: {
      type: String,
    },
  })
  const item = props.item
  const { id: statable_id, type: statable_type } = props.able

  let storageSuffix = statable_type + '-' + statable_id

  const liked = ref(false)
  const disliked = ref(false)

  const iconLike = computed(() => {
    return props.iconLike || 'i-mdi-thumb-up' + (liked.value ? '' : '-outline')
  })
  const iconDislike = computed(() => {
    return (
      props.iconDislike ||
      'i-mdi-thumb-down' + (disliked.value ? '' : '-outline')
    )
  })

  const likeClass = computed(() => [
    'button-alt' + (props.size ? `-${props.size}` : ''),
    { active: liked.value },
  ])
  const dislikeClass = computed(() => [
    'button-alt' + (props.size ? `-${props.size}` : ''),
    { active: disliked.value },
  ])

  const formatRatingValue = (value) => {
    return value < 0 ? 0 : formatNumber(value)
  }

  onMounted(() => {
    const likedSt = useLocalStorage('isLiked-' + storageSuffix, false)
    const dislikedSt = useLocalStorage('isDisliked-' + storageSuffix, false)

    liked.value = likedSt.value
    disliked.value = dislikedSt.value

    watch(
      () => liked.value,
      (value) => {
        likedSt.value = value
        if (value && disliked.value) {
          disliked.value = false
        }
        let increment = value ? 1 : -1
        item.likes += increment
        sendData('likes', increment)
      },
    )
    watch(
      () => disliked.value,
      (value) => {
        dislikedSt.value = value
        if (value && liked.value) {
          liked.value = false
        }
        let increment = value ? 1 : -1
        item.dislikes += increment
        sendData('dislikes', increment)
      },
    )
  })
  const isLoading = ref(false)

  const sendData = async (type, value) => {
    const form = reactive({
      type,
      value,
      statable_id,
      statable_type,
    })

    isLoading.value = true

    try {
      await $api('/stats', {
        method: 'POST',
        body: form,
      })
    } catch (e) {
      console.error(e)
      useNotify().error(e.response?._data?.message || 'Произошла ошибка')
    } finally {
      isLoading.value = false
    }
  }
</script>
<style lang="scss" scope>
  .rating {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }
  .rating-int {
    font-size: var(--text-xs);
    font-weight: 600;
  }
  .button-up {
    &:hover,
    &.active {
      color: var(--green);
    }
  }
  .button-down {
    &:hover,
    &.active {
      color: var(--alert);
    }
  }
</style>
