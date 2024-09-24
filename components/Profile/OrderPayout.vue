<template>
  <div v-if="apiAttributes.props.payout_coins_min < user.balance">
    <div class="profile__subtitle" style="text-align: center">
      Запросить выплату
    </div>
    <form @submit.prevent="form.submit" class="form-grid">
      <LazyFieldInput
        v-model="state.payout_method"
        title="Метод выплаты:"
        placeholder="Банковская карта, USDT..."
        required
      />
      <LazyFieldInput
        v-model="state.payout_bill"
        title="Счёт для выплаты:"
        placeholder="XXXX-XXXX-..."
        required
      />
      <LazyFieldInput
        v-model="state.amount"
        :title="`Сумма выплаты, койны (${exchangeValue}):`"
        :placeholder="`max: ${user.balance}`"
        type="number"
        :min="apiAttributes.props.payout_coins_min"
        :max="user.balance"
        required
      />
      <LazyFieldSelect
        title="Валюта"
        v-model="state.currency"
        :options="currencies"
        required
      />
      <LazyFieldTextarea
        v-model="state.description"
        title="Дополнительная информация (необязательно)"
        placeholder="Комментарий к выплате"
      />
      <div class="button__row">
        <Button :loading="form.pending" button>Отправить</Button>
      </div>
    </form>
  </div>
  <div v-else>
    <div class="profile__subtitle" style="text-align: center; margin-bottom: 0">
      Минимальная сумма выплаты:
      {{ coins(apiAttributes.props.payout_coins_min) }}
    </div>
  </div>
</template>

<script setup>
  const apiAttributes = useApiAttributes()
  const user = useApiUser()

  const { refreshIdentity } = useApiAuth()

  const currencies = ref([])

  Object.values(apiAttributes.value.currencies).forEach((currency) => {
    currencies.value.push([currency.key, `${currency.key}, ${currency.symbol}`])
  })

  const exchangeValue = computed(() => {
    const currency = apiAttributes.value.currencies[state.currency]

    if (!currency) {
      return '??'
    }

    const currencyValue = formatNumber(
      parseFloat(state.amount / currency.coins).toFixed(2),
    )

    return `${currencyValue} ${currency.symbol}`
  })

  const { form, state } = await useApiForm(
    'payouts',
    {
      payout_method: '',
      payout_bill: '',
      amount: '',
      currency: user.value.currency,
      description: '',
    },
    {
      onSuccess: () => {
        state.payout_method = ''
        state.payout_bill = ''
        state.amount = ''
        state.description = ''
        useNotify().success('Платеж создан')
        refreshNuxtData()
        refreshIdentity()
        scrollTo(0, 0)
      },
    },
  )
</script>

<style lang="scss" scoped>
  .form__grid {
    display: grid;
    gap: var(--space-sm);
  }
</style>
