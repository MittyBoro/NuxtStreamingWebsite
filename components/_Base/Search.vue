<template>
  <DropDown
    position="full"
    class="search__field-dropdown transition-all"
    :class="{ focus: focused }"
    :hovering="false"
    v-model:active="focused"
  >
    <template #default>
      <form
        @submit.prevent="toSearchPage"
        action="/search"
        method="get"
        class="field search__field"
      >
        <input
          type="text"
          class="field__input search__input"
          name="q"
          v-model="query"
          :placeholder="placeholder"
          @focus="focus"
          @blur="blur"
          autocomplete="off"
          :required="!allowEmpty"
        />
        <label class="search__btn">
          <input type="submit" />
          <span>
            <AppIcon
              name="i-mdi-magnify"
              :class="{ 'loading-icon': loading }"
            />
          </span>
        </label>
      </form>
    </template>
    <template #list v-if="quickSearch">
      <template v-if="Object.keys(searchList).length">
        <template
          v-if="Object.values(searchList).filter((v) => v.length).length"
        >
          <template v-for="(value, key) in searchList">
            <template v-if="value?.length">
              <div
                v-if="!types || types.length > 1"
                class="search__field-dropdown-title"
              >
                {{ translateEntityKey(key) }}
              </div>
              <NuxtLink v-for="item in value" :to="`/${key}/${item.slug}`">
                {{ item.title || item.name }}
              </NuxtLink>
            </template>
          </template>
        </template>
        <template v-else>
          <div class="search__field-dropdown-title">Ничего не найдено</div>
        </template>
      </template>
      <template v-else-if="showPopular && focused">
        <div class="search__field-dropdown-title">Популярные запросы</div>
        <template v-for="query in searches">
          <NuxtLink :to="`/search?q=${query}`">
            {{ query.toLowerCase() }}
          </NuxtLink>
        </template>
      </template>
    </template>
  </DropDown>
</template>

<script setup>
  const { path, quickSearch, disableForm, types } = defineProps({
    placeholder: String,
    showPopular: Boolean,
    quickSearch: Boolean,
    allowEmpty: Boolean,
    disableForm: Boolean,
    types: {
      type: Array,
      default: null,
    },
    path: {
      type: String,
      default: '/search',
    },
  })

  const route = useRoute()
  const { searches } = useApiAttributes().value

  const focused = ref(false)

  const focus = () => {
    focused.value = true
  }
  const blur = () => {
    // focused.value = false
  }

  const query = defineModel({ default: '' })

  const loading = ref(false)

  const toSearchPage = () => {
    if (disableForm) return
    navigateTo({
      path,
      query: { q: query.value || undefined },
      replace: true,
    })
    blur()
  }

  let timerId = null
  const searchList = ref({})
  const search = async (word) => {
    loading.value = true

    let qTypes = {}
    if (types?.length) {
      types.forEach((v) => {
        qTypes['types[]'] = v
      })
    }

    searchList.value = await $api(`search_queries/${word}`, {
      method: 'GET',
      params: {
        ...qTypes,
      },
    })
    loading.value = false
  }

  watchEffect(() => {
    if (route.name == 'search') {
      query.value = route.query?.q ?? ''
    } else if (!query.value) {
      query.value = ''
    }
  })

  onMounted(() => {
    if (quickSearch) {
      watch(
        () => query.value,
        async (value, old) => {
          if (value.trim() === old.trim()) return

          clearTimeout(timerId)
          if (value.length > 2) {
            timerId = setTimeout(() => {
              search(value)
            }, 300)
          }
        },
      )
    }
  })
</script>

<style lang="scss" scoped>
  .search {
    &__field {
      display: flex;
      align-items: center;
      &-dropdown {
        font-size: var(--text-sm);
        a {
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &-title {
          margin: var(--space-sm) 0 var(--space-nano);
          font-size: 1.2em;
          font-weight: 600;
          pointer-events: none;
          max-width: 100%;
          &:first-child {
            margin-top: var(--space-nano);
          }
        }
      }
    }
    &__btn {
      display: flex;
      align-items: center;
      color: currentColor;
      position: absolute;
      left: 1rem;
      font-size: 1em;
      max-height: 1.5em;
      cursor: pointer;
      .icon {
        animation: circularMotion 0.5s ease-in-out infinite;
      }
      input {
        position: absolute;
        visibility: hidden;
        left: -9999px;
      }
      &:not(.loading-icon) {
        animation-play-state: paused;
      }
      @keyframes circularMotion {
        0%,
        100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.3);
          opacity: 0.7;
        }
      }

      .icon {
        position: relative;
        animation: circularMotion 4s infinite;
      }
    }
    &__input {
      padding-left: 2.5rem;
      transition-property: all;
    }
  }
</style>
