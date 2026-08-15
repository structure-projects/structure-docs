# 分布式多模块 DDD 7+1

业务中心（用户、组织、租户、订单这类长期演进的服务）默认采用 **DDD 7+1 多模块**架构。「7+1」指的是 7 个后端模块加 1 个父 POM 聚合模块。这套结构在 `structure-user`、`structure-org`、`structure-tenant` 等真实项目里已经验证过。

本文讲清楚模块怎么分、代码怎么放、持久化怎么写。先做形态选型的话，请看 [项目形态选型与创建](./project-scaffolding.md)。

## 1. 模块划分

每个业务服务是一个 monorepo，内部按职责切成 8 个模块。以用户中心（`structure-user`）为例，落地后的目录长这样：

```
structure-user-center/
└── structure-user/                          # 后端 monorepo（7+1 模块）
    ├── structure-user-dependencies/         # 父 POM，统一版本管理（仓库根不放 pom.xml）
    ├── structure-user-common/               # 跨层契约
    ├── structure-user-domain/               # 领域核心
    ├── structure-user-infra/                # 仓储实现与基础设施
    ├── structure-user-repository-mybatis/   # 持久化细节（MyBatis-Plus）
    ├── structure-user-application/          # 应用服务与编排
    ├── structure-user-interfaces/           # 入口适配（Controller）
    ├── structure-user-boot/                 # 启动类 + 配置
    └── docs/                                # 模块设计文档
```

各模块装什么：

| 模块 | 装什么 |
|------|--------|
| `*-dependencies` | 父 POM，只管版本，没有 Java 代码 |
| `*-common` | 跨层共享的契约：DTO、VO、Query、枚举、异常、常量 |
| `*-domain` | 领域核心：实体、仓储接口、领域服务 |
| `*-infra` | 仓储实现、Delegate 接口、基础设施配置 |
| `*-repository-mybatis` | 持久化细节：PO、Mapper、MyBatis-Plus 委托、Flyway 脚本 |
| `*-application` | 应用服务、编排、装配、异步 |
| `*-interfaces` | 对外入口：管理 API 控制器、开放接口控制器 |
| `*-boot` | 启动类、配置文件、Dockerfile |

> 业务中心通常还配两个前端模块（在平级的 `*-web` 容器里）：`*-ui` 是 wujie 微前端子应用，`*-ui-components` 是本地组件库。

## 2. 依赖方向

模块之间只能自上而下依赖，不能反向、也不能跨层跳：

```
common ← domain ← infra ← repository-mybatis
                  ↑
         application → domain + infra
                  ↑
             interfaces → application
                  ↑
                  boot → all
```

一个关键点：业务代码只依赖 `domain` 里的仓储**接口**，不碰实现；`application` / `domain` / `interfaces` 里永远不要注入 `Mapper` 或 `PO`。

## 3. 持久化：RepositoryFacade + Delegate

DDD 项目的持久化用「仓储门面 + 委托」两段式，业务层只看到接口，屏蔽底层存储细节，也方便做读写分离。

### 3.1 仓储门面（infra 层）

`DeptRepositoryImpl` 继承 `RepositoryFacade`，方法体只做透传，不写业务逻辑：

```java
// infra 层：只透传，不含业务逻辑
@Component("deptRepository")
public class DeptRepositoryImpl
        extends RepositoryFacade<DeptEntity, Long, DeptRepositoryDelegate>
        implements DeptRepository {

    @Override
    public List<DeptEntity> findByUserId(Long userId) {
        return getDelegate().findByUserId(userId);  // 透传给 Delegate
    }
}
```

仓储接口继承 `ICrudRepository<T, ID>`（只读场景用 `IQueryRepository`），优先用框架已经定义好的方法，不要重复定义 `save` / `findById` 这些。

### 3.2 委托（repository-mybatis 层）

真正执行持久化的是 Delegate，它支持读写分离：

| 注解 | 作用 |
|------|------|
| `@WriteDelegate` | 标注写代理（增删改） |
| `@ReadDelegate` | 标注读代理（查询），失败时自动回退到写代理 |

```java
// repository-mybatis 层
public class DeptMybatisPlusDelegate
        extends MybatisPlusRepositoryDelegate<DeptEntity, DeptPO, Long>
        implements DeptRepositoryDelegate {

    @Override  // 必须显式重写
    public DeptEntity toEntity(DeptPO po) { return DeptAssembler.toEntity(po); }

    @Override  // 必须显式重写
    public DeptPO toPo(DeptEntity entity) { return DeptAssembler.toPo(entity); }
}
```

