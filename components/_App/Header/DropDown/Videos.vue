<template>
  <AppHeaderDropDownLayout>
    <div class="head-videos">
      <div class="head-videos__left">
        <NuxtLink to="/?o=premium">
          <AppIconPremium animated />
          <span>Премиум</span>
        </NuxtLink>
        <NuxtLink to="/categories/ozvuckoi">
          <AppIcon name="i-mdi-microphone-outline" />
          <span>Русская озвучка</span>
        </NuxtLink>
        <NuxtLink to="/?o=rating">
          <AppIcon name="i-mdi-fire" />
          <span>Самые горячие</span>
        </NuxtLink>
        <!-- <NuxtLink to="/">
          <AppIcon name="i-mdi-clock-outline" />
          <span>Новейшее</span>
        </NuxtLink> -->
        <NuxtLink v-if="randSlug" :to="`/videos/${randSlug}`">
          <AppIcon name="i-mdi-shuffle" />
          <span>Случайное</span>
        </NuxtLink>
        <NuxtLink to="/?o=views" style="margin-bottom: 10px">
          <AppIcon name="i-mdi-chart-timeline-variant-shimmer" />
          <span>Больше просмотров</span>
        </NuxtLink>

        <template v-for="item in socialMenu" :key="item.id">
          <NuxtLink :to="item.url" target="_blank" rel="nofollow">
            <AppIcon :name="item.icon" />
            <span>{{ item.code }}</span>
          </NuxtLink>
        </template>
      </div>
      <div v-if="latestVideos?.length" class="head-videos__column">
        <LazyVideoListMini title="Новые видео" :list="latestVideos" />
      </div>
      <div v-if="hotVideos?.length" class="head-videos__column">
        <LazyVideoListMini title="Самые горячие" :list="hotVideos" />
      </div>
    </div>
  </AppHeaderDropDownLayout>
</template>

<script setup>
  defineProps({
    socialMenu: Array,
  })

  const randSlug = ref(null)
  const apiAttributes = useApiAttributes()

  const hotVideos = apiAttributes.value.videos.hot
  const latestVideos = apiAttributes.value.videos.latest

  const setRandomSlug = () => {
    const slugs = apiAttributes.value.videos.rand_slugs
    randSlug.value = slugs[Math.floor(Math.random() * slugs.length)]
  }

  onMounted(() => {
    setInterval(setRandomSlug, 5000)
    setRandomSlug()
  })
</script>

<style lang="scss" scoped>
  .head-videos {
    display: grid;
    grid-template-columns: 290px 1fr 1fr;
    gap: 0.5rem 2rem;

    @include media-breakpoint-down(xl) {
      grid-template-columns: 170px 1fr 1fr;
    }
    &__left {
      display: grid;
      align-self: center;
      gap: 0.75rem;
      a {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 0.75rem;
        .icon {
          font-size: 1.25rem;
          margin-right: 0.5rem;
        }
      }
    }
  }
</style>
