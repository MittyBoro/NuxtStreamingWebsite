<template>
  <Button
    :class="{ active: item.favorite_id }"
    :disabled="pending"
    @click.passive="() => (user ? submit() : setModal('premium'))"
  >
    <AppIcon :name="item.favorite_id ? iconActive : icon" />
    <span v-if="item.favorite_count">
      {{ formatNumber(item.favorite_count) }}
    </span>
    <slot></slot>
  </Button>
</template>

<script setup>
  const { item, icon, iconActive } = defineProps({
    item: {
      type: Object,
    },
    icon: {
      type: String,
      default: 'i-mdi-cards-heart-outline',
    },
    iconActive: {
      type: String,
      default: 'i-mdi-cards-heart',
    },
  })

  const user = useApiUser()

  const pending = ref(false)

  const { id: favoritable_id, type: favoritable_type } = injectAble()

  const submit = async () => {
    pending.value = true
    try {
      const data = await $api(`/favorites`, {
        method: 'POST',
        body: {
          id: item?.favorite_id || undefined,
          favoritable_id,
          favoritable_type,
        },
      })

      let increment = 0
      if (data.id) {
        item.favorite_id = data.id
        increment = 1
      } else {
        item.favorite_id = null
        increment = -1
      }
      item.favorite_count = parseInt(item.favorite_count) + increment
    } catch (e) {
      console.error(e)
    } finally {
      pending.value = false
    }
  }
</script>

<style lang="scss" scoped>
  .actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-shrink: 0;
    gap: var(--space-sm) var(--space-sm);
    @include media-breakpoint-down(md) {
      margin-bottom: var(--space-base);
    }
  }
</style>
