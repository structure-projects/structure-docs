# 单体 DDD 规范

「单体 DDD」是在**单个可部署应用**内落地领域驱动设计（DDD）的分层思想：保留领域层 / 应用层 / 接口层的清晰边界与聚合建模，但**不拆微服务、不做分布式协调**。

> 与 [单体常规](./monolith-conventional.md) 的区别：单体常规用 Manager 模式、Entity 兼做持久化对象；单体 DDD 强调领域层与应用层分离、聚合根与值对象建模。
> 与 [分布式多模块 DDD 7+1](./ddd-architecture.md) 的区别：7+1 是**多模块 monorepo + 微服务**，单体 DDD 是**单应用内**的分层。

## 1. 分层原则

单体 DDD 在单应用内按以下层次组织（可作为包或少量模块）：

```
应用内分层（自上而下）
interfaces（接口层）→ application（应用层）→ domain（领域层）→ infra（基础设施层）
```

| 层 | 职责 | 关键产物 |
|----|------|----------|
| `interfaces` | 入口适配（Controller） | `{X}Controller` |
| `application` | 应用服务 / 编排 / 装配 | `I{X}Service` / `{X}ServiceImpl` / `{X}Assembler` |
| `domain` | 领域实体 / 仓储接口 / 领域服务 | `{X}Entity` / `{X}Repository` 接口 / `DomainService` |
| `infra` | 仓储实现 / 工具 / 配置 | `{X}RepositoryImpl` |

依赖只能自上而下，**禁止**反向或跨层依赖。

## 2. 领域建模

- 每个聚合以**聚合根 Entity**为唯一入口，聚合内一致性由聚合根方法保证。
- 无唯一标识的描述性对象建模为**值对象**（`Address` / `Money` 等），用 `@Value` 或不可变类实现。
- 领域实体提供 builder 能力（Lombok `@Builder` + `@Getter` + `@NoArgsConstructor`）。

## 3. 持久化选择

单体 DDD 可自行权衡持久化方式：

- **轻量做法**：Entity 兼做持久化对象，使用 Manager 模式（与单体常规相同）。
- **严格做法**：Entity/PO 分离 + Repository 接口/实现，沿用 [DDD 架构与模式](./ddd-architecture.md) 的 RepositoryFacade / Delegate 思路（但不拆 7+1 模块，只在单应用内按包分层）。

无论哪种做法，都**必须**遵守 [数据模型设计规范](./data-model-design.md)（基础字段、逻辑删除、Flyway）与 [API 接口规范](./api-design.md)。

## 4. 适用场景

- 单一业务域，但希望在应用内保持清晰的分层与领域边界。
- 未来可能演进为微服务，先用 DDD 分层打好基础。

## 5. 相关页面

- 形态选型：[项目形态选型与创建](./project-scaffolding.md)
- 完整 DDD 模式参考：[分布式多模块 DDD 7+1](./ddd-architecture.md)
- 通用编码约束：[编码与命名规范](./coding-conventions.md)
