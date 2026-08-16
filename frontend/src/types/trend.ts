/**
 * 竞品情报趋势数据点
 * 供组件（TrendChart）、视图（Dashboard）、API 层共用
 */
export interface TrendPoint {
    date: string;
    feature: number; // 功能更新
    price: number; // 价格变动
    sentiment: number; // 舆论热度
}
