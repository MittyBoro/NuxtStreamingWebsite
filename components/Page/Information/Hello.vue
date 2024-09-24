<template>
  <LazyPageInformationLayout v-if="route.name === 'index'" class="container">
    <div class="prose">
      <p>
        Друзья! Извиняемся за долгий перерыв, связанный с созданием нового
        сайта. В течение этой недели команда ProjectName возобновит работу сайта в
        полном объёме. Спасибо за понимание!
      </p>
    </div>
  </LazyPageInformationLayout>
</template>

<script setup>
  const route = useRoute()
</script>

<style lang="scss" scoped>
  p {
    margin-bottom: 0.75rem;
  }
</style>

<style lang="scss" scoped>
  .prose__title {
    margin-bottom: 0.5rem;
    font-size: 2rem;
    line-height: 1.25;
    text-align: center;
  }
  .logo-text {
    display: inline-flex;
    white-space: nowrap;
  }
</style>
