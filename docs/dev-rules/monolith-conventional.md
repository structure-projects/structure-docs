# 单体常规规范

「单体常规」是 Structure 生态的历史默认形态，采用 **4 模块 + Manager 模式**，适合小型工具、内部服务和管理后台。

## 1. 模块结构

```
structure-{X}/
├── structure-{X}-api/                 # 控制层（controller/ + 启动类）
├── structure-{X}-biz/                 # 业务层（service/ + manager/ + mapper/ + entity/ + assembler/ + config/）
├── structure-{X}-common/              # 公共层（dto/ + vo/ + query/ + enums/ + exception/ + constant/）
└── structure-{X}-dependencies/        # 父 POM
```

| 模块 | 职责 |
|------|------|
| `*-api` | 控制层，处理 HTTP 请求 |
| `*-biz` | 业务逻辑层（含 Manager 数据管理层） |
| `*-common` | 公共组件（DTO / VO / Query / 枚举 / 异常 / 常量） |
| `*-dependencies` | Maven 依赖管理 |

## 2. Manager 模式（持久化）

单体形态使用 Manager 模式，**不套用 DDD 的 RepositoryFacade / Delegate**：

```java
public interface IExampleManager extends IService<Example> {
}

@Service
@RequiredArgsConstructor
public class ExampleManagerImpl extends ServiceImpl<ExampleMapper, Example> implements IExampleManager {
}
```

- Entity 直接使用 `@TableId` / `@TableField` / `@TableLogic` 注解，**不分离 Entity/PO**。
- Entity 兼做领域对象。
- Service 通过 `I{X}Manager` 完成数据访问，**禁止**直接注入 Mapper。

## 3. CRUD 模板

控制器 / 服务 / Manager / Mapper / Entity / Assembler / 枚举的完整代码模板见 [CRUD 代码模板规范](./crud-template.md)。

## 4. 必须遵守的通用规范

单体形态仍需遵守所有**通用规范**：

- [API 接口规范](./api-design.md)：统一响应、DTO/VO/Query、分页签名、Feign。
- [数据模型设计规范](./data-model-design.md)：基础字段、逻辑删除、Flyway。
- [编码与命名规范](./coding-conventions.md)：命名、异常、注入、FastJSON、UserContext。
- [参数校验](./validation.md)、[Swagger 规范](./swagger.md)、[Git 与开发流程](./git-workflow.md)。

## 5. 适用场景与限制

- 适用：小型工具、内部服务、管理后台。
- 不适用：多业务领域、长期演进、需要拆微服务的场景 → 请选用 [分布式多模块 DDD 7+1](./ddd-architecture.md)。

## 6. 相关页面

- 形态选型：[项目形态选型与创建](./project-scaffolding.md)
- 单体 DDD 变体：[单体 DDD](./monolith-ddd.md)
