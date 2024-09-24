<template>
  <div class="header__colormode link preloading" @click="toggleColorMode">
    <AppIcon v-if="isDark" name="i-mdi-weather-night" />
    <AppIcon v-else name="i-mdi-white-balance-sunny" />
  </div>
</template>

<script setup>
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.value === 'dark')

  const toggleColorMode = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
</script>
