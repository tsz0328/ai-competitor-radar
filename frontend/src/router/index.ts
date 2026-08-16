// 引入两个vue-router的函数
import { createRouter, createWebHistory } from "vue-router";

// 引入路由组件
import Landing from "@/views/Landing.vue";
import Login from "@/views/Login.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import Dashboard from "@/views/Dashboard.vue";
import Competitor from "@/views/Competitor.vue";
import Event from "@/views/Event.vue";
import Report from "@/views/Report.vue";
import Setting from "@/views/Setting.vue";


// 创建路由实例，传入一个配置对象
const router = createRouter({
    // 使用vue-router的createWebHistory函数创建一个路由历史记录
    history: createWebHistory(),
    // 定义路由规则
    routes: [
        {
            path: "/",
            component: Landing,
            name: "Landing"
        },
        {
            path: "/login",
            component: Login,
            name: "Login"
        },
        {
            path: "/app",
            component: AppLayout,
            name: "AppLayout",
            redirect: { name: "Dashboard" },
            children: [
                {
                    path: "dashboard",
                    component: Dashboard,
                    name: "Dashboard"
                },
                {
                    path: "competitor",
                    component: Competitor,
                    name: "Competitor"
                },
                {
                    path: "event",
                    component: Event,
                    name: "Event"
                },
                {
                    path: "report",
                    component: Report,
                    name: "Report"
                },
                {
                    path: "setting",
                    component: Setting,
                    name: "Setting"
                }
            ]
        }
    ]
})

// 导出路由实例
export default router;