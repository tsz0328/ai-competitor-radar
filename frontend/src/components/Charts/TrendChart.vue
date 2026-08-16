<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    GraphicComponent
} from 'echarts/components'
import { graphic } from 'echarts/core'
import type { TrendPoint } from '@/types/trend'

use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    GraphicComponent
]);

const props = withDefaults(
    defineProps<{
        data?: TrendPoint[];
        height?: string;
    }>(),
    {
        data: () => [],
        height: "300px",
    },
);

const option = computed(() => buildOption(props.data ?? []))

function buildOption(list: TrendPoint[]) {
    // 空数据兜底
    if (!list.length) {
        return {
            graphic: [{
                type: 'text',
                left: 'center',
                top: 'center',
                style: { text: '暂无趋势数据', fill: '#909399', fontSize: 14 }
            }],
            xAxis: { show: false },
            yAxis: { show: false },
            series: []
        }
    }

    return {
        tooltip: {
            trigger: "axis",
            backgroundColor: "#fff",
            borderColor: "#e5e7eb",
            textStyle: { color: "#303133" },
        },
        legend: {
            top: 10,
            left: 10,
            icon: "rect",
            itemWidth: 12,
            itemHeight: 4,
            data: ["功能更新", "价格变动", "舆论热度"],
            textStyle: { color: "#303133" },
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 20,
            top: 60,
            containLabel: true,
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: list.map((d) => d.date),
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: "#909399" },
        },
        yAxis: {
            type: "value",
            splitLine: { lineStyle: { type: "dashed", color: "#e5e7eb" } },
            axisLabel: { color: "#909399" },
        },
        series: [
            {
                name: "功能更新",
                type: "line",
                smooth: true,
                symbol: "none",
                lineStyle: { width: 2, color: "#5470c6" },
                areaStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "rgba(84, 112, 198, 0.3)" },
                        { offset: 1, color: "rgba(84, 112, 198, 0.02)" },
                    ]),
                },
                data: list.map(d => d.feature),
            },
            {
                name: "价格变动",
                type: "line",
                smooth: true,
                symbol: "none",
                lineStyle: { width: 2, color: "#9c6ade" },
                areaStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "rgba(156, 106, 222, 0.25)" },
                        { offset: 1, color: "rgba(156, 106, 222, 0.02)" },
                    ]),
                },
                data: list.map(d => d.price),
            },
            {
                name: "舆论热度",
                type: "line",
                smooth: true,
                symbol: "none",
                lineStyle: { width: 2, color: "#34c19e" },
                areaStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "rgba(52, 193, 158, 0.25)" },
                        { offset: 1, color: "rgba(52, 193, 158, 0.02)" },
                    ]),
                },
                data: list.map(d => d.sentiment),
            },
        ],
    }
}
</script>
<template>
  <v-chart :style="{ height: props.height }" :option="option" autoresize />
</template>
