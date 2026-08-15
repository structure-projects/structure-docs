# GPUStack 私有化部署指南

## 概述

本目录介绍基于 **Ubuntu + Docker + GPUStack** 的 LLM 私有化部署方案。所有模型部署统一通过 GPUStack 管理，GPUStack 负责调度 vLLM 与 llama.cpp 两种推理后端，并提供 OpenAI 兼容 API 供 Agent 和应用调用。

## 技术架构

### 整体架构

```
┌─────────────────────────────────────────────┐
│           Agent / 应用层                       │
│   Codex / OpenClaw / Claude Code / 业务系统     │
└──────────────────┬──────────────────────────┘
                   │ OpenAI / Anthropic 兼容 API（透传）
┌──────────────────▼──────────────────────────┐
│        GPUStack Server（控制平面）              │
│   模型管理、调度、用户/API Key、用量统计          │
│   基于 Docker 部署                             │
└────────┬─────────────────────────┬───────────┘
         │                         │
┌────────▼────────┐      ┌────────▼────────┐
│  Worker 节点 1   │      │  Worker 节点 2   │
│  vLLM 后端       │      │  llama.cpp 后端   │
│  基于 Docker 部署 │      │  基于 Docker 部署  │
│  NVIDIA GPU      │      │  NVIDIA GPU      │
└─────────────────┘      └─────────────────┘
```

### 推理后端对比（GPUStack 自动选择）

| 维度 | vLLM 后端 | llama.cpp 后端 |
|------|-----------|----------------|
| 实现语言 | Python (CUDA) | C/C++ |
| 运行硬件 | NVIDIA GPU（CUDA） | CPU / GPU |
| 量化格式 | AWQ、GPTQ、FP8 | GGUF |
| 吞吐量 | 高（PagedAttention、连续批处理） | 中低 |
| 显存占用 | 较高 | 低（CPU offload 灵活） |
| 分布式 | 张量并行、流水线并行 | 单机为主 |
| 适用场景 | 大模型、高并发、生产 | 小模型、边缘、低资源 |

### 后端选择原则

```
模型 > 30B / 高并发生产服务  →  GPUStack 自动选择 vLLM
模型 < 30B / 边缘轻量部署     →  GPUStack 自动选择 llama.cpp
单机多卡 / 多机多卡           →  vLLM 分布式
纯 CPU / 低显存环境           →  llama.cpp
```

## 目录结构

```
llm/gpustack/
├── index.md                # 本文件：总览与架构
├── gpu-stack.md           # GPUStack 部署（Docker 部署 Server + Worker）
├── vllm.md                # vLLM 后端架构与使用（基于 GPUStack）
├── llama-cpp.md           # llama.cpp 后端架构与使用（基于 GPUStack）
├── quantization.md        # 量化与缓存说明
├── vendor-models.md       # 厂商集成与常用模型配置
└── agent-integration.md   # Agent 集成与模型透传
```

## 快速导航

- [GPUStack 部署指南](gpu-stack.md) — Docker 部署 Server + Worker 节点、集群
- [vLLM 后端](vllm.md) — 高吞吐 GPU 推理
- [llama.cpp 后端](llama-cpp.md) — 轻量级 CPU/GPU 推理
- [量化与缓存](quantization.md) — GGUF/AWQ/GPTQ/FP8、KV Cache
- [厂商模型配置](vendor-models.md) — 厂商集成与常用模型
- [Agent 集成](agent-integration.md) — Codex/OpenClaw 使用 GPUStack 与模型透传

---

## 参考资源

- [GPUStack 官网](https://gpustack.ai)
- [GPUStack 文档](https://docs.gpustack.ai)
- [GPUStack GitHub](https://github.com/gpustack/gpustack)
- [vLLM 文档](https://docs.vllm.ai)
- [llama.cpp GitHub](https://github.com/ggerganov/llama.cpp)