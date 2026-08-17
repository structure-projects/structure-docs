# ZCode 使用教程

## 目录
- [简介](#简介)
- [环境要求](#环境要求)
- [安装](#安装)
- [模型接入](#模型接入)
- [代理与网络配置](#代理与网络配置)
- [常用功能](#常用功能)
- [常见问题](#常见问题)

---

## 简介

ZCode 是智谱 AI 推出的 **ADE（AI Development Environment）桌面应用**，不是命令行工具。它以对话为中心组织开发工作流，深度集成 GLM 系列模型，支持多任务并行与闲时任务调度。

> ZCode 是独立桌面应用。若需要终端形态的编码 Agent，参考 [Claude Code](/ai/agents/claude-code)、[OpenCode](/ai/agents/opencode) 或 [Kilo Code](/ai/agents/kilo-code)。

## 环境要求

| 平台 | 支持版本 |
|------|----------|
| macOS | Apple Silicon / Intel |
| Windows | x64 / ARM64 |
| Linux | x64（AppImage） |

## 安装

### macOS

1. 从[官网](https://zcode.z.ai)下载对应架构的 `.dmg`
2. 打开 DMG，将 ZCode 拖入 **Applications**
3. 首次启动若提示「已损坏」或无法打开，执行：

```bash
xattr -dr com.apple.quarantine /Applications/ZCode.app
```

### Windows

下载安装包运行即可。自 v3.4.0 起支持最小化到系统托盘，并可在设置中选择默认 Shell（PowerShell / CMD / Git Bash / WSL）。

### Linux

```bash
chmod +x ZCode-*.AppImage
./ZCode-*.AppImage
```

## 模型接入

ZCode 提供两种接入模式。

### 账号登录模式

直接使用 BigModel（国内）或 Z.ai（海外）账号登录，自动关联已购套餐。新用户可享 **5 天试用**：每天 300 万 GLM-5.3 Token + 200 万 GLM-5-Turbo Token。

团队套餐用户登录后需在设置中选择所属席位。

### API Key 模式

在 **设置** → **模型** 中选择自定义接入，填写 Base URL 与 API Key：

| 场景 | Base URL |
|------|----------|
| BigModel Coding Plan（OpenAI 协议） | `https://open.bigmodel.cn/api/coding/paas/v4` |
| BigModel Coding Plan（Anthropic 协议） | `https://open.bigmodel.cn/api/anthropic` |
| Z.ai Coding Plan（OpenAI 协议） | `https://api.z.ai/api/coding/paas/v4` |
| Z.ai Coding Plan（Anthropic 协议） | `https://api.z.ai/api/anthropic` |
| BigModel 资源包 / 按量付费 | `https://open.bigmodel.cn/api/paas/v4` |

> Coding Plan 必须使用 `/api/coding/paas/v4`，与按量付费的 `/api/paas/v4` **不可互换**，也不会互相消耗额度。套餐详情见 [智谱 GLM Coding Plan](/ai/coding-plan/zhipu-glm)。

## 代理与网络配置

在 **设置** → **常规** 中配置代理：

- 代理地址**留空不等于跟随系统代理**，ZCode 会忽略 `HTTP_PROXY` / `HTTPS_PROXY` 环境变量
- 可配置代理例外列表（不走代理的域名）
- 企业内网如使用自签名证书，可导入自定义 PEM 根证书

## 常用功能

| 功能 | 说明 |
|------|------|
| 多任务并行 | 同时运行多个会话任务，互不阻塞 |
| 闲时任务 | 将任务排入闲时时段执行，享受非高峰时段积分折扣 |
| 终端集成 | 内置终端，可选择默认 Shell |
| MCP 支持 | 接入视觉理解、网络搜索、网页读取、开源仓库等 MCP Server |

> 非高峰时段积分按 50% 抵扣，高峰时段为每周一至周五 14:00~18:00（UTC+8）。合理使用闲时任务可显著降低积分消耗。

## 常见问题

- **macOS 提示应用已损坏**：执行 `xattr -dr com.apple.quarantine /Applications/ZCode.app`
- **代理不生效**：ZCode 不读取系统代理环境变量，需在设置中显式填写
- **额度未抵扣套餐**：确认 Base URL 使用 Coding 专用端点 `/api/coding/paas/v4`
- **证书错误**：企业内网需在设置中导入自定义根证书

---

## 参考资源

- [ZCode 官方文档](https://zcode.z.ai/cn/docs/welcome)
- [安装指南](https://zcode.z.ai/cn/docs/install)
- [配置说明](https://zcode.z.ai/cn/docs/configuration)
- [GLM Coding Plan](https://bigmodel.cn/glm-coding)