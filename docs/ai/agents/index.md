# AI 编程 Agents 使用指南

## 概述

本目录汇总了当前主流 AI 编程 Agent 与通用 Agent 的使用与配置教程，帮助团队快速上手并选择适合的工具。

## 编程 Agent 对比

| 工具 | 厂商 | 形态 | 平台 | 默认模型 | 开源 | 核心特点 |
|------|------|------|------|----------|------|----------|
| **Claude Code** | Anthropic | CLI + IDE 插件 | macOS / Linux / Windows | Claude 系列 | 部分开源 | Agent 能力强，MCP / Hooks / Skills / 权限体系完善 |
| **Cursor** | Anysphere | IDE | macOS / Windows / Linux | Claude / GPT 等 | 否 | 可视化，Tab 补全 + Composer |
| **Codex CLI** | OpenAI | CLI | macOS / Linux / Windows | GPT 系列 | 开源 | 沙盒模式，Git 集成 |
| **Qoder** | 阿里云（通义） | CLI + IDE + JetBrains | macOS / Linux / Windows | Qwen 系列 | 部分开源 | 自定义/本地模型，中文友好 |
| **Trae** | 字节跳动 | IDE | macOS / Windows | 豆包 / DeepSeek / Claude / GPT | 否 | 免费，Chat / Builder / SOLO 模式 |
| **CodeBuddy** | 腾讯 | CLI + IDE + 插件 | macOS / Linux / Windows | 混元 / DeepSeek / Claude 等 | 部分开源 | 腾讯云生态，三位一体 |

## 通用 Agent 对比

| 工具 | 昵称 | 核心特点 | 运行方式 |
|------|------|----------|----------|
| **OpenClaw** | 小龙虾 | 执行外壳 + 网关 + 技能，50+ 渠道 | 本地 / 服务器 |
| **Hermes** | 爱马仕 | 持久记忆 + 自我进化技能 | 本地 / 服务器 |
| **OpenHands** | — | 自主软件工程智能体 | Docker / 云 |

## 目录结构

```
agents/
├── index.md                # 本文件：总览与选型
├── automation-summary.md  # Agent 自动化工作总结
├── cli-methodology.md     # CLI 通用方法论：权限 / 技能 / 规则 / 文档
├── claude-code.md         # Claude Code 使用和配置指南（详细）
├── cursor.md              # Cursor AI IDE 教程
├── codex.md               # OpenAI Codex CLI 教程
├── qoder.md               # Qoder CLI 教程
├── trae.md                # Trae IDE 教程
├── codebuddy.md           # CodeBuddy Code CLI 教程
├── openclaw.md            # OpenClaw（小龙虾）教程
├── hermes.md              # Hermes Agent（爱马仕）教程
└── openhands.md           # OpenHands 教程
```

工作流平台（Dify / Coze / n8n）文档见独立的 [`workflow/`](../workflow/index.md) 目录。

## 选型建议

| 场景 | 推荐工具 | 理由 |
|------|----------|------|
| 深度 Agent 化开发、复杂重构 | Claude Code | Agent 能力最强，MCP/Hooks/Skills 生态完善 |
| 可视化日常开发 | Cursor | Tab 补全 + Composer，体验流畅 |
| OpenAI 生态、Git 集成 | Codex CLI | 沙盒模式，原生 Git 工作流 |
| 国内网络、阿里云/通义生态 | Qoder | 基于 Qwen，支持百炼/魔搭 API |
| 免费、可视化 IDE、快速原型 | Trae | 免费，Builder/SOLO 模式 |
| 腾讯云生态、企业私有化 | CodeBuddy | 腾讯云三位一体 |
| 系统级自动化、跨平台消息 | OpenClaw | 50+ 渠道，本地优先 |
| 长期记忆、经验沉淀 | Hermes | 持久记忆 + 自我进化技能 |
| 自主修 bug、生成 PR | OpenHands | 自主软件工程智能体 |

## 通用方法论

无论使用哪个工具，以下能力都是核心（详见 [cli-methodology.md](cli-methodology.md)）：

1. **权限 (Permissions)**：控制 Agent 能做什么，防止误操作
2. **技能 (Skills)**：封装可复用的领域能力
3. **规则 (Rules)**：通过规则文件约束 AI 的行为和代码风格
4. **文档 (Documentation)**：维护上下文记忆，保持 AI 与项目知识同步

## 快速导航

- [Agent 自动化工作总结](automation-summary.md) — 分类对比、自动化场景、工作流构建
- [CLI 通用方法论](cli-methodology.md) — 权限、技能、规则、文档四大方法论
- [Claude Code 详细指南](claude-code.md) — 安装、配置、权限、Hooks、MCP、Skills
- [Cursor 教程](cursor.md) — AI IDE，Composer/Agent 模式
- [Codex CLI 教程](codex.md) — OpenAI 终端编码 Agent
- [Qoder 教程](qoder.md) — Qwen 生态 CLI 编码 Agent
- [Trae 教程](trae.md) — 字节跳动 AI IDE
- [CodeBuddy 教程](codebuddy.md) — 腾讯 AI 编程助手
- [OpenClaw 教程](openclaw.md) — 通用 Agent（小龙虾）
- [Hermes 教程](hermes.md) — 通用 Agent（爱马仕）
- [OpenHands 教程](openhands.md) — 自主软件工程 Agent
- [工作流平台](../workflow/index.md) — Dify / Coze / n8n