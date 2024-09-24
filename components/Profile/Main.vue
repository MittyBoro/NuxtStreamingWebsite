<template>
  <div class="profile">
    <div class="container">
      <div class="profile__row profile__big-row">
        <Avatar
          class="profile__avatar"
          :src="user?.avatar"
          shadow="10px"
          sizes="240px"
        />
        <div class="profile__top">
          <nav class="buttons-list profile__buttons-list">
            <NuxtLink class="button button-alt-mini" to="/profile">
              <AppIcon name="i-mdi-account-circle-outline" />
              Профиль
            </NuxtLink>
            <NuxtLink class="button button-alt-mini" to="/profile/comments">
              <AppIcon name="i-mdi-comment-processing-outline" />
              Комментарии
            </NuxtLink>
            <NuxtLink class="button button-alt-mini" to="/profile/favorites">
              <AppIcon name="i-mdi-heart-outline" />
              Избранное
            </NuxtLink>
            <NuxtLink class="button button-alt-mini" to="/profile/referrals">
              <AppIcon name="i-mdi-account-supervisor-outline" />
              Рефералы
            </NuxtLink>
            <NuxtLink class="button button-alt-mini" to="/profile/payments">
              <AppIcon name="i-mdi-cash-multiple" />
              Платежи
            </NuxtLink>
          </nav>
          <NuxtLink class="button button-alt-mini" to="/profile/settings">
            <AppIcon name="i-mdi-cog-outline" />
            <span class="settings__text">Настройки</span>
          </NuxtLink>
        </div>
        <div class="profile__right">
          <div class="profile__inner">
            <slot></slot>

            <div v-if="!user?.has_premium" class="profile__premium">
              <div class="profile__premium-title">
                С премиум доступом вы получите:
              </div>
              <ul>
                <li>
                  <AppIconPremium colored animated />
                  Полное отсутствие рекламы
                </li>
                <li>
                  <AppIconPremium colored animated />
                  Доступ ко всем PREMIUM видео
                </li>
                <li>
                  <AppIconPremium colored animated />
                  Доступ к 4K UltraHD видео
                </li>
                <li>
                  <AppIconPremium colored animated />
                  Возможность заработать
                </li>
              </ul>
              <div class="profile__buttons">
                <Button @click.passive="setModal('premium')">
                  Попробовать премиум
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const user = useApiUser()
</script>

<style lang="scss">
  .profile {
    &__row {
      padding: 0 var(--space-lg);
      @include media-breakpoint-down(xl) {
        padding: 0;
      }
    }
    &__big-row {
      display: grid;
      grid-template-columns: min-content 1fr;
      margin-bottom: var(--space-xs);
      align-items: start;
      @include media-breakpoint-down(md) {
        grid-template-columns: 1fr;
      }
    }
    &__right {
      width: 100%;
    }
    &__delimiter {
      margin: var(--space-base) 0 !important;
    }
    &__top {
      display: flex;
      justify-content: space-between;
      margin: var(--space-md) 0 var(--space-md);

      @include media-breakpoint-down(lg) {
        order: -1;
        grid-column: 1 / -1;
      }
      @include media-breakpoint-only(md) {
        .settings__text {
          display: none;
        }
      }
      @include media-breakpoint-down(md) {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap: var(--space-sm);
        .button {
          width: 100%;
          justify-content: flex-start;
        }
      }
    }

    &__buttons-list {
      @include media-breakpoint-down(md) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
      }
    }
    &__title {
      margin-bottom: var(--space-md);
      font-size: var(--text-md);
      font-weight: 600;
    }
    &__subtitle {
      margin-bottom: var(--space-sm);
      font-size: var(--text-base);
      font-weight: 600;
    }
    &__avatar {
      grid-row: 1 / 5;
      width: 15rem;
      margin-right: var(--space-md);
      @include media-breakpoint-down(lg) {
        grid-row: 2 / 3;
      }
      @include media-breakpoint-down(md) {
        display: none;
      }
    }
    &__info {
      display: grid;
      grid-template-columns: max-content auto;
      align-items: start;
      margin-left: 12rem;
      gap: var(--gap);

      font-size: var(--text-sm);

      &-short {
        display: grid;
        gap: var(--space-xs);
      }
      &-country {
        display: flex;
        align-items: center;
      }
    }
    &__inner {
      max-width: 683px;
    }
    &__buttons {
      margin-top: var(--space-md);
    }

    &__premium {
      margin-top: var(--space-lg);
      &-title {
        margin-bottom: var(--space-base);
        font-weight: 600;
        font-size: var(--text-md);
      }
      ul {
        margin: 0;
        li {
          margin-bottom: var(--space-xs);
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          list-style: none;
          font-weight: 600;
        }
      }
    }
  }

  @include media-breakpoint-down(xl) {
    .profile__avatar {
      width: 8rem;
      margin-right: var(--space-base);
    }
    .profile__top {
      margin-top: 0.5rem;
    }
  }
</style>

<style lang="scss">
  .profile .title-row {
    align-items: start;
    margin-bottom: var(--space-md);
  }
  .profile .title-row .profile__title {
    margin: 0;
  }
</style>
