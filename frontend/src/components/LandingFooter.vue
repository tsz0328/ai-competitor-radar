<script setup lang="ts">
</script>
<template>
    <footer class="landing-footer">
        <!-- 底部导航栏容器 -->
        <div class="landing-footer-container">
            <!-- 品牌信息 -->
            <div class="landing-footer-brand">
                <span class="landing-footer-brand-title">AI 竞品雷达</span>
                <span class="landing-footer-brand-subtitle">让AI成为你的市场情报助手</span>
            </div>

            <!-- 导航链接 -->
            <nav class="landing-footer-nav">

                <!-- 产品 -->
                <div class="landing-footer-nav-item">
                    <span class="landing-footer-nav-item-title">产品</span>
                    <a href="#features">功能介绍</a>
                    <a href="#workflow">工作流程</a>
                    <a href="#preview">产品预览</a>
                </div>

                <!-- 关于 -->
                <div class="landing-footer-nav-item">
                    <span class="landing-footer-nav-item-title">关于</span>
                    <a href="#">团队博客</a>
                    <a href="#">联系我们</a>
                </div>

                <!-- 法律 -->
                <div class="landing-footer-nav-item">
                    <span class="landing-footer-nav-item-title">法律</span>
                    <a href="#">隐私政策</a>
                    <a href="#">服务条款</a>
                    <a href="https://github.com/tsz0328/ai-competitor-radar.git" target="_blank">GitHub</a>
                </div>
            </nav>

            <!-- 版权信息 -->
            <div class="landing-footer-copyright">
                <span>© 2026 AI Competitor Radar. All rights reserved.</span>
            </div>
        </div>
    </footer>
</template>
<style scoped>
/* 底部导航栏 */
.landing-footer {
    background: var(--el-bg-color-page);
}

/* 底部导航栏容器 */
.landing-footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4vh 5vw 2vh;
    gap: 1vh;
    color: var(--el-text-color-regular);
}

/* 品牌信息 */
.landing-footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5vh;
}

.landing-footer-brand-title {
    font-size: 2vmax;
    font-weight: bold;
}

.landing-footer-brand-subtitle {
    font-size: 1.5vmax;
}

/* 导航链接 */
.landing-footer-nav {
    display: flex;
    gap: 2vw;
}

.landing-footer-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1vh;
}

.landing-footer-nav-item-title {
    font-size: 1.5vmax;
    font-weight: bold;
    color: var(--el-text-color-primary);
}

.landing-footer-nav-item a {
    font-size: 1.5vmax;
    color: var(--el-text-color-secondary);
}

.landing-footer-nav-item a:hover {
    color: var(--el-text-color-primary);
}

/* 版权信息 */
.landing-footer-copyright {
    text-align: center;
    font-size: 1.5vmax;
    color: var(--el-text-color-placeholder);
}
</style>