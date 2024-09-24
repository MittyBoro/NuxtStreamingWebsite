<template>
  <div></div>
</template>

<script setup>
  const { page, list, meta } = defineProps({
    page: Object,
    list: Array,
    meta: Object,
  })

  setSeoPage(page)

  useSchemaOrg([
    defineWebPage({
      name: page.title,
      description: page.meta_description,
    }),
    defineItemList({
      itemListOrder: 'Descending',
      numberOfItems: meta?.total,
      itemListElement: schemaList(list, (item) => {
        const albumUrl = useRuntimeConfig().public.url + '/albums/' + item.slug
        const images = Object.values(item.preview || {})
        return defineListItem({
          '@type': 'ImageGallery',
          name: item.title,
          image: images[0] || null,
          thumbnailUrl: images[0] || null,
          datePublished: item.published_at,
          description: item.description || 'No description',
          isFamilyFriendly: false,
          url: albumUrl,
        })
      }),
    }),
  ])
</script>
