# 智谱 GLM Coding Plan

智谱 AI（BigModel）推出的 GLM Coding Plan，专为 AI 编码场景打造的订阅套餐。

## 套餐详情

| 套餐类型 | 5 小时积分 | 每周积分 |
|----------|-----------|----------|
| Lite 套餐 | 2,000 | 10,000 |
| Pro 套餐 | 12,000 | 60,000 |
| Max 套餐 | 28,000 | 140,000 |

**积分刷新规则**

- **5 小时积分**：动态刷新，积分额度在请求消耗 5 小时后刷新重置
- **周积分**：自套餐下单时起，以 7 天为一个周期刷新

## 可用模型

所有套餐均支持 **GLM-5.3**、GLM-5-Turbo、GLM-4.7。调用历史模型 GLM-5.2 / GLM-5.1 将自动切换至 GLM-5.3。

## 积分抵扣计算

```
模型消耗积分数 = (输入 Token × Input 系数 + 缓存命中 Token × Cached Input 系数
                 + 输出 Token × Output 系数) / 10000

MCP 消耗积分数 = 调用次数 × Output 系数
```

| 产品名称 | Input 系数 | Cached Input 系数 | Output 系数 |
|----------|-----------|-------------------|-------------|
| GLM-5.3 | 6.9 | 1.7 | 24 |
| GLM-5-Turbo | 5.7 | 1.5 | 21 |
| GLM-4.7 | 4.6 | 1.2 | 16 |
| GLM-4.6V（视觉理解 MCP） | 1.2 | 0.3 | 2.7 |
| 联网搜索 MCP | — | — | 1.2 |
| 网页读取 MCP | — | — | 1.2 |
| 开源仓库 MCP | — | — | 1.2 |

> **非高峰时段模型调用按基础积分的 50% 抵扣。** 高峰时段为每周一至周五 14:00~18:00（UTC+8）。

## 可用额度参考

以全部使用 GLM-5.3、缓存命中率 90.9%（编程场景平均水平）计算：

- Lite：0.43~0.87 亿 Tokens/周
- Pro：2.63~5.26 亿 Tokens/周
- Max：6.13~12.26 亿 Tokens/周

## 接入端点

### BigModel（国内）

| 协议 | Base URL |
|------|----------|
| Anthropic Messages | `https://open.bigmodel.cn/api/anthropic` |
| OpenAI Chat Completion | `https://open.bigmodel.cn/api/coding/paas/v4` |
| OpenAI Response | `https://open.bigmodel.cn/api/v1` |

### Z.ai（海外）

| 协议 | Base URL |
|------|----------|
| Anthropic Messages | `https://api.z.ai/api/anthropic` |
| OpenAI Chat Completion | `https://api.z.ai/api/coding/paas/v4` |

> **注意**：Coding Plan 的 OpenAI 地址必须使用 Coding 专用端点 `/api/coding/paas/v4`，不要填通用端点 `/api/paas/v4`。两者不可互相替代，也不会互相消耗额度。

## 快速接入

### 一键配置工具

```bash
npx @z_ai/coding-helper
```

### Claude Code 手动配置

```json
// ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_API_KEY",
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
    "ANTHROPIC_MODEL": "glm-5.3",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-5-turbo",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-5.3",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5.3"
  }
}
```

## 专属 MCP Server

套餐用户可使用以下 MCP Server：

| MCP Server | 能力 |
|-----------|------|
| 视觉理解 | 通过 GLM-4.6V 分析 UI 设计图、流程图、截图提取文本 |
| 网络搜索 | 搜索最新技术文档、API 变更、开源项目信息 |
| 网页读取 | 抓取网页完整文本与链接，提取结构化信息 |
| 开源仓库 | 检索 GitHub 仓库文档、目录结构、文件内容 |

## 支持工具

GLM Coding Plan 仅限在官方支持的指定工具中使用，包括：ZCode、Claude Code、Codex、Cline、OpenCode、Roo Code、Kilo Code、Cursor 等。

> OpenClaw 采用**次级调度**与尽力交付策略，高负载下会自动触发动态排队、限流等公平使用策略。

## 参考资源

- [GLM Coding Plan 官网](https://bigmodel.cn/glm-coding)
- [快速开始](https://docs.bigmodel.cn/cn/coding-plan/quick-start)
- [套餐概览](https://docs.bigmodel.cn/cn/coding-plan/overview)
- [用量统计](https://www.bigmodel.cn/coding-plan/personal/usage)