# 工作流自动化平台使用指南

## 概述

本目录汇总主流工作流自动化 / LLM 应用编排平台的使用说明。这些平台通过可视化拖拽方式编排多步骤自动化流程，可与 LLM、外部 API、知识库等集成。

## 平台对比

| 平台 | 厂商 | 开源 | 部署方式 | 定位 | 核心能力 |
|------|------|------|----------|------|----------|
| **Dify** | 开源社区 | 是（Apache 2.0） | 自托管（Docker Compose）/ 云 | LLM 应用开发平台 | 可视化 Workflow、RAG、Agent、模型管理 |
| **Coze** | 字节跳动 | 否 | SaaS 云服务 | AI 机器人搭建平台 | 可视化工作流、插件、知识库、多渠道发布 |
| **n8n** | n8n GmbH | 部分（Sustainable Use License） | 自托管（Docker/npm）/ 云 | 通用工作流自动化 | 节点编排、400+ 集成、代码节点 |

## 选型建议

| 场景 | 推荐平台 | 理由 |
|------|----------|------|
| 自托管 LLM 应用、知识库问答 | Dify | 开源免费，RAG + Workflow 完善 |
| 快速搭建聊天机器人、无运维 | Coze | 云服务免运维，插件生态丰富 |
| 跨系统数据集成、API 编排 | n8n | 400+ 集成，代码节点灵活 |

## 目录结构

```
workflow/
├── index.md   # 本文件
├── dify.md     # Dify 使用说明
├── coze.md     # Coze 使用说明
└── n8n.md      # n8n 使用说明
```

## 快速导航

- [Dify 使用说明](dify.md) — 开源 LLM 应用平台
- [Coze 使用说明](coze.md) — 字节跳动 AI 机器人平台
- [n8n 使用说明](n8n.md) — 通用工作流自动化

## 与 AI Agent 的关系

工作流平台与 AI Agent（见 [`agents/`](../agents/index.md)）互补：

- **工作流平台**：负责**编排**，将多个步骤（触发、处理、调用 Agent、输出）串起来
- **AI Agent**：负责**执行**，完成具体的智能任务（写代码、操作文件、回答问题）

典型协作模式：n8n/Dify 触发 → 调用 OpenClaw/Hermes 执行系统任务 → 调用 Claude Code/OpenHands 写代码 → 结果推送回用户。

详见 [Agent 自动化工作总结](../agents/automation-summary.md)。