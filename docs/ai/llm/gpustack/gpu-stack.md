# GPUStack 部署指南

## 目录
- [简介](#简介)
- [架构](#架构)
- [环境要求](#环境要求)
- [Docker 部署](#docker-部署)
  - [环境准备](#环境准备)
  - [部署主节点 (Server)](#部署主节点-server)
  - [部署 Worker 节点](#部署-worker-节点)
- [集群部署](#集群部署)
- [模型部署](#模型部署)
- [OpenAI 兼容 API](#openai-兼容-api)
- [常用命令](#常用命令)
- [常见问题](#常见问题)

---

## 简介

GPUStack 是一个开源的 GPU 集群管理器（Apache 2.0），用于在任意硬件上部署、管理和扩展 AI 模型。核心能力：

- **分布式推理**：单机多卡、多机多卡
- **多推理后端**：vLLM、SGLang、llama.cpp、TensorRT-LLM、MindIE 等
- **异构 GPU**：统一管理 NVIDIA、AMD、Apple Silicon、华为昇腾等
- **OpenAI 兼容 API**：标准 `/v1/chat/completions` 端点
- **模型管理**：用户、API Key、Token 用量统计、GPU 监控

## 架构

GPUStack 采用 **主节点 (Server) + Worker 节点** 架构，**两者均基于 Docker 部署**：

| 角色 | 职责 | 是否需要 GPU | 部署方式 |
|------|------|-------------|----------|
| **Server** | 控制平面：模型管理、调度、API 网关、UI | 否（可不带 GPU） | Docker |
| **Worker** | 计算节点：运行 vLLM/llama.cpp 推理后端 | 是 | Docker |

Worker 通过 token 认证向 Server 注册，Server 统一调度模型到各 Worker。

## 环境要求

- **Ubuntu** >= 20.04
- Worker 节点 GLIBC >= 2.29
- 支持 AMD64 和 ARM64
- NVIDIA GPU 计算能力 (CUDA) >= 6.0
- Docker + NVIDIA 驱动 + NVIDIA Container Toolkit

## Docker 部署

### 环境准备

所有节点（Server 和 Worker）都需要先完成以下准备：

```bash
# 1. 安装 Docker
curl -fsSL https://get.docker.com | sh
sudo systemctl enable --now docker

# 2. 确认 GPU 被识别（Worker 节点）
lspci | grep -i nvidia

# 3. 安装 NVIDIA 驱动（CUDA 11.0+）

# 4. 安装 NVIDIA Container Toolkit
# 官方安装文档：https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html

# 5. 配置 Docker 使用 NVIDIA 运行时
sudo tee /etc/docker/daemon.json > /dev/null <<'EOF'
{
  "runtimes": {
    "nvidia": {
      "path": "nvidia-container-runtime",
      "runtimeArgs": []
    }
  }
}
EOF
sudo systemctl restart docker

# 6. 验证环境
nvidia-smi
docker info 2>/dev/null | grep -q nvidia && echo "NVIDIA Container Toolkit OK"
```

### 部署主节点 (Server)

主节点运行控制平面，**不带** `--server-url`：

```bash
docker run -d \
  --name gpustack \
  --restart=always \
  -p 80:80 \
  -v gpustack-data:/var/lib/gpustack \
  gpustack/gpustack
```

访问 UI：

- 默认：`http://<服务器IP>`（端口 80）
- 自定义端口：将 `-p 80:80` 改为 `-p 9090:80`

登录信息：

```bash
# 用户名：admin
# 获取默认密码（在容器内）
docker exec gpustack cat /var/lib/gpustack/initial_admin_password
```

获取 Worker 加入集群所需的 token：

```bash
docker exec gpustack cat /var/lib/gpustack/token
```

### 部署 Worker 节点

Worker 节点负责运行推理后端，**必须带** `--server-url` 和 `--token`：

```bash
# 设置易识别的主机名（推荐）
sudo hostnamectl set-hostname gpu-worker-01

# 以 worker 模式加入集群（需 GPU）
docker run -d \
  --name gpustack-worker \
  --restart=always \
  --gpus all \
  -v gpustack-worker-data:/var/lib/gpustack \
  gpustack/gpustack \
  --server-url http://<主节点IP>:<端口> \
  --token <主节点token>
```

示例：

```bash
docker run -d \
  --name gpustack-worker \
  --restart=always \
  --gpus all \
  -v gpustack-worker-data:/var/lib/gpustack \
  gpustack/gpustack \
  --server-url http://10.176.0.10:80 \
  --token 8f297e35a55fa652837188acedfd8323
```

> **关键区别**：
> - 主节点：不带 `--server-url`，作为独立 Server（可不挂 GPU）
> - Worker 节点：必须带 `--server-url` + `--token`，并挂载 `--gpus all`，注册到主节点

## 集群部署

### 集群拓扑

```
GPUStack Server (Docker, 无 GPU)
    ├── Worker 1 (Docker, GPU)  → 运行 vLLM 后端
    ├── Worker 2 (Docker, GPU)  → 运行 vLLM 后端
    └── Worker 3 (Docker, GPU)  → 运行 llama.cpp 后端
```

### 部署步骤

1. 先部署主节点 Server（获取 token）
2. 在每个 Worker 节点执行上面的 Worker 部署命令
3. 在 GPUStack UI 的"节点"页面确认 Worker 已注册
4. 部署模型时 GPUStack 自动将模型调度到合适的 Worker

### 多卡 Worker

单机多卡的 Worker 在部署模型时，GPUStack 会自动使用 vLLM 的张量并行跨多卡推理。

## 模型部署

1. 登录 GPUStack UI，进入"模型"页面
2. 选择模型来源：**Hugging Face**、**ModelScope**、**Ollama Library** 或本地路径
3. 选择模型（如 Qwen3、DeepSeek、Llama 等）
4. GPUStack 根据模型大小和硬件**自动选择推理后端**（大模型用 vLLM，边缘用 llama.cpp）
5. 保存后模型开始下载，状态变为 `running` 即可使用

命令行测试：

```bash
docker exec gpustack gpustack chat llama3.2 "tell me a joke."
```

## 兼容 API

部署模型后，GPUStack 在 **`/v1`** 端点提供 OpenAI 兼容 API，并提供 Anthropic 兼容的 `/v1/messages` API。

```bash
# 设置 API Key（在 GPUStack UI 的 Access Control > API Keys 中创建）
export GPUSTACK_API_KEY=gpustack-xxxx

# 列出模型（OpenAI 兼容）
curl http://<服务器>/v1/models \
  -H "Authorization: Bearer $GPUSTACK_API_KEY"

# 对话补全（OpenAI 兼容）
curl http://<服务器>/v1/chat/completions \
  -H "Authorization: Bearer $GPUSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3-8b",
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'

# Anthropic 兼容（/v1/messages）
curl http://<服务器>/v1/messages \
  -H "Authorization: Bearer $GPUSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3-8b",
    "messages": [{"role": "user", "content": "你好"}],
    "max_tokens": 1024
  }'
```

> GPUStack 支持的端点包括 `/v1/chat/completions`、`/v1/responses`（Responses API）、`/v1/messages`（Anthropic）、`/v1/embeddings` 等。`/v1-openai` 是旧版别名（Legacy alias），新项目应使用 `/v1`。

## 常用命令

```bash
# 查看容器状态
docker ps | grep gpustack

# 查看日志
docker logs -f gpustack
docker logs -f gpustack-worker

# 聊天测试
docker exec gpustack gpustack chat <model> "prompt"

# 查看版本
docker exec gpustack gpustack version
```

## 常见问题

| 问题 | 解决 |
|------|------|
| Worker 无法加入集群 | 检查 token 和 server-url 是否正确，网络是否互通 |
| GPU 未被识别 | 检查 NVIDIA 驱动、`nvidia-smi`、Container Toolkit 配置 |
| 端口冲突 | 修改 `-p` 端口映射 |
| 忘记密码 | `docker exec gpustack cat /var/lib/gpustack/initial_admin_password` |
| 模型下载慢 | 使用 ModelScope 源（国内）或配置镜像 |
| 数据丢失 | 使用 `-v` 卷持久化 `/var/lib/gpustack` |

---

## 参考资源

- [GPUStack 官网](https://gpustack.ai)
- [GPUStack 文档](https://docs.gpustack.ai)
- [GPUStack GitHub](https://github.com/gpustack/gpustack)