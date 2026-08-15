# 项目形态选型与创建

新建一个 Structure 生态项目时，先想清楚用哪种**项目形态**，再动手搭骨架。这一页讲怎么选、怎么命名、怎么布局、第一次提交要带什么。

## 1. 四种形态怎么选

生态里有四种项目形态，各有适合的场景：

| 形态 | 模块结构 | 持久化方式 | 适合 | 详情 |
|------|----------|------------|------|------|
| **单体常规** | 4 模块（api/biz/common/dependencies） | Manager 模式 | 小型工具、内部服务、管理后台 | [单体常规](./monolith-conventional.md) |
| **单体 DDD** | 单应用内分层 | 轻量（Manager）或严格（Entity/PO 分离） | 单一业务域，希望保持领域边界 | [单体 DDD](./monolith-ddd.md) |
| **分布式微服务** | 每服务单模块或 4 模块 | 按服务内部形态 | 需要服务拆分、注册发现、网关治理 | [分布式微服务](./distributed-microservice.md) |
| **分布式多模块 DDD 7+1**（默认推荐） | 7+1 后端模块 + 2 前端模块 | RepositoryFacade + Delegate + Entity/PO 分离 | 业务中心、长期演进的服务 | [分布式多模块 DDD 7+1](./ddd-architecture.md) |

**快速判断**：

- 多业务领域 + 大团队 + 长期演进 + 要拆微服务 → **分布式多模块 DDD 7+1**（默认）
- 单一业务 + 中小团队 + 中期 → **单体常规**（4 模块 + Manager）
- 单一业务但希望领域分层清晰 → **单体 DDD**
- 多服务协作、每个服务相对简单 → **分布式微服务**

原则是：按当前确定的需求选型，别为「可能」过度设计。业务中心一律优先用 DDD 7+1。

## 2. 仓库与坐标

| 维度 | 约定 |
|------|------|
| 仓库位置 | GitHub org `structure-projects` 下，命名 `structure-{领域}`（小写、kebab-case） |
| Maven `groupId` | `cn.structured` |
| Maven `artifactId` | `structure-{领域}` 或 `structure-{领域}-{模块}` |
| 父 POM | `cn.structured:structure-dependencies:1.4.4`（或当时最新稳定版） |
| 版本号 | 用 `${revision}`，初始 `1.0.0-SNAPSHOT` |
| npm scope | `@structure-projects`，前端包名 `@structure-projects/{领域}-ui` 等 |
| 业务 pom 位置 | 放在 `*-dependencies/` 子目录，仓库根目录不放 pom.xml |

## 3. 包名规则

- 根包：`cn.structured.{领域}`（**带 d**）。
- 子包按层划分：`.common` / `.domain` / `.infra` / `.repository` / `.application` / `.interfaces` / `.boot`。

::: warning 带 d 还是不带 d

- `cn.structure.*`（**不带 d**）只用于 `structure-common` / `structure-infra` 这两个底层基础库。
- `cn.structured.*`（**带 d**）用于其他所有：`structure-security`（是 `cn.structured.security`）、`structure-tenant`、`structure-datascope` 以及全部业务代码。

:::

::: warning 一个历史遗留

`repository-mybatis` 模块在 `structure-user` / `structure-org` 里实际包名是 `cn.structured.{X}.repository.repository.*`（双 "repository"）。新项目建议用 `cn.structured.{X}.repository.mybatis.*`，创建前跟团队确认沿用旧的还是改成新的。

:::

## 4. 目录布局

### 4.1 DDD 7+1（默认）

