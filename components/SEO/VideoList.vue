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
      name: page.meta_title,
      description: page.meta_description,
    }),
    defineItemList({
      itemListOrder: 'Descending',
      numberOfItems: meta?.total,
      itemListElement: schemaList(list, (item) => {
        const videoUrl = useRuntimeConfig().public.url + '/videos/' + item.slug
        const images = Object.values(item.preview || {})
        return defineListItem({
          '@type': 'VideoObject',
          name: item.title,
          image: images[0] || null,
          thumbnailUrl: images[0] || null,
          uploadDate: item.published_at,
          description: item.description || 'No description',
          isFamilyFriendly: false,
          duration: secondsToISO8601(item.duration),
          embedUrl: videoUrl + '#player',
        })
      }),
    }),
  ])
</script>
