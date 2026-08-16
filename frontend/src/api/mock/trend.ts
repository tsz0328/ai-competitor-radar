import type { TrendPoint } from "@/types/trend";

/**
 * Mock 数据：模拟后端接口返回值。
 * 后端就绪后，整个文件可安全删除，只需改 api/trend.ts 里的 fetchTrend。
 */
export const MOCK_TREND: TrendPoint[] = Array.from({ length: 90 }, (_, i) => {
    const d = new Date(2026, 4, 19 + i);
    return {
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        feature: Math.round(10 + i * 0.3 + Math.sin(i / 5) * 8),
        price: Math.round(8 + i * 0.2 + Math.cos(i / 4) * 6),
        sentiment: Math.round(Math.abs(Math.sin(i / 3)) * 20),
    };
});
