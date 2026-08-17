 # Trae 使用教程

## 目录
- [简介](#简介)
- [安装与配置](#安装与配置)
- [CLI 版本](#cli-版本)
- [三种协作模式](#三种协作模式)
  - [Chat 模式](#chat-模式)
  - [Builder 模式](#builder-模式)
  - [SOLO 模式](#solo-模式)
- [Builder 模式实战](#builder-模式实战)
- [高级技巧](#高级技巧)
- [常用快捷键](#常用快捷键)
- [常见问题](#常见问题)

---

## 简介

Trae 是字节跳动推出的 AI 原生集成开发环境（IDE），基于 VS Code 内核深度改造，主打中文自然语言编程与 AI 自动开发。除了 IDE，Trae 还提供命令行（CLI）版本。

- **国内版**：trae.com.cn，免费，手机号登录，默认豆包模型，可切换 DeepSeek
- **国际版**：trae.ai，可用 Claude、GPT-4o 等

## 安装与配置

1. 访问官网下载安装包（Windows / macOS）
2. 首次启动选择主题和语言（默认简体中文）
3. 可一键从 VS Code / Cursor 导入插件、主题、快捷键
4. 国内版支持手机号验证码登录
5. 在右侧 AI 面板顶部下拉切换模型（豆包 / DeepSeek-R1 / DeepSeek-V3）

## CLI 版本

Trae 的命令行版本分为两条产品线：

| 版本 | 定位 | 开源 | 说明 |
|------|------|------|------|
| **Trae Agent CLI** | 开源的软件工程 Agent | 是（MIT） | [bytedance/trae-agent](https://github.com/bytedance/trae-agent)，Python 编写，基于 LLM 的通用软件工程任务 Agent，支持多模型、MCP、Docker 隔离执行 |
| **TraeCode CLI（traecli）** | 商业命令行 Code Agent | 否 | 仅 TRAE 企业版**旗舰版套餐**客户可用，支持 MCP、自定义智能体、技能、记忆、ACP |

### TraeCode CLI 2.0

支持 macOS、Linux、Windows。Windows 建议优先使用 WSL2；使用原生版本时，首次启动需按提示完成沙箱初始化。

**安装**

```bash
# macOS / Linux
sh -c "$(curl -fsSL https://trae.cn/trae-cli/install_v2.sh)"
```

```powershell
# Windows (PowerShell)
irm https://trae.cn/trae-cli/install_v2.ps1 | iex
```

**启动**

```bash
traecli                                  # 在当前目录启动交互式 TUI
traecli --cd /path/to/project            # 指定工作目录
traecli "解释这个仓库的主要模块"           # 启动 TUI 并带入首条任务
```

> 首次进入项目目录时 CLI 会询问是否信任该目录。**信任后**项目级配置、规则和 Hooks 才会生效。

**登录**

首次启动会在 TUI 内自动引导登录，支持账号登录与自定义域登录。

```bash
traecli login status      # 查看登录状态
traecli logout            # 退出登录
```

自动化 / CI 场景使用个人访问令牌（PAT）：

```bash
export TRAECLI_PERSONAL_ACCESS_TOKEN="YOUR_PAT"
traecli login --with-trae-pat
```

组织使用自定义 API 域名时追加 `TRAECLI_HOST`：

```bash
export TRAECLI_HOST="https://api.example.com"
export TRAECLI_PERSONAL_ACCESS_TOKEN="YOUR_PAT"
traecli login --with-trae-pat
```

> **注意**：TraeCode CLI 默认使用 **Max 模式**，需关注套餐用量。

## 三种协作模式

| 模式 | 定位 | 适用场景 |
|------|------|----------|
| **Chat** | 精准问答 | 知道要改哪里，寻求建议 |
| **Builder** | 快速构建 | 有想法，快速出原型 |
| **SOLO** | 全流程自主交付 | 完整需求，不想逐步参与 |

### Chat 模式

适合代码问答、解释代码、局部修改建议。

### Builder 模式

用自然语言描述需求，AI 自动生成完整项目（代码、文件结构、依赖清单），支持对话式迭代。

### SOLO 模式

给出一份完整需求，AI 自主规划、实现、验证，全流程交付。

## Builder 模式实战

### 第 1 步：启动 Builder

打开 Trae → 点击右侧 AI 面板 **Builder** 标签（或 `Cmd+I` / `Ctrl+I`）→ 输入需求：

```
创建一个基于 Python 的贪吃蛇游戏
```

AI 自动创建项目文件夹、生成代码和依赖清单。

### 第 2 步：一键运行

点击编辑器下方"运行"按钮 → AI 自动检测环境 → 弹出"安装依赖"提示 → 自动安装。

### 第 3 步：迭代优化

```
蛇的移动速度太慢，调整为 15 帧/秒
```

AI 自动修改代码参数。可将终端报错信息拖拽到对话框让 AI 精准定位。

## 高级技巧

### 1. 结构化需求描述

采用"语言 + 框架 + 功能 + 规范"结构：

- ❌ "生成电商系统"
- ✅ "基于 Spring Boot + MySQL 生成带用户认证、商品管理、订单支付的电商 Demo，集成 Docker 部署脚本"

### 2. 利用上下文

- 拖拽文件/文件夹到对话框
- 输入 `#` 引用文件，如"参考 #models.py 的结构"
- 配置 `.traeignore` 排除 `node_modules/`、`dist/` 等目录，提升索引速度

### 3. 多模态开发

上传 UI 设计图/截图，输入"生成对应的 React 组件"，AI 自动解析图层生成代码（支持 Figma 插件导入）。

### 4. 版本回滚

Builder 模式右上角 **Show History** 查看每轮修改快照，一键回退。

### 5. 终端联动

终端报错时点击错误信息旁的蓝色图标，Trae 自动抓取错误栈并给出修复方案。

## 常用快捷键

| 操作 | macOS | Windows |
|------|-------|---------|
| 唤起 AI 侧边对话 | `Cmd+U` | `Ctrl+U` |
| 内联对话 / Builder | `Cmd+I` | `Ctrl+I` |
| 接受代码补全 | `Tab` | `Tab` |
| 命令面板 | `Cmd+Shift+P` | `Ctrl+Shift+P` |

## 常见问题

- **国内版与国际版区别**：国内版免费（手机号登录、豆包/DeepSeek），国际版可用 Claude/GPT
- **AI 功能不可用**：需先登录账号激活
- **生成质量低**：需求描述不够详细，补充框架、功能、规范细节

---

## 参考资源

- [Trae 国内版](https://trae.com.cn)
- [Trae 国际版](https://trae.ai)
- [TraeCode CLI 文档](https://docs.trae.cn/cli_what-is-trae-cli)
- [TraeCode CLI 2.0 快速开始](https://docs.trae.cn/cli_get-started-with-trae-code-cli-2)