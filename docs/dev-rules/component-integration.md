# 组件集成指南

## 1. 日志组件

### 1.1 依赖配置

```xml
<!-- dependencies模块 -->
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-log-starter</artifactId>
    <version>${structure.version}</version>
</dependency>

<!-- api模块 -->
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-log-starter</artifactId>
</dependency>
```

### 1.2 配置文件

```yaml
structure:
  log:
    aop:
      enable: true
      expression: execution(public * cn.structured.example.controller..*Controller.*(..))
```

## 2. Redis组件

### 2.1 依赖配置

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-redis-starter</artifactId>
    <version>${structure.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 2.2 配置文件

```yaml
spring:
  data:
    redis:
      host: 172.24.20.15
      port: 6379
      password: 123456
      database: 0
      timeout: 10000ms
```

### 2.3 使用示例

```java
@Service
@AllArgsConstructor
public class CacheService {
    private final RedisTemplate<String, Object> redisTemplate;

    public void set(String key, Object value, long timeout) {
        redisTemplate.opsForValue().set(key, value, timeout, TimeUnit.SECONDS);
    }

    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }
}
```

## 3. Redisson组件

### 3.1 依赖配置

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-redisson-starter</artifactId>
    <version>${structure.version}</version>
</dependency>
```

### 3.2 配置文件

```yaml
# 单体模式
structure:
  redisson:
    model: single
    password: 123456
    single:
      address: redis://172.24.20.15:6379
    cache:
      key-group-name: example

# 集群模式
structure:
  redisson:
    model: cluster
    cluster:
      node-addresses: redis://192.168.2.138:26371,redis://192.168.2.138:26372,redis://192.168.2.138:26373
```

### 3.3 分布式锁示例

```java
@Service
@AllArgsConstructor
public class DistributedLockService {
    private final RedissonClient redissonClient;

    public void executeWithLock(String lockKey, Runnable task) {
        RLock lock = redissonClient.getLock(lockKey);
        try {
            boolean acquired = lock.tryLock(10, 30, TimeUnit.SECONDS);
            if (acquired) {
                task.run();
            } else {
                throw new CommonException("获取分布式锁失败");
            }
        } catch (InterruptedException e) {
            throw new CommonException("获取分布式锁异常", e);
        } finally {
            if (lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }
}
```

## 4. RabbitMQ组件

### 4.1 依赖配置

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

### 4.2 配置文件

```yaml
spring:
  rabbitmq:
    host: 172.24.20.15
    port: 5672
    username: guest
    password: guest
    listener:
      simple:
        concurrency: 1
        max-concurrency: 5
        prefetch-count: 50
        acknowledge-mode: manual
```

### 4.3 生产者示例

```java
@Service
@AllArgsConstructor
@Slf4j
public class MessageProducer {
    private final RabbitTemplate rabbitTemplate;

    public void sendMessage(String exchange, String routingKey, Object message) {
        log.info("发送消息: exchange={}, routingKey={}", exchange, routingKey);
        rabbitTemplate.convertAndSend(exchange, routingKey, message);
    }
}
```

### 4.4 消费者示例

```java
@Component
@Slf4j
public class MessageConsumer {

    @RabbitListener(queues = "message.queue")
    public void handleMessage(MessageContext messageContext, Channel channel,
                             @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag) {
        try {
            log.info("收到消息: {}", messageContext);
            processMessage(messageContext);
            channel.basicAck(deliveryTag, false);
        } catch (Exception e) {
            log.error("处理消息失败: {}", e.getMessage());
            channel.basicNack(deliveryTag, false, true);
        }
    }
}
```

## 5. MinIO组件

### 5.1 依赖配置

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-minio-starter</artifactId>
    <version>${structure.version}</version>
</dependency>
```

### 5.2 配置文件

```yaml
structure:
  minio:
    url: http://10.16.105.146:9010
    access-key: root
    secret-key: Abc123!@#
    endpoint-enable: true
```

### 5.3 使用示例

```java
@Service
@AllArgsConstructor
public class FileService {
    private final MinioClient minioClient;

    public String uploadFile(String bucketName, String objectName, MultipartFile file) {
        minioClient.putObject(
            PutObjectArgs.builder()
                .bucket(bucketName)
                .object(objectName)
                .stream(file.getInputStream(), file.getSize(), -1)
                .contentType(file.getContentType())
                .build()
        );
        return objectName;
    }
}
```

## 6. 多租户组件

### 6.1 依赖配置

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-tenant-starter</artifactId>
    <version>${structure.version}</version>
</dependency>
```

### 6.2 配置文件

```yaml
structure:
  tenant:
    enabled: true
    default-tenant-id: "1"
    header:
      enabled: true
      name: "X-Tenant-Id"
    param:
      enabled: true
      name: "tenantId"
    resolver-order:
      - "header"
      - "param"
```

### 6.3 使用说明

```java
@Service
public class TenantService {
    public String getCurrentTenantId() {
        return TenantContextHolder.getTenantId();
    }

    public void executeInTenant(String tenantId, Runnable task) {
        TenantContextHolder.setTenantId(tenantId);
        try {
            task.run();
        } finally {
            TenantContextHolder.clear();
        }
    }
}
```

## 7. 数据权限组件

### 7.1 依赖配置

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-datascope-starter</artifactId>
    <version>${structure-datascope.version}</version>
</dependency>
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-datascope-mybatis-plus</artifactId>
    <version>${structure-datascope.version}</version>
</dependency>
```

### 7.2 配置文件

```yaml
structure:
  data-scope:
    enabled: true
    header-name: X-DataScope-Id
    role-header-name: X-DataScope-Roles
    permission-header-name: X-DataScope-Permissions
```

### 7.3 使用示例

```java
@Service
@AllArgsConstructor
public class OrderService {
    private final DataRuleEngine dataRuleEngine;

    public OrderDTO toDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        BeanUtils.copyProperties(order, dto);
        dataRuleEngine.filter(dto, "order"); // 应用列级权限
        return dto;
    }
}
```

