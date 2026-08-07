# 开发过程记录（Dev Log）

本文件用于记录项目开发过程、关键决策、学习笔记。所有内容仅保存在 `.codebuddy/` 目录，**不影响主代码仓库**。

## 记录模板

### YYYY-MM-DD — 标题
- 背景 / 目标
- 操作 / 决策
- 结果 / 备注

---

## 记录

### 2026-07-29 — 初始化 .codebuddy 隔离工作区
- 背景：用户要求建立隔离的开发记录区，并限定 AI 仅可操作 `.codebuddy/` 目录，其他代码文件不可动。
- 操作：
  - 创建 `.codebuddy/rules/scope.md`，固化"仅可动 `.codebuddy/`"的约束规则。
  - 创建本开发日志 `devlog.md` 作为开发过程记录载体。
- 结果：后续开发过程将在此记录，主代码文件保持不动；后续需开发任务时可在此追加条目。

### 2026-07-29 — 授权开发记录自主化
- 背景：用户补充要求，开发记录由 AI 自主决定增改，无需逐次确认。
- 操作：更新 `rules/scope.md` 新增第 5 条「开发记录自主化」；记录须完整且精炼。
- 结果：后续开发过程由我自动在 `devlog.md` 记录与修订，主代码文件仍保持不动。

### 2026-07-30 — 前端脚手架学习：Vue 核心概念 Q&A
- 背景：用户从零开始搭建前端脚手架，逐一提问 Vue/Vite/vue-router 核心概念。
- 覆盖内容：
  1. **`index.html` 逐行解析**：DOCTYPE → html lang → meta charset/viewport → title → `#app` 挂载点 → `<script type="module">` 入口，最终渲染链为 `index.html` → `main.ts` → `App.vue` → 路由组件。
  2. **`App.vue` SFC 三结构**：`<script setup>`（逻辑，顶层变量自动暴露给模板）、`<template>`（HTML 结构，含 `<router-view />` 一级路由出口）、`<style scoped>`（局部样式）。
  3. **`router/index.ts` 写法**：`createRouter` + `createWebHistory`（干净 URL）/ `createWebHashHistory`（带 `#`）；嵌套路由 `children` 实现父骨架 + 子内容的分离。
  4. **进路由 vs 不进路由**：`LandingLayout` 和 `LandingPage` 进路由表（跟 URL 变化）；`LandingHeader` 和 `LandingFooter` 不进路由（被 `LandingLayout` 直接 import 作为固定子组件）。
  5. **`LandingLayout` vs `LandingPage` 的关系**：Layout 是骨架容器（头+router-view+尾），Page 是填进 router-view 的内容。拆开的真正价值是多页面复用同一套头尾（`/`、`/pricing`、`/about` 共享 Layout）。
  6. **`<template>` 的三种用法**：顶层视图模板（SFC 必需）、插槽容器（`<template #slotName>`）、条件/循环包裹（`<template v-if>`）。共同点：逻辑标签，永不出现在浏览器 DOM。
  7. **`LandingHeader.vue` 写法要点**：三栏布局（Logo 左 / 导航中 / 按钮右），`position: sticky` 吸顶，`max-width: 1200px` 居中，BEM 命名，ElementPlus `el-button`。
- 决策：用户要求将学习内容精炼记录到项目日志，但 AI 误将内容写入 `docs/learning-log.md` 而非 `.codebuddy/devlog.md`。
- 修正：本条目合并 Q&A 精华至此；`docs/learning-log.md` 已删除。今后所有学习、决策记录统一于此文件。
- 认知要求：AI 须**主动**更新 `devlog.md`，而非等用户提醒；每次会话有值得记录的概念讲解或决策后自动追加。

