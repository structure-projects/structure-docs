# Structure Infra

> 基于 DDD 理念的基础设施抽象层 · 最新版本 **1.3.1** · [GitHub](https://github.com/structure-projects/structure-infra)

Structure Infra（仓库名 `structure-pro-infra`）是面向领域驱动设计的基础设施抽象层，提供统一的仓储接口、多种持久化技术适配、事件管理、任务调度与流式事件路由能力。

## 核心特性

- **解耦领域模型与持久化技术**：领域层只依赖统一仓储接口，不关心底层数据库
- **多持久化技术适配**：通过 Facade + Delegate 模式自动适配 MyBatis Plus、JPA、MongoDB、Elasticsearch
- **开箱即用**：基于 Spring Boot AutoConfiguration 自动配置
- **Entity-PO 自动转换**：RepositoryFacade 自动完成领域实体与持久化对象转换
- **CQRS 读写分离**：一个仓储配置多个代理，写走基础代理、读走读代理，读失败自动回退
- **低代码仓储**：无需定义实体类，通过资源名称与 Map 动态操作数据
- **事件管理**：统一事件发布抽象，支持 Spring 事件与消息事件两种通道
- **任务调度**：本地线程池调度与 XXL-Job 分布式调度，统一 TaskScheduler SPI
- **流式事件路由**：基于 Spring Cloud Stream 的事件监听与统一路由

## 模块结构

| 模块 | 说明 |
|------|------|
| structure-infra-starter | 核心模块（仓储抽象、低代码、事件、调度） |
| structure-infra-mybatis-plus-starter | MyBatis Plus 适配（含低代码 MySQL 实现） |
| structure-infra-jpa-starter | JPA 适配 |
| structure-infra-mongodb-starter | MongoDB 适配（含低代码实现） |
| structure-infra-elasticsearch-starter | Elasticsearch 适配（含低代码实现） |
| structure-infra-schedule-starter | 本地任务调度（基于 ScheduledExecutorService） |

## 快速引入

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-infra-starter</artifactId>
    <version>1.3.1</version>
</dependency>
```

> 详细用法以 [structure-infra 仓库 README](https://github.com/structure-projects/structure-infra) 为准。