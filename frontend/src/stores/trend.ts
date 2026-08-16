import { ref } from "vue";
import { defineStore } from "pinia";
import type { TrendPoint } from "@/types/trend";
import { fetchTrend } from "@/api/trend";

export const useTrendStore = defineStore("trend", () => {
    // 状态
    const range = ref<"7" | "30" | "90">("7");
    const loading = ref(false);
    const trendData = ref<TrendPoint[]>([]);

    // action：根据当前 range 拉取数据
    async function loadTrend() {
        loading.value = true;
        try {
            trendData.value = await fetchTrend(Number(range.value) as 7 | 30 | 90);
        } finally {
            loading.value = false;
        }
    }

    // action：切换范围并重新拉取
    async function setRange(days: "7" | "30" | "90") {
        range.value = days;
        await loadTrend();
    }

    return { range, trendData, loading, loadTrend, setRange };
});
