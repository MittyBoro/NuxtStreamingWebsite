export default defineNuxtPlugin(async (nuxtApp) => {
  const apiAttributes = useApiAttributes()

  if (!apiAttributes.value.props) {
    let { data } = await $api('attributes')
    apiAttributes.value = data
  }

  const topCategories = useTopCategories()
  if (!topCategories.value) {
    let { data } = await $api('/categories', {
      query: {
        limit: 15,
        pre_order: 'category_top',
      },
    })
    topCategories.value = data
  }
})
