# OpenClaw 使用教程

## 目录
- [简介](#简介)
- [环境要求](#环境要求)
- [部署方式](#部署方式)
  - [官方脚本安装](#官方脚本安装)
  - [云服务器部署](#云服务器部署)
  - [本地模型离线部署](#本地模型离线部署)
- [配置与使用](#配置与使用)
- [核心场景](#核心场景)
- [安全提示](#安全提示)

---

## 简介

OpenClaw（社区昵称"小龙虾"）是一款开源、本地优先、跨平台的 AI 智能体执行框架，由 Peter Steinberger（PSPDFKit 创始人）开发，前身为 Clawdbot / Moltbot，MIT 协议。

核心定位：让大模型从"聊天建议"升级为能自主完成**系统级任务**的"数字员工"，实现"指令 → 决策 → 执行 → 反馈"闭环。

**核心特性**：
- **本地优先**：数据、日志存于自有设备，敏感数据不出内网
- **模型无关**：兼容 GPT、Claude、Llama、Kimi、通义千问、DeepSeek、Ollama 等
- **行动优先**：直接操作电脑、执行命令、读写文件、控制浏览器
- **多渠道交互**：支持 WhatsApp、Telegram、Slack、飞书、钉钉、微信等 50+ 平台
- **可扩展**：Skills 插件系统，社区已有 5700+ 技能

## 环境要求

| 项目 | 要求 |
|------|------|
| 操作系统 | Windows 10 21H2+ / macOS 12+ / Ubuntu 20.04+ |
| 内存 | 2GB 起步（本地模型建议 8GB+） |
| Node.js | 18+ 或 22.x LTS |
| 硬盘 | 20GB 可用空间 |
| 其他 | Git、Python 3.9+（部分技能）、Docker（可选） |

## 部署方式

### 官方脚本安装

**macOS / Linux：**
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Windows（PowerShell 管理员）：**
```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

安装后启动配置向导：

```bash
openclaw onboard
```

按向导完成模型选择、API Key 输入、通讯频道绑定。

### 云服务器部署

**阿里云**：购买轻量应用服务器（2核2G+），镜像选择【OpenClaw】，在百炼控制台创建 API Key，图形化配置。

**腾讯云**：购买轻量应用服务器（2核4G，Ubuntu 24.04），安装 Node.js ≥22（可用 nvm），克隆项目并安装依赖。

### 本地模型离线部署

```bash
# 1. 安装 Ollama（https://ollama.com）
# 2. 拉取 DeepSeek 模型
ollama run deepseek-chat

# 3. 获取 OpenClaw
git clone https://github.com/psteinberger/openclaw.git
cd openclaw

# 4. 安装依赖
npm install

# 5. 配置 .env
# MODEL_PROVIDER=ollama
# OLLAMA_MODEL=deepseek-chat
# OLLAMA_BASE_URL=http://localhost:11434

# 6. 启动
npm start
```

启动后访问 `http://localhost:3000`。

## 配置与使用

1. 登录 Web 面板，添加 API Key（如阿里云百炼、OpenAI）
2. 选择默认模型（简单任务用小模型，复杂任务用大模型）
3. 通过绑定的聊天工具（飞书/微信/Telegram 等）下达指令

### 核心场景

| 类别 | 示例指令 |
|------|----------|
| 文件操作 | "把下载文件夹里所有 PDF 移到'归档'文件夹" |
| 文档处理 | "从 report.docx 提取所有表格保存为 Excel" |
| 浏览器自动化 | "打开新闻网站，抓取今日头条标题和摘要" |
| 办公自动化 | "根据 sales.csv 生成柱状图插入 PPT 第3页" |
| 脚本执行 | "运行 backup.py 备份代码目录" |
| 定时任务 | "每周一自动检索 AI 论文并推送摘要到飞书" |

## 安全提示

1. 所有操作均需用户确认，安全可控
2. 注意 API Key 权限控管
3. Telegram 等渠道建议设置用户白名单，避免 Agent 成为公开机器人
4. 云端部署建议用 SSH 端口转发访问控制台，而非直接暴露端口

---

## 参考资源

- [OpenClaw 官网](https://openclaw.ai)
- [OpenClaw GitHub](https://github.com/psteinberger/openclaw)
- [OpenClaw 部署教程 - 阿里云](https://developer.aliyun.com/article/1715019)