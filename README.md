# AI Recipe Assistant

AI Recipe Assistant 是一个基于 AI 的智能菜谱助手网站，为用户提供个性化的菜谱推荐和烹饪问答服务。

## 功能特性

- 🍳 **智能菜谱推荐** – 根据用户需求、饮食偏好和现有食材，通过 AI 推荐合适的菜谱
- 💬 **AI 对话助手** – 与 AI 厨师实时对话，获取食材替换建议、烹饪技巧等
- 📋 **菜谱卡片** – 清晰展示食材、步骤、用时等信息

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Angular 21 + TypeScript + SCSS |
| 后端 | Python 3.12 + FastAPI + Pydantic v2 |
| AI   | OpenAI GPT-4o-mini (可配置) |

## 项目结构

```
ai-recipe-assistant/
├── frontend/                  # Angular 前端
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── recipe-search/   # 菜谱搜索与推荐页面
│   │   │   │   ├── recipe-card/     # 菜谱卡片组件
│   │   │   │   └── recipe-chat/     # AI 对话页面
│   │   │   ├── models/              # TypeScript 数据模型
│   │   │   ├── services/            # HTTP 服务层
│   │   │   ├── app.routes.ts        # 路由配置
│   │   │   └── app.config.ts        # 应用配置
│   │   └── styles.scss              # 全局样式
│   └── package.json
└── backend/                   # FastAPI 后端
    ├── app/
    │   ├── api/routes/
    │   │   └── recipes.py     # 菜谱相关 API 路由
    │   ├── core/
    │   │   ├── config.py      # 应用配置（环境变量）
    │   │   └── ai_client.py   # OpenAI 客户端封装
    │   ├── models/
    │   │   └── recipe.py      # 数据模型
    │   ├── schemas/
    │   │   └── recipe.py      # 请求/响应 Schema
    │   └── main.py            # FastAPI 应用入口
    ├── requirements.txt
    ├── run.py                 # 启动脚本
    └── .env.example           # 环境变量示例
```

## 快速开始

### 后端

1. 进入后端目录并创建虚拟环境：

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
```

2. 安装依赖：

```bash
pip install -r requirements.txt
```

3. 配置环境变量：

```bash
cp .env.example .env
# 编辑 .env，填入你的 OpenAI API Key
```

4. 启动开发服务器：

```bash
python run.py
```

后端将运行在 `http://localhost:8000`，API 文档见 `http://localhost:8000/docs`。

### 前端

1. 进入前端目录并安装依赖：

```bash
cd frontend
npm install
```

2. 启动开发服务器：

```bash
npm start
```

前端将运行在 `http://localhost:4200`。

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET  | `/health` | 健康检查 |
| POST | `/api/v1/recipes/recommend` | AI 菜谱推荐 |
| POST | `/api/v1/recipes/chat` | AI 对话问答 |

### 菜谱推荐示例

```http
POST /api/v1/recipes/recommend
Content-Type: application/json

{
  "query": "一道简单的家常菜",
  "dietary_preferences": ["素食"],
  "available_ingredients": ["豆腐", "番茄", "鸡蛋"],
  "max_results": 3
}
```

### AI 对话示例

```http
POST /api/v1/recipes/chat
Content-Type: application/json

{
  "message": "如何让炒饭更香？",
  "history": []
}
```

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | （必填） |
| `OPENAI_MODEL` | 使用的 GPT 模型 | `gpt-4o-mini` |
| `ALLOWED_ORIGINS` | 允许的跨域来源 | `["http://localhost:4200"]` |

## 开发计划

- [ ] 用户认证与个人收藏
- [ ] 数据库持久化（PostgreSQL / MongoDB）
- [ ] 菜谱图片生成
- [ ] 多语言支持
- [ ] Docker 容器化部署
