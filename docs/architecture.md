# AI 竞品情报雷达 — 技术方案文档

> 版本：v1.0　作者：唐思哲　更新日期：2026-06

---

## 一、项目概述

### 1.1 项目背景

产品经理、创业团队在做竞品分析时，普遍依赖人工刷网站、截图、写报告，效率低、易遗漏、无法及时发现竞品的细微变化（新功能上线、定价调整、用户口碑变化）。

### 1.2 项目目标

构建一个**自动化竞品情报系统**：系统定时抓取指定竞品的官网/更新日志/用户评论等公开信息，通过 AI 提炼关键变化，生成结构化情报报告，并主动推送给用户，而不是等用户来问。

### 1.3 核心价值主张

| 痛点 | 系统解法 |
|---|---|
| 人工刷网站耗时 | 定时任务自动抓取 |
| 信息零散难提炼 | AI 自动摘要 + 关键变化提取 |
| 不知道"变了什么" | 历史快照对比，自动生成 Diff |
| 被动查询 | 主动推送周报/异动提醒 |

### 1.4 不做什么（边界）

- 不做付费数据源接入（如天眼查 API），第一版只做公开网页信息
- 不做情感分析模型自研，直接调用大模型能力
- 不做多用户 SaaS 化（第一版单用户/小团队即可）

---

## 二、整体架构

### 2.1 架构分层图

```
┌─────────────────────────────────────────────────┐
│                   前端展示层                      │
│   Vue3 + TypeScript + Element Plus + ECharts     │
│   Dashboard / 竞品管理 / 报告详情 / 趋势图          │
└───────────────────┬───────────────────────────────┘
                     │ HTTP / SSE
┌───────────────────▼───────────────────────────────┐
│                  后端服务层（FastAPI）              │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ 用户认证  │ │竞品管理API│ │  报告查询/推送API  │  │
│  │  (JWT)   │ │  (CRUD)  │ │                   │  │
│  └──────────┘ └──────────┘ └──────────────────┘  │
└───────────────────┬───────────────────────────────┘
                     │
       ┌─────────────┼─────────────────┐
       ▼             ▼                 ▼
┌────────────┐ ┌────────────┐  ┌─────────────────┐
│  采集层     │ │  AI分析层   │  │  任务调度层       │
│ Playwright │ │ 直接调用LLM │  │ APScheduler /    │
│ 爬虫引擎    │ │ API + Pydantic│ Celery（后期）     │
│ 反爬策略    │ │ 摘要/对比   │  │ 定时触发抓取任务   │
└─────┬──────┘ └─────┬──────┘  └─────────────────┘
      │              │
      ▼              ▼
┌─────────────────────────────────────────┐
│              数据存储层                   │
│  MySQL（结构化数据）+ Redis（缓存/队列）    │
│  本地文件/对象存储（网页快照、截图）         │
└─────────────────────────────────────────┘
```

### 2.2 数据流向（一次完整抓取-分析-推送流程）

```
定时任务触发
    ↓
Playwright 访问竞品页面 → 抓取 HTML/文本
    ↓
清洗结构化（去广告、去导航栏，提取正文）
    ↓
存入数据库（带时间戳的快照）
    ↓
与上一次快照做 Diff 对比（文本相似度算法）
    ↓
若有显著变化 → 调用 LLM 生成摘要 + 分类（新功能/降价/差评激增）
    ↓
写入"情报事件"表
    ↓
定时（每周）汇总所有事件 → LLM 生成周报
    ↓
周期性聚合历史事件 → 统计变化频率/类型分布 → LLM 生成趋势判断
    ↓
前端展示 / 邮件推送
```

---

## 三、技术栈选型与理由

| 层级 | 技术选型 | 选型理由 |
|---|---|---|
| 前端框架 | Vue3 + TypeScript | 已有基础，可复用 |
| UI 组件库 | Element Plus | 已用过，开发效率高 |
| 图表 | ECharts | 已用过，适合做趋势图 |
| 状态管理 | Pinia | 已用过 |
| 后端框架 | FastAPI | 异步性能好，自动生成 API 文档，AI 生态原生支持 |
| ORM | SQLAlchemy 2.0（异步） | Python 后端标准选型 |
| 数据校验 | Pydantic | FastAPI 强依赖，类型安全 |
| 数据库 | MySQL 8.0 | 已有基础，结构化数据存储 |
| 缓存/队列 | Redis | 缓存抓取结果、任务队列、Session |
| 爬虫引擎 | Playwright（Python） | 支持动态渲染页面，比 requests/BeautifulSoup 更适合现代网站 |
| AI 调用方式 | 直接调用 LLM API + Pydantic 结构化输出 | 核心逻辑（摘要/分类）较简单，重型框架的抽象层会增加不必要的调试成本，详见后文说明 |
| Agent 编排（V2） | LangGraph | 多Agent协作场景才需要的状态化编排，是当前招聘JD最高频要求的Agent框架 |
| 大模型 API | 可选：通义千问 / DeepSeek / OpenAI 兼容接口 | 国内访问稳定、成本低 |
| 向量数据库 | Chroma（本地） | 轻量，适合存储历史报告做语义检索（V2功能） |
| 定时任务 | APScheduler | 第一版够用，比 Celery 轻量 |
| 鉴权 | JWT | 已有经验，直接复用 |
| 容器化 | Docker + Docker Compose | 一键启动全部依赖服务 |
| 部署 | 云服务器（轻量应用服务器即可）+ Nginx | 成本可控 |

