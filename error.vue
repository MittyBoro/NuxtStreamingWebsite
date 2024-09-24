<template>
  <section class="container error-container">
    <!-- <AppMouseLight /> -->
    <div class="error-page__card">
      <h1>{{ error.statusCode }}</h1>
      <div>
        <div v-if="showData" style="text-align: left">
          <h2>{{ error.message }}</h2>
          <p v-html="error.stack"></p>
        </div>
        <template v-else-if="error.statusCode === 404">
          <h2>Страница не найдена</h2>
          <a href="/">
            <Button class="button-alt-mini">Вернуться на главную</Button>
          </a>
        </template>
        <template v-else>
          <h2>Что-то сломалось...</h2>
          <p style="margin-top: -0.7em">Мы скоро всё починим :)</p>
        </template>
      </div>
    </div>
    <LazyAppTopList v-if="error.statusCode < 500" delimiterHidden titleCenter>
      <template #videos>
        <h2>ТОП за неделю</h2>
      </template>
      <template #actors>
        <h4>Популярные модели</h4>
      </template>
      <template #categories>
        <h3>Тренды</h3>
      </template>
      <template #studios>
        <h5>Популярные студии</h5>
      </template>
    </LazyAppTopList>
  </section>
</template>

<script setup>
  useFavicon()

  provide('wokeUp', ref(true))

  const props = defineProps({
    error: Object,
  })

  const showData = ref(false)

  if (process.client) {
    let keySequence = []
    addEventListener('keydown', (event) => {
      const key = event.key
      keySequence.push(key)
      if (keySequence.length > 4) {
        keySequence.shift()
      }
      if (keySequence.join('') === '1488') {
        keySequence = []
        showData.value = !showData.value
      }
    })
  }
</script>
