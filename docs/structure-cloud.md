# Structure Cloud

Structure Cloud 是云原生微服务解决方案，提供完整的微服务架构支持和一站式云原生开发体验，基于开源技术栈构建。

## 一、产品概述

Structure Cloud 基于 Spring Cloud 构建，采用全开源技术栈：
- **服务注册发现**: Nacos（阿里巴巴开源）
- **配置中心**: Nacos（阿里巴巴开源）
- **分布式追踪**: SkyWalking（华为开源，Apache 顶级项目）
- **消息队列**: Kafka / RabbitMQ（开源）
- **服务网格**: Istio（开源）

提供从服务注册发现、配置管理、API 网关到分布式追踪的完整微服务治理能力。

## 二、核心架构

```
┌─────────────────────────────────────────────────────────────────┐
│                    API Gateway                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │  路由    │  │  限流    │  │  认证    │                      │
│  └──────────┘  └──────────┘  └──────────┘                      │
└───────────────────┬─────────────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────────────┐
│                    Service Mesh                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Service A  │  Service B  │  Service C  │  Service D   │    │
│  │ (Pod × 3)   │ (Pod × 5)   │ (Pod × 2)   │ (Pod × 4)    │    │
│  └─────────────────────────────────────────────────────────┘    │
└───────────────────┬─────────────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────────────┐
│                     开源基础设施层                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Nacos   │  │  Nacos   │  │SkyWalking│  │  Kafka   │       │
│  │(注册发现) │  │ (配置中心)│  │(链路追踪)│  │ (消息队列)│       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

## 三、核心功能

### 3.1 服务注册与发现

基于 Nacos 实现服务注册与发现：

```yaml
# application.yml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: ${NACOS_SERVER_ADDR:localhost:8848}
        namespace: ${NACOS_NAMESPACE:public}
        group: ${NACOS_GROUP:DEFAULT_GROUP}
        service: ${spring.application.name}
        ephemeral: true
```

**Nacos 配置说明：**

| 配置项 | 说明 |
|--------|------|
| `server-addr` | Nacos 服务器地址 |
| `namespace` | 命名空间，用于多环境隔离 |
| `group` | 分组名称 |
| `ephemeral` | 是否临时实例 |

### 3.2 配置中心

使用 Nacos 作为配置中心：

```yaml
# bootstrap.yml
spring:
  application:
    name: structure-demo
  cloud:
    nacos:
      config:
        server-addr: ${NACOS_SERVER_ADDR}
        namespace: ${NACOS_NAMESPACE}
        group: ${NACOS_GROUP}
        file-extension: yaml
        shared-configs:
          - application-${spring.profiles.active}.yaml
```

**配置热更新：**

```java
@RefreshScope
@RestController
public class ConfigController {
    
    @Value("${app.version:1.0.0}")
    private String version;
    
    @GetMapping("/config/version")
    public String getVersion() {
        return version;
    }
}
```

### 3.3 API 网关

基于 Spring Cloud Gateway 的 API 网关：

```java
@Configuration
public class GatewayConfig {
    
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("user-service", r -> r.path("/api/users/**")
                .filters(f -> f.stripPrefix(2))
                .uri("lb://user-service"))
            .route("order-service", r -> r.path("/api/orders/**")
                .filters(f -> f.stripPrefix(2))
                .uri("lb://order-service"))
            .build();
    }
}
```

### 3.4 分布式追踪 - SkyWalking

集成 **SkyWalking**（华为开源，Apache 顶级项目）实现全链路追踪：

#### 3.4.1 添加依赖

```xml
<dependency>
    <groupId>org.apache.skywalking</groupId>
    <artifactId>apm-toolkit-trace</artifactId>
    <version>9.6.0</version>
</dependency>
<dependency>
    <groupId>org.apache.skywalking</groupId>
    <artifactId>apm-toolkit-logback-1.x</artifactId>
    <version>9.6.0</version>