---

## 四、数据库设计

### 4.1 核心表结构

**用户表 `users`**
```sql
id              BIGINT PRIMARY KEY AUTO_INCREMENT
username        VARCHAR(50) UNIQUE NOT NULL
password_hash   VARCHAR(255) NOT NULL
email           VARCHAR(100)
created_at      DATETIME
```

**竞品表 `competitors`**
```sql
id              BIGINT PRIMARY KEY AUTO_INCREMENT
user_id         BIGINT  -- 所属用户
name            VARCHAR(100)     -- 竞品名称
official_url    VARCHAR(255)     -- 官网地址
monitor_urls    JSON             -- 监控的多个页面（更新日志/定价页/评论页）
category        VARCHAR(50)      -- 行业分类
status          ENUM('active','paused')
created_at      DATETIME
```

**网页快照表 `page_snapshots`**
```sql
id              BIGINT PRIMARY KEY AUTO_INCREMENT
competitor_id   BIGINT
url             VARCHAR(255)
raw_html_path   VARCHAR(255)   -- 原始HTML存储路径（文件系统/对象存储）
clean_text      TEXT           -- 清洗后的正文
content_hash    VARCHAR(64)    -- 内容哈希，用于快速判断是否变化
crawled_at      DATETIME
```

**情报事件表 `intelligence_events`**
```sql
id              BIGINT PRIMARY KEY AUTO_INCREMENT
competitor_id   BIGINT
event_type      ENUM('new_feature','price_change','negative_review_spike','content_update','other')
summary         TEXT           -- AI生成的摘要
diff_detail     TEXT           -- 具体变化内容
confidence      FLOAT          -- AI判断的置信度
source_snapshot_id  BIGINT     -- 关联的快照
created_at      DATETIME
```

**周报表 `weekly_reports`**
```sql
id              BIGINT PRIMARY KEY AUTO_INCREMENT
user_id         BIGINT
period_start    DATE
period_end      DATE
content         TEXT      -- AI生成的完整周报（Markdown格式）
event_ids       JSON      -- 本周报关联的事件ID列表
created_at      DATETIME
```

**趋势洞察表 `trend_insights`**
```sql
id              BIGINT PRIMARY KEY AUTO_INCREMENT
competitor_id   BIGINT
period_start    DATE
period_end      DATE
change_frequency JSON      -- 各类型变化的频率统计（如调价次数/月）
trend_summary   TEXT       -- AI生成的趋势判断文本
trend_direction ENUM('accelerating','stable','slowing')  -- 变化节奏趋势
created_at      DATETIME
```

### 4.2 索引设计要点

- `page_snapshots(competitor_id, crawled_at)` 联合索引，便于按时间查历史快照
- `content_hash` 加索引，快速判断网页是否发生变化（避免每次都做全文 Diff）
- `intelligence_events(competitor_id, created_at)` 联合索引，便于周报汇总查询

---

## 五、核心模块详细设计

### 5.1 爬虫采集模块

```
职责：
- 根据竞品配置的 URL 列表，定时访问页面
- 处理反爬（设置 User-Agent、随机延迟、必要时用代理池）
- 提取正文内容（去除导航栏、广告、页脚等噪音）
- 生成内容哈希，与上次快照对比，判断是否需要进一步处理

技术要点：
- Playwright 处理 JS 渲染页面（很多官网用 React/Vue 构建，纯 requests 拿不到内容）
- 使用 trafilatura 或自定义规则提取正文（去噪）
- 失败重试机制（网络异常、页面结构变化导致抓取失败）
- 频率控制（避免被目标网站封禁 IP）
```

### 5.2 AI 分析模块

