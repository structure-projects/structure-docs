# 量化与缓存说明

## 目录
- [量化概述](#量化概述)
- [量化格式](#量化格式)
  - [GGUF（llama.cpp 后端）](#ggufllamacpp-后端)
  - [AWQ / GPTQ（vLLM 后端）](#awq--gptqvllm-后端)
  - [FP8（vLLM 后端）](#fp8vllm-后端)
- [量化级别对比](#量化级别对比)
- [量化选择建议](#量化选择建议)
- [在 GPUStack 中配置量化](#在-gpustack-中配置量化)
- [KV Cache 说明](#kv-cache-说明)
- [缓存与显存配置](#缓存与显存配置)

---

## 量化概述

量化（Quantization）是通过降低模型权重精度来减少模型大小和推理资源占用的技术。核心权衡：**精度损失 vs 资源节省**。

| 原始精度 | 量化后 | 显存节省 |
|----------|--------|----------|
| FP16（16-bit） | 8-bit | 约 50% |
| FP16（16-bit） | 4-bit | 约 75% |

## 量化格式

### GGUF（llama.cpp 后端）

llama.cpp 后端使用的量化格式，支持从 2-bit 到 8-bit 的多级量化，最适合 CPU/边缘部署。

### AWQ / GPTQ（vLLM 后端）

vLLM 后端支持的 GPU 量化格式：

- **AWQ**（Activation-aware Weight Quantization）：4-bit 权重量化，激活感知，精度损失小
- **GPTQ**：4-bit 权重量化，需要校准数据
- 两者都在 GPU 上运行，比 GGUF 更适合高吞吐场景

### FP8（vLLM 后端）

8-bit 浮点量化，需 H100/H200 等新硬件支持，精度损失极小，吞吐提升显著。

## 量化级别对比

### GGUF 常见级别（以 8B 模型为例）

| 量化级别 | 精度 | 大小（约） | 质量 | 适用场景 |
|----------|------|-----------|------|----------|
| Q2_K | 2-bit | 3 GB | 损失大 | 极端低资源 |
| Q3_K_M | 3-bit | 4 GB | 有损 | 低资源 |
| Q4_K_M | 4-bit | 5 GB | 平衡 | **推荐默认** |
| Q5_K_M | 5-bit | 6 GB | 较好 | 追求质量 |
| Q6_K | 6-bit | 7 GB | 接近原版 | 高质量 |
| Q8_0 | 8-bit | 8 GB | 几乎无损 | 质量优先 |
| F16 | 16-bit | 16 GB | 原始精度 | 对比基准 |

> 经验法则：**Q4_K_M 是性价比最高的选择**，质量损失可接受，显存/内存节省 75%。

### AWQ/GPTQ（4-bit）

| 特性 | AWQ | GPTQ |
|------|-----|------|
| 校准方式 | 激活感知，无需校准集 | 需要校准数据 |
| 精度 | 略优于 GPTQ | 良好 |
| 速度 | 快 | 快 |
| 适用 | 生产推荐 | 生产可用 |

## 量化选择建议

```
边缘 / CPU / 低内存      →  GGUF Q4_K_M（llama.cpp 后端）
GPU 生产服务             →  AWQ 4-bit（vLLM 后端）
新硬件（H100/H200）      →  FP8（vLLM 后端）
质量优先、资源充足        →  FP16 原始
显存紧张、可接受损失      →  GGUF Q3_K_M（llama.cpp 后端）
```

## 在 GPUStack 中配置量化

GPUStack 部署模型时，量化由**后端选择 + 模型版本**共同决定：

### llama.cpp 后端（GGUF）

部署时选择 GGUF 格式的量化模型，GPUStack 自动使用 llama.cpp 后端：

```yaml
backend: llama-box
model: qwen3-8b-q4_k_m.gguf      # GGUF 量化版本
```

### vLLM 后端（AWQ/GPTQ/FP8）

部署时选择 AWQ/GPTQ 量化模型，并指定量化参数：

```yaml
backend: vllm
quantization: awq                 # 或 gptq / fp8
```

> GPUStack 会自动从 Hugging Face / ModelScope 拉取对应量化版本。

## KV Cache 说明

KV Cache（Key-Value Cache）是 Transformer 推理时缓存的历史 token 的 Key/Value 向量，避免重复计算。

### 关键影响

| 因素 | 说明 |
|------|------|
| **上下文长度** | KV Cache 随序列长度线性增长 |
| **显存占用** | 长上下文模型（如 128K）KV Cache 可占大量显存 |
| **并发数** | 并发请求越多，KV Cache 占用越大 |

### KV Cache 量化

vLLM 后端支持 KV Cache 量化（如 FP8 KV Cache），进一步降低显存：

```yaml
backend: vllm
kv_cache_dtype: fp8               # FP8 KV Cache 量化
```

## 缓存与显存配置

### vLLM 后端显存配置

```yaml
backend: vllm
gpu_memory_utilization: 0.9       # GPU 显存利用率上限
max_model_len: 8192               # 最大上下文长度（影响 KV Cache）
max_num_seqs: 256                 # 最大并发序列数
```

### llama.cpp 后端显存配置

```yaml
backend: llama-box
n_gpu_layers: 40                  # GPU 层数（控制显存）
context_length: 8192              # 上下文长度（影响 KV Cache）
```

### 显存估算公式

```
总显存 ≈ 模型权重 + KV Cache + 激活值 + 框架开销

KV Cache 显存 ≈ 层数 × 2 × 每 token KV 大小 × 上下文长度 × 并发数
```

> 建议：部署前确认显存配置，避免 OOM。GPUStack 会监控 Worker 显存并在调度时考虑资源。

---

## 参考资源

- [GGUF 格式说明](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md)
- [vLLM 量化文档](https://docs.vllm.ai/en/latest/features/quantization/)
- [GPUStack 文档](https://docs.gpustack.ai)