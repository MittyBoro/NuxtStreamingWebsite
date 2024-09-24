<template>
  <div class="share">
    <LazyAppCopyInput class="share-row" :link="shareLink" />
    <div class="share-title">Поделиться с друзьями:</div>
    <div class="share-row">
      <Button class="button-alt-mini" @click.passive="shareOnTelegram">
        <AppIcon name="i-mdi-telegram" />
      </Button>
      <Button class="button-alt-mini" @click.passive="shareOnVK">
        <AppIcon name="i-mdi-vk" />
      </Button>
      <Button class="button-alt-mini" @click.passive="shareOnTwitter">
        <AppIcon name="i-mdi-twitter" />
      </Button>
      <Button class="button-alt-mini" @click.passive="shareOnNavigator">
        <AppIcon name="i-mdi-share-variant" />
        Выбрать
      </Button>
    </div>
  </div>
</template>

<script setup>
  const shareLink = shareUrl()

  const { title, description } = defineProps({
    title: String,
    description: String,
  })

  const shareOnNavigator = () => {
    window.navigator.share({
      title,
      text: description,
      url: shareLink,
    })
  }

  const shareOnTwitter = () => {
    window.open(
      'https://twitter.com/intent/tweet?url=' +
        encodeURIComponent(shareLink) +
        '&text=' +
        encodeURIComponent(title),
    )
  }
  const shareOnVK = () => {
    window.open(
      'https://vk.com/share.php?url=' +
        encodeURIComponent(shareLink) +
        '&title=' +
        encodeURIComponent(title) +
        '&description=' +
        encodeURIComponent(title),
    )
  }
  const shareOnTelegram = () => {
    window.open(
      'https://telegram.me/share/url?url=' +
        encodeURIComponent(shareLink) +
        '&text=' +
        encodeURIComponent(title),
    )
  }
</script>

<style lang="scss" scoped>
  .share-title {
    margin-bottom: var(--space-xs);
    font-size: var(--text-sm);
    font-weight: 600;
    width: 100%;
  }
  .share-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-bottom: var(--space-base);
    max-width: 600px;
  }
</style>