</dependency>
```

#### 3.4.2 配置 SkyWalking Agent

创建 `skywalking-agent/config/agent.config`：

```properties
# SkyWalking Agent 配置
agent.namespace=${SKYWALKING_NAMESPACE:default}
agent.service_name=${spring.application.name}
collector.backend_service=${SKYWALKING_COLLECTOR:localhost:11800}
agent.authentication=${SKYWALKING_AUTHENTICATION:}
agent.span_limit_per_segment=300
```

#### 3.4.3 启动参数

```bash
java -javaagent:/path/to/skywalking-agent.jar \
     -Dskywalking.agent.service_name=user-service \
     -Dskywalking.collector.backend_service=localhost:11800 \
     -jar app.jar
```

#### 3.4.4 自定义追踪埋点

```java
import org.apache.skywalking.apm.toolkit.trace.ActiveSpan;
import org.apache.skywalking.apm.toolkit.trace.SpanTag;
import org.apache.skywalking.apm.toolkit.trace.Trace;

@Service
public class OrderService {
    
    @Trace(operationName = "order.process")
    public Order processOrder(@SpanTag(key = "orderId") String orderId) {
        ActiveSpan.tag("orderStatus", "PROCESSING");
        
        try {
            // 业务逻辑
            return orderRepository.save(order);
        } catch (Exception e) {
            ActiveSpan.error(e);
            throw e;
        }
    }
}
```

#### 3.4.5 SkyWalking 核心特性

| 特性 | 说明 |
|------|------|
| **全链路追踪** | 从入口到出口的完整调用链 |
| **服务依赖图** | 自动生成服务间依赖关系 |
| **性能分析** | 识别慢调用和性能瓶颈 |
| **数据库探针** | 自动追踪数据库调用 |
| **MQ 探针** | 追踪消息队列调用链 |
| **浏览器监控** | 前端性能监控 |

### 3.5 服务熔断与降级 - Sentinel

使用 **Spring Cloud Alibaba Sentinel** 实现熔断降级：

#### 3.5.1 添加依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    <version>2022.0.0.0-RC2</version>
</dependency>
```

#### 3.5.2 配置 Sentinel

```yaml
# application.yml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: ${SENTINEL_DASHBOARD:localhost:8080}
        port: 8719
      datasource:
        ds1:
          nacos:
            server-addr: ${NACOS_SERVER_ADDR}
            data-id: ${spring.application.name}-sentinel
            group-id: DEFAULT_GROUP
            rule-type: flow
```

#### 3.5.3 注解方式使用

```java
import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;

@Service
public class InventoryService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @SentinelResource(value = "getInventory", 
                      blockHandler = "blockHandler", 
                      fallback = "fallback")
    public Inventory getInventory(Long productId) {
        return restTemplate.getForObject(
            "http://inventory-service/api/inventory/{id}",
            Inventory.class,
            productId
        );
    }
    
    public Inventory blockHandler(Long productId, BlockException ex) {
        log.warn("Sentinel blocked: {}", ex.getRule());
        return Inventory.builder()
            .productId(productId)
            .quantity(0)
            .build();
    }
    
    public Inventory fallback(Long productId, Throwable t) {
        log.warn("Sentinel fallback: {}", t.getMessage());
        return Inventory.builder()
            .productId(productId)
            .quantity(0)
            .build();
    }
}
```

#### 3.5.4 配置规则

在 Nacos 配置中心添加限流规则：

```json
[
  {
    "resource": "getInventory",
    "count": 100,
    "grade": 1,
    "limitApp": "default",
    "strategy": 0,
    "controlBehavior": 0
  }
]
```

#### 3.5.5 Sentinel 核心特性

| 特性 | 说明 |
|------|------|
| **流量控制** | 基于 QPS、线程数等维度的流量控制 |
| **熔断降级** | 基于错误比例、慢调用比例的熔断 |
| **系统保护** | 保护系统整体稳定性 |
| **热点参数** | 针对热点参数的精确控制 |
| **授权规则** | 黑白名单控制 |

