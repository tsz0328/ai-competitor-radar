# AI Competitor Radar

> 🚀 一个基于 FastAPI + Vue3 + Playwright + LLM 的 AI 竞品情报监控系统。

## 📖 项目简介

AI Competitor Radar 是一个自动化竞品监控平台，用于持续跟踪竞品官网、更新日志、定价页面等公开信息，并利用大语言模型（LLM）自动分析变化内容，生成结构化情报报告和趋势洞察。

传统竞品分析依赖人工浏览网页、整理资料和撰写报告，效率低且容易遗漏重要更新。本项目希望通过自动化采集、AI 分析和可视化展示，实现竞品情报的持续监控与主动推送。

---

## ✨ 功能特性

- 🔍 自动监控竞品官网及指定页面
- 🤖 AI 自动生成变化摘要
- 📊 历史版本 Diff 对比
- 📈 趋势分析与可视化
- 📄 AI 自动生成周报
- ⏰ 定时任务自动执行
- 📬 邮件/站内消息推送（规划中）

---

## 🏗️ 技术栈

### Frontend

- Vue 3
- TypeScript
- Vite
- Element Plus
- Pinia
- Axios
- ECharts

### Backend

- FastAPI
- SQLAlchemy 2.0
- Pydantic
- JWT Authentication

### Database

- MySQL
- Redis

### AI

- LLM API（OpenAI Compatible Interface）
- DeepSeek
- Qwen

### Crawler

- Playwright
- Trafilatura

### Deployment

- Docker
- Docker Compose
- Nginx

---

## 📂 项目结构

```text
AI-COMPETITOR-RADAR
│
├── backend/                 # FastAPI 后端
│
├── frontend/                # Vue3 前端
│
├── docs/                    # 项目文档
│   └── architecture.md
│
├── README.md
├── LICENSE
└── .gitignore
```

---

## 🚀 快速开始

### 克隆项目

```bash
git clone https://github.com/yourname/AI-Competitor-Radar.git

cd AI-Competitor-Radar
```

### 后端

> 开发中...

```bash
cd backend
```

### 前端

> 开发中...

```bash
cd frontend
```

---

## 📌 开发计划

- [x] 项目规划
- [x] 技术方案设计
- [x] 项目目录初始化
- [ ] FastAPI 项目初始化
- [ ] Vue3 项目初始化
- [ ] 用户认证模块
- [ ] 竞品管理模块
- [ ] Playwright 爬虫
- [ ] AI 分析模块
- [ ] 趋势分析模块
- [ ] Dashboard
- [ ] Docker 部署

---

## 📚 项目文档

详细设计文档请查看：

```text
docs/architecture.md
```

---

## 📅 Roadmap

### v1.0

- 用户系统
- 竞品管理
- 自动抓取
- AI 摘要
- 周报生成
- 趋势分析

### v2.0

- LangGraph 多 Agent
- 向量数据库
- 多用户协作
- 更多数据源接入

---

## 📄 License

本项目基于 MIT License 开源。

---

## ⭐ 项目状态

🚧 当前仍处于开发阶段（Work in Progress）

欢迎 Star、Issue 和交流讨论。