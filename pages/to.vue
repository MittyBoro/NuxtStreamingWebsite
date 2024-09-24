<script setup>
  definePageMeta({
    layout: 'empty',
  })

  const route = useRoute()

  const urlParam = route.query.u

  if (urlParam) {
    const decodedUrl = atob(urlParam)
    await navigateTo(decodedUrl, { redirectCode: 301, external: true })
  } else {
    await navigateTo('/', { redirectCode: 301 })
  }
</script>
