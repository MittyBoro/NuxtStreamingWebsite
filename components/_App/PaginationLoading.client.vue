<template>
  <div
    class="pagination__loading preloading"
    :class="{ loading }"
    ref="paginationRef"
  >
    <span>Загрузка контента</span>
    <AppIcon name="i-mdi-loading" class="animation-round" />
  </div>
</template>

<script setup>
  const props = defineProps({
    loadNextPage: Function,
  })

  const loadMore = async () => {
    if (loading.value) return
    loading.value = true
    await props.loadNextPage()
    setTimeout(() => {
      loading.value = false
    }, 100)
  }

  const loading = ref(false)
  const paginationRef = ref(null)
  // Функция, которая будет вызвана, когда элемент приблизится на 100px к видимой области
  const onIntersect = (entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        loadMore()
      }
    }
  }
  // Опции для Intersection Observer
  const options = {
    root: null, // относительно вьюпорта
    rootMargin: '50px 0px 400px 0px', // отступы от границ вьюпорта, 100px снизу
    threshold: 1, // минимальное количество элемента, которое должно быть видно для активации коллбэка
  }
  const observer = new IntersectionObserver(onIntersect, options)

  const scrollObserver = () => {
    if (paginationRef.value && isElementInViewport(paginationRef.value)) {
      loadMore()
    }
  }

  // Подписываемся на изменения видимости элемента
  onMounted(() => {
    setTimeout(() => {
      if (props.loadNextPage) {
        window.addEventListener(
          'scroll',
          () => {
            if (paginationRef.value) {
              observer.observe(paginationRef.value)
            }
          },
          {
            passive: true,
            once: true,
          },
        )
        window.addEventListener('scroll', scrollObserver, {
          passive: true,
        })
      }
    }, 500)
  })

  // Не забудьте отписаться от наблюдения, когда элемент будет размонтирован
  onUnmounted(() => {
    if (paginationRef.value) {
      observer.unobserve(paginationRef.value)
    }
    window.removeEventListener('scroll', scrollObserver)
  })
</script>

<style lang="scss" scoped>
  .pagination {
    &__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      opacity: 0.5;
      font-size: var(--text-sm);
      &:not(.loading) {
        opacity: 0;
        height: 1px;
        overflow: hidden;
        visibility: hidden;
      }
    }
  }
</style>
