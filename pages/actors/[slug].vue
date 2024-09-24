<template>
  <div>
    <!--  -->
    <LazySEOActorSingle :actor="actor" :page="page" />

    <!--  -->
    <LazyActorSingle :actor="actor" />

    <!--  -->
    <LazyActorContent :actor="actor" />

    <!-- <LazyPageDescription :text="page.description" /> -->

    <!--  -->
    <LazyAppTopList container>
      <template #categories>
        <h3>Тренды</h3>
      </template>
      <template #actors>
        <h4>Популярные модели</h4>
      </template>
      <template #studios>
        <h5>Популярные студии</h5>
      </template>
    </LazyAppTopList>

    <!--  -->
    <LazyPageBreadcrumbs
      :list="[
        { title: 'Актёры', to: '/actors' },
        { title: actor.name, to: `/actors/${route.params.slug}` },
      ]"
    />
  </div>
</template>

<script setup>
  const route = useRoute()

  const { page: actor } = await useApiPage(`../actors/${route.params.slug}`)
  const { page: originalPage } = await useApiPage(`actors-slug`)

  const page = pageWithMask(originalPage.value, actor.value)

  useSeoMeta({
    ogType: 'profile',
    ogFirstName: actor.value.name,
    ogGender: actor.value.gender,
  })

  provide('able', {
    type: 'actor',
    id: actor.value.id,
  })
</script>
