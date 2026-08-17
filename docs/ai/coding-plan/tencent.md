# 腾讯云 TokenHub Coding Plan

腾讯云大模型服务平台 TokenHub 推出的 Coding Plan，专为 AI 编码场景设计。

## 套餐详情

| 项目 | Lite 套餐 | Pro 套餐 |
|------|-----------|----------|
| 价格 | ¥40/月 | ¥200/月 |
| 每 5 小时限额 | 最多约 1,200 次请求 | 最多约 6,000 次请求 |
| 每周限额 | 最多约 9,000 次请求 | 最多约 45,000 次请求 |
| 每月限额 | 最多约 18,000 次请求 | 最多约 90,000 次请求 |

> 额度消耗说明：一次用户提问通常会触发多次模型调用，每次调用消耗 1 次用量额度。简单任务约 5~15 次，复杂任务约 15~30+ 次。

## 支持模型

| 模型 | model 参数值 | 备注 |
|------|-------------|------|
| Auto（推荐） | `tc-code-latest` | 算法自动匹配 |
| Kimi-K2.5 | `kimi-k2.5` / `kimi-k-2-5` | 将于 2026-08-31 下线 |
| GLM-5 | `glm-5` / `glm-5-0` | |

## 接入端点

| 协议 | Base URL |
|------|----------|
| OpenAI 兼容 | `https://api.lkeap.cloud.tencent.com/coding/v3` |
| Anthropic 兼容 | `https://api.lkeap.cloud.tencent.com/coding/anthropic` |

- API Key 格式：`sk-sp-xxxx`（Coding Plan 专属，与按量付费 `sk-xxxx` 不互通）
- 推荐模型：`tc-code-latest`

## Claude Code 配置

```json
// ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_CODING_PLAN_API_KEY",
    "ANTHROPIC_BASE_URL": "https://api.lkeap.cloud.tencent.com/coding/anthropic",
    "ANTHROPIC_MODEL": "tc-code-latest",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "tc-code-latest",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "tc-code-latest",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "tc-code-latest"
  }
}
```

## CodeBuddy 配置

编辑 `~/.codebuddy/models.json`（macOS/Linux）或 `C:\Users\<用户名>\.codebuddy\models.json`（Windows）：

```json
{
  "models": [
    {
      "id": "tc-code-latest",
      "name": "Auto",
      "vendor": "Tencent Cloud Coding Plan",
      "apiKey": "YOUR_CODING_PLAN_API_KEY",
      "url": "https://api.lkeap.cloud.tencent.com/coding/v3"
    }
  ]
}
```

> **注意**：此前文档中使用的 URL `https://api.lkeap.cloud.tencent.com/plan/v3` 已更新为 `/coding/v3`，请使用新版地址。

## 支持工具

| 工具 | 说明 |
|------|------|
| OpenClaw | 开源、自托管个人 AI 助手 |
| CodeBuddy Code | 腾讯云 AI 编程工具 |
| Claude Code | AI 终端编程助手 |
| OpenCode | 开源 AI 编程代码工具 |
| Cline | VS Code 扩展 |
| Cursor | AI 原生代码编辑器 |
| Codex | OpenAI 命令行编程工具 |
| Kilo CLI / Kilo Code | 轻量高性能编程工具 |

## 参考资源

- [Coding Plan 概述](https://cloud.tencent.com/document/product/1823/130092)
- [Coding Plan 购买页](https://buy.cloud.tencent.com/lkeap)
- [CodeBuddy 配置指南](https://www.codebuddy.cn/docs/cli/overview)