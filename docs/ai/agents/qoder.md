# Qoder 使用教程

## 目录
- [简介](#简介)
- [安装](#安装)
- [登录与认证](#登录与认证)
- [配置 Qwen 模型](#配置-qwen-模型)
- [使用方式](#使用方式)
  - [TUI 交互模式](#tui-交互模式)
  - [非交互模式](#非交互模式)
- [AGENTS.md 记忆文件](#agentsmd-记忆文件)
- [权限控制](#权限控制)
- [MCP 与自定义模型](#mcp-与自定义模型)
- [常见问题](#常见问题)

---

## 简介

Qoder 是面向软件开发的 Agentic 编码平台，提供桌面 IDE、CLI 和 JetBrains 插件。Qoder CLI 是基于阿里云通义千问（Qwen）大模型的命令行 AI 编程助手，支持：

- 自然语言编程、代码审查、自动化任务执行
- 通过 Token Plan（个人版/团队版）或按量付费接入千问 AI 平台
- 自定义 / 本地模型（Ollama、Hugging Face）
- MCP 工具集成

## 安装

支持 macOS、Linux、Windows，CPU 架构支持 arm64 / amd64。

```bash
# 方式一：官方安装脚本
curl -fsSL https://qoder.com/install | bash

# 方式二：Homebrew (macOS / Linux)
brew install qoderai/qoder/qodercli --cask

# 方式三：npm 全局安装
npm install -g @qoder-ai/qodercli
```

验证安装：

```bash
qodercli --version
```

## 登录与认证

### 方式一：TUI 登录（推荐）

```bash
# 启动交互界面
qodercli
```

进入后输入 `/login`，选择：
- **login with browser**：浏览器打开登录页完成认证
- **login with qoder personal access token**：粘贴 Personal Access Token

> Personal Access Token 获取地址：`https://qoder.com/account/integrations`

### 方式二：环境变量登录（适合 CI/CD）

```bash
# Linux / macOS
export QODER_PERSONAL_ACCESS_TOKEN="your_personal_access_token_here"

# Windows 命令提示符
set QODER_PERSONAL_ACCESS_TOKEN="your_personal_access_token_here"
```

## 配置 Qwen 模型

1. 在对话中输入 `/model`
2. 按 Tab 键切换到 **Custom**
3. 选择 **Add custom model**
4. 提供商选择：
   - 国内用户：**Alibaba Cloud Model Studio - China**
   - 国际用户：**Alibaba Cloud Model Studio - International**
5. 类型选择：Token Plan（个人版/团队版）、Coding Plan 或按量付费
6. 选择模型（如 qwen3.6-plus），输入对应 API Key
7. 重启 Qoder CLI，`/model` 切换到 Custom 选择配置好的模型

### 获取 API Key

- **国内用户**：阿里云百炼平台或魔搭平台
- **国际用户**：Alibaba Cloud Model Studio

## 使用方式

### TUI 交互模式

```bash
# 进入项目目录
cd /path/to/project
qodercli
```

交互前缀：

| 输入 | 说明 |
|------|------|
| `>` | 对话模式（默认），直接输入文本 |
| `!` | Bash 模式，运行 shell 命令 |
| `/` | 斜杠模式，运行内置命令 |
| `#` | 记忆模式，追加内容到 AGENTS.md |
| `\` + 回车 | 输入多行文本 |

### 非交互模式

```bash
# 单次命令模式
qodercli -q -p "解释这个项目"

# 指定输出格式：text / json / stream-json
qodercli --output-format=json

# 指定工作区目录
qodercli -w /path/to/project

# 继续上次会话
qodercli -c

# 恢复指定会话
qodercli -r <session-id>

# 仅允许指定工具
qodercli --allowed-tools=READ,WRITE

# 禁止指定工具
qodercli --disallowed-tools=READ,WRITE

# 最大对话轮数
qodercli --max-turns=10

# 跳过权限检查
qodercli --yolo
```

## AGENTS.md 记忆文件

使用 `/init` 初始化生成 `AGENTS.md`，用于定义 AI 的"人设"与项目规则：

```bash
# 初始化，生成 AGENTS.md
/init
```

在 `#` 记忆模式下，输入内容会追加到 AGENTS.md 记忆文件，用于沉淀项目规范。

## 权限控制

Qoder CLI 通过命令行参数控制权限：

```bash
# 允许特定工具
qodercli --allowed-tools=READ,WRITE,EDIT

# 禁止特定工具
qodercli --disallowed-tools=BASH

# 完全跳过权限检查（谨慎使用）
qodercli --yolo
```

## MCP 与自定义模型

### MCP 支持

```bash
# 移除 MCP 服务器
qodercli mcp remove playwright
qodercli mcp remove context7
```

### 配置本地 Ollama 模型

```bash
# 临时启用（确保 Ollama 运行在 127.0.0.1:11434）
qodercli --ollama http://127.0.0.1:11434/v1 --model qwen2.5-coder:14b
```

或修改全局配置 `~/.qoder/config.yaml`（Windows 为 `%USERPROFILE%\.qoder\config.yaml`）：

```yaml
llm:
  base_url: "http://127.0.0.1:11434/v1"
  api_key: "sk-ollama"
  model: "qwen2.5-coder:14b"
```

> 保存后需重启 Qoder CLI 进程配置才生效。

## 常见问题

- **找不到模型选项**：可能未登录，或版本过低（需 0.16.0 及以上）
- **无法指定具体模型**：默认 Auto 模式自动选模型，需通过 `/model` 配置自定义模型
- **配置不生效**：修改配置文件后需重启 Qoder CLI

---

## 参考资源

- [Qoder 官方文档](https://platform.qianwenai.com/docs/developer-guides/clients-and-developer-tools/qoder)
- [Qwen-Code CLI 安装配置指南](https://developer.aliyun.com/article/1680177)