# OpenHands 使用教程

## 目录
- [简介](#简介)
- [部署方式](#部署方式)
  - [Docker 本地部署](#docker-本地部署)
  - [CLI 启动器 (uv)](#cli-启动器-uv)
  - [Agent Canvas](#agent-canvas)
  - [云端部署](#云端部署)
- [模型配置](#模型配置)
- [使用方法](#使用方法)
- [注意事项](#注意事项)

---

## 简介

OpenHands（原名 OpenDevin）是一个开源的 AI 软件工程智能体，MIT 许可证，由 All Hands AI 和伊利诺伊大学香槟分校支持。它能像人类开发者一样修改代码、运行命令、浏览网页、调用 API，甚至创建 GitHub Pull Request。

## 部署方式

### Docker 本地部署

需先安装 Docker Desktop（Windows 还需 WSL）：

```bash
docker pull docker.openhands.dev/openhands/runtime:0.60-nikolaik

docker run -it --rm --pull=always \
    -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.openhands.dev/openhands/runtime:0.60-nikolaik \
    -e LOG_ALL_EVENTS=true \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v ~/.openhands:/.openhands \
    -p 3000:3000 \
    --add-host host.docker.internal:host-gateway \
    --name openhands-app \
    docker.openhands.dev/openhands/openhands:0.60
```

访问 `http://localhost:3000` 打开 Web 界面。

### CLI 启动器 (uv)

新版推荐用 uv 启动，环境隔离更好：

```bash
# 启动 GUI 服务器
uvx --python 3.12 openhands serve

# 或启动 CLI
uvx --python 3.12 openhands
```

### Agent Canvas

```bash
npm install -g @openhands/agent-canvas
agent-canvas
```

支持在本地、Docker、虚拟机或云端运行多个 agent 后端，可创建与 Slack、GitHub、Linear 集成的自动化任务。

### 云端部署

- **OpenHands Cloud**：官方云服务，新用户 $20 免费额度，最易入门
- **Railway 一键部署**：3-5 分钟完成，需配置 `LLM_MODEL`、`LLM_API_KEY` 等环境变量，成本约 $5-15/月

## 模型配置

OpenHands 通过 litellm 支持任意 LLM（Anthropic、OpenAI、Google、Bedrock、OpenRouter、Ollama、vLLM）。社区推荐 **Claude Sonnet 4.5/4.6**（SWE-bench 解决率 53%+），GPT-4o 也是不错的替代。

关键环境变量：

```bash
LLM_API_KEY="..."                          # API Key
LLM_MODEL="anthropic/claude-sonnet-4-20250514"  # 模型
LLM_BASE_URL="https://..."                 # OpenAI 兼容端点（Ollama/vLLM）
SANDBOX_RUNTIME_CONTAINER_IMAGE="..."      # 沙箱运行时镜像
WORKSPACE_BASE="/path/to/workspace"        # 工作区路径
```

## 使用方法

1. 打开 Web UI，点击设置（齿轮图标）选择 LLM 提供商并填入 API Key
2. 输入自然语言描述任务，如 "Fix this failing test" 或 "Scaffold a FastAPI endpoint with auth and tests"
3. 可连接 GitHub 仓库，让 agent 直接读代码、建分支、提交 PR
4. 内置工具：shell、文件编辑器、网页抓取、git、GitHub PR 创建
5. 对话和文件持久化保存（Docker 卷），重新部署不丢失

## 注意事项

- OpenHands 设计为**单用户本地工作站**使用，不适合多租户部署，无内置认证、隔离
- 公网部署需额外安全加固（如 nginx basic-auth）
- 需要较先进的 LLM，小模型或上下文受限的本地模型效果不佳
- 0.44 之前版本升级需 `mv ~/.openhands-state ~/.openhands` 迁移历史

---

## 参考资源

- [OpenHands GitHub](https://github.com/All-Hands-AI/OpenHands)
- [OpenHands 官方文档](https://docs.all-hands.dev)