### 2026-07-30 — 规范项目日志机制：统一入口 + 规则文件驱动
- 背景：AI 存在两个问题——① 概念 Q&A 记录了但误建到 `docs/learning-log.md` 而非 `.codebuddy/devlog.md`；② 纯聊天不读 `.codebuddy/` 导致忘记更新日志。
- 操作：
  - 将 `docs/learning-log.md` 内容合并入 `devlog.md`，删除冗余文件（已完成）。
  - 新建 `.codebuddy/rules/devlog.md`，明确触发条件（概念/决策/约定出现时必读必写）、排除条件（纯改代码不记）、强制流程（回复前先读日志）。
  - 更新 Memory，确保跨会话记住此约定。
- 结果：日志统一到 `.codebuddy/devlog.md` 单一入口；规则文件驱动 → 以后每次讲概念/做决策时 AI 会先读日志再加条目，不再遗漏。
- 备注：规则是否能真正生效取决于 AI 是否每次读 `.codebuddy/rules/`——若仍遗漏，可考虑将 devlog 规则合并到 `scope.md`（顶层约束）。

### 2026-07-30 — 日志机制最终方案：放弃 .codebuddy 规则文件，改用 Memory
- 背景：`.codebuddy/rules/devlog.md` 存在鸡生蛋问题——AI 必须先主动读 `.codebuddy/` 才能看到规则，但不读 `.codebuddy/` 的原因正是没有规则提醒。用户指出 `.codebuddy/` 规则对 AI 无效，只有 Memory（自动注入上下文）才可靠。
- 操作：
  - 删除 `.codebuddy/rules/devlog.md`（无效规则）。
  - 将日志更新流程写进账号 Memory：每轮结束时若涉及概念/决策，先读 `.codebuddy/devlog.md` 再追加条目。
- 结果：删除无用的规则文件，日志同步机制完全由 Memory 驱动——每次会话自动加载，无需主动查找。

### 2026-07-30 — 确立编码工作流：读文档→自主判断→指出问题
- 背景：写 `LandingHeader.vue` 时，AI 主动读取了 `docs/architecture.md` 和 `docs/page-design.md`，在两处做了自主决策（Logo 用中文而非文档写的英文；导航用 `<a>` 而非 `el-menu`），并解释了原因。
- 用户要求固化此流程：每次写代码前读参考文档，根据文档决定方案但不盲从，有自己的判断时告知理由，发现文档设计不妥处主动指出。
- 操作：将此工作流写入账号 Memory。
- 结果：今后 AI 在写任何组件/功能前都会先对照文档，再自主决策。

### 2026-07-30 — LandingHeader 完整编写：导航命名修正 + 图标库选择 + 主题切换 + 语义 HTML
- **导航命名评估**：文档写"产品能力/解决方案/产品预览"，AI 指出"解决方案"名不副实——其锚向的 §8 是四步使用流程（添加竞品→监控→分析→报告），非按角色/场景的方案包。建议改为"核心功能/工作流程/产品预览"，用户接受。同时明确单页落地页无需"首页"导航（Logo 天然承担此角色）。
- **图标选择**：最初用 emoji 📡 占位，用户质疑后查 `package.json` 发现已安装 `@element-plus/icons-vue`，改用 `<el-icon><Aim /></el-icon>`，颜色用 `var(--el-color-primary)` 保持主题统一。
- **主题切换方案**：教了 Element Plus CSS 变量覆盖法——新建 `styles/theme.css`，在 `:root` 中覆盖 `--el-color-primary` 及其派生色（light-3/5/7/8/9、dark-2），在 `main.ts` 中 import 到 `element-plus/dist/index.css` 之后。提供了紫/青/绿/深灰蓝四套预设配色。
- **语义 HTML 讲解**：`<header>` `<nav>` `<main>` 不影响渲染但影响可访问性（读屏软件）和 SEO（爬虫）；两层嵌套 header > div 的职责分离——外层管全宽背景/边框/吸顶，内层管 1200px 定宽居中。
- **用户实操进度**：LandingHeader Logo 部分已完成（Aim 图标 + 文字），导航链接和右侧按钮待补；LandingFooter 占位；LandingLayout 缺 `flex-direction: column` + `min-height: 100vh`。
- **新增约定**：实现与文档不一致时需同步更新文档，避免文档过时。
