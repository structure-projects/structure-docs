# Dify 使用说明

## 目录
- [简介](#简介)
- [核心概念](#核心概念)
- [部署](#部署)
  - [Docker Compose 自托管](#docker-compose-自托管)
  - [Dify Cloud](#dify-cloud)
- [快速上手](#快速上手)
- [核心功能](#核心功能)
  - [Workflow 工作流](#workflow-工作流)
  - [Agent 智能体](#agent-智能体)
  - [RAG 知识库](#rag-知识库)
- [API 集成](#api-集成)
- [最佳实践](#最佳实践)

---

## 简介

Dify 是一个开源的 LLM 应用开发平台（Apache 2.0），提供可视化编排、RAG、Agent、模型管理等能力，用于快速构建 AI 应用。可自托管，也可使用云端服务。

## 核心概念

| 概念 | 说明 |
|------|------|
| **应用 (App)** | 一个可运行的 AI 应用，分聊天助手、文本生成、Agent、工作流等类型 |
| **知识库 (Knowledge)** | 上传文档构建 RAG 检索库 |
| **模型 (Model)** | 接入 OpenAI、Anthropic、本地模型等 |
| **工具 (Tool)** | 外部 API、函数调用能力 |

## 部署

### Docker Compose 自托管

```bash
# 克隆仓库
git clone https://github.com/langgenius/dify.git
cd dify

# 进入 docker 目录
cd docker

# 复制环境变量模板
cp .env.example .env

# 启动（首次会自动拉取镜像）
docker compose up -d

# 查看状态
docker compose ps
```

访问 `http://localhost`（默认 80 端口），首次登录设置管理员账号。

### Dify Cloud

访问 [cloud.dify.ai](https://cloud.dify.ai) 注册即可使用，免运维。

## 快速上手

1. **配置模型**：Settings → Model Provider，填入 API Key（如 OpenAI、Anthropic，或本地 Ollama）
2. **创建应用**：点击"创建应用"，选择类型（聊天助手 / Agent / 工作流）
3. **编排**：拖拽节点搭建流程
4. **调试预览**：右侧面板实时测试
5. **发布**：发布后生成 API 或嵌入网页

## 核心功能

### Workflow 工作流

可视化拖拽编排，节点类型包括：

| 节点 | 用途 |
|------|------|
| 开始 | 定义输入变量 |
| LLM | 调用大模型生成 |
| 知识检索 | RAG 检索 |
| 条件分支 | IF/ELSE 逻辑 |
| 代码 | 执行 Python/JS 代码 |
| HTTP 请求 | 调用外部 API |
| 变量聚合 | 合并/处理变量 |
| 结束 | 定义输出 |

### Agent 智能体

Agent 应用类型支持 LLM 自主选择工具、规划执行步骤，可配置：

- 工具（搜索、API、代码执行）
- 知识库
- 系统提示词
- 迭代次数上限

### RAG 知识库

```bash
# 创建知识库流程
1. 创建知识库，选择索引方式（高质量/经济）
2. 上传文档（PDF、Word、Markdown、网页等）
3. 自动分段、向量化
4. 在应用/工作流中通过"知识检索"节点引用
```

支持多种分段模式（自动、自定义分隔符、Q&A 分段）和检索方式（向量检索、全文检索、混合检索）。

## API 集成

发布应用后可获取 API Key，通过 HTTP 调用：

```bash
# 聊天接口
curl -X POST http://localhost/v1/chat-messages \
  -H "Authorization: Bearer app-xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {},
    "query": "你好",
    "response_mode": "blocking",
    "conversation_id": "",
    "user": "user-1"
  }'
```

Dify 提供 RESTful API 和 SDK，可集成到现有系统。

## 最佳实践

1. **模型选择**：复杂任务用强模型（Claude/GPT），简单任务用小模型降本
2. **知识库质量**：文档分段质量直接影响检索效果，建议人工校对关键文档
3. **工作流拆分**：复杂流程拆成多个子工作流，便于维护
4. **监控**：通过"日志与标注"观察调用质量，持续优化提示词
5. **权限**：团队成员分级授权，敏感模型 Key 不暴露

---

## 参考资源

- [Dify 官网](https://dify.ai)
- [Dify GitHub](https://github.com/langgenius/dify)
- [Dify 官方文档](https://docs.dify.ai)