```
structure-{X}/
├── structure-{X}-dependencies/        # 父 POM（版本管理）
├── structure-{X}-common/              # DTO / VO / Query / 枚举 / 异常 / 常量
├── structure-{X}-domain/              # 实体 / 仓储接口 / 领域服务
├── structure-{X}-infra/               # 仓储实现 / Delegate 接口
├── structure-{X}-repository-mybatis/  # PO / Mapper / MyBatis 委托 / Flyway
├── structure-{X}-application/         # Service / 实现 / 装配器
├── structure-{X}-interfaces/          # 管理 API + 开放接口控制器
├── structure-{X}-boot/                # 启动类 + 配置 + Dockerfile
├── structure-{X}-ui/                  # wujie 微前端子应用（可选）
├── structure-{X}-ui-components/       # 前端本地组件库（可选）
├── scripts/                           # 构建 / 部署脚本
├── .github/workflows/                 # CI
├── README.md                          # 项目说明
└── PROJECT_RULES.md                   # 本项目特殊规范（可选）
```

### 4.2 单体 4 模块（兼容形态）

```
structure-{X}/
├── structure-{X}-api/                 # 控制层（controller/ + 启动类）
├── structure-{X}-biz/                 # 业务层（service/ + manager/ + mapper/ + entity/ + assembler/ + config/）
├── structure-{X}-common/              # 公共层（dto/ + vo/ + query/ + enums/ + exception/ + constant/）
└── structure-{X}-dependencies/        # 父 POM
```

单体形态用 Manager 模式，实体直接用 `@TableId` / `@TableLogic`（不分离 Entity/PO），别强行套 DDD 的 RepositoryFacade / Delegate。但统一响应、异常、命名、参数校验、Swagger、`UserContext`、数据权限、多租户这些通用约定仍然要遵守。

## 5. 第一次提交要带什么

新项目首次提交时，把下面这些一次配齐，避免后面返工：

- 完整模块骨架（哪怕部分模块还是空的）
- `README.md`：定位、技术栈、模块说明、快速开始（跟代码保持一致，别写超前内容）
- `docs/` 文档骨架：`overview.md`、`features/`、`README.md`、`{版本}/changelog/`
- 父 POM + 各模块 POM
- 至少一条端到端示例（Entity → Repository → Service → Controller → 单测）
- 单元测试（`XxxTest`）和集成测试（`XxxIT`，Testcontainers）各至少一个，且 `mvn clean test` 通过
- Flyway 迁移目录 + 初始 `V1.0.0__CREATE_TABLE.sql`
- 4 个 GitHub workflow：`test.yml` / `build-and-push.yml` / `release.yml` / `publish.yml`
- `scripts/`：`mavenbuild.sh` / `install.sh` / `dockerbuild.sh` / `release.sh` / `update-snapshots.sh`
- `boot` 模块的 Dockerfile + `liveness.sh` + `.dockerignore`
- `.gitignore`（Java / Node / IDE）
- `application.yaml` + `application-dev.yml` 模板

**不要**在正式项目里保留示例工程（`*-sample` / `*-example`），也**不要**提交硬编码的密码、密钥、Token（凭据走 GitHub Secrets）。

## 6. 数据库与迁移

- 用 Flyway 管理数据库变更，脚本放在 `*-repository-mybatis/src/main/resources/db/migration/`。
- 命名 `V{版本}__{描述}.sql`，比如 `V1.0.0__CREATE_TABLE.sql`。
- 所有表带基础字段：`id` / `is_deleted` / `create_time` / `update_time` / `create_by` / `update_by`。

Flyway 迁移文件的「不可改」规则见 [数据模型设计规范](./data-model-design.md) 第 5 节。

## 7. 骨架搭好之后

骨架完成后，确认是否需要接入：

1. `structure-gateway`（对外服务要接）
2. `structure-security`（认证授权要接）
3. `structure-tenant`（多租户要接）
4. `structure-datascope`（行级权限要接）
5. CI/CD 参考 `structure-multi-module-template` 里的 workflow。

## 8. 几个不要碰的东西

- 不要用 `structure-ruoyi` / `ruoyi-framework` / `structure-yudao` 当新项目基底（多数已停更）。
- 不要在新项目引入 `structure-pro-infra`（已被 `structure-infra` 取代）。
- 不要写超前于代码的 README（描述还不存在的目录或文件）。

## 9. 相关页面

- 依赖配置与版本管理：[依赖配置](./dependency-config.md)
- 项目结构总览：[项目结构](./project-structure.md)
