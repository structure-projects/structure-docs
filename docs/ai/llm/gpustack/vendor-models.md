# 厂商集成与常用模型配置

## 目录
- [模型来源](#模型来源)
  - [Hugging Face](#hugging-face)
  - [ModelScope（魔搭）](#modelscope魔搭)
  - [Ollama Library](#ollama-library)
  - [本地路径](#本地路径)
- [外部厂商集成（模型透传）](#外部厂商集成模型透传)
- [常用模型配置](#常用模型配置)
  - [Qwen（阿里通义）](#qwen阿里通义)
  - [DeepSeek（深度求索）](#deepseek深度求索)
  - [GLM（智谱）](#glm智谱)
  - [Llama（Meta）](#llamameta)
  - [其他模型](#其他模型)
- [配置建议](#配置建议)

---

## 模型来源

GPUStack 支持从多个来源拉取模型，统一通过 GPUStack UI 部署。

### Hugging Face

GPUStack UI 中选择 Hugging Face 来源，输入模型 ID（如 `Qwen/Qwen3-8B`），GPUStack 自动下载并部署。

### ModelScope（魔搭）

国内网络推荐，GPUStack UI 中选择 ModelScope 来源：

- 模型 ID 如 `Qwen/Qwen3-8B`
- GPUStack 自动拉取并部署

### Ollama Library

GPUStack 支持直接部署 Ollama Library 中的模型：

```bash
llama3.2
qwen3:8b
deepseek-r1:7b
```

### 本地路径

部署已下载到本地（Worker 节点）的模型目录或 GGUF 文件。

## 外部厂商集成（模型透传）

GPUStack 可作为**网关**对接外部模型提供商（OpenAI、Claude、DeepSeek 等），通过统一 OpenAI 兼容端点同时服务本地模型和云模型。

### 配置外部 Provider

在 GPUStack UI 中添加外部模型提供商：

| 提供商 | 说明 | API 地址 |
|--------|------|----------|
| OpenAI | GPT 系列 | `https://api.openai.com/v1` |
| Anthropic | Claude 系列 | 需兼容层 |
| DeepSeek | DeepSeek-V3/R1 | `https://api.deepseek.com` |
| 阿里百炼 | Qwen 系列 | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| 智谱 | GLM 系列 | `https://open.bigmodel.cn/api/paas/v4` |

配置后，用户可通过 GPUStack 统一端点访问外部云模型和本地私有模型。

## 常用模型配置

以下模型均通过 GPUStack 部署，GPUStack 自动选择后端并调度。

### Qwen（阿里通义）

| 模型 | 参数 | 推荐后端 | 推荐量化 | 适用场景 |
|------|------|----------|----------|------|
| Qwen3-0.6B/1.7B/4B | 小 | llama.cpp | GGUF Q4_K_M | 边缘、轻量 |
| Qwen3-8B/14B | 中 | vLLM / llama.cpp | AWQ / GGUF | 通用 |
| Qwen3-32B | 大 | vLLM | AWQ 4-bit | 高质量推理 |
| Qwen3-235B | 超大 | vLLM 分布式 | FP8 | 顶尖能力 |
| Qwen3-Coder | 代码 | vLLM | AWQ | 代码生成 |

```yaml
# GPUStack 部署 Qwen3-8B（示例）
model: Qwen/Qwen3-8B
backend: vllm                  # GPUStack 自动选择，也可手动指定
tensor_parallel_size: 1
```

### DeepSeek（深度求索）

| 模型 | 参数 | 推荐后端 | 推荐量化 | 说明 |
|------|------|----------|----------|------|
| DeepSeek-R1-7B/14B | 中 | vLLM / llama.cpp | AWQ / GGUF | 推理模型 |
| DeepSeek-V3 | 671B (MoE) | vLLM 分布式 | FP8 | 需多卡集群 |
| DeepSeek-R1 | 671B (MoE) | vLLM 分布式 | FP8 | 需多卡集群 |

> DeepSeek-V3/R1 是 MoE 架构，671B 总参数，需多机多卡分布式推理，GPUStack 集群自动调度到多个 Worker。

```yaml
# GPUStack 部署 DeepSeek-R1（示例，需集群）
model: deepseek-ai/DeepSeek-R1
backend: vllm
tensor_parallel_size: 8        # 多卡张量并行
max_model_len: 8192
```

### GLM（智谱）

| 模型 | 参数 | 推荐后端 | 推荐量化 |
|------|------|----------|----------|
| GLM-4-9B | 中 | vLLM / llama.cpp | AWQ / GGUF |
| GLM-4-32B | 大 | vLLM | AWQ |

### Llama（Meta）

| 模型 | 参数 | 推荐后端 | 推荐量化 |
|------|------|----------|----------|
| Llama-3.1-8B | 中 | vLLM / llama.cpp | AWQ / GGUF |
| Llama-3.3-70B | 大 | vLLM 分布式 | AWQ |
| Llama-3.2-1B/3B | 小 | llama.cpp | GGUF Q4_K_M |

### 其他模型

| 模型 | 厂商 | 说明 |
|------|------|------|
| Mistral-7B | Mistral AI | 通用，vLLM/llama.cpp |
| Yi-1.5 | 零一万物 | 中英双语，vLLM |
| MiniMax-Text | MiniMax | 长上下文，vLLM |
| Phi-3/4 | 微软 | 小模型，llama.cpp |

## 配置建议

### 后端选择

```
模型 ≤ 14B          → llama.cpp 后端（轻量、灵活）
模型 14B ~ 70B      → vLLM 后端（单卡或双卡）
模型 > 70B / MoE    → vLLM 分布式（多卡/多机）
纯 CPU / 边缘       → llama.cpp 后端
```

### 量化选择

```
生产高吞吐   → AWQ / FP8（vLLM 后端）
边缘低资源   → GGUF Q4_K_M（llama.cpp 后端）
质量优先     → FP16 原始
```

### GPU 规划参考（FP16）

| 模型参数 | 所需显存（约） | 建议配置 |
|----------|---------------|----------|
| 7B-8B | 16-20 GB | 1 × RTX 4090 / A10 |
| 14B | 28-32 GB | 1 × A100 40GB |
| 32B | 64-70 GB | 1 × A100 80GB |
| 70B | 140 GB | 2 × A100 80GB |
| 235B / 671B MoE | 多机多卡 | 集群 |

---

## 参考资源

- [Hugging Face](https://huggingface.co)
- [ModelScope 魔搭](https://modelscope.cn)
- [Ollama Library](https://ollama.com/library)
- [GPUStack 文档](https://docs.gpustack.ai)