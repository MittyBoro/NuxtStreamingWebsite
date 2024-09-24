<template>
  <section class="single-actor">
    <div class="container">
      <LazyAppActionViews hidden />
      <div class="card single-actor__cover card__image preloading">
        <AdaptiveImage
          v-if="Object.keys(actor.cover || {}).length"
          :src="actor.cover"
          class="object-cover"
          :title="actor.name"
          sizes="2xl:1770px sm:1368px 412px"
        />
        <ClientOnly v-else>
          <AppIcon name="i-mdi-image-auto-adjust" />
        </ClientOnly>
      </div>
      <div class="single-actor__row single-actor__top-row">
        <Avatar
          class="single-actor__avatar"
          :src="actor.photo"
          shadow="9px"
          sizes="md:160px 112px"
          :title="actor.name"
        />
        <LazyPageTitleRow class="single-actor__top">
          <template #title>
            <h1 class="preloading">{{ actor.name }}</h1>
          </template>
          <template #right>
            <LazyAppActionFavorite
              class="single-actor__button button-mini"
              :class="{ 'button-alt': actor.favorite_id }"
              :item="actor"
            >
              <span>
                {{ actor.favorite_id ? 'В избранном' : 'В избранное' }}
              </span>
            </LazyAppActionFavorite>
          </template>
        </LazyPageTitleRow>
      </div>

      <div class="single-actor__row single-actor__info">
        <div class="single-actor__info-short text-sm preloading">
          <div v-if="actor.country" class="dotted-row">
            <b>Страна:</b>
            <span class="dotted-line"></span>
            <span class="single-actor__info-country">
              <span>{{ getCountryByCode(actor.country) }}</span>
              <AppIcon
                :name="`i-circle-flags-${actor.country.toLowerCase()}`"
                class="card-actor__flag text-md"
                style="margin-left: 0.5rem"
                :css="false"
              />
            </span>
          </div>
          <div v-if="actor.city" class="dotted-row">
            <b>Город:</b>
            <span class="dotted-line"></span>
            <span>{{ actor.city }}</span>
          </div>
          <template v-if="actor.birthday">
            <div class="dotted-row">
              <b>День рождения:</b>
              <span class="dotted-line"></span>
              <span>
                <span>{{ formatDay(actor.birthday, true) }}</span>
                <span>{{ birthdayToday(actor.birthday) ? '🎂' : '' }}</span>
              </span>
            </div>
            <div class="dotted-row">
              <b>Возраст:</b>
              <span class="dotted-line"></span>
              <span>{{ humanizeDate(actor.birthday, true) }}</span>
            </div>
            <div class="dotted-row">
              <b>Знак зодиака:</b>
              <span class="dotted-line"></span>
              <span>{{ getZodiacSign(actor.birthday) }}</span>
            </div>
          </template>

          <div v-if="actor.height" class="dotted-row">
            <b>Рост:</b>
            <span class="dotted-line"></span>
            <span>{{ actor.height }} см</span>
          </div>
          <div v-if="actor.weight" class="dotted-row">
            <b>Вес:</b>
            <span class="dotted-line"></span>
            <span>{{ actor.weight }} кг</span>
          </div>

          <div v-if="actor.gender" class="dotted-row">
            <b>Пол:</b>
            <span class="dotted-line"></span>
            <span>{{ translateKeyByGender(actor.gender) }}</span>
          </div>
          <div v-if="actor.orientation" class="dotted-row">
            <b>Ориентация:</b>
            <span class="dotted-line"></span>
            <span>
              {{ translateKeyByGender(actor.orientation, actor.gender) }}
            </span>
          </div>
          <div v-if="actor.relation_status" class="dotted-row">
            <b>Семейное положение:</b>
            <span class="dotted-line"></span>
            <span>
              {{ translateKeyByGender(actor.relation_status, actor.gender) }}
            </span>
          </div>
          <div v-if="actor.ethnicity" class="dotted-row">
            <b>Этничность:</b>
            <span class="dotted-line"></span>
            <span>
              {{ translateKeyByGender(actor.ethnicity, actor.gender) }}
            </span>
          </div>
          <div v-if="actor.hair_color" class="dotted-row">
            <b>Цвет волос:</b>
            <span class="dotted-line"></span>
            <span>
              {{ translateKeyByGender(actor.hair_color, actor.gender) }}
            </span>
          </div>
          <div v-if="actor.eye_color" class="dotted-row">
            <b>Цвет глаз:</b>
            <span class="dotted-line"></span>
            <span>
              {{ translateKeyByGender(actor.eye_color, actor.gender) }}
            </span>
          </div>
          <div v-if="actor.video_views > 900" class="dotted-row">
            <b>Просмотров видео:</b>
            <span class="dotted-line"></span>
            <span>{{ formatNumberViews(actor.video_views, true) }}</span>
          </div>
          <div v-if="actor.views > 900" class="dotted-row">
            <b>Просмотров профиля:</b>
            <span class="dotted-line"></span>
            <span>{{ formatNumberViews(actor.views) }}</span>
          </div>

          <div
            v-if="actor.boob_size && actor.gender !== 'male'"
            class="dotted-row"
          >
            <b>Размер груди:</b>
            <span class="dotted-line"></span>
            <span>
              <span>{{ actor.boob_size }}</span>
              <span>
                {{ translateYesNo(actor.fake_boobs, '(силикон)', '') }}
              </span>
            </span>
          </div>

          <div v-if="actor.tattoos" class="dotted-row">
            <b>Тату:</b>
            <span class="dotted-line"></span>
            <span>{{ translateYesNo(actor.tattoos, 'есть', 'нет') }}</span>
          </div>
          <div v-if="actor.piercings" class="dotted-row">
            <b>Пирсинг:</b>
            <span class="dotted-line"></span>
            <span>{{ translateYesNo(actor.piercings, 'есть', 'нет') }}</span>
          </div>
        </div>
        <div class="prose text-sm preloading" v-html="actor.description"></div>
        <div v-if="actor.links" class="single-actor__buttons buttons-list-alt">
          <template v-for="link in actor.links" :key="link">
            <span
              class="button button-alt-mini button-square"
              @click="redirectTo(link)"
            >
              <AppIcon :name="getIconByLink(link)" />
            </span>
          </template>
        </div>
      </div>
      <LazyAppDelimiter />
    </div>
  </section>
