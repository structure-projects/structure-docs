# 编码与命名规范

这一页讲的是**日常写代码时通用的习惯**：怎么命名、怎么处理异常、怎么注入依赖、用什么做 JSON 序列化、从哪拿当前登录用户等。这些约定在所有项目形态（单体、微服务、DDD 多模块）里都一致。

> 持久化相关的 DDD 专属写法（RepositoryFacade / Delegate、Entity 与 PO 分离）单独放在 [分布式多模块 DDD 7+1](./ddd-architecture.md)。

## 1. 技术栈基线

写代码前先确认这几个版本和坐标，避免用错：

- 包名统一以 `cn.structured` 为根（**带 d**）。只有两个底层基础库 `structure-common`、`structure-infra` 用 `cn.structure`（**不带 d**）。特别提醒：安全框架是 `cn.structured.security`，不是 `cn.structure.security`。
- Spring Boot `4.0.6` + JDK 17（`jakarta.*`），MyBatis-Plus `3.5.16`，Spring Cloud `2025.1.0`。
- 生态组件版本：`structure-infra 1.3.1`、`structure-security 1.1.5`、`structure-tenant 1.4.3`、`structure-datascope 1.0.3`。

## 2. 工具类与依赖注入

**工具类按这个顺序挑，越靠前越好**：

1. **Hutool**：字符串、集合、Bean、JSON 等通用操作（`StrUtil` / `CollUtil` / `BeanUtil`）。
2. **框架已提供的工具**：比如 `ResultUtilSimpleImpl`、上下文管理器，别再自己造轮子。
3. **框架其他模块的能力**：`structure-infra` / `structure-security` / `structure-tenant` 提供的工具。
4. **自己写的工具类**：前三个都没有时才写，而且要放在 `infra` 层。

**依赖注入按这个顺序挑**：

1. **构造器注入**（首选）：`@RequiredArgsConstructor` + `private final` 字段，最简洁。
2. **`@Resource`**：次选，现有代码里也很常见。
3. **`@Autowired`**：尽量少用，业务代码里能避免就避免。

```java
@Service
@RequiredArgsConstructor
public class DeptServiceImpl implements IDeptService {
    private final DeptRepository deptRepository;
    private final IUserService userService;
}
```

## 3. 命名约定

命名有固定模式，举个例子（以「部门」为例）：

| 类型 | 命名方式 | 示例 |
|------|----------|------|
| 领域实体 | `{业务}Entity` | `DeptEntity` |
| 持久化对象 | `{业务}PO` | `DeptPO` |
| 仓储接口 | `{业务}Repository` | `DeptRepository` |
| 仓储实现 | `{业务}RepositoryImpl` | `DeptRepositoryImpl` |
| MyBatis 委托 | `{业务}MybatisPlusDelegate` | `DeptMybatisPlusDelegate` |
| Service 接口 | `I{业务}Service` | `IDeptService` |
| Service 实现 | `{业务}ServiceImpl` | `DeptServiceImpl` |
| 控制器 | `{业务}Controller` / `Open{业务}Controller` | `DeptController` / `OpenDeptController` |
| 装配器 | `{业务}Assembler` | `DeptAssembler` |
| 错误码枚举 | `{业务}ExceptionEnum` | `DeptExceptionEnum` |

上面的 `{业务}` 是占位符，换成你真实的业务对象即可。错误码形如 `ORG_001`（用业务模块的英文前缀开头）。

## 4. 异常与统一响应

- 每种业务异常都定义一个枚举（如 `DeptExceptionEnum`，错误码 `ORG_001`），**不要**在代码里直接写字符串字面量抛异常。
- 业务层（application / domain / infra）抛出的异常统一用 `CommonException`。
- 控制层（interfaces）**不抛异常**，用 `ResultUtilSimpleImpl.fail(code, message)` 返回失败结果。

```java
// 业务层：抛异常
throw new CommonException(DeptExceptionEnum.NOT_FOUND.getCode(),
        DeptExceptionEnum.NOT_FOUND.getMessage());

// 控制层：返回结果
return ResultUtilSimpleImpl.success(data);                 // 成功
return ResultUtilSimpleImpl.fail(code, message);           // 失败
```

Controller 的返回类型统一用 `ResResultVO<T>`；分页响应用 `ResPage<T>`、请求用 `ReqPage`。不要返回裸的 `Map` 或 `String`。

## 5. 接口出入参

出入参分成三类对象：

- **写操作入参**：`{业务}DTO`（或命令对象 `{业务}Command`）。
- **读操作入参**：`{业务}Query`。
- **出参**：`{业务}VO`。

分页接口统一是「业务 Query + 框架 ReqPage」两个参数：

