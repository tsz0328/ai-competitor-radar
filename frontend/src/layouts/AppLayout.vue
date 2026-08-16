<script setup lang="ts">
import SideNav from '@/components/layout/SideNav.vue'
import TopBar from '@/components/layout/TopBar.vue'
</script>
<template>
  <div class="app-layout">
    <!-- 侧边栏 -->
    <aside class="aside">
      <SideNav />
    </aside>

    <!-- 主体内容区 -->
    <div class="container">
      <!-- 头部 -->
      <header class="header">
        <TopBar />
      </header>
      <!-- 主体内容 -->
      <main class="main">
        <router-view />
      </main>
    </div>
  </div>
</template>
<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
}
.aside {
  width: 15vw;
  height: 100%;
  background-color: color-mix(in oklch, var(--app-color-blue-light-5) 30%, transparent);
}
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.header {
  height: 8vh;
  background-color: color-mix(in oklch, var(--app-color-blue-light-4) 30%, transparent);
}
.main {
  flex: 1;
  background-color: color-mix(in oklch, var(--app-color-blue-light-5) 30%, transparent);
}
</style>
