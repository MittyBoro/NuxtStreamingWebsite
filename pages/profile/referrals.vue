<template>
  <LazyProfileMain class="profile__referrals">
    <LazyPageTitleRow>
      <template #title>
        <div class="profile__title profile__referrals-title">
          Реферальная программа
        </div>
      </template>
      <template #right>
        <div class="buttons-list">
          <Button
            class="button button-mini"
            @click.passive="setTab('info')"
            :class="{ 'button-alt': activeTab != 'info' }"
          >
            <AppIcon name="i-mdi-information-outline" />
            <span>Инфо</span>
          </Button>
          <Button
            class="button button-mini"
            @click.passive="setTab('coins')"
            :class="{ 'button-alt': activeTab != 'coins' }"
          >
            <AppIcon name="i-mdi-history" />
            <span>История</span>
          </Button>
          <Button
            class="button-mini"
            @click.passive="setTab('list')"
            :class="{ 'button-alt': activeTab != 'list' }"
          >
            <AppIcon name="i-mdi-account-supervisor-outline" />
            <span>Приглашенные</span>
          </Button>
        </div>
      </template>
    </LazyPageTitleRow>

    <div v-show="activeTab == 'info'">
      <div class="profile__referrals-info card">
        <div class="card__inner">
          <div>
            Вы можете пригласить пользователя по вашей реферальной ссылке
          </div>
          <div v-if="apiAttributes.props.referral_percent">
            и получать до {{ apiAttributes.props.referral_percent }}% от каждой
            его покупки
          </div>
          <LazyAppCopyInput class="profile__referrals-copy" :link="refLink" />
        </div>
      </div>

      <div
        v-if="apiAttributes.props.referral_percent"
        class="profile__referrals-info card"
      >
        <div class="card__inner">
          <div
            v-if="coinToCurrency"
            class="profile__referrals-total"
            style="margin-bottom: var(--space-sm); opacity: 0.7"
          >
            {{ coinToCurrency }}
          </div>

          <div class="profile__referrals-total">
            <div class="dotted-row">
              <span>Доступно для вывода:</span>
              <span class="dotted-line"></span>
              <b>{{ coins(user.balance) }}</b>
            </div>
          </div>
        </div>
      </div>

      <div class="profile__referrals-info card">
        <div class="card__inner">
          <ProfilePayoutHistory />
        </div>
      </div>
      <div class="profile__referrals-info card">
        <div class="card__inner">
          <ProfileOrderPayout />
        </div>
      </div>
    </div>
    <LazyProfileCoinHistory v-show="activeTab == 'coins'" />
    <LazyProfileReferredList v-show="activeTab == 'list'" />
  </LazyProfileMain>
</template>

<script setup>
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  useSeoMeta({
    title: 'Реферальная программа',
  })

  const apiAttributes = useApiAttributes()

  const route = useRoute()

  const activeTab = computed(() => route.query.tab ?? 'info')

  const user = useApiUser()
  const refLink = useRuntimeConfig().public.url + '?ref=' + user.value.id

  const coinToCurrency = computed(() => {
    const currency = apiAttributes.value.currencies[user.value.currency]
    if (!currency) {
      return
    }
    return '1 койн = ' + 1 / currency.coins + ' ' + currency.symbol
  })

  const setTab = (tabName) => {
    navigateTo({
      query: {
        tab: tabName === 'info' ? undefined : tabName,
        page: undefined,
      },
    })
  }
</script>

<style lang="scss" scoped>
  .profile__referrals {
    &-info {
      margin: var(--space-base) 0;
      font-size: var(--text-sm);
      font-weight: 600;
    }
    &-copy {
      margin-top: var(--space-xs);
    }
    &-total {
      display: grid;
      gap: 5px;
    }
  }
  .card__inner:empty {
    display: none;
  }
</style>
