# 开发规范

Structure 社区的开发规范分为两层：**通用规范**（所有项目形态共用）与**场景规范**（按项目形态各有特殊之处）。

## 通用规范

所有项目形态都适用的规范：

| 模块 | 文件 | 核心内容 |
|------|------|----------|
| API 接口规范 | [api-design.md](api-design.md) | 统一响应、DTO/VO/Query、分页、Feign |
| 数据模型设计规范 | [data-model-design.md](data-model-design.md) | 基础字段、Entity/PO、逻辑删除、Flyway |
| 编码与命名规范 | [coding-conventions.md](coding-conventions.md) | 命名、异常、注入、FastJSON、UserContext、事件、数据权限 |
| 参数校验 | [validation.md](validation.md) | 验证注解、分组校验、自定义注解 |
| Swagger 规范 | [swagger.md](swagger.md) | 文档生成、注解使用 |
| Git 与开发流程 | [git-workflow.md](git-workflow.md) | 分支策略、约定式提交、变更分级、版本管理 |

## 场景规范

按项目形态选择，各有专属规范：

| 形态 | 文件 | 模块结构 | 持久化模式 |
|------|------|----------|------------|
| 项目形态选型 | [project-scaffolding.md](project-scaffolding.md) | 选型决策树 | — |
| 单体常规 | [monolith-conventional.md](monolith-conventional.md) | 4 模块（api/biz/common/dependencies） | Manager 模式 |
| 单体 DDD | [monolith-ddd.md](monolith-ddd.md) | 单应用内分层 | 轻量或严格 |
| 分布式微服务 | [distributed-microservice.md](distributed-microservice.md) | 每服务单模块/4 模块 | 按服务内部形态 |
| 分布式多模块 DDD 7+1 | [ddd-architecture.md](ddd-architecture.md) | 7+1 后端模块 | RepositoryFacade + Delegate + Entity/PO 分离 |

## 其他参考

| 模块 | 文件 | 核心内容 |
|------|------|----------|
| 项目结构总览 | [project-structure.md](project-structure.md) | 四种形态结构、枚举、异常、响应 |
| 依赖配置 | [dependency-config.md](dependency-config.md) | Maven 配置、组件版本、模块依赖 |
| CRUD 模板 | [crud-template.md](crud-template.md) | 单体常规的控制器 / 服务 / Manager 模板 |
| 组件集成 | [component-integration.md](component-integration.md) | 日志 / Redis / MQ / 多租户等集成 |
| 研发团队指南 | [team-guide.md](team-guide.md) | 环境、IDE 配置、Git Flow |
| 完整规范（旧版） | [structure-projects-rule.md](structure-projects-rule.md) | 单体 4 模块全量规范，仅作历史参考 |

## 快速参考

### 命名规范速查

```
{业务}Entity              → 领域实体
{业务}PO                  → 持久化对象
{业务}Repository          → 仓储接口
{业务}RepositoryImpl      → 仓储实现
{业务}MybatisPlusDelegate → MyBatis 委托
I{业务}Service            → Service 接口
{业务}ServiceImpl         → Service 实现
{业务}Controller          → 控制器
{业务}Assembler           → 装配器
{业务}ExceptionEnum       → 错误码枚举
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
