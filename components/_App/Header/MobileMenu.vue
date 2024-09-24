<template>
  <Transition>
    <div class="mobile-menu" id="menu">
      <div class="mobile-menu__wrapper">
        <div class="container mobile-menu__container">
          <nav class="mobile-menu__nav">
            <NuxtLink to="/?o=premium">
              <AppIconPremium animated />
              <span>Премиум</span>
            </NuxtLink>
            <NuxtLink to="/?o=views">
              <AppIcon name="i-mdi-fire" />
              <span>Самые горячие</span>
            </NuxtLink>
            <NuxtLink to="/">
              <AppIcon name="i-mdi-clock-outline" />
              <span>Новейшее</span>
            </NuxtLink>
            <NuxtLink v-if="randSlug" :to="`/videos/${randSlug}`">
              <AppIcon name="i-mdi-shuffle" />
              <span>Случайное</span>
            </NuxtLink>
            <NuxtLink to="/?o=rating">
              <AppIcon name="i-mdi-thumb-up-outline" />
              <span>Лучшие</span>
            </NuxtLink>
            <NuxtLink
              to="/categories"
              rel="nofollow"
              style="margin-bottom: 1em"
            >
              <AppIcon name="i-mdi-format-list-bulleted-square" />
              <span>Все категории</span>
            </NuxtLink>
            <NuxtLink to="/albums">
              <AppIcon name="i-mdi-camera-enhance-outline" />
              <span>Фотографии</span>
            </NuxtLink>
            <NuxtLink to="/actors">
              <AppIcon name="i-mdi-face-woman-shimmer-outline" />
              <span>Модели</span>
            </NuxtLink>
            <NuxtLink to="/studios" style="margin-bottom: 1em">
              <AppIcon name="i-mdi-movie-open-play-outline" />
              <span>Студии</span>
            </NuxtLink>

            <template v-for="item in socialMenu" :key="item.id">
              <NuxtLink :to="item.url" target="_blank" rel="nofollow">
                <AppIcon :name="item.icon" />
                <span>{{ item.code }}</span>
              </NuxtLink>
            </template>

            <NuxtLink to="/profile" style="margin-top: 1em">
              <AppIcon name="i-mdi-account-circle-outline" />
              <span>Личный кабинет</span>
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  defineProps({
    socialMenu: Array,
  })

  const randSlug = ref(null)

  const setRandomSlug = () => {
    const slugs = useApiAttributes().value.videos.rand_slugs
    randSlug.value = slugs[Math.floor(Math.random() * slugs.length)]
  }

  setInterval(setRandomSlug, 5000)
  setRandomSlug()

  onMounted(() => {
    useHead({
      htmlAttrs: {
        style: `overflow: hidden;`,
      },
    })
  })
  onBeforeUnmount(() => {
    useHead({
      htmlAttrs: {
        style: null,
      },
    })
  })
</script>

<style lang="scss" scoped>
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: #fff;
    backdrop-filter: blur(10px);
    box-shadow:
      inset 0 0 100vw 100vw #000d,
      0 0 60px 50px #000d;
    z-index: 90;
    max-height: 100vh;
    overflow: hidden;
    &__wrapper {
      padding-top: 80px;
      padding-bottom: 50px;
      mask-image: linear-gradient(to bottom, #0000 70px, #000 80px);
      max-height: 100vh;
      overflow: auto;
    }
    &__nav {
      display: grid;
      a {
        display: flex;
        align-items: center;
        gap: 1rem;
        height: 3em;
        font-weight: 600;
        font-size: var(--text-base);
        .icon {
          font-size: var(--text-lg);
          margin: 0 0.2em;
        }
      }
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition:
      opacity 200ms,
      transform 200ms;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: translateX(-30vw);
  }
</style>