### 3.6 日志收集

#### 3.6.1 日志框架选择

使用 **Logback** + **Logstash** + **Elasticsearch** + **Kibana** 实现日志收集：

#### 3.6.2 添加依赖

```xml
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.4</version>
</dependency>
```

#### 3.6.3 Logback 配置

创建 `logback-spring.xml`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <springProperty scope="context" name="appName" source="spring.application.name"/>
    
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <appender name="LOGSTASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <destination>${LOGSTASH_HOST:localhost}:${LOGSTASH_PORT:5044}</destination>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <customFields>{"app": "${appName}", "environment": "${spring.profiles.active}"}</customFields>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="LOGSTASH"/>
    </root>
</configuration>
```

#### 3.6.4 SkyWalking 日志集成

将日志与链路追踪关联：

```xml
<appender name="SKYWALKING-LOG" class="org.apache.skywalking.apm.toolkit.log.logback.v1.x.log.SkywalkingPatternLogbackAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder">
        <customFields>{"service": "${appName}"}</customFields>
    </encoder>
</appender>
```

#### 3.6.5 ELK 部署

```yaml
version: '3.8'
services:
  elasticsearch:
    image: elasticsearch:8.11.0
    ports:
      - "9200:9200"
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms1g -Xmx1g
  
  logstash:
    image: logstash:8.11.0
    ports:
      - "5044:5044"
    volumes:
      - ./logstash/config:/usr/share/logstash/config
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    depends_on:
      - elasticsearch
  
  kibana:
    image: kibana:8.11.0
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch
```

#### 3.6.6 Logstash 配置

创建 `logstash/pipeline/logstash.conf`：

```ruby
input {
  tcp {
    port => 5044
    codec => json
  }
}

filter {
  mutate {
    remove_field => ["@version", "host"]
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "logs-%{+YYYY.MM.dd}"
  }
  stdout {
    codec => rubydebug
  }
}
```

#### 3.6.7 日志收集最佳实践

| 实践 | 说明 |
|------|------|
| **结构化日志** | 使用 JSON 格式输出日志 |
| **日志级别** | 生产环境使用 INFO 及以上 |
| **敏感信息** | 避免记录密码、token 等敏感信息 |
| **日志采样** | 高频接口采用采样记录 |
| **链路关联** | 通过 Trace ID 关联日志 |

## 四、部署方案

### 4.1 Docker Compose 部署

```yaml
version: '3.8'
services:
  nacos:
    image: nacos/nacos-server:v2.3.0
    ports:
      - "8848:8848"
      - "9848:9848"
    environment:
      - MODE=standalone
      - NACOS_AUTH_ENABLE=false
  
  skywalking-oap:
    image: apache/skywalking-oap-server:9.6.0
    ports:
      - "11800:11800"
      - "12800:12800"
    environment:
      - SW_STORAGE=elasticsearch
      - SW_STORAGE_ES_CLUSTER_NODES=elasticsearch:9200
  
  skywalking-ui:
    image: apache/skywalking-ui:9.6.0
    ports:
      - "8080:8080"
    environment:
      - SW_OAP_ADDRESS=http://skywalking-oap:12800
  
  elasticsearch:
    image: elasticsearch:8.11.0
    ports:
      - "9200:9200"
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
  
  gateway:
    image: structure-gateway:latest
    ports:
      - "8081:8080"
    depends_on:
      - nacos
      - skywalking-oap
    environment:
      - NACOS_SERVER_ADDR=nacos:8848
      - SKYWALKING_COLLECTOR=skywalking-oap:11800
