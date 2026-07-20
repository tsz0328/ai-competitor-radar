<script setup lang="ts">
// 根组件只负责"路由出口"，页面靠 <router-view /> 切换
</script>

<template>
  <router-view />
</template>

<style>
:root {
  --brand: #3b6cff;
  --text: #1f2329;
  --muted: #8a94a6;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: var(--text);
}
</style>
