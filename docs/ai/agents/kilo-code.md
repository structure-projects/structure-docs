# Kilo Code 使用教程

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

Kilo 提供 **CLI** 与 **VS Code 扩展**两种形态：

| 形态 | 名称 | 说明 |
|------|------|------|
| CLI / TUI | Kilo CLI | OpenCode 的 Fork，配置格式高度兼容 |
| IDE 扩展 | Kilo Code | 内置运行时，无需单独安装 CLI |

Kilo Code 扩展融合了 Roo Code 与 Cline 的能力，支持 Architect / Code / Debug / Ask 等内置模式与自定义模式。

## 环境要求

- **CLI**：Node.js 18+，推荐现代终端模拟器（WezTerm、Ghostty、Kitty、Alacritty）
- **扩展**：VS Code 1.84+ 及兼容分支（Cursor、Windsurf、VSCodium）
- **Windows**：终端中 `Ctrl+Z` 为挂起信号，换行请用 `Shift+Enter`

## 安装

### CLI

```bash
npm install -g @kilocode/cli
kilo                       # 启动 TUI
```

升级：

```bash
npm update -g @kilocode/cli
```

### VS Code 扩展

1. `Ctrl/Cmd + Shift + X` 打开扩展面板
2. 搜索 `Kilo Code` 安装
3. 点击活动栏 Kilo 图标打开侧边栏

扩展内置运行时，**不需要**额外安装 CLI。

## 认证配置

```bash
kilo auth login       # 交互式选择供应商并登录
kilo auth list        # 查看已配置供应商
kilo auth logout      # 登出
```

也可在 TUI 中执行 `/connect`。扩展端在侧边栏 **Settings** → **Providers** 中配置。

Kilo 内置 Kilo Provider（按量付费 credits），也支持自带 API Key 接入 Anthropic、OpenAI、Google、DeepSeek、阿里 Qwen、Z AI、OpenRouter 等供应商。

## 配置文件

支持 JSON 与 JSONC（带注释）格式。

| 作用域 | 路径 | 兼容路径 |
|--------|------|----------|
| 全局 | `~/.config/kilo/kilo.json[c]` | `~/.config/kilo/opencode.json[c]` |
| 项目 | `./kilo.json[c]`、`./.kilo/` | `./.kilocode/` |

> Kilo CLI 已**不再**回退读取 `.opencode/` 目录，从 OpenCode 迁移时需重命名配置目录。

### 基本示例

```jsonc
// ~/.config/kilo/kilo.jsonc
{
  "$schema": "https://app.kilo.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "autoupdate": true
}
```

`model` 使用 `provider_id/model_id` 格式。

## 自定义模型供应商

### OpenAI 兼容端点

```jsonc
{
  "$schema": "https://app.kilo.ai/config.json",
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

### 阿里云原生供应商

Kilo 内置阿里云 DashScope 供应商，配置 `DASHSCOPE_API_KEY` 后直接使用：

```bash
export DASHSCOPE_API_KEY="YOUR_API_KEY"
```

```jsonc
{
  "model": "alibaba/qwen-plus"        // 国际站
  // "model": "alibaba-cn/qwen-plus"  // 中国站
}
```

> 国内平台接入配置见 [Coding Plan 套餐集成](/ai/coding-plan/)。

## 常用命令

```bash
kilo                        # 启动 TUI
kilo [project]              # 指定项目目录启动
kilo run "任务描述"          # 非交互式执行
kilo auth login             # 登录供应商
kilo agent create           # 创建自定义 Agent
kilo acp                    # 以 ACP 协议模式运行（供编辑器集成）
kilo mcp add <name>         # 添加 MCP 服务
kilo mcp list               # 列出 MCP 服务
kilo mcp auth <name>        # MCP 服务认证
kilo mcp debug <name>       # 调试 MCP 连接
```

### 常用参数

| 参数 | 简写 | 说明 |
|------|------|------|
| `--continue` | `-c` | 继续上次会话 |
| `--session` | `-s` | 指定会话 ID |
| `--model` | `-m` | 指定模型（`provider/model` 格式） |
| `--agent` | | 指定 Agent |
| `--auto` | | 自动批准未明确拒绝的权限 |

### 扩展内置模式

| 模式 | 用途 |
|------|------|
| Architect | 方案设计与任务拆解 |
| Code | 编写与修改代码 |
| Debug | 定位并修复问题 |
| Ask | 只读问答，不修改文件 |

自定义模式可在 **Settings** → **Modes** 中创建，或通过项目内 `.kilo/` 目录共享。

## 常见问题

- **从 OpenCode 迁移**：将 `~/.config/opencode/` 重命名为 `~/.config/kilo/`，项目内 `.opencode/` 重命名为 `.kilo/`
- **模型 ID 不匹配**：自定义供应商的模型 ID 必须与 `GET /v1/models` 返回的 `id` 一致
- **Windows 换行**：使用 `Shift+Enter`，`Ctrl+Z` 会挂起进程
- **工具调用效果差**：选择工具调用能力较强的模型

---

## 参考资源

- [Kilo 官方文档](https://kilo.ai/docs/)
- [CLI 文档](https://kilo.ai/docs/cli)
- [配置参考](https://kilo.ai/docs/cli/configuration)
- [供应商列表](https://kilo.ai/docs/providers)