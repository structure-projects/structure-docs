# 分布式微服务规范

「分布式微服务」形态下，系统被拆分为多个独立部署的服务，通过网关统一入口、Feign 服务间调用，并依赖 Nacos / Sentinel / Seata 等组件治理。每个服务的内部结构可以是**单模块或 4 模块**（不一定要求 7+1）。

> 与 [分布式多模块 DDD 7+1](./ddd-architecture.md) 的区别：7+1 强调**单个业务服务内部用 DDD 多模块**组织；本形态聚焦**服务之间的分布式协作**（注册发现、调用、降级、事务、数据权限传递）。

## 1. 服务拆分与注册发现

- 服务使用 **Spring Cloud Alibaba Nacos** 做注册发现与配置中心。
- 服务命名 `structure-{领域}`（小写 kebab-case）。
- 依赖版本统一在 `structure-{X}-dependencies` 与 `structure-boot` 中管理，业务 pom 不写死版本号。

## 2. 网关

- 对外服务接入 `structure-gateway`，由网关统一处理：路由 / 限流 / 鉴权 / 重放防护 / 链路追踪。
- 下游服务读取租户用 `@RequestHeader("X-Tenant-Id")`，**禁止**从 body / query 读 `tenantId`。
- 网关不下发 `X-User-Id`；下游需用户身份时**自行解析 JWT 或调用认证中心**。

## 3. 服务间调用（Feign）

```java
@FeignClient(name = "structure-order", fallback = OrderFeignFallback.class)
public interface OrderFeign {
    @GetMapping("/api/orders/{id}")
    ResResultVO<OrderVO> findById(@PathVariable("id") Long id);
}
```

- **禁止**裸用 `RestTemplate` / `WebClient` / 手写 HTTP。
- 每个 `@FeignClient` 声明 `fallback` / `fallbackFactory`。
- 熔断限流用 **Sentinel**。

### 降级策略

- **弱一致性**：fallback 返回兜底数据或空。
- **强一致性**（资金、库存、账务、状态机）：fallback **抛 `CommonException`** 中断业务，优先用 **Seata** 分布式事务。

## 4. 数据权限跨服务传递

跨服务消息事件、缓存、Redis **必须**使用带数据权限的包装类，否则数据权限参数会丢失：

- 消息事件 → `cn.structured.datascope.message.wrapper.DataScopeStreamBridge`
- 缓存 → `cn.structured.datascope.cache.manager.DataScopeCacheManager`
- Redis → `cn.structured.datascope.redis.template.DataScopeRedisTemplate`

跨服务事件通过 `EventManager.publish(event)` + `EventChannel.MESSAGE_EVENT` 自动路由（经数据权限包装）。

## 5. 事件驱动

- 跨服务事件实现 `cn.structure.infra.event.Event` 接口，声明 `getEventChannel() = EventChannel.MESSAGE_EVENT`。
- 发布统一走 `EventManager.publish(event)`，**禁止**直连 `StreamBridge` / MQ client。
- 消费端用 `@StreamEventListener`（Binding 模型）或 `@StreamRouteHandler`（Router 模型）。

## 6. 必须遵守的通用规范

分布式微服务同样遵守所有通用规范：

- [API 接口规范](./api-design.md)：统一响应、DTO/VO/Query、Feign。
- [数据模型设计规范](./data-model-design.md)：基础字段、逻辑删除、Flyway。
- [编码与命名规范](./coding-conventions.md)：UserContext、FastJSON、异常。
- [Git 与开发流程](./git-workflow.md)：分支、提交、变更管理。

## 7. 相关页面

- 形态选型：[项目形态选型与创建](./project-scaffolding.md)
- 服务内部 DDD 分层：[分布式多模块 DDD 7+1](./ddd-architecture.md)
