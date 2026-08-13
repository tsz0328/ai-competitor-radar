<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  User,
  Lock,
  Message,
  ArrowLeft,
  ArrowRight,
} from "@element-plus/icons-vue";
import { Radar } from "@/components/Icons";
import BrandPanel from "@/components/Login/BrandPanel.vue";

const router = useRouter();

/** 当前 Tab（纯静态切换） */
const activeTab = ref<"login" | "register">("login");

// 表单数据：里程碑 4 接 JWT 时用于提交，目前仅静态展示
const loginForm = reactive({ account: "", password: "", remember: false });
const registerForm = reactive({
  username: "",
  email: "",
  password: "",
  confirm: "",
});

// TODO(里程碑4): 登录提交 → authApi.login() 拿 JWT 存 Pinia
const onLogin = () => {};
// TODO(里程碑4): 注册提交 → authApi.register()
const onRegister = () => {};
// TODO: 第三方登录（GitHub OAuth / 微信扫码 / 邮箱验证码）
const onOAuth = (provider: "github" | "wechat" | "email") => {
  console.log("oauth:", provider);
};
</script>

<template>
  <div class="login-page">
    <!-- 左侧品牌面板 -->
    <section class="brand-panel">
      <BrandPanel />
    </section>

    <!-- 右侧表单面板 -->
    <section class="form-panel">
      <div class="form-top">
        <a class="form-link" @click="router.push({ name: 'LandingPage' })">
          < 返回首页
        </a>
      </div>

      <div class="form-brand">
        <Radar size="1.5em" color="var(--app-color-blue)" />
        <span class="form-brand-name">AI 竞品雷达</span>
      </div>

      <div class="form-title">欢迎使用</div>
      <div class="form-subtitle">登录以继续你的市场情报分析之旅</div>

      <!-- 登录 / 注册 Tab -->
      <div
        class="form-tabs"
        :style="{ '--tab-index': activeTab === 'login' ? 0 : 1 }"
      >
        <button
          class="form-tab"
          :class="{ active: activeTab === 'login' }"
          @click="activeTab = 'login'"
        >
          登录
        </button>
        <button
          class="form-tab"
          :class="{ active: activeTab === 'register' }"
          @click="activeTab = 'register'"
        >
          注册
        </button>
      </div>

      <!-- 登录表单（静态） -->
      <div v-show="activeTab === 'login'" class="form-body">
        <el-input
          v-model="loginForm.account"
          :prefix-icon="User"
          placeholder="请输入用户名或邮箱"
          size="large"
        />
        <el-input
          v-model="loginForm.password"
          :prefix-icon="Lock"
          type="password"
          show-password
          placeholder="请输入密码"
          size="large"
        />
        <div class="form-row">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
          <a class="form-link">忘记密码？</a>
        </div>
        <el-button class="submit-btn" type="primary" @click="onLogin">
          登录
          <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>

      <!-- 注册表单（静态） -->
      <div v-show="activeTab === 'register'" class="form-body">
        <el-input
          v-model="registerForm.username"
          :prefix-icon="User"
          placeholder="请输入用户名"
          size="large"
        />
        <el-input
          v-model="registerForm.email"
          :prefix-icon="Message"
          placeholder="请输入邮箱"
          size="large"
        />
        <el-input
          v-model="registerForm.password"
          :prefix-icon="Lock"
          type="password"
          show-password
          placeholder="请输入密码"
          size="large"
        />
        <el-input
          v-model="registerForm.confirm"
          :prefix-icon="Lock"
          type="password"
          show-password
          placeholder="请再次输入密码"
          size="large"
        />
        <el-button class="submit-btn" type="primary" @click="onRegister">
          注册
        </el-button>
      </div>

      <!-- 第三方登录 -->
      <div class="divider"><span>其他登录方式</span></div>
      <div class="oauth-row">
        <button class="oauth-btn" @click="onOAuth('github')">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.26 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
            />
          </svg>
          GitHub
        </button>
        <button class="oauth-btn" @click="onOAuth('wechat')">
          <svg viewBox="0 0 24 24" fill="#07C160">
            <path
              d="M9.5 4C5.9 4 3 6.5 3 9.6c0 1.8 1 3.4 2.5 4.4l-.6 2 2.2-1.1c.5.1 1 .2 1.6.2h.4A5.6 5.6 0 0 1 9 13.9C9 10.9 11.9 8.5 15.3 8.5h.4C15.1 5.9 12.6 4 9.5 4zM7.4 7.4a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm4.2 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
            />
            <path
              d="M15.5 9.5c-3 0-5.5 2-5.5 4.5s2.5 4.5 5.5 4.5c.5 0 1-.1 1.5-.2l1.9 1-.5-1.8c1.4-.8 2.3-2.1 2.3-3.5 0-2.5-2.5-4.5-5.2-4.5zm-2 2.6a.8.8 0 1 1 0 1.5.8.8 0 0 1 0-1.5zm4 0a.8.8 0 1 1 0 1.5.8.8 0 0 1 0-1.5z"
            />
          </svg>
          微信
        </button>
        <button class="oauth-btn" @click="onOAuth('email')">
          <el-icon><Message /></el-icon>
          邮箱登录
        </button>
      </div>

      <div class="form-footer">
        还没有账号？
        <a class="form-link" @click="activeTab = 'register'">立即注册</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  gap: 5vw;
  padding: 5vh 5vw;
  background: linear-gradient(
    135deg,
    var(--app-color-blue),
    var(--app-color-white-blue)
  );
  height: 90vh;
}
.brand-panel{
    flex: 1;
}

