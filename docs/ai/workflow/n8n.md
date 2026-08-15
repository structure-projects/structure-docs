# n8n 使用说明

## 目录
- [简介](#简介)
- [部署](#部署)
  - [Docker 自托管](#docker-自托管)
  - [npm 安装](#npm-安装)
  - [n8n Cloud](#n8n-cloud)
- [核心概念](#核心概念)
- [快速上手](#快速上手)
- [核心功能](#核心功能)
  - [节点与集成](#节点与集成)
  - [AI 节点](#ai-节点)
  - [代码节点](#代码节点)
- [最佳实践](#最佳实践)

---

## 简介

n8n 是一个开源的通用工作流自动化平台（采用 Sustainable Use License），通过节点化可视化编辑器连接 400+ 应用和服务，实现数据管道、系统集成、定时任务等自动化。

## 部署

### Docker 自托管

```bash
# 简单启动（不持久化数据）
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  n8nio/n8n

# 持久化启动（推荐）
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

访问 `http://localhost:5678` 进入编辑器。

### npm 安装

```bash
# 全局安装
npm install -g n8n

# 启动
n8n start

# 或使用 npx
npx n8n
```

### n8n Cloud

访问 [n8n.io](https://n8n.io) 使用云端服务，免运维。

## 核心概念

| 概念 | 说明 |
|------|------|
| **Workflow（工作流）** | 由节点组成的有向图，定义自动化流程 |
| **Node（节点）** | 单个步骤，触发或执行某操作 |
| **Trigger（触发器）** | 启动工作流的节点（定时、Webhook、事件） |
| **Connection（连接）** | 节点间的数据流 |
| **Credential（凭证）** | 存储第三方服务认证信息 |

## 快速上手

1. 启动 n8n，访问 `http://localhost:5678`
2. 注册管理员账号
3. 点击 "Workflows" → "New Workflow"
4. 添加触发器节点（如 Schedule Trigger 定时触发）
5. 添加执行节点（如 HTTP Request、AI Agent）
6. 连接节点，配置参数
7. 点击 "Execute" 测试运行
8. 激活工作流（Active）使其自动运行

## 核心功能

### 节点与集成

n8n 内置 400+ 节点，覆盖：

- **触发器**：Schedule（定时）、Webhook（HTTP 回调）、Cron、事件监听
- **数据库**：MySQL、PostgreSQL、MongoDB、Redis
- **通信**：Slack、Telegram、Email、飞书
- **云服务**：AWS、GCP、Azure、阿里云
- **开发工具**：GitHub、GitLab、Jira
- **AI**：OpenAI、Anthropic、Google AI、Ollama

### AI 节点

n8n 提供 AI 相关节点，可构建 LLM 应用：

| 节点 | 用途 |
|------|------|
| AI Agent | 构建自主 Agent，选择工具执行 |
| Basic LLM Chain | 简单 LLM 调用链 |
| Retrieval QA Chain | RAG 问答 |
| Vector Store | 向量存储（Pinecone、Qdrant 等） |
| LangChain 节点 | 集成 LangChain 能力 |

### 代码节点

Code 节点支持 JavaScript/Python，实现自定义逻辑：

```javascript
// 处理输入数据
const items = $input.all();
const result = items.map(item => ({
  json: {
    ...item.json,
    processed: true,
    timestamp: new Date().toISOString()
  }
}));
return result;
```

## 最佳实践

1. **错误处理**：关键节点添加 Error Trigger 分支，处理失败情况
2. **凭证安全**：使用 Credential 管理密钥，不硬编码到工作流
3. **模块化**：复杂流程拆分成子工作流（Sub-workflow）复用
4. **版本控制**：工作流可导出为 JSON，纳入 Git 管理
5. **监控**：关注 Execution 日志，及时发现问题
6. **资源限制**：自托管时配置执行并发数，防止资源耗尽

---

## 参考资源

- [n8n 官网](https://n8n.io)
- [n8n 文档](https://docs.n8n.io)
- [n8n 社区模板](https://n8n.io/workflows)