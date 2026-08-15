# 项目结构规范

Structure 生态内存在**四种项目形态**，开发者需先判断当前项目属于哪种，再套用对应规范：

| 形态 | 模块特征 | 持久化模式 | 规范页 |
|------|----------|------------|--------|
| **单体常规** | `api` / `biz` / `common` / `dependencies` 4 模块 | Manager 模式 | [单体常规](./monolith-conventional.md) |
| **单体 DDD** | 单应用内分层 | 轻量（Manager）或严格（Entity/PO 分离） | [单体 DDD](./monolith-ddd.md) |
| **分布式微服务** | 每服务单模块或 4 模块 | 按服务内部形态 | [分布式微服务](./distributed-microservice.md) |
| **分布式多模块 DDD 7+1**（**默认**） | `domain` / `infra` / `repository-mybatis` 等 7+1 模块 | RepositoryFacade + Delegate + Entity/PO 分离 | [分布式多模块 DDD 7+1](./ddd-architecture.md) |

> 选型决策树与目录布局详见 [项目形态选型与创建](./project-scaffolding.md)。

## 1. DDD 7+1 模块结构（默认）

```
structure-{X}/
├── structure-{X}-dependencies/        # 父 POM，版本管理（仓库根无 pom.xml）
├── structure-{X}-common/              # DTO / VO / Query / enums / exception / constant
├── structure-{X}-domain/              # {X}Entity / {X}Repository 接口 / DomainService
├── structure-{X}-infra/               # {X}RepositoryImpl / {X}RepositoryDelegate 接口
├── structure-{X}-repository-mybatis/  # {X}PO / {X}Mapper / {X}MybatisPlusDelegate / Flyway
├── structure-{X}-application/         # I{X}Service / {X}ServiceImpl / {X}Assembler
├── structure-{X}-interfaces/          # controller/api/{X}Controller + controller/open/Open{X}Controller
└── structure-{X}-boot/                # 启动类 + application.yaml + Dockerfile
```

### 依赖方向

```
common → domain → infra → repository-mybatis
application → domain + infra
interfaces → application
boot → all
```

**禁止**反向依赖和跨层依赖。

::: tip 落地示例

`structure-iam` 中的 `structure-user` / `structure-org` / `structure-tenant` 均采用此结构。以用户中心为例：

```
structure-user-center/
├── structure-user/                    # 后端 7+1 模块
└── structure-user-web/                # 前端容器
    ├── structure-user-ui/             # wujie 微前端子应用
    └── structure-user-ui-components/  # 本地组件库
```

:::

## 2. 单体 4 模块结构（兼容）

```
structure-{X}/
├── structure-{X}-api/                 # 控制层（controller/ + 启动类）
├── structure-{X}-biz/                 # 业务层（service/ + manager/ + mapper/ + entity/ + assembler/ + config/）
├── structure-{X}-common/              # 公共层（dto/ + vo/ + query/ + enums/ + exception/ + constant/）
└── structure-{X}-dependencies/        # 父 POM
```

- 使用 Manager 模式，Entity 直接使用 `@TableId` / `@TableLogic`（不分离 Entity/PO）。
- **禁止**在单体项目中套用 DDD 的 RepositoryFacade / Delegate 模式。
- 跨形态通用规则（统一响应、统一异常、命名、validation、swagger、`UserContext`、数据权限、多租户）仍然适用。

## 3. 包名规范

- 根包：`cn.structured.{领域}`（**有 d**）。
- 子包按层划分：`.common` / `.domain` / `.infra` / `.repository` / `.application` / `.interfaces` / `.boot`。
- `cn.structure.*`（**无 d**）仅 `structure-common` / `structure-infra` 等底层基础库使用。

## 4. 枚举规范

| 类型 | 命名模式 | 示例 |
|------|----------|------|
| 状态枚举 | `{业务}StateEnum` | `ExampleStateEnum` |
| 类型枚举 | `{业务}TypeEnum` | `ExampleTypeEnum` |
| 错误码枚举 | `{业务}ExceptionEnum` | `ExampleExceptionEnum` |

```java
@Getter
@AllArgsConstructor
public enum ExampleStateEnum {

    NORMAL(1, "正常"),
    DISABLED(2, "禁用");

    private final Integer code;
    private final String description;
}
```

## 5. 异常规范

业务异常必须使用 `cn.structure.common.exception.CommonException`：

```java
// 推荐：传入枚举类
throw new CommonException(ExampleExceptionEnum.NOT_FOUND.getCode(),
        ExampleExceptionEnum.NOT_FOUND.getMessage());

// 禁止：直接使用字面量
throw new CommonException("100001", "示例不存在"); // 禁止
```

## 6. 响应规范

使用 `cn.structure.common.utils.ResultUtilSimpleImpl` 封装响应：

```java
ResultUtilSimpleImpl.success(data);          // 成功
ResultUtilSimpleImpl.fail(code, message);    // 失败
```

统一响应结构：

```java
@Data
@Schema(description = "统一响应结果")
public class ResResultVO<T> {

    @Schema(description = "状态码", example = "200")
    private Integer code;

    @Schema(description = "消息", example = "操作成功")
    private String message;

    @Schema(description = "数据")
    private T data;

    @Schema(description = "时间戳", example = "1704067200000")
    private Long timestamp;
}
```

## 7. 相关页面

- 项目选型与目录布局：[项目形态选型与创建](./project-scaffolding.md)
- 编码约束：[编码与命名规范](./coding-conventions.md)
- 接口出入参：[API 接口规范](./api-design.md)
- 依赖配置：[依赖配置](./dependency-config.md)
