# API 接口规范

本文是**所有项目形态通用**的接口设计约束，覆盖统一响应、出入参、分页、命名与远程调用。

## 1. 统一响应体

所有 Controller 返回生态统一响应体 `cn.structure.common.entity.ResResultVO<T>`，用 `ResultUtilSimpleImpl` 构造：

```java
// 成功
return ResultUtilSimpleImpl.success(data);

// 失败（控制层不抛异常）
return ResultUtilSimpleImpl.fail(code, message);
```

- 分页响应用 `cn.structure.common.vo.ResPage<T>`，请求用 `cn.structure.common.vo.ReqPage`。
- **禁止**返回裸 `Map` / `String` / 自定义响应格式。

```java
@Data
@Schema(description = "统一响应结果")
public class ResResultVO<T> {
    private Integer code;       // 状态码
    private String message;     // 消息
    private T data;             // 数据
    private Long timestamp;     // 时间戳
}
```

## 2. 出入参：DTO / VO / Query 三族

遵循 CQRS 方法论，出入参使用三类对象：

| 对象 | 用途 | 示例 |
|------|------|------|
| `{X}DTO`（或 `{X}Command`） | 写操作入参 | `CreateUserDTO` |
| `{X}Query` | 读操作入参 | `UserQuery` |
| `{X}VO` | 出参 | `UserVO` |

所有 POJO（DTO / VO / Query）**必须有无参构造方法**，供 MyBatis、Jackson、MapStruct 等反射场景使用。

## 3. 分页接口签名

分页接口签名统一为两个参数：

```java
ResPage<XxxVO> page(XxxQuery query, ReqPage reqPage);
```

- `ReqPage`：框架自带，含页码 / 页大小 / 排序等基础参数。
- `{X}Query`：业务查询参数。
- 调用方只关心业务 Query，不关心框架底层分页实现。

## 4. 函数命名统一

- 函数命名见名知意，相同功能命名必须统一：分页一律 `page(...)`。
- 基础 CRUD 接口使用一套固定标准（REST 风格）：`create` / `update` / `delete` / `findById` / `page`。
- 函数参数数量 **≤ 3**，超过时用值对象 / 包装类 / 命令对象聚合。

## 5. RESTful 约定

- 管理 API 路径：`/api/{资源}`，Controller 为 `{X}Controller`。
- 开放接口（无需认证）：`/open/...`，Controller 为 `Open{X}Controller`，位于 `controller/open/`。
- 数据库列 `lower_snake_case`，REST API 路径 `kebab-case`。

## 6. 远程调用（Feign）

微服务间远程调用使用 **Spring Cloud OpenFeign**，**禁止**裸用 `RestTemplate` / `WebClient` / 手写 HTTP：

```java
@FeignClient(name = "structure-order", fallback = OrderFeignFallback.class)
public interface OrderFeign {
    @GetMapping("/api/orders/{id}")
    ResResultVO<OrderVO> findById(@PathVariable("id") Long id);
}
```

- 每个 `@FeignClient` 声明 `fallback` 或 `fallbackFactory`。
- 弱一致性场景 fallback 返回兜底数据；强一致性场景（资金、库存、账务、状态机）fallback **抛 `CommonException`** 中断业务，优先考虑 Seata 分布式事务。

## 7. JSON 序列化

- JSON 序列化优先使用 **FastJSON**（`com.alibaba.fastjson` / `fastjson2`）。
- `structure-restful-web-starter` 已内置 FastJson 转换器（Long → String 防 JS 精度丢失）。
- 工具方法优先 `JSON.toJSONString()` / `JSON.parseObject()` / `JSONArray` / `JSONObject`。
- **禁止**混用 Jackson `ObjectMapper` / Gson 做业务序列化。

## 8. 相关页面

- 参数校验注解：[参数校验](./validation.md)
- 接口文档注解：[Swagger 规范](./swagger.md)
- 数据模型：[数据模型设计规范](./data-model-design.md)
