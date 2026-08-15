---
layout: home
hero:
  name: Structure
  text: Structure 开发者社区
  tagline: 结构化开发 · 企业级开发生态 · 云原生微服务 · AI 工具
  actions:
    - theme: brand
      text: 快速开始
      link: /quickstart
    - theme: alt
      text: 产品中心
      link: /products/
    - theme: alt
      text: GitHub
      link: https://github.com/structure-projects

features:
  - icon: ⚡️
    title: Structure Boot
    details: 基于 Spring Boot 的快速开发框架，提供开箱即用的 Starter 组件。最新版本 1.5.0。
    link: /products/open-source/structure-boot
  - icon: 🧱
    title: Structure Infra
    details: 基于 DDD 的基础设施抽象层，统一仓储、事件、任务调度与流式事件路由。
    link: /products/open-source/structure-infra
  - icon: 🔐
    title: Structure Security
    details: 企业级安全认证授权框架，JWT / RBAC / OAuth2 / Basic Auth 一体化。
    link: /products/open-source/structure-security
  - icon: 🎯
    title: Structure Datascope
    details: 数据范围管理框架，提供行级与列级的数据权限隔离能力。
    link: /products/open-source/structure-datascope
  - icon: 🚀
    title: Structure Pro
    details: 云原生微服务架构脚手架，统一编排 34 个微服务，支持多种容器化部署。
    link: /products/open-source/structure-pro
  - icon: 🛠️
    title: somcli
    details: 统一容器管理工具，整合 Docker、Compose、Harbor、Swarm、Kubernetes。
    link: /products/open-source/somcli

---

# Structure 开发生态

Structure（结构化开发）是一个面向企业级开发者的开源生态，秉持「结构化开发，为规范而生」的理念，提供从单体快速开发、微服务架构、数据权限到运维管理的完整开源产品矩阵。

## 🎯 生态愿景

- **标准化**: 统一的开发规范、项目结构与分层约定
- **高效性**: 开箱即用的框架组件，快速构建应用
- **云原生**: 支持容器化、微服务、DevOps 全流程
- **AI 赋能**: 提供 AI 规则集、Agent 与 LLM 私有化部署方案

## 📦 推荐项目

| 项目 | 定位 | 最新版本 |
|------|------|---------|
| [**Structure Boot**](/products/open-source/structure-boot) | Spring Boot 快速开发框架 | 1.5.0 |
| [**Structure Infra**](/products/open-source/structure-infra) | DDD 基础设施抽象层 | 1.3.1 |
| [**Structure Security**](/products/open-source/structure-security) | 安全认证授权框架 | 1.1.5 |
| [**Structure Datascope**](/products/open-source/structure-datascope) | 数据范围管理框架 | 1.0.3 |
| [**Structure Pro**](/products/open-source/structure-pro) | 云原生微服务脚手架 | — |
| [**somcli**](/products/open-source/somcli) | 容器管理工具 | v0.1.2-alpha |

> 完整的产品矩阵见 [产品中心](/products/)。

## 🚀 快速开始

```bash
# 1. 使用 Structure Boot 创建 Spring Boot 项目
# 2. 添加 structure-boot-parent 依赖（最新版本 1.5.0）
# 3. 按需引入 Starter 组件
# 4. 开始开发！

@SpringBootApplication
@EnableSimpleGlobalException
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## 📚 文档导航

- [快速开始](/quickstart) — 从零搭建第一个 Structure Boot 应用
- [产品中心](/products/) — 开源产品与 SaaS 产品
- [部署与运维](/deploy/) — Docker / Swarm / K8s / Nomad / Serverless
- [开发规范](/dev-rules/) — 项目结构、CRUD、组件集成、校验、Swagger
- [开发环境](/dev-env/) — Go / Node.js / JDK / Python 环境配置
- [AI 工具](/ai/) — AI 编程 Agent、工作流平台、LLM 部署

## 🌱 社区生态

- 📖 [开发规范](/dev-rules/) - 完整的使用文档
- 💬 [GitHub Issues](https://github.com/structure-projects/structure-docs/issues) - 问题反馈与讨论
- 📧 邮箱: 361648887@qq.com

> 欢迎加入 Structure 社区，一起构建更好的企业级开发生态！