<template>
  <span v-if="!hidden">
    {{ formatNumberViews(views) }}
  </span>
</template>

<script setup>
  const props = defineProps({
    views: {
      type: [Number, String],
      default: 0,
    },
    disableAction: Boolean,
    hidden: {
      type: Boolean,
      default: false,
    },
  })

  const views = ref(props.views || 0)

  const { id: statable_id, type: statable_type } = injectAble()

  let timerId = null
  onMounted(() => {
    if (props.disableAction) {
      return
    }
    const storageSuffix = statable_type + '-' + statable_id
    const viewed = useSessionStorage('isViewed-' + storageSuffix, false)
    if (!viewed.value) {
      timerId = setTimeout(() => {
        $api('/stats', {
          method: 'POST',
          body: {
            type: 'views',
            value: 1,
            statable_id,
            statable_type,
          },
        })
        viewed.value = true
        views.value++
      }, 700)
    }
  })

  onBeforeUnmount(() => {
    if (timerId) {
      clearTimeout(timerId)
    }
  })
</script>
