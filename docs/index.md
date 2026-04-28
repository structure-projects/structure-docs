---
layout: home
hero:
  name: Structure
  text: Structure 开发者社区
  tagline: 企业级开发生态 · 开源框架 · 运维工具 · 行业解决方案
  image:
    src: /logo.png
    alt: Structure Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /quickstart
    - theme: alt
      text: 核心产品
      link: /products
    - theme: alt
      text: GitHub
      link: https://github.com/structure-projects

features:
  - icon: ⚡️
    title: Structure Boot
    details: 基于 Spring Boot 的快速开发框架，提供开箱即用的 Starter 组件，助力快速构建企业级应用。
    link: /structure-boot
  - icon: 🚀
    title: Structure Cloud
    details: 云原生微服务解决方案，支持容器化部署、服务治理、分布式事务等企业级能力。
    link: /structure-cloud
  - icon: 🛠️
    title: somcli
    details: 统一容器管理工具，整合 Docker、Kubernetes、Harbor 等技术，简化运维工作。
    link: /ops-architecture
  - icon: 🔐
    title: Structure OAuth
    details: 统一认证授权服务，基于 OAuth2 协议，提供安全可靠的身份管理能力。
    link: /products
  - icon: 📊
    title: Structure Admin
    details: 企业级后台管理系统，提供完整的权限管理、数据展示、业务操作能力。
    link: /products
  - icon: 🤖
    title: 行业解决方案
    details: 提供金融、电商、物流等行业的完整技术栈和最佳实践。
    link: /industry-ai

---

# Structure 开发生态

Structure 是一个面向企业级开发者的开源社区和技术生态，致力于提供标准化、高效的开发解决方案。

## 🎯 生态愿景

- **标准化**: 统一的开发规范和项目结构
- **高效性**: 开箱即用的组件，快速构建应用
- **扩展性**: 模块化设计，灵活组合使用
- **云原生**: 支持容器化、微服务、DevOps 全流程

## 📦 核心产品矩阵

| 产品 | 定位 | 技术栈 |
|------|------|--------|
| **Structure Boot** | 快速开发框架 | Java 8+, Spring Boot 2.7.x |
| **Structure Cloud** | 微服务架构 | Spring Cloud, Kubernetes |
| **Structure Admin** | 后台管理系统 | Java + Vue 3 |
| **Structure OAuth** | 认证授权中心 | OAuth2, JWT |
| **Structure Job** | 任务调度 | XXL-JOB |
| **somcli** | 运维管理工具 | Go |

## 🚀 快速开始

```bash
# 1. 创建 Spring Boot 项目
# 2. 添加 Structure Boot 依赖
# 3. 启用 Starter 组件
# 4. 开始开发！

@SpringBootApplication
@EnableSimpleGlobalException
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## 🌱 社区生态

- 📖 [文档中心](/guide) - 完整的使用文档和API参考
- 🤝 [贡献指南](/guide) - 参与社区建设
- 💬 [GitHub Issues](https://github.com/structure-projects/structure-docs/issues) - 问题反馈与讨论
- 📧 邮箱: 361648887@qq.com

> 欢迎加入 Structure 社区，一起构建更好的企业级开发生态！