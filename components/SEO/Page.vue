<template>
  <div></div>
</template>

<script setup>
  const { page } = defineProps({
    page: Object,
  })

  page.canonical = true
  setSeoPage(page)

  useSchemaOrg([
    defineWebPage({
      name: page.meta_title,
      description: page.meta_description,
    }),
  ])
</script>
