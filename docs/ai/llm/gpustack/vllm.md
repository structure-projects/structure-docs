# vLLM 后端架构与使用（基于 GPUStack）

## 目录
- [简介](#简介)
- [技术架构](#技术架构)
  - [PagedAttention](#pagedattention)
  - [连续批处理 (Continuous Batching)](#连续批处理-continuous-batching)
- [使用场景](#使用场景)
- [在 GPUStack 中使用 vLLM](#在-gpustack-中使用-vllm)
  - [自动选择](#自动选择)
  - [手动指定](#手动指定)
- [后端参数配置](#后端参数配置)
  - [分布式并行](#分布式并行)
  - [量化](#量化)
  - [显存与并发](#显存与并发)
- [与其他后端对比](#与其他后端对比)

---

## 简介

vLLM 是 GPUStack 支持的**高性能推理后端**，专为 NVIDIA GPU 设计。在 GPUStack 中，大模型（通常 > 30B）和高并发生产场景会自动选用 vLLM 后端。

## 技术架构

### PagedAttention

vLLM 的核心创新，借鉴操作系统虚拟内存的分页机制管理 KV Cache：

- 将 KV Cache 按固定大小分块（block）存储
- 按需分配，避免显存碎片化
- 显著提升显存利用率（相比传统方案吞吐提升 2-4 倍）

### 连续批处理 (Continuous Batching)

- 传统静态批处理：等整个 batch 完成后才能加入新请求
- 连续批处理：请求完成即释放位置，新请求动态加入
- 大幅提升 GPU 利用率，降低延迟

## 使用场景

| 场景 | 说明 |
|------|------|
| 大模型服务（>30B） | 分布式推理、高吞吐 |
| 高并发生产服务 | 连续批处理、低延迟 |
| 单机多卡 / 多机多卡 | 张量/流水线并行 |
| AWQ/GPTQ/FP8 量化 | 降低显存、提升吞吐 |
| 需要高 GPU 利用率 | PagedAttention 显存管理 |

## 在 GPUStack 中使用 vLLM

### 自动选择

GPUStack 部署模型时，根据模型大小和硬件**自动选择** vLLM 后端：

1. 在 GPUStack UI 部署模型（Hugging Face / ModelScope 等来源）
2. 模型较大或需要高性能时，GPUStack 自动使用 vLLM
3. GPUStack 自动配置张量并行、显存等参数

### 手动指定

在 GPUStack 部署模型时可手动指定后端为 vLLM，并配置参数：

- **后端 (Backend)**：选择 `vLLM`
- **并行度**：`tensor_parallel_size`、`pipeline_parallel_size`
- **量化**：`quantization`（AWQ / GPTQ / FP8）
- **上下文长度**：`max_model_len`
- **显存利用率**：`gpu_memory_utilization`

## 后端参数配置

### 分布式并行

| 参数 | 说明 | 示例 |
|------|------|------|
| `tensor_parallel_size` | 张量并行度（GPU 数） | 4（单机 4 卡） |
| `pipeline_parallel_size` | 流水线并行度 | 4（多机按层切分） |

```yaml
# 部署模型时（示例）
backend: vllm
tensor_parallel_size: 4        # 4 卡张量并行
pipeline_parallel_size: 1
```

> 多机分布式推理由 GPUStack 自动调度，Worker 节点间通过 GPUStack 通信。

### 量化

vLLM 后端支持 AWQ / GPTQ / FP8 量化（详见 [quantization.md](quantization.md)）：

```yaml
backend: vllm
quantization: awq             # 或 gptq / fp8
```

### 显存与并发

```yaml
backend: vllm
gpu_memory_utilization: 0.9   # GPU 显存利用率上限
max_model_len: 8192           # 最大上下文长度（影响 KV Cache）
max_num_seqs: 256             # 最大并发序列数
```

## 与其他后端对比

| 维度 | vLLM | llama.cpp |
|------|------|-----------|
| 硬件 | NVIDIA GPU | CPU / GPU |
| 吞吐 | 高 | 中低 |
| 量化 | AWQ/GPTQ/FP8 | GGUF |
| 分布式 | 支持多卡多机 | 单机为主 |
| 适用 | 大模型、生产 | 小模型、边缘 |

GPUStack 根据场景自动在两者间切换，详见 [index.md](index.md)。

---

## 参考资源

- [vLLM 文档](https://docs.vllm.ai)
- [vLLM GitHub](https://github.com/vllm-project/vllm)
- [GPUStack 后端文档](https://docs.gpustack.ai)