# 依赖组件配置规范

## 1. 依赖管理模块结构

### 1.1 模块命名

```
structure-{项目名}-dependencies/   # 依赖管理模块
```

### 1.2 版本属性配置

```xml
<properties>
    <revision>1.0.0-SNAPSHOT</revision>
    <spring-boot.version>4.0.6</spring-boot.version>
    <structure.version>1.4.1-SNAPSHOT</structure.version>
    <mybatis-plus.version>3.5.16</mybatis-plus.version>
</properties>
```

### 1.3 父项目配置

```xml
<parent>
    <groupId>cn.structured</groupId>
    <artifactId>structure-dependencies</artifactId>
    <version>1.4.0</version>
</parent>
```

### 1.4 子模块配置

```xml
<modules>
    <module>../structure-example-common</module>
    <module>../structure-example-biz</module>
    <module>../structure-example-api</module>
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
        <artifactId>structure-example-biz</artifactId>
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

<!-- Web组件 -->
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-restful-web-starter</artifactId>
    <version>${structure.version}</version>
</dependency>
```

## 3. 常用组件依赖版本

### 3.1 Spring Boot

```xml
<spring-boot.version>4.0.6</spring-boot.version>
```

### 3.2 Spring Cloud

```xml
<spring-cloud.version>2025.1.0</spring-cloud.version>
<spring-alibaba.version>2025.1.0.0</spring-alibaba.version>
<spring-cloud-parent.version>5.0.0</spring-cloud-parent.version>
```

### 3.3 MyBatis-Plus

```xml
<mybatis-plus.version>3.5.16</mybatis-plus.version>
```

### 3.4 SpringDoc OpenAPI

```xml
<springdoc.version>3.0.3</springdoc.version>
```

### 3.5 安全组件版本

```xml
<structure-security.version>1.4.1-SNAPSHOT</structure-security.version>
```

## 4. 漏洞版本修复

### 4.1 CVE修复依赖

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

## 5. 各模块依赖引用

### 5.1 Common模块

```xml
<dependencies>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-common</artifactId>
    </dependency>
</dependencies>
```

### 5.2 Biz模块

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
    <!-- 三方库 -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-spring-boot4-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-mybatis-plus-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
    </dependency>
</dependencies>
```

### 5.3 API模块

```xml
<dependencies>
    <!-- 一方库业务模块 -->
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-example-biz</artifactId>
    </dependency>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!-- 二方库 Restful Web Starter -->
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-restful-web-starter</artifactId>
    </dependency>
</dependencies>
```

## 6. 构建配置

### 6.1 Maven编译插件

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

