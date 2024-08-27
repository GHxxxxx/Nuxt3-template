<template>
  <div>
    <NuxtLayout name="header" />
    <!-- <NuxtLayout> -->
    <nuxtPage />
    <!-- </NuxtLayout> -->
    <NuxtLayout name="footer" />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '首页',
  meta: [
    {
      name: 'keywords',
      content: 'vue3,nuxt3'
    }
  ]
})
</script>
