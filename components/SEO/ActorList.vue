<template>
  <div></div>
</template>

<script setup>
  const props = defineProps({
    page: Object,
    list: Array,
    meta: Object,
    filterCount: Number,
  })

  if (props.filterCount > 0) {
    props.page.is_index = false
    props.page.canonical = true
  }

  setSeoPage(props.page)

  useSchemaOrg([
    defineWebPage({
      name: props.page.title,
      description: props.page.meta_description,
    }),
    defineItemList({
      itemListOrder: 'Descending',
      numberOfItems: props.meta?.total,
      itemListElement: schemaList(props.list, (item) => {
        const actorUrl = useRuntimeConfig().public.url + '/actors/' + item.slug
        const photo = Object.values(item.preview || {})
        return definePerson({
          name: item.name,
          image: photo[0],
          url: actorUrl,
        })
      }),
    }),
  ])
</script>
