import type { TrendPoint } from "@/types/trend";
import { MOCK_TREND } from "./mock/trend";

/**
 * 获取竞品情报趋势数据。
 * 当前返回 mock；后端就绪后，将函数体替换为真实请求（如 axios），
 * 签名保持不变，store 与视图层无需改动。
 */
export async function fetchTrend(days: 7 | 30 | 90): Promise<TrendPoint[]> {
    // TODO: 后端就绪后替换为真实接口
    // return axios.get("/api/trend", { params: { days } }).then(r => r.data)
    return MOCK_TREND.slice(-days);
}
