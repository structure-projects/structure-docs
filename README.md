# Structure Docs

Structure Docs 是 [Structure 开源社区](https://github.com/structure-projects)的官方文档站点，基于 VitePress 构建，为开发者和企业提供全面的生态规范、开源产品说明、集成与运维方案、开发环境与 AI 工具相关内容。

## 项目定位

Structure（结构化开发）是一个面向企业级开发者的开源生态，秉持「结构化开发，为规范而生」的理念，提供从单体快速开发、微服务架构、数据权限到运维管理的完整开源产品矩阵。

## 推荐项目

| 项目 | 定位 | 最新版本 |
|------|------|---------|
| **Structure Boot** | Spring Boot 快速开发框架 | 1.5.0 |
| **Structure Infra** | DDD 基础设施抽象层 | 1.3.1 |
| **Structure Security** | 安全认证授权框架 | 1.1.5 |
| **Structure Datascope** | 数据范围管理框架 | 1.0.3 |
| **Structure Pro** | 云原生微服务脚手架 | — |
| **somcli** | 容器管理工具 | v0.1.2-alpha |

## 文档结构

```
docs/
├── index.md            # 首页
├── quickstart.md       # 快速开始
├── products/           # 产品中心（推荐项目 + 公开项目目录）
├── deploy/             # 部署与运维（Docker / Swarm / K8s / Nomad / Serverless）
├── dev-rules/          # 开发规范（项目结构 / CRUD / 组件集成 / 校验 / Swagger）
├── dev-env/            # 开发环境（Go / Node.js / JDK / Python）
├── ai/                 # AI 工具（编程 Agent / 工作流平台 / LLM 部署）
└── community.md        # 社区介绍
```

## 快速开始

1. 克隆本仓库
2. 安装依赖并启动 VitePress 本地服务

```bash
git clone <repo-url>
cd structure-docs
npm install
npm run docs:dev
```

## 参与方式

欢迎开发者、企业、开源爱好者加入 Structure 社区，共同推动开源生态发展。

- [产品中心](./docs/products/overview.md)
- [公开项目目录](./docs/products/catalog.md)
- [GitHub Issues](https://github.com/structure-projects/structure-docs/issues) - 问题反馈与讨论