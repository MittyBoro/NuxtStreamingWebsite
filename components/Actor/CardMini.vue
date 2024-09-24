<template>
  <AppLink :check="item.slug" :to="`/actors/${item.slug}`" class="actors-mini">
    <Avatar
      class="actors-mini__avatar"
      :src="item.photo"
      shadow="4px"
      sizes="md:42px 48px"
      :title="item.name"
    />
    <span class="preloading">{{ item.name }}</span>
  </AppLink>
</template>

<script setup>
  const { item } = defineProps({
    item: {
      type: Object,
      default: {},
    },
  })
</script>

<style lang="scss" scoped>
  .actors-mini {
    display: flex;
    align-items: center;
    gap: var(--space-sm);

    font-size: var(--text-sm);
    font-weight: 600;
    &__avatar {
      width: 3rem;
    }
  }
</style>