```

### 4.2 Kubernetes 部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  labels:
    app: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
      annotations:
        sidecar.opentelemetry.io/inject: "true"
    spec:
      initContainers:
        - name: skywalking-agent
          image: apache/skywalking-java-agent:9.6.0
          command: ["cp", "-r", "/skywalking/agent", "/agent"]
          volumeMounts:
            - name: agent
              mountPath: /agent
      containers:
      - name: user-service
        image: structure-user-service:latest
        ports:
        - containerPort: 8080
        env:
        - name: NACOS_SERVER_ADDR
          value: nacos.default.svc.cluster.local:8848
        - name: SKYWALKING_COLLECTOR
          value: skywalking-oap.default.svc.cluster.local:11800
        volumeMounts:
          - name: agent
            mountPath: /opt/skywalking-agent
      volumes:
        - name: agent
          emptyDir: {}
```

## 五、服务治理

### 5.1 负载均衡

使用 Spring Cloud LoadBalancer：

```java
@Configuration
public class LoadBalancerConfig {
    
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

### 5.2 分布式锁

基于 Redis 的分布式锁实现：

```java
@Service
public class DistributedLockService {
    
    @Autowired
    private StringRedisTemplate redisTemplate;
    
    private static final String LOCK_PREFIX = "lock:";
    
    public boolean tryLock(String key, long expireMs) {
        String lockKey = LOCK_PREFIX + key;
        Boolean success = redisTemplate.opsForValue()
            .setIfAbsent(lockKey, "locked", expireMs, TimeUnit.MILLISECONDS);
        return Boolean.TRUE.equals(success);
    }
    
    public void unlock(String key) {
        redisTemplate.delete(LOCK_PREFIX + key);
    }
}
```

### 5.3 服务网格

集成 Istio 服务网格：

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: structure-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
    hosts:
    - "*"

---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: user-service
spec:
  hosts:
  - "*"
  gateways:
  - structure-gateway
  http:
  - match:
    - uri:
        prefix: /api/users
    route:
    - destination:
        host: user-service
        port:
          number: 8080
```

## 六、监控告警

### 6.1 SkyWalking 监控

SkyWalking 提供完整的监控能力：

```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: '*'
  metrics:
    export:
      prometheus:
        enabled: true
```

### 6.2 Prometheus + Grafana

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'structure-services'
    scrape_interval: 15s
    static_configs:
      - targets: ['user-service:8080', 'order-service:8080']
```

### 6.3 告警配置

```yaml
groups:
- name: structure-alerts
  rules:
  - alert: ServiceDown
    expr: up == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "服务 {{ $labels.service }} 已宕机"
      description: "服务 {{ $labels.service }} 在 {{ $labels.instance }} 上已停止运行"
```

## 七、开源技术栈

| 组件 | 类型 | 开源组织 |
|------|------|----------|
| Nacos | 服务注册/配置中心 | 阿里巴巴 |
| SkyWalking | 分布式追踪 | 华为（Apache） |
| Kafka | 消息队列 | Apache |
| Istio | 服务网格 | Google/IBM |
| Prometheus | 监控 | CNCF |
| Grafana | 可视化 | Grafana Labs |
| Resilience4j | 熔断降级 | Resilience4j |

## 八、最佳实践

### 8.1 多环境部署策略

| 环境 | Nacos Namespace | 配置 |
|------|-----------------|------|
| dev | dev | 开发配置 |
| test | test | 测试配置 |
| prod | prod | 生产配置 |

### 8.2 服务划分原则

| 原则 | 说明 |
|------|------|
| 单一职责 | 每个服务只负责一个业务领域 |
| 边界清晰 | 基于领域驱动设计划分边界 |
| 独立部署 | 服务之间低耦合，可独立升级 |
| 高内聚 | 服务内部紧密协作 |

### 8.3 通信模式

- **同步调用**: 使用 Feign 或 RestTemplate
- **异步通信**: 使用 Kafka 或 RabbitMQ
- **事件驱动**: 基于事件的架构模式

> Structure Cloud - 基于全开源技术栈的企业级微服务解决方案！