</template>

<script setup>
  const { actor } = defineProps({ actor: Object })

  const getIconByLink = (link) => {
    if (link.includes('instagram')) {
      return 'i-mdi-instagram'
    } else if (link.includes('twitter')) {
      return 'i-mdi-twitter'
    } else if (link.includes('telegram') || link.includes('tg.me')) {
      return 'i-mdi-telegram'
    } else if (link.includes('facebook')) {
      return 'i-mdi-facebook'
    } else if (link.includes('vk')) {
      return 'i-mdi-vk'
    } else if (link.includes('youtube')) {
      return 'i-mdi-youtube'
    } else {
      return 'i-mdi-link'
    }
  }
</script>

<style lang="scss" scoped>
  .single-actor {
    &__cover {
      position: relative;
      aspect-ratio: 12/2;
      background: var(--body-bg-alt);
      width: 100%;
      cursor: default;
      @include media-breakpoint-down(md) {
        aspect-ratio: 6/2;
      }
    }
    &__row {
      padding: 0 var(--space-lg);
      @include media-breakpoint-down(xl) {
        padding: 0 var(--space-md);
      }
      @include media-breakpoint-down(lg) {
        padding: 0 var(--space-base);
      }
    }
    &__top-row {
      display: flex;
      margin-bottom: var(--space-xs);
      @include media-breakpoint-down(md) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        :deep(.title-row__head) {
          justify-content: center;
        }
      }
    }
    &__top {
      width: 100%;
      margin: auto;
      @include media-breakpoint-down(md) {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
    &__avatar {
      margin-top: -5rem;
      margin-right: 2rem;
      width: 10rem;
      @include media-breakpoint-down(lg) {
        margin: -4rem auto var(--space-sm);
        width: 8rem;
      }
    }
    &__button {
      &.active {
        color: var(--body-color-alt);
      }
    }
    &__info {
      margin-left: 12rem;
      font-size: var(--text-sm);
      @include media-breakpoint-down(lg) {
        margin-left: 10rem;
      }
      @include media-breakpoint-down(md) {
        margin: 0 0 0;
      }
      &-country {
        display: flex;
        align-items: center;
      }
      &-short {
        margin-bottom: var(--space-base);
        column-gap: var(--space-base);
        column-count: 2;
        @include media-breakpoint-up(md) {
          & > div {
            margin-bottom: var(--space-xs);
          }
        }
        @include media-breakpoint-down(md) {
          display: grid;
          grid-template-columns: 1fr;
          column-count: 1;
        }
      }
    }
    &__buttons {
      margin: var(--space-base) 0;
      @include media-breakpoint-down(lg) {
        margin: var(--space-base) 0;
      }
    }
  }
</style>
