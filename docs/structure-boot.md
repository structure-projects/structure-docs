# Structure Boot 详细文档

Structure Boot 是基于 Spring Boot 的快速开发框架，提供一系列开箱即用的 Starter 组件。

## 一、核心概念

### 1.1 设计理念

Structure Boot 遵循以下设计原则：

- **开箱即用**: 提供预设配置，无需繁琐配置即可使用
- **约定优于配置**: 遵循 Spring Boot 约定，减少配置工作量
- **模块化设计**: 按需引入组件，避免不必要的依赖
- **扩展性强**: 支持自定义配置和扩展

### 1.2 组件架构

```
┌──────────────────────────────────────────────────────────┐
│                    Structure Boot                        │
├──────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐ │
│  │   Web Starter │  │  Redis Starter│  │ MinIO Starter │ │
│  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘ │
│          │                  │                  │         │
│  ┌───────▼───────┐  ┌───────▼───────┐  ┌───────▼───────┐ │
│  │  MyBatis      │  │  Redisson     │  │    Log        │ │
│  │   Starter     │  │   Starter     │  │   Starter     │ │
│  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘ │
│          │                  │                  │         │
│          └──────────────────┼──────────────────┘         │
│                             ▼                            │
│                  ┌───────────────────┐                   │
│                  │  structure-common │                   │
│                  └───────────────────┘                   │
└──────────────────────────────────────────────────────────┘
```

## 二、快速开始

### 2.1 环境要求

| 依赖 | 版本 |
|------|------|
| JDK | 8+ |
| Spring Boot | 2.7.x |
| Maven | 3.6+ |

### 2.2 添加依赖

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-boot-parent</artifactId>
            <version>1.2.3</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-restful-web-starter</artifactId>
    </dependency>
</dependencies>
```

### 2.3 启用组件

```java
@SpringBootApplication
@EnableSimpleGlobalException
@EnableSwagger
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## 三、Web 开发

### 3.1 统一异常处理

#### 启用方式

```java
// 简易版异常处理
@EnableSimpleGlobalException

// 多级码异常处理
@EnableFatherGlobalException
```

#### 异常响应格式

```json
{
    "code": 500,
    "message": "服务器内部错误",
    "data": null,
    "timestamp": 1699900000000
}
```

#### 自定义异常

```java
public class BusinessException extends RuntimeException {
    private final int code;
    
    public BusinessException(int code, String message) {
        super(message);
        this.code = code;
    }
    
    public int getCode() {
        return code;
    }
}

// 使用
throw new BusinessException(400, "参数错误");
```

### 3.2 统一返回结果

#### 成功响应

```java
@RestController
@RequestMapping("/api")
public class UserController {
    
    @GetMapping("/users/{id}")
    public ResResultVO<User> getUser(@PathVariable Long id) {
        User user = userService.getById(id);
        return IResultUtil.success(user);
    }
}
```

#### 响应格式

```json
{
    "code": 200,
    "message": "success",
    "data": {
        "id": 1,
        "name": "张三"
    },
    "timestamp": 1699900000000
}
```

### 3.3 参数校验

#### 使用注解

```java
@Data
public class UserDTO {
    
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 20, message = "用户名长度在3-20之间")
    private String username;
    
    @Email(message = "邮箱格式不正确")
    private String email;
    
    @Min(value = 18, message = "年龄不能小于18")
    private Integer age;
}
```

#### Controller 中使用

```java
@PostMapping("/users")
public ResResultVO<User> createUser(@Valid @RequestBody UserDTO userDTO) {
    return IResultUtil.success(userService.create(userDTO));
}
```

#### 校验失败响应

```json
{
    "code": 400,
    "message": "参数校验失败",
    "data": {
        "username": "用户名不能为空",
        "email": "邮箱格式不正确"
    },
    "timestamp": 1699900000000
}
```

### 3.4 Swagger 文档

#### 配置

```yaml
structure:
  web:
    swagger:
      enabled: true
      title: API 文档
      description: Structure Boot API Documentation
      version: 1.0.0
      base-package: com.example.controller
```

#### 访问地址

```
http://localhost:8080/swagger-ui.html
http://localhost:8080/api-docs
```

## 四、数据访问

### 4.1 MyBatis 增强

#### 自动 ID 生成

```java
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @CreateTime
    private Date createTime;
    
    @UpdateTime
    private Date updateTime;
}
```

#### 配置

```yaml
structure:
  mybatis:
    plugin:
      generate-id-type: snowflake  # none, uuid, snowflake
      data-center: 0
      machine: 0
```

### 4.2 MyBatis-Plus 增强

#### 批量插入

```java
@Mapper
public interface UserMapper extends IBaseMapper<User> {
}

@Service
public class UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    public void batchInsert(List<User> users) {
        userMapper.insertList(users);
    }
}
```

#### 联表查询

```java
@Data
public class User {
    
    private Long id;
    private String name;
    private Long deptId;
    
    @TableField(exist = false)
    @FieldJoin(value = {
        @Join(group = {UserGroup.class},
              joinTarget = Department.class,
              aliasName = "dept",
              columns = "name",
              value = {
                  @JoinCondition(currentColumn = "dept_id", targetColumn = "id")
              })
    })
    private String departmentName;
}
```

## 五、缓存支持

### 5.1 Redis 分布式锁

#### 注解方式

```java
@Service
public class OrderService {
    
    @RedisLock(value = "#orderId", expire = 30, timeUnit = TimeUnit.SECONDS)
    public void processOrder(String orderId) {
        // 业务逻辑
    }
    
    @RedisLock(value = "#user.id:_#orderId")
    public void processUserOrder(User user, String orderId) {
        // 业务逻辑
    }
}
```

