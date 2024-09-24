<template>
  <div class="categories-page__container">
    <div
      v-for="letter in categoriesByLetter"
      :key="letter.letter"
      class="categories-page__letter"
    >
      <div>
        <div class="button button-mini" :id="letter.letter">
          {{ letter.letter }}
        </div>
      </div>
      <ul class="text-sm">
        <li v-for="category in letter.categories" :key="category.id">
          <NuxtLink
            class="link dotted-row"
            :to="`/categories/${category.slug}`"
          >
            <span>{{ category.title }}</span>
            <span class="dotted-line"></span>
            <span>{{ category.video_count }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    list: Array,
    meta: Object,
    pending: Boolean,
    loadNextPage: Function,
  })

  const categoriesByLetter = computed(() => {
    let alphabetArray = []

    const words = props.list
      .sort((a, b) => a.title.toLowerCase().localeCompare(b.title, 'ru'))
      .map((category) => category.title)

    let currentLetter = ''
    let letterGroup = { letter: '', words: [] }

    for (let i = 0; i < words.length; i++) {
      let word = words[i]
      let firstLetter = word.charAt(0).toUpperCase() // Получаем заглавную букву

      if (firstLetter !== currentLetter) {
        if (letterGroup.letter !== '') {
          alphabetArray.push(letterGroup)
        }

        letterGroup = { letter: firstLetter, categories: [] }
        currentLetter = firstLetter
      }

      letterGroup.categories.push(props.list[i])
    }

    // Добавляем последнюю группу букв и слов
    if (letterGroup.letter !== '') {
      alphabetArray.push(letterGroup)
    }

    return alphabetArray
  })
</script>

<style lang="scss" scoped>
  .categories-page {
    &__container {
      column-count: 4;
      column-gap: var(--space-lg);
      @include media-breakpoint-down(xl) {
        column-count: 3;
      }
      @include media-breakpoint-down(md) {
        column-count: 2;
        column-gap: var(--space-base);
      }
      @include media-breakpoint-down(sm) {
        column-count: 1;
      }
    }
    &__letter {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-xs);
      break-inside: avoid;

      margin-bottom: var(--space-sm);

      font-size: var(--text-sm);
      ul {
        display: grid;
        width: 100%;
        gap: var(--space-nano);
      }
    }
  }
</style>
