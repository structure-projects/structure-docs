# CodeBuddy Code 使用教程

## 目录
- [简介](#简介)
- [环境要求](#环境要求)
- [安装](#安装)
- [登录认证](#登录认证)
- [配置模型](#配置模型)
- [基本使用](#基本使用)
- [常用命令](#常用命令)
- [常见问题](#常见问题)

---

## 简介

CodeBuddy 是腾讯推出的 AI 编程助手，与 IDE、插件构成"三位一体"开发工具矩阵。CodeBuddy Code 是其命令行编程工具，通过自然语言驱动开发全流程，支持代码生成、项目重构、测试部署、代码审查、Git 提交等场景。

## 环境要求

- **Node.js**：18.0 / 18.20 或更高版本
- **npm**：8.0 或更高（Node.js 自带）
- **操作系统**：Windows / macOS / Linux

```bash
node --version
npm --version
```

## 安装

### 方式一：npm 全局安装（推荐）

```bash
npm install -g @tencent-ai/codebuddy-code
```

### 方式二：原生安装器（Beta，无需 Node.js）

```bash
# macOS / Linux
curl -fsSL https://copilot.tencent.com/cli/install.sh | bash

# Windows (PowerShell)
irm https://copilot.tencent.com/cli/install.ps1 | iex
```

验证安装：

```bash
codebuddy --version
```

## 登录认证

首次启动 `codebuddy` 后选择登录方式：

| 登录方式 | 适用场景 |
|---------|---------|
| Chinese Site | 国内用户，腾讯云国内站（copilot.tencent.com）认证 |
| International Site | 海外用户，腾讯云国际站（codebuddy.ai）认证 |
| Enterprise Domain | 专享版/私有化部署，需企业服务地址 |
| iOA | 仅腾讯内部员工 |

使用 ↑↓ 键选择，回车后自动打开浏览器完成认证（微信扫码 / GitHub / Google 登录）。

> **Windows 注意**：若 PowerShell 提示脚本禁止运行：
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```

## 配置模型

如需配置腾讯云 Token Plan 模型，编辑配置文件：

- **Windows**：`C:\Users\<用户名>\.codebuddy\models.json`
- **macOS / Linux**：`~/.codebuddy/models.json`

```json
{
  "models": [
    {
      "id": "tc-code-latest",
      "name": "Auto",
      "vendor": "Tencent Cloud 通用 Token Plan",
      "apiKey": "$your_api_key",
      "url": "https://api.lkeap.cloud.tencent.com/plan/v3"
    }
  ]
}
```

- 国内站 API：`https://api.lkeap.cloud.tencent.com/plan/v3`
- 国际站 API：`https://tokenhub-intl.tencentcloudmaas.com/plan/v3`

配置后启动，输入 `/model` 选择配置的模型。

## 基本使用

### 进入项目并启动

```bash
cd /path/to/project
codebuddy
```

### 初始化项目上下文（强烈推荐）

```bash
# 交互界面输入
/init
```

预先构建项目知识图谱，可提升理解准确度、加快响应、减少 30-50% 的 Token 开销。

### 使用模式

```bash
# 交互式对话
codebuddy

# 单次命令模式
codebuddy -p "优化这个 SQL 查询的性能"
```

## 常用命令

| 命令 | 用途 |
|------|------|
| `/help` | 查看可用命令 |
| `/config` | 设置语言等选项（如简体中文） |
| `/init` | 初始化项目上下文 |
| `/clear` | 开启全新对话 |
| `/model` | 选择模型 |

## 常见问题

- **PowerShell 权限错误**：`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`
- **无法直接改写代码**：部分版本限制，可将建议复制到 CodeBuddy 桌面客户端优化
- **项目结构重大变化**：`/clear` 后重新 `/init`

---

## 参考资源

- [CodeBuddy CLI 快速入门](https://www.codebuddy.ai/docs/zh/cli/quickstart)
- [腾讯云 Token Plan 配置](https://cloud.tencent.cn/document/product/1823/130068)