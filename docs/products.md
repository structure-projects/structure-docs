# 开源产品与集成方案

Structure 社区聚合了多款开源产品和行业集成方案，助力企业级应用开发。

## 一、Structure Boot

### 1.1 产品概述

Structure Boot 是基于 Spring Boot 的快速开发框架，提供一系列开箱即用的 Starter 组件，帮助开发者快速构建企业级应用。

### 1.2 核心功能

| 组件 | 功能 |
|------|------|
| `structure-restful-web-starter` | Web 开发支持，统一异常处理、参数校验、Swagger |
| `structure-mybatis-starter` | MyBatis 增强，自动 ID 生成、时间注入 |
| `structure-mybatis-plus-starter` | MyBatis-Plus 集成，批量操作、联表查询 |
| `structure-redis-starter` | Redis 分布式锁 |
| `structure-redisson-starter` | Redisson 高级缓存 |
| `structure-minio-starter` | MinIO 对象存储 |
| `structure-log-starter` | 统一日志配置 |
| `structure-rpc-starter` | RPC 调用支持 |

### 1.3 快速集成

```xml
<!-- 添加父依赖 -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-boot-parent</artifactId>
            <version>1.2.3</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<!-- 添加需要的 Starter -->
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-restful-web-starter</artifactId>
</dependency>
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-mybatis-plus-starter</artifactId>
</dependency>
```

### 1.4 核心特性

- **统一异常处理**: `@EnableSimpleGlobalException`
- **自动 ID 生成**: 支持 Snowflake、UUID
- **参数校验**: 基于 JSR-380 标准
- **分布式锁**: 基于 Redis 的注解式锁

## 二、Structure Cloud

### 2.1 产品概述

Structure Cloud 是云原生微服务解决方案，提供完整的微服务架构支持。

### 2.2 架构特性

- **服务注册与发现**: 基于 Spring Cloud
- **配置中心**: 统一配置管理
- **服务网关**: API 网关路由
- **分布式事务**: 分布式事务解决方案
- **服务链路追踪**: 全链路监控

## 三、Structure Admin

### 3.1 产品概述

Structure Admin 是企业级后台管理系统，提供完整的权限管理和业务操作能力。

### 3.2 技术栈

| 层级 | 技术 |
|------|------|
| 后端 | Java、Spring Boot |
| 前端 | Vue 3、TypeScript、Vite |
| 数据库 | MySQL |
| 缓存 | Redis |

### 3.3 核心功能

- **用户管理**: 用户增删改查、角色分配
- **权限管理**: 菜单权限、按钮权限
- **数据展示**: 表格、图表、统计报表
- **系统配置**: 全局配置管理

## 四、Structure OAuth

### 4.1 产品概述

Structure OAuth 是统一认证授权服务，基于 OAuth2 协议。

### 4.2 支持的认证方式

- **密码模式**: 用户名密码登录
- **授权码模式**: 第三方登录
- **客户端模式**: 服务间调用
- **刷新令牌**: Token 刷新机制

### 4.3 集成方式

```java
// 添加依赖
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-oauth-sdk</artifactId>
</dependency>

// 配置 OAuth 客户端
@Configuration
public class OAuthConfig {
    @Bean
    public OAuth2RestTemplate oAuth2RestTemplate() {
        return new OAuth2RestTemplate(resourceDetails());
    }
}
```

## 五、Structure Job

### 5.1 产品概述

基于 XXL-JOB 的分布式任务调度框架。

### 5.2 功能特性

- **分布式执行**: 任务分片执行
- **失败重试**: 自动重试机制
- **任务监控**: 实时监控任务状态
- **日志追踪**: 完整的执行日志

## 六、somcli

### 6.1 产品概述

统一容器管理工具，整合 Docker、Kubernetes、Harbor 等技术。

### 6.2 核心功能

```bash
# Docker 管理
somcli docker install -v 24.0.6

# Harbor 部署
somcli registry install -h harbor.example.com

# K8s 集群创建
somcli cluster create -f cluster.yaml
```

### 6.3 支持的平台

- **Docker**: 容器引擎管理
- **Docker Compose**: 编排部署
- **Swarm**: 原生容器编排
- **Kubernetes**: 容器编排平台
- **Harbor**: 镜像仓库管理

## 七、行业集成方案

### 7.1 金融行业

- 交易系统解决方案
- 风控系统集成
- 数据合规方案

### 7.2 电商行业

- 订单管理系统
- 库存管理方案
- 支付集成方案

### 7.3 物流行业

- 配送调度系统
- 轨迹追踪方案
- 仓储管理集成

## 八、生态集成

Structure 与主流开源项目深度集成：

- **Ruoyi**: 若依框架集成
- **Spring Boot Admin**: 服务监控
- **Prometheus + Grafana**: 监控告警
- **ELK**: 日志收集分析