<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import {
  OfficeBuilding,
  List,
  TrendCharts,
  Setting,
  HomeFilled,
  UserFilled,
  ArrowDown,
} from "@element-plus/icons-vue";
import { Radar } from "@/components/Icons";

const route = useRoute();
const router = useRouter();
const activeMenu = ref(route.name);
const menus = [
  { name: "Dashboard", label: "工作台", icon: HomeFilled },
  { name: "Competitor", label: "竞品管理", icon: OfficeBuilding },
  { name: "Event", label: "事件流", icon: List },
  { name: "Report", label: "周报/趋势", icon: TrendCharts },
  { name: "Setting", label: "设置", icon: Setting },
];

function handleClick(name: string) {
  router.push({ name });
}

watch(
  () => route.name,
  (name) => (activeMenu.value = name),
);
</script>
<template>
  <div class="side-nav">
    <!-- logo -->
    <div class="logo">
      <Radar size="1.5em" color="var(--app-color-blue)" />
      <div>AI 竞品雷达</div>
    </div>

    <!-- 菜单 -->
    <ul class="menu-list">
      <li
        class="menu-item"
        v-for="m in menus"
        :key="m.name"
        :class="{ 'menu-item--active': activeMenu === m.name }"
        @click="handleClick(m.name)"
      >
        <el-icon class="menu-icon">
          <component :is="m.icon" />
        </el-icon>
        <span class="menu-text">{{ m.label }}</span>
      </li>
    </ul>

    <!-- 底部 -->
    <div class="footer">
      <div class="footer-avatar">
        <el-icon ><UserFilled /></el-icon>
      </div>
      <div class="footer-user">
        <span class="footer-username">用户名</span>
        <span class="footer-account">yonghuming@email.com</span>
      </div>
      <div class="footer-expand"><el-icon><ArrowDown /></el-icon></div>
    </div>
  </div>
</template>
<style scoped>
.side-nav {
  height: 100%;
  padding: 2vh 1vw;
  position: relative;
  z-index: 1;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}
.logo {
  display: flex;
  align-items: center;
  gap: 1vw;
  font-size: 1.5vmax;
  margin-bottom: 4vh;
}
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 1vh;
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 1vh 1vw;
  margin: 0 1vw;
  gap: 1vw;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.2vmax;
  border-radius: 1vmax;
}
.menu-item:hover {
  color: var(--app-color-purple);
  background-color: var(--app-color-purple-light-3);
}
.menu-item:active {
  color: var(--app-color-purple-light-1);
  background-color: var(--app-color-purple-light-4);
}
.menu-item--active {
  color: var(--app-color-purple);
  background-color: var(--app-color-purple-light-3);
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
.footer-avatar {
  width: 3vmax;
  height: 3vmax;
  font-size: 2.5vmax;
  border-radius: 50%;
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-user {
  display: flex;
  flex-direction: column;
  gap: 0.2vh;
}
.footer-username {
  font-size: 1vmax;
}
.footer-account {
  font-size: 0.6vmax;
  color: var(--app-text-color-secondary);
}
.footer-expand{
  font-size: 1vmax;
}
</style>
