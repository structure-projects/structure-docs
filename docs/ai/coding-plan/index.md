# Coding Plan / Token Plan 套餐集成

## 什么是 Coding Plan？

Coding Plan（编程套餐）是各大云平台推出的 AI 编码订阅服务。与按量计费（Pay-as-you-go）相比，Coding Plan 采用**固定月费 + 额度限制**的计费模式，适合高频使用 AI 编程助手的开发者。

## 为什么需要套餐集成？

国内的 AI 编程 Agent（如 Claude Code、Cline、Kilo Code、OpenCode、Codex 等）默认连接 Anthropic 或 OpenAI 官方 API。通过配置 Coding Plan 提供的**兼容协议端点**，可以将这些工具指向国内云平台，使用国内模型（如 Qwen、GLM、Kimi、豆包等）完成编码任务，而无需科学上网。

## 支持平台

| 平台 | 套餐名称 | 抵扣方式 | 支持模型 | 适用场景 |
|------|----------|----------|----------|----------|
| [阿里云百炼](aliyun-bailian) | Coding Plan | 请求次数 | Qwen3.7-plus、Qwen3.6-plus、Kimi-K2.5、GLM-5 等 | 国内首选，通义千问生态 |
| [阿里云百炼](aliyun-bailian) | Token Plan 个人版 | Credits | 数百种模型（文本/图像/音视频） | 多模态需求，个人开发者 |
| [阿里云百炼](aliyun-bailian) | Token Plan 团队版 | Credits | 同上 | 团队协作，多席位管理 |
| [腾讯云 TokenHub](tencent) | Coding Plan | 请求次数 | tc-code-latest (Auto)、Kimi-K2.5、GLM-5 | 腾讯云生态，CodeBuddy 深度集成 |
| [智谱 GLM](zhipu-glm) | Coding Plan | 积分 | GLM-5.3、GLM-5-Turbo、GLM-4.7 | 智谱 GLM 生态，ZCode 深度集成 |
| [火山引擎方舟](volcengine-ark) | Coding Plan / 方舟推理（按量） | Token | 豆包系列模型 | 字节跳动生态，TRAE 用户 |

## 协议兼容

Coding Plan 普遍支持两种协议接入：

| 协议 | 适用工具 | 说明 |
|------|----------|------|
| Anthropic Messages API | Claude Code、Cline、Kilo Code、OpenCode 等 | 配置 `ANTHROPIC_BASE_URL` 指向兼容端点 |
| OpenAI Chat Completions API | Codex、Kilo Code、OpenCode、Cline 等 | 配置 `BASE_URL` 指向 OpenAI 兼容端点 |

## 选购建议

### 第一原则：先用产品自带订阅

优先使用编码工具**自带的官方订阅**（如 Claude Pro / Max、TRAE 企业版套餐、CodeBuddy 自带额度）。这类订阅与工具深度集成，无需额外配置端点，稳定性最好。

只有当自带订阅**额度不够用**时，再考虑叠加云平台的 Coding Plan 或 Token Plan。

### 第二原则：按可购性与性价比排序

::: tip 实践优先级（截至 2026-08）
1. **火山引擎方舟（字节）Coding Plan** — 目前仍有余量、首月有优惠，模型能力够日常编码使用，是当前最容易买到且划算的选择
2. **阿里云百炼 Coding Plan** — 性价比好，但需要抢购，放量时间不固定，不容易抢到
3. **腾讯云 TokenHub Coding Plan** — 目前无余量，暂时买不到
4. **Token Plan** — 上述 Coding Plan 都拿不到时的兜底方案，按 Credits 计费更灵活，也支持多模态

余量与优惠属于**动态信息**，会随平台放量策略变化，下单前请到各平台购买页确认当前状态。
:::

### 按生态选型

| 场景 | 推荐 |
|------|------|
| 工具自带订阅够用 | 直接用自带订阅，不必额外购买 |
| 阿里云/通义生态、Qwen 模型 | 阿里云百炼 Coding Plan |
| 腾讯云生态、CodeBuddy 用户 | 腾讯云 TokenHub Coding Plan |
| GLM 模型、智谱生态、ZCode 用户 | 智谱 GLM Coding Plan |
| 字节跳动/豆包模型、TRAE 用户 | 火山引擎方舟 |
| 需要多模态（图像/音视频） | 阿里云百炼 Token Plan |
| 用量波动大、不想被额度窗口限制 | 任意平台按量计费模式 |

## 通用说明

### 有效期与额度刷新

所有 Coding Plan 套餐均采用**多时间窗口额度限制**，通常同时设有：

- **短周期额度**（每 5 小时）：滚动刷新，请求消耗后 5 小时恢复
- **长周期额度**（每周/每月）：固定时间点重置

### 禁止行为

- 严禁将套餐 API Key 用于 API 调用（非交互式批量调用、自动化脚本、后端服务）
- 仅限在 AI 编程工具（Claude Code、Cline、Kilo Code、OpenCode、Codex、Cursor、CodeBuddy 等）中使用
- 套餐为订阅人专享，禁止账号共享

### 与按量付费的区别

Coding Plan 套餐的 API Key 和 Base URL 与按量付费**不互通**，请勿混用。混用会导致：
- 套餐 API Key 配置到按量付费 URL → 返回 `invalid_api_key` 错误
- 按量付费 API Key 配置到套餐 URL → 不抵扣套餐额度，直接按量扣费

## 各平台配置文档

- [阿里云百炼 Coding Plan & Token Plan](aliyun-bailian)
- [腾讯云 TokenHub Coding Plan](tencent)
- [智谱 GLM Coding Plan](zhipu-glm)
- [火山引擎方舟](volcengine-ark)