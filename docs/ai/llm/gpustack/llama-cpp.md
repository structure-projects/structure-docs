# llama.cpp 后端架构与使用（基于 GPUStack）

## 目录
- [简介](#简介)
- [技术架构](#技术架构)
- [使用场景](#使用场景)
- [在 GPUStack 中使用 llama.cpp](#在-gpustack-中使用-llamacpp)
  - [自动选择](#自动选择)
  - [手动指定](#手动指定)
- [GGUF 模型](#gguf-模型)
- [后端参数配置](#后端参数配置)
  - [GPU 加速](#gpu-加速)
  - [上下文长度](#上下文长度)
- [与其他后端对比](#与其他后端对比)

---

## 简介

llama.cpp 是 GPUStack 支持的**轻量级推理后端**，由 C/C++ 编写，支持 CPU 和 GPU 混合推理，使用 GGUF 量化格式。GPUStack 通过 **llama-box**（捆绑 llama.cpp）提供该后端，适合小模型、边缘设备和低资源环境。

## 技术架构

- **纯 C/C++ 实现**：无 Python 依赖，可编译为单个可执行文件
- **跨平台**：Linux、macOS、Windows、Android
- **多后端加速**：CUDA、Metal（Apple Silicon）、Vulkan、OpenCL、SYCL
- **GGUF 量化**：支持 2-bit 到 8-bit 多级量化，显著降低内存/显存
- **CPU offload**：可仅将部分层 offload 到 GPU，灵活分配资源

## 使用场景

| 场景 | 说明 |
|------|------|
| 小模型（< 30B） | 轻量快速 |
| 边缘设备 / 嵌入式 | 低资源消耗 |
| 纯 CPU 环境 | 无 GPU 也能运行 |
| Apple Silicon | Metal 加速优秀 |
| GGUF 量化部署 | 灵活显存/内存控制 |

## 在 GPUStack 中使用 llama.cpp

### 自动选择

GPUStack 部署小模型或边缘场景时，**自动选择** llama.cpp 后端：

1. 在 GPUStack UI 部署模型（选择 GGUF 量化版本）
2. GPUStack 自动使用 llama-box 后端运行
3. GPUStack 自动处理 GGUF 模型下载和量化选择

### 手动指定

在 GPUStack 部署模型时手动指定后端为 llama.cpp：

- **后端 (Backend)**：选择 `llama-box`（基于 llama.cpp）
- **模型**：选择 GGUF 格式的量化模型
- **GPU offload 层数**：`n_gpu_layers`（控制显存占用）

## GGUF 模型

GGUF 是 llama.cpp 后端的量化模型格式，GPUStack 支持从 Hugging Face / ModelScope 拉取：

- Hugging Face：搜索 `<model>-GGUF` 仓库
- ModelScope：国内网络推荐
- Ollama Library：GPUStack 可直接部署

量化级别选择详见 [quantization.md](quantization.md)。

## 后端参数配置

### GPU 加速

控制 offload 到 GPU 的层数（层数越多越吃显存）：

```yaml
backend: llama-box
n_gpu_layers: 40               # offload 到 GPU 的层数
```

- `n_gpu_layers: 0` → 纯 CPU 推理
- `n_gpu_layers: 99` → 全部 offload 到 GPU
- 根据显存大小调整，避免 OOM

### 上下文长度

```yaml
backend: llama-box
context_length: 8192           # 上下文长度（影响 KV Cache 和内存）
```

### 完整示例

```yaml
# GPUStack 部署 Qwen3-8B (GGUF Q4_K_M)
backend: llama-box
model: qwen3-8b-q4_k_m.gguf
n_gpu_layers: 40
context_length: 8192
```

## 与其他后端对比

| 维度 | llama.cpp | vLLM |
|------|-----------|------|
| 硬件 | CPU / GPU | NVIDIA GPU |
| 吞吐 | 中低 | 高 |
| 量化 | GGUF | AWQ/GPTQ/FP8 |
| 分布式 | 单机为主 | 多卡多机 |
| 适用 | 小模型、边缘 | 大模型、生产 |

GPUStack 根据场景自动在两者间切换，详见 [index.md](index.md)。

---

## 参考资源

- [llama.cpp GitHub](https://github.com/ggerganov/llama.cpp)
- [llama.cpp 文档](https://github.com/ggerganov/llama.cpp/wiki)
- [GPUStack 后端文档](https://docs.gpustack.ai)