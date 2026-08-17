# 火山引擎方舟（Volcengine Ark）

火山引擎方舟（Ark）是字节跳动旗下的大模型服务平台，提供豆包（Doubao）系列模型的 API 接入。

::: warning 文档说明
火山方舟的 Coding Plan 订阅方案文档需登录控制台查看，本页仅整理公开可验证的接入方式。**套餐档位、额度限制、价格以及 Anthropic 兼容端点的具体路径，请以[控制台文档](https://console.volcengine.com/ark/region:cn-beijing/docs/82379/1928261?lang=zh)为准。**
:::

::: tip 选购提示
截至 2026-08，火山方舟 Coding Plan **仍有余量且首月有优惠**，模型能力满足日常编码需求，是当前较容易买到的选择。详细选购优先级见 [Coding Plan 选购建议](/ai/coding-plan/#选购建议)。
:::

## 接入方式

方舟提供 OpenAI 兼容的推理接口，任何支持自定义 Base URL 的 AI 编程工具均可接入。

| 项目 | 值 |
|------|-----|
| OpenAI 兼容 Base URL | `https://ark.cn-beijing.volces.com/api/v3` |
| API Key 环境变量 | `ARK_API_KEY` |
| 模型标识 | 使用**推理接入点 ID**（Endpoint ID，形如 `ep-xxxxxxxx`）或模型名称 |

> 方舟的模型调用需先在控制台创建**推理接入点**，然后使用接入点 ID 作为 model 参数。部分模型也支持直接使用模型名称调用。

## 获取 API Key

1. 登录 [火山引擎方舟控制台](https://console.volcengine.com/ark)
2. 进入 **API Key 管理**，创建 API Key
3. 进入 **在线推理** → **创建推理接入点**，选择豆包模型并记录接入点 ID

## OpenAI 兼容工具配置

### 通用环境变量

```bash
export OPENAI_BASE_URL="https://ark.cn-beijing.volces.com/api/v3"
export OPENAI_API_KEY="YOUR_ARK_API_KEY"
```

### Cline / Kilo Code（OpenAI Compatible 供应商）

在设置中选择 **OpenAI Compatible** 供应商：

- Base URL：`https://ark.cn-beijing.volces.com/api/v3`
- API Key：方舟 API Key
- Model ID：推理接入点 ID 或模型名称

### OpenCode / Kilo CLI

```jsonc
// ~/.config/opencode/opencode.json 或 ~/.config/kilo/kilo.json
{
  "provider": {
    "ark": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Volcengine Ark",
      "options": {
        "baseURL": "https://ark.cn-beijing.volces.com/api/v3",
        "apiKey": "{env:ARK_API_KEY}"
      },
      "models": {
        "ep-xxxxxxxx": {
          "name": "Doubao",
          "limit": { "context": 262144, "output": 32768 }
        }
      }
    }
  },
  "model": "ark/ep-xxxxxxxx"
}
```

## Claude Code 接入

Claude Code 需要 Anthropic Messages 协议端点。方舟是否提供 Anthropic 兼容端点，请在控制台文档中确认后填写：

```json
// ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR_ARK_API_KEY",
    "ANTHROPIC_BASE_URL": "<以控制台文档为准>",
    "ANTHROPIC_MODEL": "<推理接入点 ID 或模型名称>"
  }
}
```

若方舟未提供 Anthropic 兼容端点，可通过社区网关（如 `claude-code-router`）将 Anthropic 协议转换为 OpenAI 协议后转发到方舟。

## 参考资源

- [火山方舟控制台](https://console.volcengine.com/ark)
- [Coding Plan 方案文档（需登录）](https://console.volcengine.com/ark/region:cn-beijing/docs/82379/1928261?lang=zh)
- [方舟模型列表与定价](https://www.volcengine.com/docs/82379)