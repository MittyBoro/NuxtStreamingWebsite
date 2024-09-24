<template>
  <footer class="footer">
    <div class="container footer__container">
      <!--  -->
      <AppLogo />

      <!--  -->
      <nav class="nav footer__nav">
        <NuxtLink to="/" class="preloading">Все видео</NuxtLink>
        <NuxtLink to="/albums" class="preloading">Фото</NuxtLink>
        <NuxtLink to="/categories" rel="nofollow" class="preloading">
          Категории
        </NuxtLink>
        <NuxtLink to="/faq" class="preloading">Помощь</NuxtLink>
        <NuxtLink to="/abuse" class="preloading">Жалоба/Abuse</NuxtLink>
        <NuxtLink to="/chats" rel="nofollow" class="preloading">
          Написать нам
          <span v-show="user?.unread_messages_count" class="chip"></span>
        </NuxtLink>
      </nav>

      <!--  -->
      <!-- <div v-if="top.categories" class="footer__trends">
        <div class="footer__trends--title">Тренды</div>
        <NuxtLink
          v-for="category in top.categories"
          :key="category.id"
          class="button button-alt-nano"
          :to="`/categories/${category.slug}`"
        >
          <span class="preloading">{{ category.title }}</span>
        </NuxtLink>
      </div> -->

      <!--  -->
      <div class="footer__subtext prose">
        <p class="preloading">
          Всё самое лучшее
          <NuxtLink class="underline" to="/">видео</NuxtLink>
          собрано в одном месте. И это NuxtProject!
        </p>
        <p class="preloading">
          © {{ new Date().getFullYear() }} Все права защищены.
        </p>
        <p class="preloading">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio quae iste tempora odio quas soluta sit, aliquid temporibus repellendus velit dignissimos repellat saepe nesciunt maiores deleniti, odit vel molestiae recusandae.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
  const user = useApiUser()

  // const {
  //   value: { top },
  // } = useApiAttributes()
</script>

<style lang="scss" scoped>
  .footer {
    position: relative;
    padding: var(--space-lg) 0;
    background: var(--body-bg-alt);
    border-top: 1px solid var(--border-color);
    text-align: center;
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &__nav {
      margin: var(--space-md) auto;
      flex-wrap: wrap;
      @include media-breakpoint-down(md) {
        gap: var(--space-sm) var(--space-base);
      }
    }
    &__trends {
      --body-bg-alt: var(--body-bg);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: var(--space-xs);
      margin-bottom: var(--space-md);
      max-width: 600px;
      &--title {
        margin-bottom: 0.1em;
        font-size: var(--text-base);
        font-weight: 600;
        width: 100%;
      }
    }
    &__subtext {
      font-size: var(--text-sm);
      text-align: center;
      max-width: 800px;
      color: var(--body-color-alt);
    }
    a {
      position: relative;
      .chip {
        position: absolute;
        right: -7px;
        top: 0;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: var(--alert);
        box-shadow: 0 0 0 2px #f82a5377;
      }
    }
  }
</style>