/* 右侧表单面板 */
.form-panel {
  width: 25vw;
  border: 1px solid color-mix(in oklch, var(--app-color-blue) 50%, transparent);
  border-radius: 2vmax;
  box-shadow: 0 6px 24px
    color-mix(in oklch, var(--app-color-blue) 60%, transparent);
  display: flex;
  flex-direction: column;
  padding: 3vh 3vw;
}
.form-top {
  display: flex;
  justify-content: flex-end;
}
.form-link {
  align-items: center;
  font-size: 1.2vmax;
  color: var(--app-color-blue);
  cursor: pointer;
}
.form-link:hover {
  color: var(--app-color-blue-light-1);
}

.form-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6vw;
  margin-top: 2vh;
  font-size: 1.5vmax;
}
.form-brand-name {
  font-weight: bold;
  background: linear-gradient(
    90deg,
    var(--app-color-purple),
    var(--app-color-blue-dark-3)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.form-title {
  margin: 1.5vh 0 0;
  text-align: center;
  font-size: 1.3vmax;
  font-weight: bold;
  background: linear-gradient(
    90deg,
    var(--app-color-purple),
    var(--app-color-blue-dark-3)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.form-subtitle {
  margin: 0.8vh 0 0;
  text-align: center;
  font-size: 1vmax;
  color: var(--app-color-gray);
}

/* Tab 切换 */
.form-tabs {
  display: flex;

  margin-top: 2vh;
  border-bottom: 1px solid
    color-mix(in oklch, var(--app-color-gray) 20%, transparent);
  position: relative;
}
/* 指示器：挂在容器上，只有一条 */
.form-tabs::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 50%;
  height: 2px;
  border-radius: 2px;
  background: var(--app-color-blue);
  transform: translateX(calc(var(--tab-index) * 100%));
  transition: transform 0.3s ease;
}
.form-tab {
  flex: 1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 1vh 0.5vw;
  font-size: 1.2vmax;
  color: var(--app-text-color-secondary);
  position: relative;
}
.form-tab.active {
  color: var(--app-color-blue);
  font-weight: bold;
}

/* 表单区 */
.form-body {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  padding: 2.5vh 0;
}
.form-body :deep(.el-input__wrapper) {
  background-color: transparent;
  border: 1px solid color-mix(in oklch, var(--app-color-blue) 80%, transparent);
}
.form-body :deep(.el-input__wrapper:hover) {
  border-color: var(--app-color-blue);
}
.form-body :deep(.el-input__inner) {
  color: var(--app-color-black);
}
.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-body :deep(.el-checkbox__inner) {
  background-color: transparent;
  border: 1px solid color-mix(in oklch, var(--app-color-blue) 50%, transparent);
}
.form-body :deep(.el-checkbox.is-checked .el-checkbox__inner) {
  border-color: var(--app-color-blue);
}

/* 登录/注册按钮：局部覆盖 global.css 的全胶囊圆角 */
.submit-btn {
  --el-border-radius-base: 0.8vmax;
  width: 100%;
  margin: 0;
  border: none;
  background: linear-gradient(
    135deg,
    var(--app-color-blue-light-2),
    var(--app-color-purple)
  );
  box-shadow: 0 4px 16px
    color-mix(in oklch, var(--app-color-blue) 20%, transparent);
  transition: all 0.2s ease;
}
.submit-btn:hover {
  background: linear-gradient(
    135deg,
    var(--app-color-blue-light-3),
    var(--app-color-purple-light-1)
  );
  box-shadow: 0 6px 24px
    color-mix(in oklch, var(--app-color-purple) 30%, transparent);
}
.submit-btn:active {
  box-shadow: 0 2px 8px
    color-mix(in oklch, var(--app-color-purple) 30%, transparent);
  transform: translateY(1px);
}

/* 分隔线 */
.divider {
  display: flex;
  align-items: center;
  gap: 1vw;
  font-size: 1vmax;
  color: var(--app-color-gray);
}
.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: color-mix(in oklch, var(--app-color-gray) 30%, transparent);
}

/* 第三方登录：用原生 button，避开 global.css 的 el-button 胶囊样式 */
.oauth-row {
  display: flex;
  gap: 1vw;
  margin-top: 1.5vh;
}
.oauth-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  padding: 1vh 0;
  font-size: 1vmax;
  color: var(--app-color-black);
  background: none;
  border: 1px solid color-mix(in oklch, var(--app-color-blue) 50%, transparent);
  border-radius: 1vmax;
  cursor: pointer;
  transition: all 0.2s ease;
}
.oauth-btn:hover {
  border-color: var(--app-color-blue-light-2);
  background: var(--app-color-blue-light-5);
}
.oauth-btn:active {
  border-color: var(--app-color-blue);
  background: var(--app-color-blue-light-4);
}
.oauth-btn svg {
  width: 1.5em;
  height: 1.5em;
}

.form-footer {
  margin: 2vh 0 0;
  text-align: center;
  font-size: 1.2vmax;
  color: var(--app-text-color-secondary);
}
</style>
