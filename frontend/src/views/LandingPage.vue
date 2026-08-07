<script setup lang="ts">
import  { Star }  from "@element-plus/icons-vue"
</script>

<template>
    <main class="landing-page">
        <section class="hero">
            <div class="hero-container">
                <div class="hero-slogan">
                    <el-icon><Star /></el-icon>
                    <span>用AI重新定义市场情报分析</span>
                </div>
                <div class="hero-title"><span class="hero-highlight">AI</span> 竞品情报雷达</div>
                <div class="hero-subtitle">让市场变化，尽在掌握</div>
                <div class="hero-description">自动监控竞品动态，AI智能分析市场变化，为你提供有价值的市场情报与趋势洞察</div>
                <div class="hero-actions">
                    <el-button type="primary">开始使用</el-button>
                    <el-button>查看产品演示</el-button>
                </div>
                <div class="feature-row">
                    <div class="feature-item">
                        <span class="feature-num">10x+</span>
                        <span class="feature-desc">分析效率提升</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-num">95%+</span>
                        <span class="feature-desc">关键信息识别率</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-num">7×24h</span>
                        <span class="feature-desc">自动持续监控</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="stats"></section>
        <section class="features"></section>
        <section class="workflow"></section>
        <section class="preview"></section>
    </main>
</template>

<style scoped>
.landing-page {
    background-color: var(--el-color-primary-light-9);
}

.hero-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5vh 0 10vh;
}

.hero-slogan {
    display: flex;
    align-items: center;
    font-size: 1.5vmax;
    font-weight: bold;
    background-color: var(--el-color-primary-light-8);
    padding: 0 1vw;
    border-radius: var(--app-card-border-radius);
    gap: 1vw;
}

.hero-title {
    font-size: 5vmax;
    font-weight: bold;
}

.hero-highlight {
    color: var(--el-color-primary);
}

.hero-subtitle {
    font-size: 3vmax;
    font-weight: bold;
}

.hero-description {
    font-size: 1.5vmax;
}

.feature-row {
    display: flex;
    align-items: center;
    justify-content: center;
}
.feature-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.feature-item:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    background-color: --el-text-color-primary;
}
.feature-num{
    font-size: 2vmax;
    font-weight: bold;
}
.feature-desc{
    font-size: 1vmax;
}
</style>
