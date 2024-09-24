<template>
  <div class="avatar preloading" :class="{ 'has-premium': premium }">
    <div class="chip" v-if="chip"></div>
    <img v-if="typeof src === 'string'" :src="src" />
    <AdaptiveImage
      v-else-if="Object.keys(props.src || {}).length"
      :src="props.src"
      :original="original || !sizes"
      :sizes="sizes"
      :title="title ? `аватар — ${title}` : undefined"
    />
    <AppIcon v-else name="i-mdi-account" class="avatar-icon" />
  </div>
</template>

<script setup>
  const props = defineProps({
    src: [Object, String],
    premium: Boolean,
    chip: Boolean,
    shadow: {
      type: String,
      default: '0px',
    },
    original: Boolean,
    sizes: String,
    title: String,
  })
  const shadow = props.shadow
</script>

<style lang="scss">
  .avatar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    aspect-ratio: 1/1;
    border-radius: 50% !important;
    min-width: 30px;
    box-shadow: 0 0 0 v-bind(shadow) var(--border-color);
    background: var(--body-bg-alt);
    color: var(--body-color);
    &.preloading {
      background: #777;
    }

    &.has-premium {
      box-shadow: 0 0 0 v-bind(shadow) var(--primary);
    }
    img,
    picture {
      // position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    .icon {
      font-size: 2em;
      opacity: 0.7;
    }
    .chip {
      position: absolute;
      right: 0;
      top: 0;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--alert);
      box-shadow: 0 0 0 2px #f82a5377;
      z-index: 2;
    }
  }
</style>
