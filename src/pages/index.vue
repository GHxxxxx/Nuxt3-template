<template>
  <div class="container">
    首页
    {{ x }} -- {{ y }}
  </div>
  <el-button>{{ $t('home') }}</el-button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
const userStore = useUserStore();
console.log(userStore.userInfo.username, '使用pinia');
const { x, y } = useMouse();

const data = await useFetch('/api/hello')
console.log(data);
</script>

<style scoped lang="scss">
.container {
  color: $bgColor;
}
</style>
