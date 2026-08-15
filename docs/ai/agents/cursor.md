# Cursor 使用教程

## 目录
- [简介](#简介)
- [安装](#安装)
- [核心功能](#核心功能)
  - [Tab 代码补全](#tab-代码补全)
  - [Inline Edit 内联编辑](#inline-edit-内联编辑)
  - [Chat 对话](#chat-对话)
  - [Composer / Agent 模式](#composer--agent-模式)
- [规则配置 .cursorrules](#规则配置-cursorrules)
- [上下文引用 @](#上下文引用-)
- [最佳实践](#最佳实践)
- [常用快捷键](#常用快捷键)
- [常见问题](#常见问题)

---

## 简介

Cursor 是 Anysphere 推出的 AI 原生代码编辑器，基于 VS Code 内核，深度集成 AI 能力。支持 Claude、GPT 等多种模型，是当前最流行的 AI IDE 之一。

## 安装

1. 访问 [Cursor 官网](https://cursor.com) 下载安装包
2. 支持 macOS、Windows、Linux
3. 首次启动可一键导入 VS Code 的插件、主题、快捷键
4. 登录账号，在 Settings → Models 配置模型（支持 API Key 或订阅）

## 核心功能

### Tab 代码补全

- 自动预测下一段代码，按 `Tab` 接受
- 支持多行补全、智能上下文

### Inline Edit 内联编辑

`Cmd+K` / `Ctrl+K`：选中代码或直接在文件中触发，输入指令进行局部修改。

### Chat 对话

`Cmd+L` / `Ctrl+L`：打开侧边栏对话，可引用上下文进行问答、代码生成。

### Composer / Agent 模式

`Cmd+I` / `Ctrl+I`：Cursor 的 Agent 模式，在**代码库级别**工作，自动分析项目结构，跨多个文件生成协调的修改。

**适用场景**：
- 跨多文件重命名函数
- 重构数据结构、拆分模块
- 多文件功能开发

**启用 Agent 模式**：在 Composer 输入框右下角选择 "agent" 模式。

**YOLO 模式**：Settings 中勾选 "Enable YOLO Mode"，允许 AI 直接执行安全操作。

## 规则配置 .cursorrules

`.cursorrules`（或 `.cursor/rules/*.mdc`）是项目的"规则宪法"，定义技术栈、代码风格，Composer 每次都会读取。

### 基础示例

```text
You are working on a FastAPI + React project.
- Python: use async/await, Pydantic v2, structlog
- React: functional components, TypeScript, no class components
- Never add comments explaining what code does
```

### 带 frontmatter 的规则（按文件类型匹配）

```markdown
---
description: Docker and container rules
globs: "Dockerfile*, docker-compose*, .dockerignore"
alwaysApply: false
---
- Use multi-stage builds for all application Dockerfiles
- Base images: node:22-alpine for Node.js, python:3.12-slim for Python
- Never run as root in production containers
```

### 规则设计原则

1. 聚焦**结构性规则**（技术栈、版本约束、架构），而非细粒度格式
2. 控制在 **200 行以内**
3. 修改后需**重载 Cursor 窗口**才生效
4. 团队共享：提交到 Git，配合 `.cursorignore` 排除 `node_modules/` 等

## 上下文引用 @

| 作用域 | 语法 | 用途 |
|--------|------|------|
| 单个文件 | `@src/auth.ts` | 聚焦编辑 |
| 文件夹 | `@src/components/` | 跨组件重构 |
| 整个代码库 | `@codebase` | 语义搜索 |
| 文档 | `@react-docs.org` | 静态文档 |
| 网页 | `@web` | 最新资讯 |
| 项目说明 | `@instructions.md` | 项目上下文 |
| Git 变更 | `@git` | 最近改动 |

## 最佳实践

1. **单一用途窗口**：一个任务一个 Composer 窗口，避免上下文污染
2. **先提交代码**：Agent 模式前先 `git commit`，方便恢复
3. **审查 diff 再接受**：接受多文件修改前运行 `git diff`
4. **先计划后执行**：让 Composer 先列出改动计划，审查后再执行
5. **截图调试**：UI 问题直接粘贴截图，视觉模型诊断更准
6. **成本控制**：在模型控制台设置硬性限额，防止失控循环

## 常用快捷键

| 功能 | macOS | Windows/Linux |
|------|-------|---------------|
| Composer / Agent | `Cmd+I` | `Ctrl+I` |
| Inline Edit | `Cmd+K` | `Ctrl+K` |
| Chat | `Cmd+L` | `Ctrl+L` |
| 新建 Chat | `Cmd+Shift+L` | `Ctrl+Shift+L` |
| 提交 Prompt | `Cmd+Enter` | `Ctrl+Enter` |
| 引用上下文 | `@` | `@` |
| 命令面板 | `Cmd+Shift+P` | `Ctrl+Shift+P` |
| 快速打开文件 | `Cmd+P` | `Ctrl+P` |

## 常见问题

| 问题 | 解决 |
|------|------|
| Connection Failed | 新建 Chat，禁用 HTTP/2 |
| Stuck Generating | 新建 Composer（`Cmd+N`） |
| 文件被 Agent 删除 | 用 git checkpoint 恢复 |
| 规则被忽略 | 重启 Cursor |
| Token 用量过高 | 设置 API 消费限额 |

---

## 参考资源

- [Cursor 官网](https://cursor.com)
- [Cursor 规则文档](https://cursor.com/docs/context/rules)
