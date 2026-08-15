# 开发规范

Structure 社区的开发规范按模块拆分，便于查阅与引用。

## 模块清单

| 模块 | 文件 | 核心内容 |
|------|------|----------|
| 项目结构 | [project-structure.md](project-structure.md) | 四层架构、模块职责 |
| 依赖配置 | [dependency-config.md](dependency-config.md) | Maven 配置、组件依赖 |
| CRUD 模板 | [crud-template.md](crud-template.md) | 控制器 / 服务 / 管理器模板 |
| 组件集成 | [component-integration.md](component-integration.md) | 安全 / Redis / MQ 等集成 |
| 参数验证 | [validation.md](validation.md) | 验证注解、校验规则 |
| Swagger 规范 | [swagger.md](swagger.md) | 文档生成、注解使用 |
| 完整规范 | [structure-projects-rule.md](structure-projects-rule.md) | 全量原始规范 |

## 快速参考

### 命名规范速查

```
{业务}StateEnum      → 状态枚举
{业务}TypeEnum       → 类型枚举
{业务}ExceptionEnum  → 错误码枚举
I{业务}Service       → Service 接口
{业务}ServiceImpl    → Service 实现
{业务}Controller     → 控制器
{业务}Mapper         → Mapper 接口
{业务}Assembler      → 装配器
```

### 响应规范

```java
ResultUtilSimpleImpl.success(data);
ResultUtilSimpleImpl.fail(code, message);
```

### 异常规范

```java
throw new CommonException(枚举.getCode(), 枚举.getMessage());
```