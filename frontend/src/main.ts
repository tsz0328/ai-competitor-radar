import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'        // 引入element-plus默认样式

import './styles/reset.css'
import './styles/global.css'                // 全局样式覆盖

import App from './App.vue'
import router from './router'

// 创建应用app
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 挂载到id为app的元素上
app.mount('#app')
