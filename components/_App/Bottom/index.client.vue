<template>
  <div class="bottom-wrapper">
    <div class="bottom-container blackhole">
      <template v-if="wokeUp && bottomMenu?.length > 0">
        <AppBottomBanner
          v-if="!isBannerHidden"
          v-model:isBannerHidden="isBannerHidden"
          :bottomMenu="bottomMenu"
        />
        <AppBottomBannerToggle v-model:isBannerHidden="isBannerHidden" />
      </template>
      <LazyAppBottomPromo
        v-if="!user?.has_premium || daysUntilDate(user.premium_expiry_at) < 7"
      />
      <AppBottomMenu
        v-model:isBannerHidden="isBannerHidden"
        :showBannerToggle="wokeUp && bottomMenu?.length > 0"
      />
    </div>
  </div>
</template>

<script setup>
  const user = useApiUser()
  const route = useRoute()

  const bottomMenu = useApiAttributes().value.links.bottom_menu

  const pagesViewed = useLocalStorage('pagesViewed', 0)

  const wokeUp = useWokeUp()
  const isBannerHidden = useLocalStorage('bottomVideo', true)

  let timer
  onMounted(() => {
    // для прем пользователей скрыть всегда
    if (user.value?.has_premium) {
      isBannerHidden.value = true
      return
    } else {
      setInterval(() => {
        isBannerHidden.value = false
      }, 60 * 1000)
    }
    // для новых открыть потом
    if (pagesViewed.value < 2) {
      timer = setTimeout(() => {
        isBannerHidden.value = false
      }, 25 * 1000)
    }
    // или на другой странице
    watch(
      () => pagesViewed.value,
      () => {
        clearTimeout(timer)
        if (pagesViewed.value < 1) {
          isBannerHidden.value = false
        }
      },
    )

    // скрыть на некоторых страницах
    watch(
      () => route.name,
      () => {
        if (
          !route.name?.startsWith('chats') &&
          !route.name?.startsWith('profile')
        ) {
          isBannerHidden.value = false
        }
      },
    )
  })
</script>

<style lang="scss" scoped>
  .bottom-wrapper {
    position: sticky;
    bottom: -1px;
    pointer-events: none;
    z-index: 9999;
  }
</style>
