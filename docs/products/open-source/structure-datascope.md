# Structure Datascope

> 数据范围管理框架 · 最新版本 **1.0.3** · [GitHub](https://github.com/structure-projects/structure-datascope)

Structure Datascope 提供统一的数据隔离能力，支持行级和列级的数据权限控制，帮助应用实现数据范围（Data Scope）管理。

## 核心特性

- **多种存储的范围过滤**：MySQL（MyBatis-Plus）、Redis、Elasticsearch、MongoDB、Spring Cloud Stream
- **行级权限控制**：在 DAO 层自动添加 WHERE 条件
- **列级权限控制**：在序列化前过滤敏感字段
- **角色 + 权限双重控制**：支持角色与权限标识两种维度的字段可见性控制
- **多表关联查询支持**：自动识别 SQL 中的多表并正确注入数据权限条件
- **租户隔离集成**：与 MyBatis-Plus 租户插件无缝集成
- **缓存数据隔离**：自动为缓存键添加数据权限前缀

## 数据权限两层模型

### 行级权限（Row-Level）

控制 WHERE 条件，例如：

```sql
SELECT * FROM orders
WHERE org_id = 10 AND dept_id IN (1,2,3)
```

### 列级权限（Column-Level）

控制字段可见性，例如：

```json
{
  "resource": "order",
  "row_rules": [
    { "field": "org_id", "op": "=", "value": 10 },
    { "field": "dept_id", "op": "IN", "value": [1,2,3] }
  ]
}
```

## 快速引入

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-datascope-starter</artifactId>
    <version>1.0.3</version>
</dependency>
```

> 详细用法以 [structure-datascope 仓库 README](https://github.com/structure-projects/structure-datascope) 为准。