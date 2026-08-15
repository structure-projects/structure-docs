# 依赖组件配置规范

本文说明 DDD 7+1 多模块项目的依赖管理方式。项目形态说明见 [项目创建与多模块](./project-scaffolding.md)。

## 1. 依赖管理模块结构

### 1.1 模块命名

```
structure-{项目名}-dependencies/   # 父 POM，统一版本管理（仓库根不放 pom.xml）
```

### 1.2 版本属性配置

```xml
<properties>
    <revision>1.0.0-SNAPSHOT</revision>
    <spring-boot.version>4.0.6</spring-boot.version>
    <spring-cloud.version>2025.1.0</spring-cloud.version>
    <spring-alibaba.version>2025.1.0.0</spring-alibaba.version>
    <mybatis-plus.version>3.5.16</mybatis-plus.version>
    <springdoc.version>3.0.3</springdoc.version>
    <structure.version>1.4.4</structure.version>
    <structure-infra.version>1.3.1</structure-infra.version>
    <structure-security.version>1.1.5</structure-security.version>
    <structure-tenant.version>1.4.3</structure-tenant.version>
    <structure-datascope.version>1.0.3</structure-datascope.version>
    <testcontainers.version>1.20.6</testcontainers.version>

    <!-- CVE 修复版本（仅框架 < 1.4.4 需显式声明；1.4.4 起框架已内置处理） -->
    <bouncycastle.version>1.84</bouncycastle.version>
    <commons-fileupload.version>1.6.0</commons-fileupload.version>
</properties>
```

### 1.3 父项目配置

```xml
<parent>
    <groupId>cn.structured</groupId>
    <artifactId>structure-dependencies</artifactId>
    <version>1.4.4</version>
</parent>
```

### 1.4 子模块配置

```xml
<modules>
    <module>../structure-example-common</module>
    <module>../structure-example-domain</module>
    <module>../structure-example-infra</module>
    <module>../structure-example-repository-mybatis</module>
    <module>../structure-example-application</module>
    <module>../structure-example-interfaces</module>
    <module>../structure-example-boot</module>
</modules>
```

## 2. 统一依赖管理

### 2.1 内部模块依赖

```xml
<dependencyManagement>
<dependencies>
    <!-- 一方库内部模块依赖 -->
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-example-domain</artifactId>
        <version>${revision}</version>
    </dependency>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-example-common</artifactId>
        <version>${revision}</version>
    </dependency>
</dependencies>
</dependencyManagement>
```

### 2.2 二方库组件

```xml
<!-- 公共模块组件 -->
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-common</artifactId>
    <version>${structure.version}</version>
</dependency>

<!-- 基础设施组件 -->
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-infra-starter</artifactId>
    <version>${structure-infra.version}</version>
</dependency>

<!-- Web组件 -->
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-restful-web-starter</artifactId>
    <version>${structure.version}</version>
</dependency>
```

## 3. 常用组件依赖版本

| 组件 | 版本属性 | 版本值 |
|------|----------|--------|
| Spring Boot | `spring-boot.version` | `4.0.6` |
| Spring Cloud | `spring-cloud.version` | `2025.1.0` |
| Spring Cloud Alibaba | `spring-alibaba.version` | `2025.1.0.0` |
| MyBatis-Plus | `mybatis-plus.version` | `3.5.16` |
| SpringDoc OpenAPI | `springdoc.version` | `3.0.3` |
| structure 框架 | `structure.version` | `1.4.4` |
| structure-infra | `structure-infra.version` | `1.3.1` |
| structure-security | `structure-security.version` | `1.1.5` |
| structure-tenant | `structure-tenant.version` | `1.4.3` |
| structure-datascope | `structure-datascope.version` | `1.0.3` |
| Testcontainers | `testcontainers.version` | `1.20.6` |

> 业务 pom **不写死**版本号，版本统一在 `structure-{X}-dependencies` 与 `structure-boot` 中管理。

## 4. 漏洞版本修复

```xml
<properties>
    <bouncycastle.version>1.84</bouncycastle.version>
    <commons-fileupload.version>1.6.0</commons-fileupload.version>
</properties>

<dependencyManagement>
<dependencies>
    <!-- CVE-2026-0636 修复 -->
    <dependency>
        <groupId>org.bouncycastle</groupId>
        <artifactId>bcprov-jdk18on</artifactId>
        <version>${bouncycastle.version}</version>
    </dependency>
    <dependency>
        <groupId>org.bouncycastle</groupId>
        <artifactId>bcpkix-jdk18on</artifactId>
        <version>${bouncycastle.version}</version>
    </dependency>

    <!-- CVE-2025-48976 修复 -->
    <dependency>
        <groupId>commons-fileupload</groupId>
        <artifactId>commons-fileupload</artifactId>
        <version>${commons-fileupload.version}</version>
    </dependency>
</dependencies>
</dependencyManagement>
```

> 仅当 parent 框架版本 < 1.4.4 时才需显式声明以上 CVE 修复依赖；1.4.4 起框架已内置处理。

## 5. 各模块依赖引用

按依赖方向 `common → domain → infra → repository-mybatis`，`application → domain + infra`，`interfaces → application`，`boot → all`：

### 5.1 Common 模块

```xml
<dependencies>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-common</artifactId>
    </dependency>
</dependencies>
```

### 5.2 Domain 模块

```xml
<dependencies>
    <!-- 一方库公共模块 -->
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-example-common</artifactId>
    </dependency>
    <!-- 二方库公共模块 -->
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-common</artifactId>
    </dependency>
</dependencies>
```

### 5.3 Infra 模块

```xml
<dependencies>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-example-domain</artifactId>
    </dependency>
    <!-- RepositoryFacade / Delegate SPI -->
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-infra-starter</artifactId>
    </dependency>
</dependencies>
```

### 5.4 Repository-MyBatis 模块

```xml
<dependencies>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-example-infra</artifactId>
    </dependency>
    <!-- MyBatis-Plus Delegate 实现 -->
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-infra-mybatis-plus-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-spring-boot4-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
    </dependency>
</dependencies>
```

### 5.5 Application 模块

```xml
<dependencies>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-example-domain</artifactId>
    </dependency>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-example-infra</artifactId>
    </dependency>
</dependencies>
```

### 5.6 Interfaces 模块

```xml
<dependencies>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-example-application</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-restful-web-starter</artifactId>
    </dependency>
</dependencies>
```

### 5.7 Boot 模块

```xml
<dependencies>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-example-interfaces</artifactId>
    </dependency>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-example-repository-mybatis</artifactId>
    </dependency>
</dependencies>
```

## 6. 构建配置

### 6.1 Maven 编译插件（保留参数名）

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <compilerArgs>
                    <arg>-parameters</arg>
                </compilerArgs>
            </configuration>
        </plugin>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <executions>
                <execution>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

> `-parameters` 保留方法参数名，利于 Spring MVC 反射绑定与 Swagger 文档生成。`repackage` 仅在 `boot` 模块配置。

### 6.2 资源过滤

```xml
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```

> 开启资源过滤，让 `application.yml` 可使用 `${project.version}` 等占位符。

## 7. 相关页面

- 项目形态与目录布局：[项目创建与多模块](./project-scaffolding.md)
- DDD 模块依赖方向：[DDD 架构与模式](./ddd-architecture.md)