```
职责：
- 对比新旧快照，识别"显著变化"（避免抓取到无意义的微小改动）
- 调用大模型，将变化内容分类（新功能/价格/评论激增等）
- 生成结构化摘要（不是简单复述原文）
- 周期性汇总多个事件，生成周报

Pipeline 设计（不依赖 LangChain，直接调用 LLM API）：

设计原则：核心链路只有"摘要+分类"这种单次调用场景，逻辑简单、
步骤固定，引入 LangChain 的 Chain/Agent 抽象反而会增加理解和调试成本
（详见文末"技术选型说明"）。因此采用更轻量可控的方式：

1. Diff 预处理：用文本相似度算法（如 difflib）先做粗筛，
   减少不必要的 LLM 调用（省 token、省钱）
2. 事件分类：直接调用 LLM API，通过 Prompt 模板 + Pydantic 模型
   约束返回的 JSON 结构（新功能/价格/评论激增等分类），
   FastAPI 原生支持 Pydantic 校验，链路更短
3. 摘要生成：基于分类结果，再次调用 LLM API 生成简洁摘要
4. 周报汇总：将一周内所有事件拼接成结构化 Prompt，交给 LLM
   生成有逻辑结构的报告

V2 阶段（多Agent协作）：当需要让"抓取Agent""分析Agent""报告Agent"
互相协作、动态决策时，引入 LangGraph 做状态图编排（见第十节）

### 5.3 趋势分析模块（链路闭环的关键一环）

```
职责：
这是整条链路里把"孤立事件"升级为"AI工作流"的核心环节。
没有这一步，系统只是"每次抓到变化就调一次AI分类"，
本质上还是"事件触发型脚本"；
有了这一步，AI才是在基于历史数据做连续判断，这才是工作流。

具体做什么：
- 周期性（每周/每月）拉取某竞品过去N个时间窗口的 intelligence_events
- 统计维度：变化频率（多久调一次价/多久上一次新功能）、
  变化类型分布（这个竞品最近主要在哪个方向发力）、
  变化速度趋势（节奏是在加快还是放缓）
- 把统计结果 + 历史事件摘要一起交给 LLM，
  生成"趋势判断"而不是简单的"事件复述"
  例如："该竞品近3个月调价频率较前3个月提升一倍，
        且新功能集中在AI能力方向，推测正在加速抢占AI细分市场"

技术实现：
- 数据库层：基于 intelligence_events(competitor_id, created_at, event_type)
  做聚合查询（COUNT/GROUP BY 时间窗口）
- 分析层：聚合结果序列化后作为 Prompt 上下文，调用 LLM 生成趋势判断
- 输出：写入新表 trend_insights，供周报模块和前端趋势图共同使用
```
```

### 5.4 任务调度模块

```
职责：
- 按用户配置的频率（每天/每周）触发对应竞品的抓取任务
- 任务失败重试、日志记录
- 后续可扩展为分布式任务队列（Celery + Redis），第一版用 APScheduler 足够

调度策略：
- 不同竞品可设置不同抓取频率（重要竞品每天抓，次要竞品每周抓）
- 错峰执行，避免同一时间大量任务并发导致资源紧张
```

### 5.5 前端模块设计

```
页面结构：
├── Dashboard（数据概览）
│   - 监控中竞品数量、本周新增事件数、趋势图（ECharts）
├── 竞品管理（Competitor）
│   - 增删改查竞品、配置监控URL、设置抓取频率
├── 情报事件流（Events）
│   - 时间轴形式展示所有检测到的变化事件
├── 周报详情（Report）
│   - 展示AI生成的周报，支持历史周报回看
└── 系统设置（Settings）
    - 推送方式配置（邮件/站内通知）、账户管理

组件复用：
- 事件卡片组件（Event Card）：在 Dashboard 和 Events 页复用
- 趋势图组件：封装 ECharts，传入不同数据展示不同维度
- 统一请求封装：Axios 实例 + 拦截器（Token自动携带，已有经验）
```

---

## 六、API 设计（核心接口示例）

```
认证相关
POST   /api/auth/register          注册
POST   /api/auth/login             登录，返回JWT

竞品管理
GET    /api/competitors            获取竞品列表
POST   /api/competitors            新增竞品
PUT    /api/competitors/{id}       编辑竞品
DELETE /api/competitors/{id}       删除竞品

情报事件
GET    /api/events                 获取事件列表（支持按竞品/时间筛选）
GET    /api/events/{id}            事件详情

周报
GET    /api/reports                获取周报列表
GET    /api/reports/{id}           周报详情
POST   /api/reports/generate       手动触发生成周报（调试用）

趋势分析
GET    /api/trends/{competitor_id} 获取某竞品的趋势洞察（变化频率、节奏方向）
GET    /api/trends/{competitor_id}/chart   返回趋势图表所需的时间序列数据

实时能力（可选，体验加分项）
GET    /api/events/stream          SSE，实时推送新检测到的事件
```

