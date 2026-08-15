# Coze 使用说明

## 目录
- [简介](#简介)
- [核心概念](#核心概念)
- [快速上手](#快速上手)
- [核心功能](#核心功能)
  - [可视化工作流](#可视化工作流)
  - [插件 (Plugin)](#插件-plugin)
  - [知识库](#知识库)
  - [多渠道发布](#多渠道发布)
- [API 集成](#api-集成)
- [最佳实践](#最佳实践)

---

## 简介

Coze（扣子）是字节跳动推出的 AI 机器人搭建平台，提供可视化工作流、插件、知识库等能力，可快速搭建聊天机器人并发布到多个渠道。

- **国内版**：[coze.cn](https://www.coze.cn)，基于豆包模型
- **国际版**：[coze.com](https://www.coze.com)，支持更多模型
- **开源版**：Coze 于 2025 年 7 月开源（Apache 2.0），核心项目为 [Coze Studio](https://github.com/coze-dev/coze-studio)（可视化 Agent 开发平台）与 [Coze Loop](https://github.com/coze-dev/cozeloop)（智能体运维平台），可 Docker 一键自托管部署

## 核心概念

| 概念 | 说明 |
|------|------|
| **Bot（机器人）** | 一个可对话的 AI 应用 |
| **工作流 (Workflow)** | 可视化编排的多步骤流程 |
| **插件 (Plugin)** | 可复用的工具/API 封装 |
| **知识库 (Knowledge)** | RAG 检索的数据源 |
| **记忆 (Memory)** | 跨对话的上下文记忆 |

## 快速上手

1. 访问 [coze.cn](https://www.coze.cn) 或 [coze.com](https://www.coze.com) 注册登录
2. 点击"创建 Bot"，填写名称、简介
3. 配置**人设与回复逻辑**（系统提示词）
4. 添加**插件**、**知识库**增强能力
5. 在右侧预览面板测试
6. 点击"发布"，选择发布渠道

## 核心功能

### 可视化工作流

拖拽节点编排复杂流程，节点类型：

| 节点 | 用途 |
|------|------|
| 开始 / 结束 | 定义输入输出 |
| LLM | 大模型生成 |
| 知识库检索 | RAG 检索 |
| 插件调用 | 调用插件 |
| 条件判断 | 分支逻辑 |
| 变量 | 数据转换、聚合 |
| 代码 | 运行自定义代码 |

### 插件 (Plugin)

- 平台内置大量插件（搜索、图片生成、数据分析等）
- 可创建自定义插件，通过 API 接口接入自有服务
- 插件可在不同 Bot 间复用

### 知识库

1. 创建知识库
2. 上传文档（支持多种格式）
3. 自动分段、向量化
4. 在 Bot 或工作流中引用

支持自定义分段策略、检索方式（向量/全文/混合）。

### 多渠道发布

Coze 支持发布到多个渠道：

- 网页（嵌入代码 / 独立链接）
- 微信（公众号 / 客服）
- 飞书、钉钉
- Telegram、Discord、Slack（国际版）
- API / SDK

## API 集成

发布后可通过 API 调用 Bot：

```bash
curl -X POST https://api.coze.cn/v3/chat \
  -H "Authorization: Bearer $COZE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bot_id": "你的bot_id",
    "user_id": "user-1",
    "stream": false,
    "auto_save_history": true,
    "additional_messages": [
      {"role": "user", "content": "你好", "content_type": "text"}
    ]
  }'
```

## 最佳实践

1. **人设清晰**：Bot 的人设与回复逻辑是体验核心，需精心设计
2. **工作流 vs 插件**：简单单步用插件，多步骤复杂逻辑用工作流
3. **知识库质量**：文档质量决定检索效果，避免大段无关内容
4. **测试充分**：发布前在预览面板充分测试边界情况
5. **版本管理**：利用草稿/发布版本分离，避免误发布

---

## 参考资源

- [Coze 国内版](https://www.coze.cn)
- [Coze 国际版](https://www.coze.com)
- [Coze 开发文档](https://www.coze.cn/docs)