#### 手动方式

```java
@Service
public class OrderService {
    
    @Autowired
    private IDistributedLock distributedLock;
    
    public void processOrder(String orderId) {
        String lockKey = "order:" + orderId;
        
        if (distributedLock.lock(lockKey)) {
            try {
                // 业务逻辑
            } finally {
                distributedLock.releaseLock(lockKey);
            }
        }
    }
}
```

### 5.2 Redisson 高级缓存

#### 写缓存

```java
@RestController
public class CacheController {
    
    @PostMapping("/cache")
    @WCache(key = "#user.id",
            isObjCache = true,
            list = @CList(listKeyName = "user-list",
                         isList = true,
                         size = 100,
                         time = @CTime(isTime = true, time = 10)),
            map = @CMap(mapKey = "user-map",
                        isMap = true,
                        time = @CTime(isTime = true, time = 100)))
    public User cacheUser(@RequestBody User user) {
        return user;
    }
}
```

#### 读缓存

```java
@RestController
public class CacheController {
    
    @GetMapping("/users/{id}")
    @RCache(key = "#id")
    public User getUser(@PathVariable String id) {
        return userService.getById(id);
    }
}
```

## 六、文件存储

### 6.1 MinIO 配置

```yaml
structure:
  minio:
    url: http://localhost:9000
    access-key: your-access-key
    secret-key: your-secret-key
    endpoint-enable: true
```

### 6.2 使用方式

```java
@Service
public class FileService {
    
    @Autowired
    private MinioTemplate minioTemplate;
    
    public void uploadFile(String bucketName, String fileName, InputStream inputStream, long size) {
        minioTemplate.putObject(bucketName, fileName, inputStream, size, "application/octet-stream");
    }
    
    public String getFileUrl(String bucketName, String fileName, int expires) {
        return minioTemplate.getObjectURL(bucketName, fileName, expires);
    }
    
    public void deleteFile(String bucketName, String fileName) {
        minioTemplate.removeObject(bucketName, fileName);
    }
}
```

## 七、日志系统

### 7.1 配置

```yaml
structure:
  log:
    enabled: true
    level: INFO
    pattern: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"
```

### 7.2 AOP 日志记录

```java
@Service
public class UserService {
    
    @LogAnnotation(description = "查询用户")
    public User getUser(Long id) {
        return userMapper.selectById(id);
    }
}
```

## 八、代码生成器

### 8.1 添加依赖

```xml
<plugin>
    <groupId>cn.structured</groupId>
    <artifactId>structure-mybatis-plus-generate</artifactId>
    <configuration>
        <configurationFile>${basedir}/src/main/resources/generator-config.yaml</configurationFile>
    </configuration>
</plugin>
```

### 8.2 配置文件

```yaml
globalConfig:
  author: your-name
  open: false
  idType: NONE
  dateType: ONLY_DATE
  enableCache: false
  activeRecord: false
  baseResultMap: true
  baseColumnList: true
  swagger2: false
  fileOverride: true

dataSourceConfig:
  url: jdbc:mysql://localhost:3306/demo
  driverName: com.mysql.cj.jdbc.Driver
  username: root
  password: password

packageConfig:
  parent: com.example.demo
  entity: entity
  service: service
  serviceImpl: service.impl
  mapper: mapper
  xml: mapper
  controller: controller

strategyConfig:
  naming: underline_to_camel
  columnNaming: underline_to_camel
  entityLombokModel: true
  superMapperClass: com.baomidou.mybatisplus.core.mapper.BaseMapper
  superServiceClass: com.baomidou.mybatisplus.extension.service.IService
  superServiceImplClass: com.baomidou.mybatisplus.extension.service.impl.ServiceImpl
  controllerMappingHyphenStyle: true
  restControllerStyle: true
```

### 8.3 运行生成

```bash
mvn structure-mybatis-plus-generate:generate
```

## 九、配置参考

### 9.1 完整配置示例

```yaml
server:
  port: 8080

spring:
  application:
    name: structure-demo
  
  datasource:
    url: jdbc:mysql://localhost:3306/example_db
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  redis:
    host: localhost
    port: 6379
    database: 0

structure:
  web:
    swagger:
      enabled: true
      title: Structure Demo API
      version: 1.0.0
  
  mybatis:
    plugin:
      generate-id-type: snowflake
      data-center: 0
      machine: 0
  
  redis:
    lock:
      default-expire: 30
      retry-count: 3
      retry-delay: 100
  
  minio:
    url: http://localhost:9000
    access-key: admin
    secret-key: password
  
  log:
    enabled: true
    level: INFO
```

## 十、最佳实践

### 10.1 项目结构

```
backend/
├── src/main/java/com/example/demo/
│   ├── controller/      # REST API 控制层
│   ├── service/         # 业务逻辑层
│   ├── mapper/          # 数据访问层
│   ├── entity/          # 数据库实体
│   ├── dto/             # 数据传输对象
│   ├── config/          # 配置类
│   ├── exception/       # 自定义异常
│   └── Application.java # 启动类
├── src/main/resources/
│   ├── application.yml  # 应用配置
│   └── mapper/          # MyBatis XML
└── pom.xml
```

### 10.2 开发规范

1. **分层架构**: Controller → Service → Mapper → Entity
2. **DTO 模式**: 使用 DTO 进行数据传输，避免直接暴露实体
3. **异常处理**: 使用统一异常处理，避免重复 try-catch
4. **日志规范**: 使用 `@LogAnnotation` 记录关键操作日志
5. **代码复用**: 抽取公共逻辑到 `structure-common`

> Structure Boot 让 Spring Boot 开发更简单、更高效！