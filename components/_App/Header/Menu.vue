<template>
  <nav class="nav header__nav">
    <NuxtLink class="nav__item" to="/" @mouseover="emit('dropDown', 'videos')">
      <span class="preloading">Видео</span>
      <AppIcon name="i-mdi-chevron-down" class="nav__arrow preloading" />
    </NuxtLink>
    <NuxtLink class="nav__item" to="/albums" @mouseover="emit('dropDown')">
      <span class="preloading">Фото</span>
    </NuxtLink>
    <NuxtLink
      class="nav__item"
      to="/categories"
      rel="nofollow"
      @mouseover="emit('dropDown', 'categories')"
    >
      <span class="preloading">Категории</span>
      <AppIcon name="i-mdi-chevron-down" class="nav__arrow preloading" />
    </NuxtLink>
    <NuxtLink class="nav__item" to="/actors" @mouseover="emit('dropDown')">
      <span class="preloading">Модели</span>
    </NuxtLink>
    <NuxtLink class="nav__item" to="/studios" @mouseover="emit('dropDown')">
      <span class="preloading">Студии</span>
    </NuxtLink>
  </nav>
</template>

<script setup>
  const emit = defineEmits(['dropDown'])
</script>

<style lang="scss" scoped></style>
