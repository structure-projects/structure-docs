# 阿里云百炼 Coding Plan & Token Plan

阿里云百炼（Model Studio）提供三种套餐方案：**Coding Plan**、**Token Plan 个人版**和**Token Plan 团队版**。

## 套餐对比

### Coding Plan

| 项目 | Pro 高级套餐 |
|------|-------------|
| 价格 | ¥200/月（首月特惠 ¥39.90） |
| 每 5 小时限额 | 最多 6,000 次请求 |
| 每周限额 | 最多 45,000 次请求 |
| 每月限额 | 最多 90,000 次请求 |
| 支持模型 | qwen3.7-plus、qwen3.6-plus、kimi-k2.5、glm-5、MiniMax-M2.5、qwen3-coder-plus 等 |

> **注意**：Lite 套餐已于 2026-03-20 停止新购，2026-04-13 停止续费与升级。

### Token Plan 个人版

| 项目 | Lite | Standard | Pro |
|------|------|----------|-----|
| 价格 | ¥39/月（限时） | ¥139/月（限时） | ¥499/月（限时） |
| 每 7 天 Credits 限额 | 2,500 | 10,000 | 40,000 |
| 并发 Agent | 1-2 个 | 3-4 个 | 6-8 个 |
| 额外用量包 | ¥100/个/月，20,000 Credits/个 | | |

### Token Plan 团队版

| 项目 | 标准座席 | 高级座席 | 尊享座席 |
|------|----------|----------|----------|
| 价格 | ¥150/座席/月（限时） | ¥550/座席/月（限时） | ¥1,398/座席/月 |
| 每月 Credits | 25,000/座席 | 100,000/座席 | 250,000/座席 |

## 接入端点

### Coding Plan

| 协议 | Base URL |
|------|----------|
| Anthropic 兼容 | `https://coding.dashscope.aliyuncs.com/apps/anthropic` |
| OpenAI 兼容 | `https://coding.dashscope.aliyuncs.com/v1` |

- API Key 格式：`sk-sp-xxxxx`
- 推荐模型：`qwen3.7-plus`

### Token Plan 个人版 / 团队版

| 协议 | Base URL |
|------|----------|
| Anthropic 兼容 | `https://token-plan.cn-beijing.maas.aliyuncs.com/apps/anthropic` |
| OpenAI 兼容 | 通过 Anthropic 端点中转 |

- API Key：控制台获取（Token Plan 个人版/团队版专属）
- 推荐模型：`qwen3.8-max`、`qwen3.6-flash`

### 按量计费

| 协议 | Base URL |
|------|----------|
| Anthropic 兼容 | `https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/apps/anthropic`（北京） |
| | `https://{WorkspaceId}.ap-southeast-1.maas.aliyuncs.com/apps/anthropic`（新加坡） |
| OpenAI 兼容 | `https://dashscope.aliyuncs.com/compatible-mode/v1` |

- API Key：百炼通用 API Key（`sk-xxxxx`）

## Claude Code 配置示例

### Coding Plan

```json
// ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_CODING_PLAN_API_KEY",
    "ANTHROPIC_BASE_URL": "https://coding.dashscope.aliyuncs.com/apps/anthropic",
    "ANTHROPIC_MODEL": "qwen3.7-plus",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qwen3.7-plus",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "qwen3.7-plus",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "qwen3.7-plus",
    "CLAUDE_CODE_SUBAGENT_MODEL": "qwen3.7-plus"
  }
}
```

### Token Plan 个人版/团队版

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_TOKEN_PLAN_API_KEY",
    "ANTHROPIC_BASE_URL": "https://token-plan.cn-beijing.maas.aliyuncs.com/apps/anthropic",
    "ANTHROPIC_MODEL": "qwen3.8-max",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qwen3.6-flash",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "qwen3.8-max",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "qwen3.8-max",
    "CLAUDE_CODE_SUBAGENT_MODEL": "qwen3.7-max",
    "CLAUDE_CODE_MAX_CONTEXT_TOKENS": "983616"
  }
}
```

## 扩展上下文

在模型名称后添加 `[1m]` 后缀可使用 1M 上下文窗口：

```json
{
  "env": {
    "ANTHROPIC_MODEL": "qwen3.7-plus[1m]",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "qwen3.7-plus[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "qwen3.7-plus[1m]"
  }
}
```

## 旧版兼容接口

旧版接口 `https://dashscope.aliyuncs.com/api/v2/apps/claude-code-proxy` 仅支持 `qwen3-coder-plus` 模型，切换其他模型不生效。建议迁移至新版接口。

## 使用 CC Switch

CC Switch 是社区开源的桌面 GUI，支持在多个套餐之间一键切换。

1. 安装：`brew install --cask cc-switch`（macOS）或从 Releases 下载
2. 添加供应商，按套餐类型填写配置
3. 启用后新开终端即可使用

## 参考资源

- [Coding Plan 概述](https://help.aliyun.com/zh/model-studio/coding-plan)
- [Token Plan 概述](https://help.aliyun.com/zh/model-studio/token-plan-overview)
- [Claude Code 接入百炼](https://help.aliyun.com/zh/model-studio/claude-code)
- [Coding Plan 常见问题](https://help.aliyun.com/zh/model-studio/coding-plan-faq)