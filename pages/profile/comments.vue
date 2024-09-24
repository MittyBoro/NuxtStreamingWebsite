<template>
  <LazyProfileMain>
    <div class="profile__title">Мои комментарии</div>
    <div class="comments__list" :class="{ 'loading-box': pending }">
      <template v-if="comments.length">
        <template v-for="item in comments" :key="item.id">
          <LazyCommentItem :comment="item" onlyInfo />
        </template>
      </template>
      <LazyAppEmpty v-else />
      <LazyAppPagination :center="false" :meta="meta" />
    </div>
  </LazyProfileMain>
</template>

<script setup>
  definePageMeta({
    middleware: ['sanctum:auth'],
  })
  useSeoMeta({
    title: 'Мои комментарии',
  })

  const { list, meta, pending } = await useApiList('/comments/user')

  const comments = computed(
    () => list.value?.filter((item) => !item.is_deleted) || [],
  )
</script>

<style lang="scss" scoped></style>
