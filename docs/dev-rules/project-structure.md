# 项目结构规范

## 1. 整体架构

项目采用标准的微服务分层架构，分为四个模块：

```
structure-{项目名}/
├── structure-{项目名}-api/           # 控制层（对外暴露REST API）
├── structure-{项目名}-biz/           # 业务层（核心业务逻辑）
├── structure-{项目名}-common/         # 公共层（DTO、VO、枚举、异常等）
└── structure-{项目名}-dependencies/    # 依赖管理（统一版本控制）
```

## 2. 模块职责说明

| 模块 | 职责 | 包含包 |
|------|------|--------|
| **structure-{项目名}-api** | 控制层，处理HTTP请求 | `controller/`, `{项目名}Application.java` |
| **structure-{项目名}-biz** | 业务逻辑层 | `service/`, `manager/`, `mapper/`, `entity/`, `assembler/`, `config/` |
| **structure-{项目名}-common** | 公共组件 | `dto/`, `vo/`, `query/`, `enums/`, `exception/`, `constant/` |
| **structure-{项目名}-dependencies** | Maven依赖管理 | `pom.xml` |

## 3. 包结构详解

```
cn.structured.{项目名}/
├── controller/     # REST API控制层，处理请求和响应
├── service/       # 业务服务层，定义业务接口和实现
├── manager/       # 数据管理层，封装数据访问逻辑
├── mapper/        # MyBatis数据访问层
├── entity/       # 数据库实体类
├── assembler/     # 对象装配器（Entity ↔ DTO/VO）
├── dto/          # 数据传输对象（请求参数）
├── vo/           # 视图对象（响应数据）
├── query/        # 查询条件对象
├── enums/        # 枚举定义（状态码、错误码等）
├── exception/    # 自定义业务异常
├── constant/     # 常量定义
└── config/       # 配置类
```

## 4. 枚举规范

### 4.1 枚举命名规范

| 类型 | 命名模式 | 示例 |
|------|----------|------|
| 状态枚举 | `{业务}StateEnum` | `ExampleStateEnum` |
| 类型枚举 | `{业务}TypeEnum` | `ExampleTypeEnum` |
| 错误码枚举 | `{业务}ExceptionEnum` | `ExampleExceptionEnum` |

### 4.2 枚举类示例

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

业务异常规范必须使用 `cn.structure.common.exception.CommonException`

```java
// 推荐抛出CommonException异常，传入枚举类
throw new CommonException(ExampleExceptionEnum.NOT_FOUND.getCode(),
        ExampleExceptionEnum.NOT_FOUND.getMessage());

// 禁止直接使用字面量输出异常信息
throw new CommonException("100001", "示例不存在"); // 禁止
```

## 6. 响应规范

### 6.1 统一响应

使用 `cn.structure.common.utils.ResultUtilSimpleImpl` 封装响应：

```java
// 成功响应
ResultUtilSimpleImpl.success(data);

// 失败响应
ResultUtilSimpleImpl.fail(code, message);
```

### 6.2 响应结构

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

## 7. 命名规范汇总

### 7.1 文件命名

| 类型 | 命名模式 | 示例 |
|------|----------|------|
| 枚举类 | `{业务}Enum` | `exampleEnum` |
| 异常类 | `{业务}Exception` | `exampleException` |
| 装配器 | `{业务}Assembler` | `exampleAssembler` |
| 常量类 | `{业务}Constant` | `exampleConstant` |
| 实体类 | `{业务}` | `example` |
| DTO类 | `{业务}DTO` | `exampleDTO` |
| VO类 | `{业务}VO` | `exampleVO` |
| Query类 | `{业务}Query` | `exampleQuery` |
| Service接口 | `I{业务}Service` | `IexampleService` |
| Service实现 | `{业务}ServiceImpl` | `exampleServiceImpl` |
| Manager接口 | `I{业务}Manager` | `IexampleManager` |
| Manager实现 | `{业务}ManagerImpl` | `exampleManagerImpl` |
| Controller | `{业务}Controller` | `exampleController` |
| Mapper | `{业务}Mapper` | `exampleMapper` |

### 7.2 包名规范

| 包名 | 说明 |
|------|------|
| `controller` | REST API控制器 |
| `service` | 业务服务接口 |
| `service.impl` | 业务服务实现 |
| `manager` | 数据管理层接口 |
| `manager.impl` | 数据管理层实现 |
| `mapper` | MyBatis Mapper接口 |
| `entity` | 数据库实体类 |
| `dto` | 数据传输对象（请求） |
| `vo` | 视图对象（响应） |
| `query` | 查询条件对象 |
| `enums` | 枚举定义 |
| `exception` | 自定义异常 |
| `constant` | 常量定义 |
| `config` | 配置类 |
| `assembler` | 对象装配器 |

