# Claude Code 使用和配置指南

## 目录
- [简介](#简介)
- [安装](#安装)
  - [macOS / Linux](#macos--linux)
  - [Windows](#windows)
  - [IDE 插件](#ide-插件)
- [快速开始](#快速开始)
- [核心概念](#核心概念)
  - [会话 (Session)](#会话-session)
  - [工具 (Tools)](#工具-tools)
  - [权限 (Permissions)](#权限-permissions)
- [配置体系](#配置体系)
  - [settings.json 层级](#settingsjson-层级)
  - [CLAUDE.md 记忆文件](#claudemd-记忆文件)
  - [环境变量](#环境变量)
- [权限管理](#权限管理)
- [Hooks 钩子](#hooks-钩子)
- [MCP 服务器](#mcp-服务器)
- [Subagents 子代理](#subagents-子代理)
- [Skills 技能](#skills-技能)
- [斜杠命令 (Slash Commands)](#斜杠命令-slash-commands)
- [使用技巧](#使用技巧)
- [常见问题](#常见问题)

---

## 简介

Claude Code 是 Anthropic 推出的命令行 AI 编程 Agent，可在终端中直接运行，也能作为 IDE 插件使用。它具备：

- 强大的**代码理解与生成**能力（基于 Claude 模型）
- **工具调用**：读写文件、执行命令、搜索代码、Web 访问等
- **权限体系**：精确控制 Agent 可执行的操作
- **Hooks**：在工具调用前后执行自定义脚本
- **MCP**：接入外部工具和数据源
- **Subagents**：并行子代理执行任务
- **Skills**：封装可复用的领域能力

## 安装

### macOS / Linux

#### 方式一：npm 安装（推荐，需 Node.js 18+）
```bash
# 安装
npm install -g @anthropic-ai/claude-code

# 验证
claude --version
```

#### 方式二：原生安装器（无需 Node.js）
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows

```powershell
# 方式一：npm 安装
npm install -g @anthropic-ai/claude-code

# 方式二：原生安装器 (PowerShell)
irm https://claude.ai/install.ps1 | iex

# 方式三：WSL (推荐在 Linux 子系统中使用)
wsl --install
# 进入 WSL 后按 Linux 方式安装
```

### IDE 插件

Claude Code 可作为插件安装在 VS Code、JetBrains IDEs 中：

1. 在 IDE 插件市场搜索 "Claude Code"
2. 安装后侧边栏出现 Claude 面板
3. 首次使用需登录 Anthropic 账号

## 快速开始

```bash
# 进入项目目录
cd /path/to/project

# 启动交互式会话
claude

# 单次命令模式 (非交互)
claude -p "解释这个项目的结构"

# 指定模型
claude --model claude-opus-4-7

# 继续上次会话
claude --continue

# 恢复指定会话
claude --resume <session-id>
```

## 核心概念

### 会话 (Session)

每次运行 `claude` 开启一个会话。会话包含对话历史、工具调用记录和上下文。常用会话操作：

```bash
# 查看历史会话
claude --resume

# 清空当前会话上下文
/clear

# 压缩上下文 (长会话)
/compact
```

### 工具 (Tools)

Claude Code 通过工具与环境交互，包括：

| 工具 | 用途 |
|------|------|
| Read | 读取文件 |
| Edit / Write | 修改 / 创建文件 |
| Bash | 执行 shell 命令 |
| Grep / Glob | 搜索代码 |
| WebFetch / WebSearch | 访问网页 / 搜索 |
| Task / Agent | 启动子代理 |

### 权限 (Permissions)

Claude Code 在执行工具时会根据权限规则决定**允许**、**拒绝**或**询问**。详见 [权限管理](#权限管理) 章节。

## 配置体系

### settings.json 层级

Claude Code 配置分为多个层级，优先级从低到高：

| 层级 | 路径 | 作用域 | 说明 |
|------|------|--------|------|
| 企业策略 | 由管理员下发 | 全局 | 最高优先级，强制 |
| 用户全局 | `~/.claude/settings.json` | 所有项目 | 个人全局配置 |
| 项目共享 | `.claude/settings.json` | 当前项目 | 提交到 Git，团队共享 |
| 项目本地 | `.claude/settings.local.json` | 当前项目 | 个人本地，不提交 Git |

```json
{
  "permissions": {
    "allow": ["Bash(npm run test:*)", "Read(./src/**)"],
    "deny": ["Bash(rm -rf *)", "Read(./.env)"]
  },
  "env": {
    "DEBUG": "true"
  },
  "model": "claude-opus-4-7"
}
```

### CLAUDE.md 记忆文件

CLAUDE.md 是 Claude Code 的"记忆文件"，用于存放项目上下文、编码规范、常用命令等。层级：

| 位置 | 作用域 |
|------|--------|
| `~/.claude/CLAUDE.md` | 全局，所有项目生效 |
| `./CLAUDE.md` | 项目根目录，当前项目生效 |
| `./.claude/CLAUDE.md` | 项目 .claude 目录 |
| 子目录 `CLAUDE.md` | 按需递归加载 |

示例 `CLAUDE.md`：

```markdown
# 项目规范

## 技术栈
- Java 17 + Spring Boot 3 + Maven
- 前端 Vue 3 + TypeScript

## 编码规范
- 遵循阿里巴巴 Java 开发手册
- 统一使用 ResultUtilSimpleImpl 返回结果

## 常用命令
- 构建：mvn clean package
- 测试：mvn test
```

使用 `#` 快捷方式可随时添加记忆：

```bash
# 在会话中输入以下内容，追加到 CLAUDE.md
# 记住：本项目数据库连接串在 application.yml 中
```

### 环境变量

```bash
# 常用环境变量
export ANTHROPIC_API_KEY="sk-..."          # API Key
export ANTHROPIC_MODEL="claude-opus-4-7"   # 默认模型
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1  # 禁用非必要网络请求
```

## 权限管理

权限规则是 Claude Code 安全的核心。通过 `settings.json` 的 `permissions` 字段或 `/permissions` 命令管理。

### 权限类型

```json
{
  "permissions": {
    "allow": [],    // 白名单：自动允许
    "deny": [],     // 黑名单：自动拒绝
    "ask": []       // 询问：每次询问用户
  }
}
```

### 权限规则语法

```json
{
  "permissions": {
    "allow": [
      "Bash(npm test)",                          // 精确命令
      "Bash(npm run test:*)",                    // 通配符
      "Read(./src/**)",                          // 文件路径通配
      "Edit(./package.json)",                    // 编辑特定文件
      "mcp__github__*"                            // MCP 工具
    ],
    "deny": [
      "Bash(rm -rf /*)",                          // 危险命令
      "Read(./.env)",                             // 敏感文件
      "Read(./**/*.pem)"                          // 密钥文件
    ]
  }
}
```

### 权限模式

Claude Code 提供几种权限模式，用 `Shift+Tab` 切换：

| 模式 | 说明 |
|------|------|
| default | 默认，按规则询问 |
| acceptEdits | 自动接受文件编辑 |
| plan | 只读规划，不执行修改 |
| bypassPermissions | 跳过权限检查（需谨慎） |

### 命令行权限参数

```bash
# 只允许只读操作
claude --permission-mode plan

# 允许所有操作（跳过确认）
claude --dangerously-skip-permissions

# 预先允许特定命令
claude --allowedTools "Bash(npm test)" "Read"
```

## Hooks 钩子

Hooks 允许在 Claude Code 的关键生命周期节点执行自定义命令（shell 脚本）。

### Hook 事件类型

| 事件 | 触发时机 |
|------|----------|
| PreToolUse | 工具调用前 |
| PostToolUse | 工具调用后 |
| Notification | 通知事件（如权限请求） |
| UserPromptSubmit | 用户提交提示词前 |
| Stop | 主代理响应停止时 |
| SubagentStop | 子代理完成时 |
| SessionStart | 会话开始时 |
| SessionEnd | 会话结束时 |

### 配置示例

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/check-command.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/format-code.sh"
          }
        ]
      }
    ]
  }
}
```

### Hook 脚本示例

```bash
#!/bin/bash
# ~/.claude/hooks/check-command.sh
# 阻止危险命令
input=$(cat)
command=$(echo "$input" | jq -r '.tool_input.command')

if echo "$command" | grep -qE "rm -rf /|git push --force"; then
  echo "{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"deny\",\"permissionDecisionReason\":\"检测到危险命令\"}}"
  exit 0
fi

echo "{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"allow\"}}"
```

## MCP 服务器

MCP (Model Context Protocol) 让 Claude Code 接入外部工具和数据源。

### 添加 MCP 服务器

```bash
# 交互式添加
claude mcp add

# 命令行添加 (以 GitHub 为例)
claude mcp add github --env GITHUB_TOKEN=xxx -- npx -y @modelcontextprotocol/server-github

# 添加本地 stdio 服务器
claude mcp add my-server -- node /path/to/server.js
```

### 配置文件位置

```bash
# 全局
~/.claude.json          # 或 ~/.claude/settings.json 中的 mcpServers

# 项目
.claude/settings.json
```

### settings.json 中手动配置

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "xxx" }
    }
  }
}
```

### 管理命令

```bash
claude mcp list          # 列出所有 MCP 服务器
claude mcp remove <name> # 移除 MCP 服务器
```

## Subagents 子代理

Subagents 是 Claude Code 启动的并行子任务执行单元，用于隔离上下文、并行处理独立任务。

### 配置子代理

在 `.claude/agents/` 目录下创建 Markdown 文件定义子代理：

```markdown
---
name: code-reviewer
description: 代码审查专家，用于独立审查代码变更
tools: Read, Grep, Bash
model: sonnet
---

你是一位资深代码审查专家。审查代码时关注：
1. 安全隐患
2. 性能问题
3. 边界条件
4. 代码风格
```

### 使用子代理

```bash
# 在会话中通过 Task 工具启动子代理
# 或使用 /agents 命令查看
/agents
```

## Skills 技能

Skills 是封装可复用领域能力的模块，通过 `Skill` 工具调用。

### 技能目录

```bash
# 项目技能
.claude/skills/<skill-name>/SKILL.md

# 用户技能
~/.claude/skills/<skill-name>/SKILL.md
```

### 技能定义示例

```markdown
---
name: update-config
description: 配置 Claude Code 的 settings.json
---

# 技能说明
此技能用于配置 settings.json，包括权限、环境变量、Hooks 等。
```

### 使用技能

```bash
# 通过斜杠命令调用
/update-config

# 或在会话中通过 Skill 工具自动触发
```

## 斜杠命令 (Slash Commands)

| 命令 | 用途 |
|------|------|
| `/help` | 查看帮助 |
| `/clear` | 清空会话上下文 |
| `/compact` | 压缩上下文（长会话） |
| `/config` | 打开配置面板 |
| `/model` | 切换模型 |
| `/permissions` | 查看/修改权限 |
| `/mcp` | 管理 MCP 服务器 |
| `/agents` | 管理子代理 |
| `/init` | 初始化 CLAUDE.md |
| `/review` | 代码审查 |
| `/security-review` | 安全审查 |
| `/statusline` | 配置状态栏 |
| `/terminal-setup` | 终端集成配置 |

### 自定义斜杠命令

在 `.claude/commands/` 目录创建 Markdown 文件：

```markdown
<!-- .claude/commands/test.md -->
运行完整测试套件并报告结果：

```bash
mvn clean test
```
```

然后在会话中输入 `/test` 即可执行。

## 使用技巧

### 1. 编写高质量的提示词

- **明确目标**：说明要做什么、为什么、预期结果
- **提供上下文**：引用相关文件、说明技术栈
- **分步执行**：复杂任务拆解为多步
- **举例说明**：给出期望的输出格式

### 2. 利用 CLAUDE.md 沉淀规范

将团队约定、项目架构、常用命令写入 CLAUDE.md，让 AI 每次会话自动加载。

### 3. 使用计划模式降低风险

```bash
# 进入计划模式，先规划再执行
claude --permission-mode plan
```

### 4. 善用子代理并行处理

独立任务（如多文件搜索、多模块审查）交给子代理并行执行，提升效率。

### 5. 保持上下文精简

- 定期 `/compact` 压缩长会话
- 大文件用 `Read` 分段读取
- 无关内容及时 `/clear`

## 常见问题

### 1. 命令找不到 (claude: command not found)
```bash
# npm 全局安装路径未加入 PATH
npm config get prefix
# 将输出路径 (如 ~/.npm-global/bin) 加入 PATH
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 2. 无法登录 / API Key 问题
```bash
# 检查 API Key
echo $ANTHROPIC_API_KEY

# 或使用 claude 登录
claude /login
```

### 3. 权限询问过于频繁
在 `settings.json` 中为常用命令添加 `allow` 规则，或使用 `/permissions` 交互配置。

### 4. 修改文件后未生效
检查 `.claude/settings.local.json` 是否覆盖了 `settings.json` 的配置。

---

## 参考资源

- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code 设置文档](https://docs.anthropic.com/en/docs/claude-code/settings)
- [MCP 官方文档](https://modelcontextprotocol.io)