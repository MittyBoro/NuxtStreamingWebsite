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
        const url = useRuntimeConfig().public.url + '/studios/' + item.slug
        const images = Object.values(item.preview || {})
        return defineOrganization({
          name: item.title,
          logo: images[0] || null,
          url: url,
        })
      }),
    }),
  ])
</script>
