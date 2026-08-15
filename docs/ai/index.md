# AI 工具与 LLM 部署

本栏目汇总 Structure 开源生态中的 AI 编程工具、工作流平台与 LLM 私有化部署方案，帮助团队快速选型并落地 AI 能力。

## 栏目导航

| 分类 | 说明 | 入口 |
|------|------|------|
| **AI 编程 Agent** | Claude Code、Cursor、Codex、Qoder、Trae、CodeBuddy 等编程 Agent，以及 OpenClaw、Hermes、OpenHands 等通用 Agent | [agents/](/ai/agents/) |
| **工作流平台** | Dify、Coze、n8n 等可视化工作流编排平台 | [workflow/](/ai/workflow/) |
| **LLM 私有化部署** | 基于 GPUStack 的 LLM 私有化部署（vLLM / llama.cpp 后端、量化、厂商模型、Agent 集成） | [llm/](/ai/llm/) |

## 三者关系

- **AI 编程 Agent**：负责「执行」，完成写代码、操作文件、回答问题等具体智能任务。
- **工作流平台**：负责「编排」，把触发、处理、调用 Agent、输出等多个步骤串成自动化流程。
- **LLM 部署**：提供「算力底座」，通过 GPUStack 在私有环境部署大模型，供 Agent 与工作流调用。

典型协作模式：`n8n/Dify 触发 → 调用 OpenClaw/Hermes 执行系统任务 → 调用 Claude Code/OpenHands 写代码 → 结果推送回用户`。

## 快速选型

| 场景 | 推荐 |
|------|------|
| 深度 Agent 化开发、复杂重构 | Claude Code |
| 可视化日常开发 | Cursor |
| 国内网络、阿里云/通义生态 | Qoder |
| 自托管 LLM 应用、知识库问答 | Dify |
| 跨系统数据集成、API 编排 | n8n |
| 私有化部署大模型 | GPUStack + vLLM |

> 完整的 Agent 对比与选型建议见 [AI 编程 Agent 使用指南](/ai/agents/)。