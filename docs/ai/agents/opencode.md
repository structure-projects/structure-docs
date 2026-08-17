# OpenCode 使用教程

## 目录
- [简介](#简介)
- [环境要求](#环境要求)
- [安装](#安装)
- [认证配置](#认证配置)
- [配置文件](#配置文件)
- [自定义模型供应商](#自定义模型供应商)
- [常用命令](#常用命令)
- [常见问题](#常见问题)

---

## 简介

OpenCode 是一个开源的 AI 编码 Agent，提供终端 TUI、桌面应用和 IDE 插件三种形态。其核心特点是**供应商中立**——通过 [Models.dev](https://models.dev) 的供应商列表支持数百种模型，可自由接入任意 OpenAI / Anthropic 兼容端点。

Kilo CLI 是 OpenCode 的 Fork，配置格式完全兼容。

## 环境要求

- **终端**：推荐 WezTerm、Alacritty、Ghostty、Kitty 等现代终端模拟器
- **Node.js**：使用 npm 安装方式时需要
- **Windows**：推荐使用 WSL 以获得完整功能支持

## 安装

### 方式一：安装脚本（推荐）

```bash
curl -fsSL https://opencode.ai/install | bash
```

### 方式二：包管理器

```bash
# npm / bun / pnpm / yarn
npm install -g opencode-ai

# Homebrew（macOS / Linux）
brew install anomalyco/tap/opencode

# Arch Linux
sudo pacman -S opencode        # 稳定版
paru -S opencode-bin           # AUR 最新版

# Windows
choco install opencode
scoop install opencode

# Docker
docker run -it --rm ghcr.io/anomalyco/opencode
```

> 推荐使用 `anomalyco/tap` 源，官方 `brew install opencode` 由 Homebrew 团队维护，更新较慢。

## 认证配置

### 交互式登录

```bash
opencode auth login
```

凭据存储在 `~/.local/share/opencode/auth.json`。

也可在 TUI 中执行 `/connect` 命令选择供应商。

### 查看与登出

```bash
opencode auth list      # 或 opencode auth ls
opencode auth logout
```

## 配置文件

OpenCode 支持 JSON 和 JSONC（带注释）格式。

### 配置优先级

配置文件是**合并**而非替换，后加载的覆盖前面冲突的键：

1. 远程配置（`.well-known/opencode`）— 组织默认值
2. 全局配置（`~/.config/opencode/opencode.json`）
3. 自定义配置（`OPENCODE_CONFIG` 环境变量）
4. 项目配置（项目根目录 `opencode.json`）
5. `.opencode` 目录（agents / commands / plugins）
6. 内联配置（`OPENCODE_CONFIG_CONTENT` 环境变量）
7. 托管配置文件（macOS `/Library/Application Support/opencode/`）
8. macOS 托管偏好（MDM `.mobileconfig`）— 最高优先级

### 基本示例

```jsonc
// ~/.config/opencode/opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "autoupdate": true,
  "server": {
    "port": 4096
  }
}
```

### 环境变量

| 变量 | 说明 |
|------|------|
| `OPENCODE_CONFIG` | 自定义配置文件路径 |
| `OPENCODE_CONFIG_DIR` | 自定义配置目录（agents / commands / plugins） |
| `OPENCODE_CONFIG_CONTENT` | 内联配置内容 |

## 自定义模型供应商

通过 `provider` 字段可接入任意 OpenAI 兼容端点：

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "my-provider": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "My Provider",
      "options": {
        "baseURL": "https://api.example.com/v1",
        "apiKey": "{env:MY_API_KEY}"
      },
      "models": {
        "my-model-id": {
          "name": "My Model",
          "limit": { "context": 262144, "output": 32768 }
        }
      }
    }
  },
  "model": "my-provider/my-model-id"
}
```

`npm` 字段指定协议包：

| 值 | 协议 |
|----|------|
| `@ai-sdk/openai-compatible` | OpenAI Chat Completions（默认） |
| `@ai-sdk/openai` | OpenAI Responses |
| `@ai-sdk/anthropic` | Anthropic Messages |

> 国内平台接入配置见 [Coding Plan 套餐集成](/ai/coding-plan/)。

## 初始化项目

```bash
cd /path/to/project
opencode
```

在 TUI 中执行 `/init`，OpenCode 会分析项目并生成 `AGENTS.md` 文件。建议将该文件提交到 Git，帮助 OpenCode 理解项目结构与编码规范。

## 常用命令

```bash
opencode                    # 启动 TUI
opencode [project]          # 指定项目目录启动
opencode run "任务描述"      # 非交互式执行
opencode auth login         # 登录供应商
opencode agent create       # 创建自定义 Agent
opencode agent list         # 列出可用 Agent
opencode attach <url>       # 连接远程后端
opencode web --port 4096    # 启动 Web 服务
opencode github install     # 安装 GitHub Agent
```

### 常用参数

| 参数 | 简写 | 说明 |
|------|------|------|
| `--continue` | `-c` | 继续上次会话 |
| `--session` | `-s` | 指定会话 ID |
| `--fork` | | 继续时复刻会话 |
| `--model` | `-m` | 指定模型（`provider/model` 格式） |
| `--agent` | | 指定 Agent |
| `--auto` | | 自动批准未明确拒绝的权限 |
| `--port` | | 监听端口 |

## 常见问题

- **工具调用效果差**：选择工具调用能力较强的模型（如 Qwen-Coder、DeepSeek-Coder 变体）
- **Windows 体验问题**：推荐使用 WSL，Bun 安装方式尚在开发中
- **模型 ID 不匹配**：自定义供应商的模型 ID 必须与 `GET /v1/models` 返回的 `id` 一致

---

## 参考资源

- [OpenCode 官方文档](https://opencode.ai/docs)
- [配置参考](https://opencode.ai/docs/config/)
- [CLI 命令参考](https://opencode.ai/docs/cli/)
- [供应商列表](https://opencode.ai/docs/providers/)