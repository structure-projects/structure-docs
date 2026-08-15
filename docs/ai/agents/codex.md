# OpenAI Codex CLI 使用教程

## 目录
- [简介](#简介)
- [环境要求](#环境要求)
- [安装](#安装)
- [认证](#认证)
- [配置](#配置)
- [沙盒与审批模式](#沙盒与审批模式)
- [常用命令](#常用命令)
- [项目规则文件](#项目规则文件)
- [常见问题](#常见问题)

---

## 简介

Codex CLI 是 OpenAI 推出的开源命令行 AI 编程智能体，在终端运行，可读取代码库、生成并修改文件、执行 Shell 命令、进行多文件重构。

## 环境要求

- **操作系统**：macOS 12+、Ubuntu 20.04+/Debian 10+、Windows（推荐 WSL2）
- **Node.js**：v22 或更高
- **账号**：ChatGPT Plus/Pro/Team 订阅，或 OpenAI API Key
- **Git**：2.23+（推荐）

## 安装

```bash
# npm 全局安装（最常用）
npm install -g @openai/codex

# macOS 也可用 Homebrew
brew install --cask codex

# 验证安装
codex --version
```

> Windows 用户建议使用 WSL2，项目目录放在 Linux 文件系统（如 `~/code/`）而非 `/mnt/c/`，否则性能很差。

## 认证

### 方式 A：ChatGPT 账号登录（推荐日常使用）

```bash
codex
# 选择 "Sign in with ChatGPT" 完成浏览器登录
```

### 方式 B：OpenAI API Key

```bash
export OPENAI_API_KEY="sk-你的密钥"
echo 'export OPENAI_API_KEY="sk-你的密钥"' >> ~/.zshrc
source ~/.zshrc
```

## 配置

Codex 读取 `~/.codex/config.toml`（TOML 格式）作为全局配置：

```toml
# 模型配置
model = "gpt-5.4"

# 接入第三方/国内兼容 API
openai_base_url = "https://你的兼容端点/v1"

# 沙盒模式：workspace-write / read-only / danger-full-access
sandbox_mode = "workspace-write"

# 审批策略：on-request / untrusted / never
approval_policy = "on-request"
```

### 自定义模型提供方

```toml
model = "gpt-5.4"
model_provider = "my-provider"

[model_providers.my-provider]
name = "My API"
base_url = "https://api.example.com/v1"
env_key = "MY_API_KEY"          # 环境变量名称，非密钥本身
wire_api = "responses"
requires_openai_auth = false
```

### 验证配置

```bash
codex doctor
```

## 沙盒与审批模式

| 模式 | 行为 |
|------|------|
| **read-only** | 只读，写文件/联网需批准 |
| **workspace-write**（默认） | 工作区可写，工作区外需批准 |
| **danger-full-access** | 完全自主，不推荐 |

审批级别：

- `--approval-mode auto-edit`：自动应用文件修改，Shell 命令仍需确认
- `--ask-for-approval never`：完全非交互
- 会话内 `/permissions` 切换模式

## 常用命令

```bash
codex                                    # 进入交互式会话
codex "修复 lint 错误"                     # 带初始提示的交互会话
codex -q "解释 utils.ts"                  # 非交互 quiet 模式
codex --model gpt-5.1-codex-max "重构"    # 指定模型
codex --approval-mode auto-edit -- "添加分页功能"
codex logout                              # 清除 ChatGPT 登录状态
```

## 项目规则文件

在项目根目录创建 `AGENTS.md`（或 `codex.md`）定义项目约定：

```markdown
# AGENTS.md

## 项目约定
- 使用 TypeScript strict 模式
- 所有 API 调用通过 src/api/client.ts
- 使用 Vitest 编写单元测试
```

加载优先级：全局 `~/.codex/AGENTS.md` → 仓库根 `AGENTS.md` → 当前目录 `AGENTS.md`。

## 常见问题

| 问题 | 解决 |
|------|------|
| Invalid API Key | 检查 Key 完整、无空格 |
| 连接超时 | 检查 `OPENAI_BASE_URL`、https 协议 |
| WSL 登录弹不出浏览器 | 手动复制终端 URL 到 Windows 浏览器 |
| Node 版本过低 | 用 nvm 装 Node 22 |
| 自定义 provider 被覆盖 | 先执行 `codex logout` |

---

## 参考资源

- [Codex CLI GitHub](https://github.com/openai/codex)
- [Codex CLI 速查表](https://developer.aliyun.com/article/1714675)