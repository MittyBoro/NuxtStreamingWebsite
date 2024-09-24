<template>
  <div class="profile__favorites-item">
    <VideoCardMini
      v-if="props.activeTab == 'video'"
      target="_blank"
      :item="props.item.favoritable"
    />
    <AlbumCardMini
      v-else-if="props.activeTab == 'album'"
      :item="props.item.favoritable"
    />
    <ActorCardMini
      v-else-if="props.activeTab == 'actor'"
      :item="props.item.favoritable"
    />

    <LazyAppActionFavorite
      class="profile__favorites-button button-alt-mini button-square"
      :item="props.item"
      icon-active="i-mdi-close"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    item: {
      type: Object,
    },
    activeTab: {
      type: String,
    },
  })

  props.item.favorite_id = props.item.id

  provide('able', {
    type: props.activeTab,
    id: props.item.favoritable.id,
  })
</script>

<style lang="scss" scoped>
  .profile__favorites {
    &-item {
      display: grid;
      grid-template-columns: 1fr min-content;
      gap: var(--space-sm);
      @include media-breakpoint-down(md) {
        grid-template-columns: 1fr auto;
      }
    }
  }
</style>
