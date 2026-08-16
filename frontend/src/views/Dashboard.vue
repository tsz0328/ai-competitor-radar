<script setup lang="ts">
import { onMounted } from "vue";
import TrendChart from "@/components/Charts/TrendChart.vue";
import { useTrendStore } from "@/stores/trend";

const trendStore = useTrendStore();

onMounted(() => {
    trendStore.loadTrend();
});
</script>
<template>
  <div class="dashboard">
    <header class="header">
      <div class="header-left">
        <div class="title">早上好，用户</div>
        <div class="subtitle">这是您今天的竞品情报概览</div>
      </div>
      <div class="header-right">
        <el-date-picker type="date" placeholder="选择日期" />
      </div>
    </header>
    <section class="stat-cards">
      <div class="stat-card card">
        <div class="stat-card-content">
          <div class="stat-card-title">监控竞品</div>
          <div class="stat-card-value">12</div>
          <div class="stat-card-desc">+2 本周新增</div>
        </div>
        <div class="stat-card-icon icon-blue">icon</div>
      </div>
      <div class="stat-card card">
        <div class="stat-card-content">
          <div class="stat-card-title">新增事件</div>
          <div class="stat-card-value">28</div>
          <div class="stat-card-desc">+12% 较上周</div>
        </div>
        <div class="stat-card-icon icon-purple">icon</div>
      </div>
      <div class="stat-card card">
        <div class="stat-card-content">
          <div class="stat-card-title">AI 报告</div>
          <div class="stat-card-value">6</div>
          <div class="stat-card-desc">+2 本周新增</div>
        </div>
        <div class="stat-card-icon icon-green">icon</div>
      </div>
      <div class="stat-card card">
        <div class="stat-card-content">
          <div class="stat-card-title">风险提醒</div>
          <div class="stat-card-value">3</div>
          <div class="stat-card-desc">+1 本周新增</div>
        </div>
        <div class="stat-card-icon icon-orange">icon</div>
      </div>
    </section>
    <section class="charts">
      <div class="chart card">
        <header class="card-head">
          <h3 class="card-title">竞品动态趋势</h3>
          <el-select :model-value="trendStore.range" @change="trendStore.setRange">
            <el-option label="近7天" value="7" />
            <el-option label="近30天" value="30" />
            <el-option label="近90天" value="90" />
          </el-select>
        </header>
        <trend-chart :data="trendStore.trendData" />
      </div>
      <div class="insight card">最新 AI 洞察</div>
    </section>
    <section class="latest-events">
      <div class="new-events card">最新情报事件</div>
      <div class="card">竞品活跃度</div>
      <div class="card">监控状态</div>
    </section>
  </div>
</template>
<style scoped>
.dashboard {
  height: 100%;
  padding: 2vh 2vw;
  display: flex;
  flex-direction: column;
  gap: 2vh;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 1.5vmax;
  font-weight: bold;
}
.subtitle {
  font-size: 1vmax;
  color: var(--app-color-gray);
}
.stat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3vw;
}
.card {
  background-color: var(--app-color-white);
  border-radius: 1vmax;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.stat-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1vh 1vw;
}
.stat-card-content {
  display: flex;
  flex-direction: column;
}
.stat-card-title {
  font-size: 1.2vmax;
  font-weight: bold;
}
.stat-card-value {
  font-size: 1.5vmax;
  font-weight: bold;
}
.stat-card-desc {
  font-size: 1vmax;
  color: var(--app-color-gray);
}
.stat-card-icon {
  width: 4vmax;
  height: 4vmax;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vmax;
}
.icon-blue {
  background-color: var(--app-color-blue-light-2);
  color: var(--app-color-blue);
}
.icon-purple {
  background-color: var(--app-color-purple-light-2);
  color: var(--app-color-purple);
}
.icon-green {
  background-color: var(--app-color-green-light-2);
  color: var(--app-color-green);
}
.icon-orange {
  background-color: var(--app-color-orange-light-2);
  color: var(--app-color-orange);
}
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1vh 1vw 0;
}
.card-title {
  font-size: 1.2vmax;
  font-weight: bold;
  margin: 0;
}
.charts {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 3vw;
}
.latest-events {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2vw;
}
.new-events {
  grid-row: span 2;
}
</style>
