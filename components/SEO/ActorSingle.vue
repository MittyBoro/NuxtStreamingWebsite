<template>
  <div></div>
</template>

<script setup>
  const { actor, page } = defineProps({
    actor: Object,
    page: Object,
  })

  const actorUrl = useRuntimeConfig().public.url + '/actors/' + actor.slug
  const ogImageData = ogImage(actor.photo)

  page.canonical = true
  setSeoPage(page)

  useSeoMeta({
    ogReleaseDate: actor.published_at,
    // ogTag: actor.meta_keywords,
    ...ogImageData,
  })

  useSchemaOrg([
    defineWebPage({
      '@type': 'ProfilePage',
      name: actor.name,
      description: actor.meta_description,
      mainEntity: definePerson({
        name: actor.name,
        image: ogImageData.ogImage,
        url: actorUrl,
        height: actor.height,
        weight: actor.weight,
        birthDate: actor.birthday,
        nationality: actor.country,
        address: actor.city,
        isFamilyFriendly: false,
      }),
    }),
  ])
</script>
