# Cline 使用教程

## 目录
- [简介](#简介)
- [环境要求](#环境要求)
- [安装](#安装)
- [认证与供应商](#认证与供应商)
- [配置目录](#配置目录)
- [CLI 使用](#cli-使用)
- [环境变量](#环境变量)
- [常见问题](#常见问题)

---

## 简介

Cline 是一个开源 AI 编码 Agent，提供 IDE 扩展、CLI、TUI、SDK 和 Kanban 五种形态。核心特点是**Plan & Act 双模式**——先规划后执行，以及完善的审批机制（读文件、写代码、执行命令均需用户批准）。

## 环境要求

- **IDE 扩展**：VS Code、Cursor、JetBrains、Windsurf、VSCodium、Antigravity
- **CLI**：Node.js 20+（推荐 22）
- **Kanban**：Node.js 18+

## 安装

### IDE 扩展

**VS Code / Cursor / Windsurf / VSCodium / Antigravity**

1. `Ctrl/Cmd + Shift + X` 打开扩展面板
2. 搜索 `Cline` 并安装
3. 点击活动栏 Cline 图标，或执行命令 `Cline: Open In New Tab`

**JetBrains**

1. **Settings** → **Plugins** → **Marketplace**
2. 搜索 `Cline` 安装后重启 IDE
3. **View** → **Tool Windows** → **Cline**

### CLI

```bash
npm install -g cline
cline auth        # 认证
cline             # 启动交互式会话
```

### Kanban（预览版）

```bash
npx kanban
```

Kanban 支持通过看板并行运行多个 Agent，每个任务使用独立的 git worktree 隔离。

### SDK

```bash
npm install @cline/sdk
```

## 认证与供应商

```bash
cline auth
```

支持三种接入方式：

| 方式 | 说明 |
|------|------|
| Cline Provider | 按量付费，内置认证，使用 Cline credits |
| ClinePass | 低成本月度订阅，主流开源编码模型用量为标准 API 的 2-5 倍 |
| 自带供应商 Key | 使用自己的 API Key |

### 内置供应商

Anthropic / Claude Code、OpenAI (Codex)、Google Gemini、AWS Bedrock、DeepSeek、MiniMax、阿里 Qwen、Z AI (智谱)、OpenRouter、Poolside、Requesty 等 30+ 供应商。

### OpenAI 兼容供应商

在 Cline 设置面板（⚙️ 图标）中：

1. **API Provider** 选择 `OpenAI Compatible`
2. **Base URL** 填写供应商端点（如 `https://api.example.com/v1`）
3. **API Key** 填写 API Key
4. **Model** 选择或输入模型 ID
5. **Model Configuration** 可自定义最大输出 Token、上下文窗口、图片支持、Computer Use 等

> 国内平台接入配置见 [Coding Plan 套餐集成](/ai/coding-plan/)。

## 配置目录

Cline 配置分为全局与项目两个作用域：

```text
~/.cline/                      # 全局配置（IDE / CLI / SDK 共享）
  data/
    settings/
      providers.json           # API Key 与供应商配置
      global-settings.json     # 全局设置
      cline_mcp_settings.json  # MCP 配置
    teams/                     # 团队状态
    sessions/                  # 会话数据
    db/                        # SQLite 数据库
    workflows/                 # 全局工作流
  rules/                       # 全局规则
  hooks/                       # 全局 Hooks
  skills/                      # 全局技能
  agents/                      # 全局 Agent 定义
  plugins/                     # 全局插件
  cron/                        # 全局定时任务

.cline/                        # 项目配置（随仓库共享）
  rules/  skills/  hooks/  agents/  plugins/  cron/
```

交互式配置：

```bash
cline config
```

> `.cline/` 目录可提交到 Git 与团队共享，但**不要提交密钥**。

## CLI 使用

### 基本用法

```bash
cline                                    # 交互式会话
cline "重构这个模块使用 async/await"       # 直接执行任务
cline --json "列出所有 TODO 注释"          # 结构化输出
```

### Headless 模式

以下情况自动进入 headless 模式：

| 调用方式 | 触发原因 |
|---------|---------|
| `cline --json "task"` | JSON 输出模式 |
| `cat file \| cline "task"` | stdin 为管道 |
| `cline "task" > output.txt` | stdout 被重定向 |

```bash
git diff | cline "审查这些改动"
cline --json "总结变更日志" | jq -r '.text'
```

### 自动化执行

```bash
cline --auto-approve true "运行测试并修复失败用例"
```

> **警告**：自动执行会在无确认的情况下修改文件、执行命令。建议在干净分支上运行并复查结果。

### 常用命令

| 命令 | 用途 |
|------|------|
| `cline` | 启动交互模式或执行提示 |
| `cline auth` | 认证并设置供应商/模型 |
| `cline config` | 打开交互式配置界面 |
| `cline mcp` | 管理 MCP 服务 |
| `cline doctor` | 诊断并修复配置问题 |
| `cline history` | 查看与管理任务历史 |
| `cline schedule` | 管理定时任务 |
| `cline hub` | 管理本地 hub 守护进程 |
| `cline kanban` | 启动 Kanban 应用 |

### 常用参数

| 参数 | 简写 | 说明 |
|------|------|------|
| `--plan` | `-p` | 以 Plan 模式启动 |
| `--auto-approve <bool>` | | 全局工具自动批准 |
| `--model <model>` | `-m` | 覆盖本次运行的模型 |
| `--provider <id>` | `-P` | 覆盖本次运行的供应商 |
| `--cwd <path>` | `-c` | 设置工作目录 |
| `--json` | | 输出 NDJSON 消息 |
| `--thinking <level>` | | 推理强度：`none`/`low`/`medium`/`high`/`xhigh` |
| `--timeout <seconds>` | `-t` | 任务超时时间 |

## 环境变量

| 变量 | 说明 |
|------|------|
| `CLINE_DATA_DIR` | 自定义数据目录（替代 `~/.cline/data/`） |
| `CLINE_HUB_ADDRESS` | 覆盖 hub 地址（默认 `127.0.0.1:25463`） |
| `CLINE_SESSION_BACKEND_MODE` | 后端模式：`local`/`hub`/`remote`/`auto` |
| `CLINE_SANDBOX` | 启用沙箱模式 |
| `CLINE_HOOKS_DIR` | 额外的 Hooks 目录 |
| `CLINE_COMMAND_PERMISSIONS` | 限制 shell 命令的 JSON 策略 |

### 限制命令执行

```bash
export CLINE_COMMAND_PERMISSIONS='{"allow": ["npm *", "git *"], "deny": ["rm -rf *", "sudo *"]}'
```

规则说明：

- `deny` 优先于 `allow`
- 设置了 `allow` 时，不匹配的命令一律拒绝
- `allowRedirects` 控制是否允许重定向（`>`、`>>`、`<`），默认 `false`

## 常见问题

- **Invalid API Key**：确认 API Key 与所选供应商匹配
- **Model Not Found**：确认模型 ID 在该 Base URL 下可用
- **查看日志**：`cline dev log`
- **安全提示**：Hooks 与插件可执行代码，只使用可信来源

---

## 参考资源

- [Cline 官方文档](https://docs.cline.bot/cline-overview)
- [安装指南](https://docs.cline.bot/getting-started/installing-cline)
- [CLI 命令参考](https://docs.cline.bot/cli/cli-reference)
- [配置说明](https://docs.cline.bot/getting-started/config)