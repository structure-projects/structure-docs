# 部署与运维

本章节源自 [structure-pro](https://github.com/structure-projects/structure-pro) 云原生微服务架构脚手架，提供从开发、构建、部署到运维的全流程解决方案。支持 Docker Compose、Docker Swarm、Kubernetes（Helm）、Nomad、Serverless、KubeSphere 等多种容器化编排，采用领域级目录结构统一管理 34 个微服务（xxx-service/xxx-ui），并配套开发环境、AI 编程 Agent 与 LLM 私有化部署等完整文档。

## 🚀 快速开始

### 环境要求

- **Docker**: 20.10+
- **Docker Compose**: 1.29+

### 一键启动

```bash
# 最小化开发环境（核心服务）
./deploy/scripts/start-minimal-dev.sh

# 完整开发环境（所有服务）
./deploy/scripts/start-full-dev.sh

# 停止所有服务
./deploy/scripts/stop-all.sh
```

### 访问地址

| 服务 | 地址 | 凭据 |
|------|------|------|
| Nacos 控制台 | `http://localhost:8848/nacos` | nacos/nacos |
| Grafana | `http://localhost:3000` | admin/admin123 |
| SkyWalking UI | `http://localhost:8080` | - |
| Kibana | `http://localhost:5601` | - |
| Sentinel Dashboard | `http://localhost:8858` | sentinel/sentinel |
| Kong Admin | `http://localhost:8001` | - |

## 🏗️ 技术架构

```
┌─────────────────────────────────────────────────────┐
│                    接入层 (Ingress)                  │
│           Kong Gateway / Istio Gateway              │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                    服务网格层                        │
│              Istio / Service Mesh                   │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                    业务服务层                        │
│  user-center  oauth-center  content-center  job-center │
│            admin-center / 应用系统聚合层              │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                    基础设施层                        │
│  Nacos  │  Kafka / RabbitMQ  │  Redis  │  MySQL   │
│  Elasticsearch  │  Sentinel  │  SkyWalking         │
└─────────────────────────────────────────────────────┘
```

### 技术栈

| 类别 | 组件 |
|------|------|
| **微服务框架** | Spring Cloud / Spring Boot |
| **服务注册** | Nacos 2.2.3 |
| **消息队列** | Kafka / RabbitMQ / RocketMQ / EMQX |
| **缓存** | Redis / Memcached |
| **数据库** | MySQL / PostgreSQL / MongoDB / MariaDB / SQL Server / Neo4j |
| **搜索引擎** | Elasticsearch 8.16.0 |
| **时序数据库** | InfluxDB / ClickHouse |
| **对象存储** | MinIO |
| **分布式事务** | Seata |
| **监控** | Prometheus + Grafana |
| **链路追踪** | SkyWalking 9.5.0 |
| **日志** | ELK Stack (Elasticsearch + Logstash + Kibana) |
| **容器编排** | Docker Swarm / Kubernetes / Helm / Nomad |
| **API网关** | Kong Gateway |
| **限流熔断** | Sentinel 1.8.8 |

## 📁 项目结构

```
structure-pro/
├── structure-monitoring-center/    # 监控中心模块
├── deploy/
│   ├── docker/                     # Docker 部署文档
│   │   ├── docker-swarm.md         # Swarm 集群部署指南
│   │   ├── on-line-docker.md       # 在线 Docker 安装
│   │   └── off-line-docker.md      # 离线 Docker 安装
│   ├── docker-compose/
│   │   ├── basic/                  # 基础服务
│   │   ├── atom/                   # 原子服务
│   │   ├── apps/                   # 应用系统
│   │   ├── view/                   # 前端应用
│   │   └── dev-ops-tools/          # 开发运维工具
│   ├── helm/                       # Helm Charts
│   └── nomad/                      # Nomad 部署配置
│       ├── jobs/                   # Nomad Job 定义
│       ├── config/                 # Nomad 配置文件
│       └── systemd/                # Nomad Systemd 服务
└── pom.xml                         # Maven 父 POM
```

### 服务分类

| 分类 | 服务 | 说明 |
|------|------|------|
| **原子服务** | user-center, oauth-center, content-center, job-center, admin-center | 核心业务能力 |
| **应用系统** | content-manager-system, manager-system | 业务聚合层 |
| **基础设施** | Nacos, Redis, MySQL, Kafka, Elasticsearch 等 | 中间件支持 |
| **开发运维工具** | it-tools, netclient, netgateway | 工具集 |

## 🚢 部署指南

### 部署流程

> ⚠️ **重要**: 部署任一服务前，必须先进入服务目录执行 `./scripts/init.sh` 初始化环境

```bash
# 进入服务目录
cd <service-directory>

# 初始化环境变量
sh ./scripts/init.sh

# Docker Compose 部署
docker-compose up -d

# Docker Swarm 部署
docker stack deploy -c service.yaml <service-name>

# Nomad 部署
nomad job run <job-file.nomad>
```

### Docker Compose 部署

```bash
# 1. 基础服务
cd deploy/docker-compose/basic/<service>
sh ./scripts/init.sh && docker-compose up -d

# 2. 原子服务
cd ../atom/<service>
sh ./scripts/init.sh && docker-compose up -d

# 3. 应用系统
cd ../apps/<service>
sh ./scripts/init.sh && docker-compose up -d
```

### Docker Swarm 集群部署

```bash
# 初始化 Swarm
docker swarm init --advertise-addr <YOUR_IP>
docker network create --driver overlay --attachable structure-cloud-work

# 基础服务
cd deploy/docker-compose/basic/<service>
sh ./scripts/init.sh && docker stack deploy -c service.yaml <stack-name>

# 原子服务
cd ../atom/<service>
sh ./scripts/init.sh && docker stack deploy -c service.yaml <stack-name>
```

### Nomad 部署

```bash
# 部署基础服务
cd deploy/nomad/jobs/basic
nomad job run <service.nomad>

# 部署原子服务
cd ../atom
nomad job run <service.nomad>

# 部署应用系统
cd ../apps
nomad job run <service.nomad>
```

## 📦 脚本体系

### 快速启动脚本

```bash
./deploy/scripts/start-minimal-dev.sh        # 最小化核心服务
./deploy/scripts/start-full-dev.sh           # 完整环境
./deploy/scripts/start-observability-only.sh # 仅监控
```

### 运维工具脚本

| 脚本 | 说明 |
|------|------|
| stop-all.sh | 停止所有服务 |
| reset-env.sh | 重置环境 |
| status.sh | 查看状态 |
| open-nav.sh | 导航页面 |

### 部署脚本

| 脚本 | 说明 |
|------|------|
| start-local-docker-compose.sh | 启动基础服务 |
| start-atom-services.sh | 启动原子服务 |
| start-apps.sh | 启动应用系统 |
| deploy-swarm.sh | Swarm 集群部署 |

### Swarm 管理命令

```bash
docker service ls                    # 查看服务
docker service ps <name>             # 服务状态
docker service logs <name>          # 查看日志
docker service scale <name>=3      # 扩容
docker stack rm <stack>             # 移除服务
```

### Nomad 管理命令

```bash
nomad job status                    # 查看作业状态
nomad job stop <job-name>           # 停止作业
nomad alloc status <alloc-id>      # 查看分配状态
nomad alloc logs <alloc-id>        # 查看日志
```

## 🛠️ 常用运维

### 服务管理

```bash
# 查看运行中的容器
docker ps

# 查看实时日志
docker logs -f <container-name>

# 进入容器
docker exec -it <container-name> /bin/bash
```

### 数据管理

```bash
# MySQL 备份
docker exec structure-mysql mysqldump -uroot -p123456 structure > backup.sql

# 清理数据
docker volume prune -f
```

## 📊 可观测性

### Prometheus + Grafana

- 指标监控: `http://localhost:9090`
- 可视化面板: `http://localhost:3000`

### SkyWalking

- 链路追踪: `http://localhost:8080`
- OAP 服务: localhost:11800

### ELK Stack

- Elasticsearch: `http://localhost:9200`
- Kibana: `http://localhost:5601`

## 🔒 安全建议

- [ ] 修改所有默认密码
- [ ] 配置 HTTPS 访问
- [ ] 启用防火墙/安全组
- [ ] 配置日志轮转和备份

## 🧑‍💻 相关文档

项目提供完整的开发环境配置、AI 工具与 LLM 部署文档，本站在以下章节中同步收录：

### 开发环境配置

| 页面 | 说明 |
|------|------|
| [Go 环境](/dev-env/go) | Go 环境配置与版本管理 |
| [Node.js 环境](/dev-env/node) | nvm 多版本 + nrm 镜像源 |
| [JDK / Maven](/dev-env/jdk-maven) | SDKMAN（JDK + Maven 管理） |
| [Python 环境](/dev-env/python) | venv + conda |

### AI 编程与自动化

| 页面 | 说明 |
|------|------|
| [AI 编程 Agent](/ai/agents/) | Claude Code、Cursor、Codex、Qoder、Trae、CodeBuddy、OpenClaw、Hermes、OpenHands |
| [工作流平台](/ai/workflow/) | Dify、Coze、n8n |
| [LLM 私有化部署](/ai/llm/) | GPUStack + vLLM / llama.cpp |

### 开发规范

| 页面 | 说明 |
|------|------|
| [开发规范](/dev-rules/) | 项目结构、依赖、CRUD、组件集成、校验、Swagger |
| [研发团队指南](/dev-rules/team-guide) | 前后端规范、分支管理 |

## 📚 更多资源

- [Structure 开源组织](https://github.com/structure-projects) - 全部公开项目
- [structure-pro](https://github.com/structure-projects/structure-pro) - 云原生微服务脚手架
- [structure-boot](https://github.com/structure-projects/structure-boot) - Spring Boot 快速开发框架

---

## 📖 完整文档

更多详细内容请参考：
- [Docker Swarm 集群部署](./docker-swarm) - Swarm 高可用集群部署指南
- [在线 Docker 安装](./docker-install-online) - 在线环境 Docker 安装
- [离线 Docker 安装](./docker-install-offline) - 离线环境 Docker 安装
- [Kubernetes 部署](./kubernetes) - K8s 集群部署指南
- [Nomad 部署](./nomad) - Nomad 集群部署指南
- [Serverless 部署](./serverless) - 阿里云/腾讯云/华为云函数计算
