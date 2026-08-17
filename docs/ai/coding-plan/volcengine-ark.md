# 火山引擎方舟（Volcengine Ark）

火山引擎方舟（Ark）是字节跳动旗下的大模型服务平台，提供豆包（Doubao）系列模型的 API 接入。

::: warning 文档说明
火山方舟的 Coding Plan 订阅方案文档需登录控制台查看，本页整理已验证的接入方式。**套餐档位、额度限制与价格请以[控制台文档](https://console.volcengine.com/ark/region:cn-beijing/docs/82379/1928261?lang=zh)为准。**
:::

::: tip 选购提示
截至 2026-08，火山方舟 Coding Plan **仍有余量且首月有优惠**，模型能力满足日常编码需求，是当前较容易买到的选择。详细选购优先级见 [Coding Plan 选购建议](/ai/coding-plan/#选购建议)。
:::

## 接入方式

方舟同时提供 **Anthropic Messages** 与 **OpenAI 兼容**两套接口，任何支持自定义 Base URL 的 AI 编程工具均可接入。

| 协议 | Base URL |
|------|----------|
| Anthropic Messages（Coding Plan） | `https://ark.cn-beijing.volces.com/api/coding` |
| OpenAI 兼容（方舟推理） | `https://ark.cn-beijing.volces.com/api/v3` |

| 项目 | 值 |
|------|-----|
| API Key 环境变量 | `ARK_API_KEY` |
| Coding Plan 推荐模型 | `ark-code-latest`（自动匹配最优编码模型） |
| 按量推理模型标识 | **推理接入点 ID**（Endpoint ID，形如 `ep-xxxxxxxx`）或模型名称 |

> Coding Plan 使用 `ark-code-latest` 即可，无需创建推理接入点。按量计费的方舟推理需先在控制台创建**推理接入点**，然后使用接入点 ID 作为 model 参数；部分模型也支持直接使用模型名称调用。

## 获取 API Key

1. 登录 [火山引擎方舟控制台](https://console.volcengine.com/ark)
2. 进入 **API Key 管理**，创建 API Key
3. 仅按量计费需要：进入 **在线推理** → **创建推理接入点**，选择豆包模型并记录接入点 ID

> 使用 Coding Plan + `ark-code-latest` 时可跳过第 3 步。

## Claude Code 接入

方舟提供 Anthropic Messages 兼容端点，可直接接入 Claude Code：

```bash
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/coding"
export ANTHROPIC_AUTH_TOKEN="YOUR_ARK_API_KEY"
export ANTHROPIC_MODEL="ark-code-latest"
```

或写入配置文件：

```json
// ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_ARK_API_KEY",
    "ANTHROPIC_BASE_URL": "https://ark.cn-beijing.volces.com/api/coding",
    "ANTHROPIC_MODEL": "ark-code-latest",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "ark-code-latest",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "ark-code-latest",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "ark-code-latest"
  }
}
```

## 其他工具配置

### Cline / Kilo Code

两种供应商任选其一：

**Anthropic 协议（推荐，Coding Plan）**

- API Provider：`Anthropic`
- Base URL：`https://ark.cn-beijing.volces.com/api/coding`
- API Key：方舟 API Key
- Model ID：`ark-code-latest`

**OpenAI Compatible 协议**

- API Provider：`OpenAI Compatible`
- Base URL：`https://ark.cn-beijing.volces.com/api/v3`
- API Key：方舟 API Key
- Model ID：推理接入点 ID 或模型名称

### OpenCode / Kilo CLI

Anthropic 协议（Coding Plan）：

```jsonc
// ~/.config/opencode/opencode.json 或 ~/.config/kilo/kilo.json
{
  "provider": {
    "ark": {
      "npm": "@ai-sdk/anthropic",
      "name": "Volcengine Ark",
      "options": {
        "baseURL": "https://ark.cn-beijing.volces.com/api/coding",
        "apiKey": "{env:ARK_API_KEY}"
      },
      "models": {
        "ark-code-latest": {
          "name": "Ark Code",
          "limit": { "context": 262144, "output": 32768 }
        }
      }
    }
  },
  "model": "ark/ark-code-latest"
}
```

OpenAI 协议（按量计费）：将 `npm` 改为 `@ai-sdk/openai-compatible`、`baseURL` 改为 `.../api/v3`，模型 ID 改为推理接入点 ID。

### 通用 OpenAI 环境变量

```bash
export OPENAI_BASE_URL="https://ark.cn-beijing.volces.com/api/v3"
export OPENAI_API_KEY="YOUR_ARK_API_KEY"
```

## 参考资源

- [火山方舟控制台](https://console.volcengine.com/ark)
- [Coding Plan 方案文档（需登录）](https://console.volcengine.com/ark/region:cn-beijing/docs/82379/1928261?lang=zh)
- [方舟模型列表与定价](https://www.volcengine.com/docs/82379)