```java
ResPage<DeptVO> page(DeptQuery query, ReqPage reqPage);
```

函数命名要见名知意、相同功能保持统一：分页一律叫 `page(...)`，基础 CRUD 统一用 `create` / `update` / `delete` / `findById` / `page`。单个函数参数不要超过 3 个，多了就用值对象或命令对象把相关参数聚起来。

## 6. 服务间调用（Feign）

微服务之间用 **Spring Cloud OpenFeign** 互相调用，不要手写 `RestTemplate` / `WebClient`：

```java
@FeignClient(name = "structure-order", fallback = OrderFeignFallback.class)
public interface OrderFeign {
    @GetMapping("/api/orders/{id}")
    ResResultVO<OrderVO> findById(@PathVariable("id") Long id);
}
```

每个 `@FeignClient` 都要声明 `fallback` 或 `fallbackFactory`，避免下游挂了直接拖垮上游。降级怎么处理要看一致性要求：

- **弱一致性**（如查询类）：fallback 返回兜底数据或空。
- **强一致性**（资金、库存扣减、账务、订单状态机等）：fallback 里直接抛 `CommonException` 中断业务，别静默降级；这类场景优先用 Seata 分布式事务。

## 7. JSON 序列化

JSON 序列化统一用 **FastJSON**（`JSON.toJSONString()` / `JSON.parseObject()` 等）。`structure-restful-web-starter` 已经内置了 FastJSON 转换器（Long 自动转 String 防止前端精度丢失），Controller 出参不用手动处理。业务代码里不要混用 Jackson `ObjectMapper` 或 Gson。

## 8. 当前登录用户（UserContext）

- **控制层**：用 `SecurityUtils` 或 `UserContext` 都行。
- **非控制层**（Service / Domain / Infra / Assembler / 异步任务）：统一用 `UserContext` 的静态方法，不用注入。

```java
Long userId = UserContext.getLongUserId();
if (userId == null) {
    throw new DeptException(DeptExceptionEnum.NOT_LOGGED_IN);
}
```

原因很简单：Service 可能被消息消费、定时任务、内部 RPC 等非 HTTP 入口调用，那时拿不到 `HttpServletRequest`，直接依赖安全框架工具会取不到用户，所以非控制层一律走 `UserContext`。

## 9. 事件发布与监听

业务事件通过 `EventManager.publish(event)` 发布，渠道由 `EventChannel` 区分：

| 渠道 | 适用场景 | 说明 |
|------|----------|------|
| `SPRING_EVENT` | 仅当前 JVM 内部 | 走 Spring 事件发布 |
| `MESSAGE_EVENT` | 跨服务 | 走消息队列，且自动带数据权限参数 |
| `DEFAULT` | 由配置决定 | 读 `structure.infra.default-event-channel` 配置 |

业务事件要实现 `Event` 接口，声明 `getEventId()`；跨服务的事件要把 `getEventChannel()` 显式设为 `MESSAGE_EVENT`。监听端分两种：本 JVM 用 `@EventListener`；跨服务用 `@StreamEventListener`（推荐）或 `@StreamRouteHandler`（多路复用场景）。

## 10. 数据权限与多租户

多租户和行级数据权限，**不要在业务代码里手写 `tenant_id` 条件或手动传权限参数**，交给框架处理：

- 租户标识从上下文取（由网关 / 多租户组件写入），不要从请求参数或 Header 里读了直接用。
- 跨服务消息、缓存、Redis 操作要用带数据权限的包装类（`DataScopeStreamBridge` / `DataScopeCacheManager` / `DataScopeRedisTemplate`），否则数据权限参数会丢。

## 11. 提交前自查

提交前花一分钟过一遍：

- 包名对不对（`cn.structured.*` 还是 `cn.structure.*`）？
- 工具类和注入是否按优先级选？
- 业务异常是否用枚举 + `CommonException`，控制层是否用 `ResultUtilSimpleImpl`？
- 分页签名是不是 `page(Query, ReqPage)`？
- 非控制层是否用 `UserContext` 取当前用户？
- 服务间调用是否用 `@FeignClient` 且声明了降级？
- JSON 是否用 FastJSON、没有混用 Jackson/Gson？
- 本地 `mvn clean test` 是否通过、changelog 是否已写？

## 12. 相关页面

- DDD 持久化与仓储：[分布式多模块 DDD 7+1](./ddd-architecture.md)
- 接口出入参详解：[API 接口规范](./api-design.md)
- 数据模型：[数据模型设计规范](./data-model-design.md)
- 参数校验：[参数校验](./validation.md)
- Git 与流程：[Git 与开发流程](./git-workflow.md)
