<script setup lang="ts">
import { Radar } from '@/components/Icons'
</script>
<template>
    <header class="landing-header">
        <div class="landing-header-container">
            <!-- logo -->
            <span class="landing-header-logo">
                <Radar size="1.5em" color="var(--el-color-primary)"/>
                <span class="landing-header-logo-text">AI 竞品雷达</span>
            </span>

            <!-- 导航链接 -->
            <nav class="landing-header-nav">
                <a href="#home">首页</a>
                <a href="#features">核心功能</a>
                <a href="#workflow">工作流程</a>
                <a href="#preview">产品预览</a>
            </nav>

            <!-- 右边按钮 -->
            <div class="landing-header-actions">
                <el-button type="primary">快速开始</el-button>
            </div>
        </div>
    </header>
</template>
<style scoped>
/* 顶部导航栏 */
.landing-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

/* 导航栏容器 */
.landing-header-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1vh 5vw;
}

/* logo */
.landing-header-logo {
    display: flex;
    align-items: center;
    gap: 1vw;
    font-weight: bold;
    color: black;
    cursor: pointer;
    font-size: 2vmax;
}
/* logo图标 */
.landing-header-logo-icon {
    font-size: 1.5em;
    color:var(--el-color-primary);
}
/* 产品名 */
.landing-header-logo-text{
    display: inline-flex;
    align-items: center;
}

/* 导航链接 */
.landing-header-nav {
    display: flex;
    align-items: center;
    gap: 2vw;
    font-size: 1.5vmax;
}
/* 每一个导航 */
.landing-header-nav a {
    color: var(--el-color-primary);
}

/* 右边按钮 */
.landing-header-actions {
    display: flex;
    align-items: center;
}
</style>