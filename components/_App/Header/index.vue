<template>
  <header
    class="header header__border-b"
    @mouseenter="mouseHere = true"
    @mouseleave="activeDropDown = null"
  >
    <div class="container header__container">
      <AppLogo
        class="header__logo"
        :isDark="mobileMenuActive"
        :style="{ 'z-index': mobileMenuActive ? 120 : 0 }"
      />
      <div
        v-if="!isDesktop"
        class="header__hamburger preloading"
        :class="{ active: mobileMenuActive }"
        @click.passive="setMobileMenu"
      >
        <AppIcon name="i-mdi-menu" />
      </div>

      <AppHeaderMenu @dropDown="activeDropDown = $event" />

      <Search placeholder="Изучить..." showPopular quickSearch />

      <div class="header__notifications">
        <ClientOnly>
          <LazyAppHeaderNotificationAuth v-if="user" />
          <LazyAppHeaderNotificationGuest v-else />
          <template #fallback>
            <LazyAppHeaderNotificationServer />
          </template>
        </ClientOnly>
      </div>

      <AppHeaderColorMode />

      <AppHeaderUser />
    </div>
    <template v-if="wokeUp">
      <LazyAppHeaderDropDownCategories
        v-if="isDesktop && mouseHere"
        @click.passive="activeDropDown = null"
        v-show="activeDropDown === 'categories'"
      />
      <LazyAppHeaderDropDownVideos
        v-if="isDesktop && mouseHere"
        @click.passive="activeDropDown = null"
        v-show="activeDropDown === 'videos'"
        :socialMenu="socialMenu"
      />
      <LazyAppHeaderMobileMenu
        v-if="mobileMenuActive"
        :socialMenu="socialMenu"
      />
    </template>
  </header>
</template>

<script setup>
  const $route = useRoute()

  const isDesktop = useIsDesktop()
  const user = useApiUser()

  const setMobileMenu = () => {
    const hash = $route.hash === '#menu' ? '' : '#menu'
    navigateTo({ hash: hash })
  }
  const mobileMenuActive = computed(() =>
    $route.hash === '#menu' ? true : null,
  )

  const activeDropDown = ref(null)
  const mouseHere = ref(null)

  const router = useRouter()

  router.beforeEach(() => {
    activeDropDown.value = null
  })

  const wokeUp = useWokeUp()

  const socialMenu = useApiAttributes()
    .value?.links?.main_menu?.map((item) => {
      if (/(вк|vk)/gi.test(item.code)) {
        item.icon = 'i-mdi-vk'
      } else if (/(tg|telegram|телеграм|тг)/gi.test(item.code)) {
        item.icon = 'i-mdi-telegram'
      } else if (/(озвучк)/gi.test(item.code)) {
        item.icon = 'i-mdi-microphone-outline'
      } else if (/(сотруд)/gi.test(item.code)) {
        item.icon = 'i-carbon-collaborate'
      } else {
        item.icon = 'i-mdi-link'
      }

      return item
    })
    .sort((a, b) => parseInt(a.position) - parseInt(b.position))

  const mounted = ref(false)
  onMounted(() => {
    if (process.client) {
      mounted.value = true
    }
    let timer
    watch(
      () => activeDropDown.value,
      (value) => {
        if (!value) {
          timer = setTimeout(() => {
            mouseHere.value = false
          }, 1000)
        } else {
          clearTimeout(timer)
        }
      },
    )
  })
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    top: 0;
    background: var(--body-bg-alt);
    z-index: 10000;
    .search__field-dropdown {
      margin: auto 2rem;
    }
    &__logo {
      z-index: 110;
      @include media-breakpoint-down(sm) {
        width: 130px;
      }
    }
    &__border-b {
      border-bottom: 1px solid var(--border-color);
    }
    &__container {
      position: relative;
      display: grid;
      grid-template-columns: auto auto 1fr auto auto auto;
      align-items: center;
      gap: 2rem;
      @include media-breakpoint-down(xxl) {
        gap: 1.5rem;
      }
      @include media-breakpoint-down(xl) {
        gap: 1rem;
      }
      @include media-breakpoint-down(sm) {
        gap: 0.9rem;
      }
    }
    &__hamburger {
      position: absolute;
      display: none;
      font-size: 27px;
      &.active {
        color: #fff;
        z-index: 110;
      }
    }
    &__nav {
      position: relative;
      margin-right: auto;
      margin-left: 1.5rem;
      @include media-breakpoint-down(xl) {
        margin-left: 0;
      }
    }
  }
  @include media-breakpoint-down(lg) {
    .header {
      display: flex;
      height: 70px;
      &__container {
        display: flex;
        align-items: center;
      }
      &__logo {
        position: absolute;
        margin-left: 35px;
      }
      &__nav {
        display: none;
      }
      &__hamburger {
        display: flex;
        align-items: center;
        &.preloading {
          &::after {
            content: ' ';
            min-width: 27px;
            max-height: 27px;
          }
        }
      }
    }
  }

  .header .search__field-dropdown {
    @include media-breakpoint-down(xxl) {
      margin: auto 0.5rem;
    }
    @include media-breakpoint-down(xl) {
      margin: 0;
    }
    @include media-breakpoint-down(lg) {
      margin-left: auto;
      width: 100%;
      &:not(.focus) {
        width: 3rem;
        opacity: 0.7;

        .field__input {
          padding-right: 0;
          padding-left: 3rem;
          font-size: 1.2em;
        }
        .icon {
          pointer-events: none;
        }
      }
    }
  }
</style>
