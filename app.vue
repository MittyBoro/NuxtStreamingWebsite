<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="var(--primary)" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  useMetrika()
  useFavicon()

  const route = useRoute()

  // дефолтный чёрный
  if (process.server) {
    useHead({
      htmlAttrs: {
        class: 'dark',
      },
    })
  }

  // перевод в нижний регистр (для сео)
  if (route.path.toLowerCase() != route.path) {
    await navigateTo(route.fullPath.toLowerCase(), {
      redirectCode: 301,
    })
  }

  // если в ?o= есть занк вопроса (фикс бага для сео)
  if (route.query.o?.includes('?')) {
    await navigateTo(route.path, {
      query: {
        ...route.query,
        o: route.query.o.split('?')[0],
      },
      redirectCode: 301,
    })
  }

  // редирект первой страницы (для сео)
  if (route.query.page == 1) {
    await navigateTo(route.path, {
      query: {
        ...route.query,
        page: undefined,
      },
      redirectCode: 301,
    })
  }

  // рефералочка
  const referrer_id = useCookie('referrer_id', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })
  onMounted(() => {
    if (process.client) {
      if (route.query.ref) {
        if (!referrer_id.value) {
          referrer_id.value = route.query.ref
        }
        navigateTo({
          query: {
            ...route.query,
            ref: undefined,
          },
        })
      }
    }
  })

  const wokeUp = ref(false)

  provide('wokeUp', wokeUp)

  if (process.client) {
    const pagesViewed = useLocalStorage('pagesViewed', 0)

    watch(
      () => route.path,
      () => {
        pagesViewed.value++
      },
      {
        immediate: true,
      },
    )

    let customEvent = new CustomEvent('wokeUp', {
      detail: {},
      bubbles: false, // Указываем, что событие может всплывать
      cancelable: false, // Указываем, что событие можно отменить
    })
    const dispatchEvent = () => {
      document.dispatchEvent(customEvent)
      document.wokeUp = true

      wokeUp.value = true

      window.removeEventListener('scroll', dispatchEvent)
      window.removeEventListener('touchstart', dispatchEvent)
      document.removeEventListener('mouseenter', dispatchEvent)
    }
    window.addEventListener('scroll', dispatchEvent, {
      once: true,
      passive: true,
    })
    window.addEventListener('touchstart', dispatchEvent, {
      once: true,
      passive: true,
    })
    document.addEventListener('mouseenter', dispatchEvent, {
      once: true,
      passive: true,
    })

    onMounted(() => {
      if (pagesViewed.value > 2) {
        dispatchEvent()
      }
    })
  } else {
    provide('wokeUp', ref(false))
  }
</script>
