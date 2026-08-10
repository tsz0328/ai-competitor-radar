// 引入两个vue-router的函数
import { createRouter, createWebHistory } from "vue-router";

// 引入路由组件
import LandingPage from "@/views/LandingPage.vue";
import Login from "@/views/Login.vue";

// 创建路由实例，传入一个配置对象
const router = createRouter({
    // 使用vue-router的createWebHistory函数创建一个路由历史记录
    history: createWebHistory(),
    // 定义路由规则
    routes: [
        {
            path: "/",
            component: LandingPage,
            name: "LandingPage"
        },
        {
            path: "/login",
            component: Login,
            name: "Login"
        },
    ]
})

// 导出路由实例
export default router;