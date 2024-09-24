<template>
  <span class="preloading">
    {{ dateStr }}
  </span>
</template>

<script setup>
  const { date } = defineProps({
    date: {
      type: String,
    },
  })

  const dateStr = ref(humanizeDate(date))

  let timerId = null

  if (process.client) {
    onMounted(() => {
      timerId = setInterval(() => {
        dateStr.value = humanizeDate(date)
      }, 30000)
    })

    onUnmounted(() => {
      if (timerId) {
        clearTimeout(timerId)
      }
    })
  }
</script>
