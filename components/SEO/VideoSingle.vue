<template>
  <div></div>
</template>

<script setup>
  const { video, page } = defineProps({
    video: Object,
    page: Object,
  })

  const videoUrl = useRuntimeConfig().public.url + '/videos/' + video.slug
  const ogImageData = ogImage(video.preview)

  page.canonical = true
  setSeoPage(page)

  useSeoMeta({
    ogType: 'video.other',
    ogDuration: secondsToISO8601(video),
    ogReleaseDate: video.published_at,
    // ogTag: video.meta_keywords,
    ogVideo: videoUrl,
    ogVideoType: 'video/mp4',
    ogVideoTag: video.meta_keywords,
    ...ogImageData,
  })

  useHead({
    meta: [
      { property: 'video:duration', content: video.duration },
      { property: 'ya:ovs:upload_date', content: video.published_at },
      { property: 'ya:ovs:adult', content: '1' },
    ],
  })

  useSchemaOrg([
    defineWebPage({
      name: page.meta_title,
      description: page.meta_description,
    }),
    defineListItem({
      '@type': 'VideoObject',
      name: video.title,
      image: ogImageData.ogImage,
      thumbnailUrl: ogImageData.ogImage,
      uploadDate: video.published_at,
      description: video.description || 'No description',
      isFamilyFriendly: false,
      duration: secondsToISO8601(video.duration),
      embedUrl: videoUrl + '#player',
    }),
  ])
</script>
