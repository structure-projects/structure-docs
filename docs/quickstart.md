# 快速入门

本指南将帮助您快速开始使用 Structure 生态构建企业级应用。

## 一、环境准备

### 1.1 系统要求

| 工具 | 版本 | 说明 |
|------|------|------|
| JDK | 8+ | Java 开发环境 |
| Maven | 3.6+ | 依赖管理工具 |
| Node.js | 16+ | 前端开发环境（可选） |
| Docker | 20.10+ | 容器运行环境（可选） |

### 1.2 安装步骤

#### 安装 JDK

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install openjdk-11-jdk

# CentOS/RHEL
sudo yum install java-11-openjdk-devel

# 验证
java -version
```

#### 安装 Maven

```bash
# 下载 Maven
wget https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz
tar -xzf apache-maven-3.9.6-bin.tar.gz
mv apache-maven-3.9.6 /opt/maven

# 配置环境变量
echo 'export MAVEN_HOME=/opt/maven' >> ~/.bashrc
echo 'export PATH=$MAVEN_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# 验证
mvn -v
```

## 二、创建第一个项目

### 2.1 使用 Spring Initializr

1. 访问 [Spring Initializr](https://start.spring.io/)
2. 配置项目：
   - Group: `com.example`
   - Artifact: `structure-demo`
   - Dependencies: Spring Web
3. 下载并解压项目

### 2.2 添加 Structure Boot 依赖

编辑 `pom.xml`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.18</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>structure-demo</artifactId>
    <version>1.0.0</version>
    <name>structure-demo</name>
    <description>Structure Boot Demo Application</description>

    <properties>
        <java.version>11</java.version>
        <structure.version>1.2.3</structure.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>cn.structured</groupId>
                <artifactId>structure-boot-parent</artifactId>
                <version>${structure.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <!-- Structure Boot Web Starter -->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-restful-web-starter</artifactId>
        </dependency>

        <!-- Spring Boot Starter Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot Starter Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### 2.3 创建启动类

```java
package com.example.structuredemo;

import cn.structured.boot.web.annotation.EnableSimpleGlobalException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableSimpleGlobalException
public class StructureDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(StructureDemoApplication.class, args);
    }
}
```

### 2.4 创建 Controller

```java
package com.example.structuredemo.controller;

import cn.structured.boot.web.result.IResultUtil;
import cn.structured.boot.web.result.ResResultVO;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DemoController {

    @GetMapping("/hello")
    public ResResultVO<String> hello() {
        return IResultUtil.success("Hello, Structure Boot!");
    }

    @GetMapping("/user/{id}")
    public ResResultVO<Map<String, Object>> getUser(@PathVariable Long id) {
        Map<String, Object> user = new HashMap<>();
        user.put("id", id);
        user.put("name", "张三");
        user.put("email", "zhangsan@example.com");
        return IResultUtil.success(user);
    }

    @PostMapping("/user")
    public ResResultVO<Map<String, Object>> createUser(@RequestBody Map<String, Object> user) {
        user.put("id", 1001);
        return IResultUtil.success(user);
    }
}
```

### 2.5 创建配置文件

创建 `src/main/resources/application.yml`：

```yaml
server:
  port: 8080

spring:
  application:
    name: structure-demo

structure:
  web:
    swagger:
      enabled: true
      title: Structure Demo API
      description: Structure Boot 示例项目 API 文档
      version: 1.0.0
```

## 三、运行项目

### 3.1 开发模式运行

```bash
cd structure-demo
mvn spring-boot:run
```

### 3.2 打包运行

```bash
# 打包
mvn clean package

# 运行
java -jar target/structure-demo-1.0.0.jar
```

### 3.3 验证服务

```bash
# 测试接口
curl http://localhost:8080/api/hello

# 预期输出
{"code":200,"message":"success","data":"Hello, Structure Boot!","timestamp":1699900000000}

# 访问 Swagger 文档
# 打开浏览器访问: http://localhost:8080/swagger-ui.html
```

## 四、添加更多功能

### 4.1 添加 MyBatis 支持

```xml
<!-- 添加依赖 -->
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-mybatis-plus-starter</artifactId>
</dependency>

<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

配置数据库连接：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/example_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver

structure:
  mybatis:
    plugin:
      generate-id-type: snowflake
      data-center: 0
      machine: 0
```

### 4.2 添加 Redis 支持

```xml
<!-- 添加依赖 -->
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-redis-starter</artifactId>
</dependency>
```

配置 Redis：

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password:
    database: 0
```

### 4.3 添加分布式锁

```java
import cn.structured.boot.redis.lock.annotation.RedisLock;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @RedisLock("#orderId")
    public void processOrder(String orderId) {
        // 业务逻辑
        System.out.println("Processing order: " + orderId);
    }
}
```

## 五、部署到容器

### 5.1 创建 Dockerfile

```dockerfile
FROM openjdk:11-jre-slim

WORKDIR /app

COPY target/structure-demo-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 5.2 构建并运行

```bash
# 构建镜像
docker build -t structure-demo:1.0.0 .

# 运行容器
docker run -d -p 8080:8080 --name structure-demo structure-demo:1.0.0
```

## 六、下一步

- 📖 阅读 [Structure Boot 详细文档](/structure-boot)
- 📦 探索更多 [Starter 组件](/products)
- 🛠️ 了解 [运维工具](/ops-architecture)

> 恭喜！您已成功创建并运行了第一个 Structure Boot 应用！