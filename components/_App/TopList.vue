<template>
  <div
    class="top-list-wrapper"
    :class="{ container: container }"
    v-if="
      (top?.videos?.length ||
        top?.actors?.length ||
        top?.day_categories?.length) &&
      (slots.videos || slots.actors || slots.studios || slots.categories)
    "
  >
    <template v-for="slot in Object.keys(slots)" :key="slot">
      <!--  -->
      <div v-if="slot === 'videos' && top.videos?.length" class="top-list">
        <AppDelimiter v-if="!delimiterHidden" />

        <!--  -->
        <PageTitleRow>
          <template #title>
            <slot name="videos"></slot>
          </template>
        </PageTitleRow>

        <LazyVideoList :list="top.videos" />
      </div>

      <!--  -->
      <div v-if="slot === 'actors' && top.actors?.length" class="top-list">
        <AppDelimiter v-if="!delimiterHidden" />

        <PageTitleRow>
          <template #title>
            <slot name="actors"></slot>
          </template>
        </PageTitleRow>

        <LazyActorList :list="top.actors" />
      </div>

      <!--  -->
      <div v-if="slot === 'studios' && top.studios?.length" class="top-list">
        <AppDelimiter v-if="!delimiterHidden" />

        <PageTitleRow>
          <template #title>
            <slot name="studios"></slot>
          </template>
        </PageTitleRow>

        <LazyStudioList :list="top.studios" />
      </div>
      <!--  -->
      <div
        v-if="slot === 'categories' && top.day_categories?.length"
        class="top-list"
      >
        <AppDelimiter v-if="!delimiterHidden" />

        <!--  -->
        <PageTitleRow>
          <template #title>
            <slot name="categories"></slot>
          </template>
        </PageTitleRow>
        <LazyCategoryListMini :list="top.day_categories" />
      </div>

      <!--  -->
      <div
        v-if="slot === 'top_categories' && categories?.length"
        class="top-list"
      >
        <AppDelimiter v-if="!delimiterHidden" />

        <!--  -->
        <PageTitleRow>
          <template #title>
            <slot name="top_categories"></slot>
          </template>
        </PageTitleRow>
        <LazyCategoryList :list="categories" />
      </div>
    </template>
  </div>
</template>

<script setup>
  defineProps({
    delimiterHidden: Boolean,
    container: Boolean,
  })

  const slots = defineSlots()
  const attrs = useApiAttributes()
  const categories = useTopCategories().value.slice(0, 10)

  const top = attrs?.value?.top
</script>

<style lang="scss" scoped>
  .top-list-wrapper {
    h1 {
      display: inline-block;
    }
    .top-list {
      :deep(.actor-list) {
        .card-actor:nth-child(5) ~ .card-actor {
          display: none;
        }
        @include media-breakpoint-down(xxxl) {
          .card-actor:nth-child(4) ~ .card-actor {
            display: none;
          }
        }
        @include media-breakpoint-down(lg) {
          .card-actor:nth-child(3) ~ .card-actor {
            display: none;
          }
        }
        @include media-breakpoint-down(md) {
          .card-actor:nth-child(3) ~ .card-actor {
            display: block;
          }
        }
      }
      :deep(.studio-list) {
        @include media-breakpoint-only(xl) {
          .card-studio:nth-child(3) ~ .card-studio {
            display: none;
          }
        }
      }
      :deep(.studio-list) {
        @include media-breakpoint-only(lg) {
          .card-studio:nth-child(3) ~ .card-studio {
            display: none;
          }
        }
      }
    }
  }
</style>
