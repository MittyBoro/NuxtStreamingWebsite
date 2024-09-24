<template>
  <NuxtLink to="/" class="logo" :class="{ loading: !mounted }">
    <Image
      v-if="isDarkMode"
      src="/images/logo-dark.svg"
      width="250"
      height="22"
      loading="eager"
      :alt="siteName"
      :title="siteName"
      disableHead
    />
    <Image
      v-else
      src="/images/logo.svg"
      width="250"
      height="22"
      loading="eager"
      :alt="siteName"
      :title="siteName"
      disableHead
      class=""
    />
  </NuxtLink>
</template>

<script setup>
  const { siteName } = useRuntimeConfig().public
  const props = defineProps({
    isDark: {
      type: Boolean,
      default: null,
    },
  })

  const mounted = ref(false)

  const isDarkMode = ref(true)

  onMounted(() => {
    mounted.value = true
    const colorMode = useColorMode()
    watchEffect(() => {
      isDarkMode.value = props.isDark ?? colorMode.value === 'dark'
    })
  })
</script>

<style lang="scss" scoped>
  .logo {
    display: flex;
    width: 250px;
    transition: filter 0.1s;
    &.loading {
      filter: contrast(0%);
    }

    @include media-breakpoint-down(xl) {
      width: 200px;
    }
    @include media-breakpoint-down(xl) {
      width: 150px;
    }
    @media (max-width: 340px) {
      width: 120px;
    }
  }
</style>