`toEntity` / `toPo` 这两个方法**一定要显式重写**，否则会出现字段丢失、ID 没回填这类隐蔽问题。读写分离用 `CqrsRepositoryFacade`（读优先走读代理，异常回退到写代理）。

## 4. 实体（Entity）与持久化对象（PO）分离

DDD 项目里，领域实体和数据库映射对象是分开的两个类：

| 维度 | `DeptEntity`（领域实体） | `DeptPO`（持久化对象） |
|------|--------------------------|------------------------|
| 所在模块 | `domain` | `repository-mybatis` |
| 注解 | `@Builder` + `@Getter` + `@NoArgsConstructor` | `@TableName` / `@TableId` / `@TableField` |
| 用途 | 表达领域概念、承载业务规则 | 映射数据库表 |
| 转换 | 由 `toEntity` / `toPo` 双向转换 | 同左 |

实体不带 MyBatis-Plus 注解，PO 不掺领域行为。只有单体形态才让实体兼做持久化对象（见 [单体常规](./monolith-conventional.md)）。

## 5. 聚合根、值对象与限界上下文

- **聚合根**：每个聚合以聚合根实体为唯一入口（如 `OrderEntity` 是订单聚合根，`OrderItemEntity` 只能通过它访问），聚合内的一致性由聚合根方法保证。
- **值对象**：没有唯一标识、只用来描述的东西建模成值对象（如 `Address` / `Money`），用 `@Value` 或不可变类实现。
- **限界上下文**：每个业务服务对应一个限界上下文，上下文边界就是仓库边界。跨上下文通过 API（Feign）或领域事件协作，不要直接共享数据库表或仓储。

## 6. 领域事件

事件在 application 层发布（事务提交后），用 `EventManager.publish(event)`；业务事件实现 `Event` 接口，跨服务事件声明 `EventChannel.MESSAGE_EVENT`。完整 API 见 [编码与命名规范](./coding-conventions.md) 第 9 节。

## 7. ORM 要点（MyBatis-Plus）

### 7.1 Mapper 继承 IBaseMapper

```java
@Mapper
public interface DeptMapper extends IBaseMapper<DeptPO> {
    IPage<DeptVO> selectJoinPageList(IPage<DeptVO> page, @Param("ew") Wrapper<DeptVO> w);
}
```

Mapper 继承 `IBaseMapper`（不是原生 `BaseMapper`），才有批量插入、关联分页等能力。Mapper 只存在于 `repository-mybatis` 模块，不要暴露到 application / interfaces 层。

### 7.2 复杂查询用 LambdaQueryWrapper

复杂查询在 Delegate 里用 `baseMapper` + `LambdaQueryWrapper`：

```java
public List<DeptEntity> findByUserId(Long userId) {
    List<DeptPO> list = baseMapper.selectList(
        Wrappers.<DeptPO>lambdaQuery()
            .eq(DeptPO::getUserId, userId)
            .eq(DeptPO::getIsDeleted, 0)
            .orderByDesc(DeptPO::getCreateTime)
    );
    return list.stream().map(this::toEntity).toList();
}
```

优先用 `LambdaQueryWrapper`（类型安全、重构友好），少用字符串列名的 `QueryWrapper`。简单等值查询交给基类自动组装即可。

### 7.3 分页

```java
Page<DeptPO> page = new Page<>(reqPage.getPage(), reqPage.getSize());
Page<DeptPO> result = deptMapper.selectPage(page, wrapper);
ResPage<DeptVO> resPage = ResPageConvert.convert(result, DeptAssembler::toVO);
```

分页响应用 `ResPage<T>`，请求用 `ReqPage`，用 `ResPageConvert.convert(...)` 转，不要直接返回 MyBatis-Plus 的 `Page`。

### 7.4 逻辑删除与自动填充

```java
public class DeptPO {
    @TableLogic
    private Integer isDeleted;  // 0 未删除 / 1 已删除

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    @TableField(fill = FieldFill.INSERT)
    private Long createBy;
}
```

所有业务表都带 `is_deleted` 逻辑删除字段；审计字段用 `@TableField(fill = ...)` 声明，由 `MyMetaObjectHandler` 自动填充，`createBy` / `updateBy` 从 `UserContext` 取值，不手动传。

## 8. 相关页面

- 项目形态选型：[项目形态选型与创建](./project-scaffolding.md)
- 模块内编码习惯：[编码与命名规范](./coding-conventions.md)
- 数据模型：[数据模型设计规范](./data-model-design.md)
- 项目结构总览：[项目结构](./project-structure.md)
