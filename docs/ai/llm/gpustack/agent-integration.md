# Agent 集成与模型透传

## 目录
- [概述](#概述)
- [GPUStack 兼容 API](#gpustack-兼容-api)
- [模型透传机制](#模型透传机制)
- [接入方式总览](#接入方式总览)
- [Codex CLI 集成](#codex-cli-集成)
- [OpenClaw 集成](#openclaw-集成)
- [Claude Code 集成](#claude-code-集成)
- [其他 Agent 集成](#其他-agent-集成)
- [统一接入架构](#统一接入架构)

---

## 概述

GPUStack 提供 **OpenAI 兼容 API**（含 Responses API）和 **Anthropic 兼容 API**，可将私有部署的模型（vLLM/llama.cpp 后端）以及外部云模型，通过统一端点透传给各类 AI Agent。

> 以下端点路径均来自 GPUStack 官方文档与源码，非推断。

## GPUStack 兼容 API

GPUStack 在 **`/v1`** 端点提供 OpenAI 兼容 API，同时提供 Anthropic 兼容的 `/v1/messages` API。

| 协议 | 端点 | 说明 |
|------|------|------|
| OpenAI Chat Completions | `/v1/chat/completions` | 对话补全 |
| OpenAI Responses | `/v1/responses` | Responses API（Codex 使用） |
| OpenAI Models | `/v1/models` | 模型列表 |
| OpenAI Embeddings | `/v1/embeddings` | 向量化 |
| Anthropic Messages | `/v1/messages` | Claude 兼容消息接口 |
| Jina Rerank | `/v1/rerank` | 重排序 |

> 注：`/v1-openai` 是**旧版别名（Legacy alias）**，已冻结不再新增端点，新项目应使用 `/v1`。

```bash
# 在 GPUStack UI 的 Access Control > API Keys 中创建 API Key
export GPUSTACK_API_KEY="gpustack-xxxx"

# OpenAI Chat Completions
curl http://<server>/v1/chat/completions \
  -H "Authorization: Bearer $GPUSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "qwen3", "messages": [{"role": "user", "content": "Hello!"}]}'

# Anthropic Messages
curl http://<server>/v1/messages \
  -H "Authorization: Bearer $GPUSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "qwen3", "messages": [{"role": "user", "content": "Hello!"}], "max_tokens": 1024}'
```

## 模型透传机制

GPUStack 的"模型透传"指两个层面：

1. **本地模型透传**：将部署在 vLLM/llama.cpp 后端的本地模型，通过兼容端点透传给 Agent
2. **外部厂商透传（网关）**：将请求透传给外部云厂商（OpenAI、Claude、DeepSeek 等）

## 接入方式总览

GPUStack 同时支持 Chat Completions、Responses、Anthropic Messages 三种协议，因此各类 Agent 均可**直接对接**，无需额外转换层：

| Agent | API 协议 | 对接端点 |
|-------|----------|----------|
| Codex CLI | OpenAI Responses | `/v1/responses` |
| Claude Code | Anthropic Messages | `/v1/messages` |
| OpenClaw | Chat Completions | `/v1/chat/completions` |
| Qoder | Chat Completions | `/v1/chat/completions` |
| Cursor | Chat Completions | `/v1/chat/completions` |

## Codex CLI 集成

Codex 使用 OpenAI **Responses API** 通信。GPUStack 原生支持 `/v1/responses`，因此 Codex 可**直接对接 GPUStack**，无需 Moon Bridge 等转发层（转发层仅在对接不支持 Responses API 的厂商时才需要）。

### 配置

编辑 `~/.codex/config.toml`，将 `base_url` 指向 GPUStack：

```toml
[openai]
base_url = "http://<gpu-stack-server>/v1"
api_key = "gpustack-xxxx"
```

> **注意**：
> - Codex 可能还需要 `models_catalog.json` 提供模型元数据（上下文窗口、推理档位等），具体见 [Codex 官方文档](https://github.com/openai/codex)
> - GPUStack 目前暂无官方的 Codex 集成文档，上述为基于 GPUStack Responses API 支持的标准 Codex 配置，建议部署后实际验证

### 验证

```bash
# 测试 Responses API 端点
curl http://<server>/v1/responses \
  -H "Authorization: Bearer gpustack-xxxx" \
  -H "Content-Type: application/json" \
  -d '{"model": "qwen3", "input": "你好", "max_output_tokens": 1024}'

# 启动 Codex
cd /path/to/project
codex
```

## OpenClaw 集成

OpenClaw 使用 Chat Completions 协议，直接对接 GPUStack 的 `/v1` 端点：

```yaml
# OpenClaw 模型提供商配置（示意）
provider: openai-compatible
base_url: "http://<gpu-stack-server>/v1"
api_key: "gpustack-xxxx"
model: "qwen3"
```

> 详细配置参见 OpenClaw 官方文档的"自定义模型提供商"章节。

## Claude Code 集成

Claude Code 使用 Anthropic Messages 协议，直接对接 GPUStack 的 `/v1/messages`。GPUStack 提供了官方集成文档：[Integrate with Claude Code](https://docs.gpustack.ai/integrations/integrate-with-claude-code/)。

### 方式一：环境变量

```bash
export ANTHROPIC_BASE_URL="http://<gpu-stack-server>"
export ANTHROPIC_API_KEY="gpustack-xxxx"
```

> Claude Code 会自动在 `ANTHROPIC_BASE_URL` 后拼接 `/v1/messages`，与 GPUStack 的端点对齐。

### 方式二：CC-Switch（官方推荐）

GPUStack 官方文档推荐使用 [CC-Switch](https://github.com/farion1231/cc-switch) 快速切换模型提供商：

1. 安装 CC-Switch
2. 添加自定义 Provider：Provider Name 填 `GPUStack`，API Endpoint 填 GPUStack 服务器地址，API Key 填创建的 Key
3. 配置模型使用已部署的模型名（如 `qwen3-coder-next`）

### 验证

```bash
claude -p "你好，介绍一下你自己"
```

## 其他 Agent 集成

### Qoder

```bash
# Qoder 配置自定义模型提供商（Chat Completions）
# /model → Custom → Add custom model
# base_url 指向 GPUStack 的 /v1
```

### Cursor

Cursor 的 Settings → Models 中配置自定义 OpenAI API Base URL 指向 GPUStack 的 `/v1`。

### 通用原则

接入 GPUStack 只需三步：

1. **获取端点**：`http://<gpu-stack-server>/v1`
2. **创建 API Key**：GPUStack UI → Access Control → API Keys
3. **配置 Agent**：设置 `base_url` + `api_key` + 模型名，按 Agent 的协议选择对应端点（Responses / Chat Completions / Messages）

## 统一接入架构

```
┌──────────────────────────────────────────────────────────────┐
│  Codex CLI  │  Claude Code  │  OpenClaw  │  Qoder  │  Cursor  │
└──────┬────────────┬──────────────┬─────────────┬──────────────┘
       │ Responses  │ Anthropic    │ Chat Compl. │ Chat Compl.
       │ API        │ Messages     │             │
       │            │              │             │
       ▼            ▼              ▼             ▼
┌──────────────────────────────────────────────────────────────┐
│                  GPUStack（统一端点 /v1）                       │
│   /v1/responses   /v1/messages   /v1/chat/completions          │
└──────────────┬──────────────────────────────┬─────────────────┘
               │                              │
        ┌──────▼──────┐              ┌────────▼─────────┐
        │  本地模型    │              │  外部云厂商        │
        │  vLLM       │              │  OpenAI/Claude    │
        │  llama.cpp  │              │  DeepSeek 等      │
        └─────────────┘              └──────────────────┘
```

---

## 参考资源

- [GPUStack Inference APIs 官方文档](https://docs.gpustack.ai/integrations/inference-apis/)
- [GPUStack Integrate with Claude Code](https://docs.gpustack.ai/integrations/integrate-with-claude-code/)
- [GPUStack 源码 routes.py](https://github.com/gpustack/gpustack/blob/main/gpustack/routes/routes.py)
- [Codex CLI](https://github.com/openai/codex)
- [OpenClaw 文档](https://openclaw.ai/docs)