---

## 七、部署架构

```
单机部署方案（适合个人项目/演示）：

┌─────────────────────────────────────┐
│           云服务器（Linux）            │
│                                       │
│  ┌─────────┐  ┌─────────┐           │
│  │ Nginx   │→ │ 前端静态  │           │
│  │ (反向代理)│  │ 资源     │           │
│  └────┬────┘  └─────────┘           │
│       │                              │
│       ▼                              │
│  ┌─────────┐  ┌─────────┐           │
│  │ FastAPI │→ │ MySQL   │           │
│  │ (Docker)│  │ (Docker)│           │
│  └────┬────┘  └─────────┘           │
│       │                              │
│       ▼                              │
│  ┌─────────┐  ┌─────────┐           │
│  │ Redis   │  │ 定时任务  │           │
│  │ (Docker)│  │ 进程      │           │
│  └─────────┘  └─────────┘           │
└─────────────────────────────────────┘

docker-compose.yml 统一管理所有服务，
本地开发和云端部署用同一套配置，保证环境一致性
```

---

## 八、开发阶段规划

```
阶段一（第1-2周）：基础设施搭建
- 项目初始化（前后端脚手架）
- 数据库表设计落地
- 用户认证模块（JWT登录注册）
- Docker环境搭建

阶段二（第3-4周）：核心采集能力
- Playwright爬虫开发
- 内容清洗与去噪
- 快照存储与Diff对比逻辑

阶段三（第5-7周）：AI分析能力
- LLM API调用封装（Prompt模板 + Pydantic结构化输出）
- 事件分类与摘要生成
- 趋势分析模块（聚合历史事件 + 生成趋势判断）
- 周报生成逻辑

阶段四（第8-9周）：前端完整开发
- Dashboard、竞品管理、事件流、周报页面
- 前后端联调

阶段五（第10-11周）：任务调度与自动化
- APScheduler定时任务集成
- 邮件推送功能

阶段六（第12周）：部署与打磨
- Docker Compose整合部署
- README、架构图、技术博客撰写
- 演示视频录制
```

---

## 九、风险与应对

| 风险 | 应对方案 |
|---|---|
| 目标网站反爬升级，抓取失败 | 设置合理频率，必要时引入代理池；做好失败重试与告警 |
| 网站改版导致提取规则失效 | 抓取逻辑与解析规则分离，便于针对单个网站快速调整 |
| LLM 调用成本过高 | 先用文本相似度算法粗筛，只对"显著变化"调用LLM，减少无效调用 |
| 法律合规风险 | 仅抓取公开页面信息，不绕过登录验证，不抓取个人隐私数据 |

---

## 十、后续可扩展方向（V2规划，先了解，不影响第一版）

```
- 多Agent协作：拆分为"抓取Agent"、"分析Agent"、"报告Agent"，
  用LangGraph编排，体现Multi-Agent架构能力（面试加分项）
- 向量化历史报告，支持语义搜索"过去某竞品做过哪些价格调整"
- 多用户SaaS化，支持团队协作
- 接入更多数据源（小红书、知乎等社媒平台的竞品提及）
```

---

## 十一、技术选型说明：为什么核心链路不用 LangChain

这部分专门写出来，是因为这是一个值得在面试时主动讲的工程判断，而不是回避的弱点。

**背景**：LangChain 在社区存在真实争议。有团队反馈，简单场景下引入 LangChain 后，团队花在理解和调试框架抽象上的时间，跟构建功能本身一样多；也有开发者测算过，用 LangChain 实现简单 RAG 的成本是直接调用 API 的数倍。核心问题在于：LangChain 的 Chain/Agent 抽象适合"标准化复杂流程"，但对本项目这种"单次调用+结构化输出"的简单场景，反而是过度设计。

**本项目的判断**：
```
核心链路（摘要生成、事件分类）：
└── 逻辑单一、步骤固定 → 直接调 LLM API + Pydantic 约束输出
    更轻量、更可控、出问题更容易定位

V2 多Agent协作（抓取/分析/报告Agent互相决策）：
└── 需要状态管理、动态分支、多角色交互 → 用 LangGraph
    这类复杂编排场景，正是框架该发挥价值的地方
```

**一句话总结**：不是"要不要用框架"，而是"在什么复杂度下用什么工具"。简单问题用简单方案解决，复杂的状态化协作才交给专门的编排框架，这本身就是技术选型能力的体现。

