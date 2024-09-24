<template>
  <div>
    <div
      v-if="apiAttributes.props?.body_code"
      v-html="apiAttributes.props?.body_code"
    ></div>
    <div
      v-if="apiAttributes.props?.body_code_nopremium && !user?.has_premium"
      v-html="apiAttributes.props?.body_code_nopremium"
    ></div>
  </div>
</template>

<script setup>
  const apiAttributes = useApiAttributes()
  const user = useApiUser()
</script>
