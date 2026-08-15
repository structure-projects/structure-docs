# Hermes Agent（爱马仕）使用教程

## 目录
- [简介](#简介)
- [核心能力](#核心能力)
- [环境要求](#环境要求)
- [安装](#安装)
- [配置与使用](#配置与使用)
- [记忆与技能系统](#记忆与技能系统)
- [与其他工具对比](#与其他工具对比)

---

## 简介

Hermes Agent（"爱马仕"）是由 Nous Research 开发的开源自主 AI 智能体框架，项目地址 `https://github.com/NousResearch/hermes-agent`，MIT 协议，核心设计理念是 **"The agent that grows with you"（与你一同成长的智能体）**。

与 Claude Code、Cursor 等编程工具不同，Hermes 是一套强调**长期记忆、经验沉淀、自我进化**的 Agent runtime，运行在本地或服务器上，可执行文件管理、代码编写、浏览器自动化、定时任务等真实任务。

## 核心能力

1. **持久化记忆**：维护 `MEMORY.md`（项目约定、踩坑记录）和 `USER.md`（用户画像），历史会话存入本地 SQLite，支持全文搜索
2. **自我进化技能系统**：完成任务后自动提炼为可复用的 `SKILL.md`，存放于 `~/.hermes/skills/`
3. **用户建模**：可选集成 Honcho，理解用户行为偏好
4. **多渠道网关**：支持 Telegram、Discord、Slack、WhatsApp、微信、QQ、飞书、钉钉、企业微信
5. **子代理与并行任务**：自动拆解复杂任务并行执行
6. **定时任务**：内置 cron 调度器，支持自然语言设置，7×24 运行
7. **模型无关**：支持 200+ 模型（Nous Portal、OpenRouter、OpenAI、Anthropic、Gemini、MiniMax、智谱 GLM、DeepSeek、Ollama）

## 环境要求

- Python 3.10+
- Linux、macOS、WSL2
- 支持 6 种执行后端：local、Docker、SSH、Daytona、Singularity、Modal

## 安装

```bash
# 官方安装脚本
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# 重新加载配置
source ~/.bashrc

# 启动
hermes
```

## 配置与使用

```bash
hermes setup     # 配置向导
hermes model     # 选择模型
hermes           # 交互式 CLI
hermes gateway   # 启动消息网关
```

配置向导会引导完成模型选择、API Key、消息渠道绑定等。

## 记忆与技能系统

### MEMORY.md（项目记忆）

记录项目约定与踩坑记录，以冻结快照注入系统提示。

### USER.md（用户画像）

描述用户偏好、习惯，帮助 Agent 更好地理解需求。

### SKILL.md（自我进化技能）

完成复杂任务后，Agent 自动提炼技能：

```
~/.hermes/skills/
├── deploy-k8s-service/
│   └── SKILL.md   # 触发条件、步骤、已知坑、修复方式
└── ...
```

下次遇到类似任务直接调用，实现能力累积。

## 与其他工具对比

| 维度 | Hermes | OpenClaw | Claude Code |
|------|--------|----------|-------------|
| 定位 | Agent 执行与学习引擎 | 入口层与消息调度 | 代码仓库内编程 |
| 记忆 | MEMORY.md + SQLite | 基础记忆 | CLAUDE.md |
| 自我进化 | 自动提炼 SKILL.md | Skills 插件 | Skills（手动定义） |
| 独立运行 | 服务器独立运行、定时任务 | 支持 | 主要绑定代码仓库 |
| 消息渠道 | 多平台 IM | 50+ 平台 | 终端/IDE |

> 注：以上信息基于 2026 年 4-5 月的公开资料，Hermes 仍在快速迭代，具体功能以官方仓库为准。

---

## 参考资源

- [Hermes Agent GitHub](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent 安装部署指南](https://www.feishu.cn/content/article/7630758640865037530)