<template>
  <div v-if="meta && meta.last_page > 1" class="pagination__wrapper">
    <ClientOnly
      v-if="wokeUp && loadNextPage && meta.current_page < meta.last_page"
    >
      <LazyAppPaginationLoading :loadNextPage="loadNextPage" />
    </ClientOnly>
    <div
      class="pagination"
      v-if="
        meta &&
        meta.last_page > 1 &&
        (!loadNextPage || meta.current_page < meta.last_page)
      "
      :class="{ 'pagination--center': center }"
    >
      <template v-if="meta.current_page > 1">
        <span
          class="pagination__button button button-alt preloading"
          @click.passive="goToPage(meta.current_page - 1)"
        >
          «
        </span>
      </template>

      <template v-for="(page, index) in visiblePages" :key="index">
        <template v-if="page.is_ellipse">
          <span
            class="pagination__button button pagination__button-ellipsis preloading"
          >
            ...
          </span>
        </template>
        <template v-else>
          <span
            class="pagination__button button preloading"
            :class="{ 'button-alt': page.page !== meta.current_page }"
            @click.passive="goToPage(page.page)"
          >
            {{ page.page }}
          </span>
        </template>
      </template>
      <template v-if="meta.current_page < meta.last_page">
        <span
          class="pagination__button button button-alt preloading"
          @click.passive="goToPage(meta.current_page + 1)"
        >
          »
        </span>
      </template>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    center: {
      type: Boolean,
      default: true,
    },
    meta: {
      type: Object,
    },
    loadNextPage: Function,
  })

  const wokeUp = useWokeUp()

  const { center, meta } = toRefs(props)

  const visiblePages = computed(() => {
    if (!meta.value) return []

    const currentPage = meta.value.current_page
    const lastPage = meta.value.last_page

    const maxVisiblePages = 4

    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let end = Math.min(lastPage, start + maxVisiblePages - 1)

    const pages = []

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }
    if (start > 1) {
      pages.push({ page: 1 })
    }
    for (let i = start; i <= end; i++) {
      pages.push({ page: i })
    }
    if (end < lastPage) {
      pages.push({ page: lastPage })
    }
    if (start > 2) {
      pages.splice(1, 0, { is_ellipse: true })
    }
    if (end < lastPage - 1) {
      pages.splice(pages.length - 1, 0, { is_ellipse: true })
    }
    return pages
  })

  const route = useRoute()

  function goToPage(pageNumber) {
    if (pageNumber == meta.current_page) return
    scrollTo({ top: window.scrollTopValue ?? 0, behavior: 'smooth' })
    navigateTo({
      query: {
        ...route.query,
        page: pageNumber !== 1 ? pageNumber : undefined,
      },
    })
  }
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    gap: var(--space-sm);
    padding-top: var(--space-base);
    @include media-breakpoint-down(md) {
      gap: var(--space-xs);
    }
    &__wrapper {
      grid-column: 1/-1;
    }
    &--center {
      justify-content: center;
    }
    &__button {
      padding: 0.75rem 1rem;
      height: auto;
      @include media-breakpoint-down(md) {
        padding: 0.5rem 0.75rem;
        border-radius: 0.75rem 0;
        padding: 0.45rem 0;
        flex-grow: 1;
      }
      &-ellipsis {
        padding-left: 0;
        padding-right: 0;
        background: transparent;
        color: var(--body-color);
        flex-grow: 0;
        pointer-events: none;
      }
    }
  }
</style>
