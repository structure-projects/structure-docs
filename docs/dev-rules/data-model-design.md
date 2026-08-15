# 数据模型设计规范

本文是**所有项目形态通用**的数据模型与持久化约束，覆盖字段约定、逻辑删除、自动填充与迁移管理。

## 1. 基础字段约定

所有业务表应包含以下基础字段：

| 字段 | 说明 |
|------|------|
| `id` | 主键（BIGINT） |
| `is_deleted` | 逻辑删除（0 未删除 / 1 已删除） |
| `create_time` | 创建时间 |
| `update_time` | 更新时间 |
| `create_by` | 创建人 |
| `update_by` | 更新人 |

- 数据库命名 `lower_snake_case`。
- 字符集 `utf8mb4`，引擎 InnoDB。

## 2. 领域实体（Entity）与持久化对象（PO）

| 维度 | `{X}Entity`（领域实体） | `{X}PO`（持久化对象） |
|------|------------------------|----------------------|
| 所在模块 | `domain` | `repository-mybatis` |
| 注解 | `@Builder` + `@Getter` + `@NoArgsConstructor` | `@TableName` / `@TableId` / `@TableField` |
| 用途 | 表达领域概念、参与业务规则 | 映射数据库表 |

::: tip 形态差异

- **DDD 7+1**：Entity 与 PO 严格分离，由 `{X}MybatisPlusDelegate.toEntity/toPo` 双向转换。
- **单体**：Entity 兼做领域对象，直接使用 `@TableId` / `@TableField` / `@TableLogic`，不分离 Entity/PO。

:::

## 3. 逻辑删除

```java
public class OrderPO {
    @TableLogic
    private Integer isDeleted;  // 0 未删除 / 1 已删除
}
```

- 所有业务表含 `is_deleted` 字段并标注 `@TableLogic`。

## 4. 审计字段自动填充

```java
public class OrderPO {
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    @TableField(fill = FieldFill.INSERT)
    private Long createBy;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Long updateBy;
}
```

- 审计字段用 `@TableField(fill = ...)` 声明，由 `MyMetaObjectHandler` 自动填充。
- `createBy` / `updateBy` 从 `UserContext.getLongUserId()` 取值，**禁止**手动传入。

## 5. 数据库迁移（Flyway）

- 使用 Flyway 管理迁移，脚本位于 `*-repository-mybatis/src/main/resources/db/migration/`。
- 命名 `V{版本}__{描述}.sql`（如 `V1.0.0__CREATE_TABLE.sql`）。

### 迁移文件不可变规则

- 已提交的迁移 SQL 为**只读**，**禁止修改**（修改会导致 checksum 不一致、启动报错）。
- 所有变更通过**新增版本文件**进行（`V1.0.0__init.sql` → 新增 `V1.0.1__add_user_phone.sql`）。
- 新增文件版本号与项目版本号保持一致。
- **禁止**回退已提交迁移文件中的 DDL/DML，如有需要在新版本文件中执行反向操作。

## 6. 相关页面

- 分页与 Mapper 用法：[DDD 架构与模式](./ddd-architecture.md) 第 7 节
- 接口出入参：[API 接口规范](./api-design.md)
