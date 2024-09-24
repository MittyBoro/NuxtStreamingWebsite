<template>
  <div></div>
</template>

<script setup>
  const { album, page } = defineProps({
    album: Object,
    page: Object,
  })

  const albumUrl = useRuntimeConfig().public.url + '/albums/' + album.slug
  const ogImageData = ogImage(album.preview)

  page.canonical = true
  setSeoPage(page)

  useSeoMeta({
    ogReleaseDate: album.published_at,
    // ogTag: album.meta_keywords,
    ...ogImageData,
  })

  useSchemaOrg([
    defineWebPage({
      name: page.meta_title,
      description: page.meta_description,
    }),
    defineListItem({
      '@type': 'ImageGallery',
      name: album.title,
      image: album.gallery
        .map((item) => Object.values(item)[0])
        .filter(Boolean),
      datePublished: album.published_at,
      description: album.description || 'No description',
      isFamilyFriendly: false,
      url: albumUrl,
    }),
  ])
</script>
