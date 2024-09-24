<template>
  <DropDownList :list="filterCountriesList" routeKey="country">
    <template #item="{ item }">
      <span class="dropdown__link">
        <AppIcon
          :name="`i-circle-flags-${item.key?.toLowerCase()}`"
          :title="item.name"
          class="flag preloading"
          :css="false"
        />
        <span>{{ item.name }}</span>
      </span>
    </template>
  </DropDownList>
</template>

<script setup>
  const route = useRoute()

  const props = defineProps({
    list: Array,
  })

  const countriesRaw = ref(props.list || [])
  const filterCountriesList = computed(() => {
    return [
      {
        key: 'xx',
        name: 'Все страны',
        query: computed(() => ({
          ...route.query,
          country: undefined,
          page: undefined,
        })),
      },
    ].concat(
      countriesRaw.value
        ?.map((country) => ({
          key: country,
          name: getCountryByCode(country),
          query: computed(() => ({
            ...route.query,
            country: country,
            page: undefined,
          })),
        }))
        .sort((a, b) => {
          return a.name.localeCompare(b.name)
        }) || [],
    )
  })
</script>

<style lang="scss" scoped>
  :deep(.button) {
    justify-content: start;
  }
  .dropdown__link {
    display: flex;
    align-items: center;
    width: 100%;
    margin-right: auto;
    .flag {
      margin-right: 0.5em;
      font-size: 1.5em;
      @include media-breakpoint-down(sm) {
        font-size: 1em;
        margin-right: 0.3em;
      }
    }
  }
</style>
