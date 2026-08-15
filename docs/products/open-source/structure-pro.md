# Structure Pro

> 云原生微服务架构脚手架 · [GitHub](https://github.com/structure-projects/structure-pro)

Structure Pro 是云原生微服务架构脚手架，提供从开发、构建、部署到运维的全流程解决方案。支持 Docker Compose、Docker Swarm、Kubernetes（Helm）、Nomad、Serverless、KubeSphere 等多种容器化编排，采用领域级目录结构统一管理 34 个微服务（xxx-service / xxx-ui）。

## 能力概览

| 能力 | 说明 |
|------|------|
| 多编排支持 | Docker Compose / Swarm / Kubernetes / Nomad / Serverless / KubeSphere |
| 领域级目录 | 统一管理 34 个微服务（xxx-service / xxx-ui） |
| 完整运维 | Prometheus + Grafana 监控、SkyWalking 链路追踪、ELK 日志 |
| 开发环境 | Go / Node.js / JDK / Python 环境配置指南 |
| AI 配套 | AI 编程 Agent、工作流平台、LLM 私有化部署文档 |

## 技术栈

- **微服务框架**：Spring Cloud / Spring Boot
- **服务注册**：Nacos 2.2.3
- **消息队列**：Kafka / RabbitMQ / RocketMQ / EMQX
- **搜索引擎**：Elasticsearch 8.16.0
- **链路追踪**：SkyWalking 9.5.0
- **API 网关**：Kong Gateway
- **限流熔断**：Sentinel 1.8.8

## 相关文档

Structure Pro 的完整部署与运维文档已同步收录于本站 [部署与运维](/deploy/) 章节，包括：

- [部署总览](/deploy/)
- [Docker Swarm 集群部署](/deploy/docker-swarm)
- [Kubernetes 部署](/deploy/kubernetes)
- [Nomad 部署](/deploy/nomad)
- [Serverless 部署](/deploy/serverless)

> 更多内容以 [structure-pro 仓库 README](https://github.com/structure-projects/structure-pro) 为准。