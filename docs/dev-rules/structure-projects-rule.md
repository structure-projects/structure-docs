# structure-projects 项目规范

## 项目结构规范

### 整体架构

项目采用标准的微服务分层架构，分为四个模块分别为：控制层、业务层、公共层、依赖管理。假设项目名称为example以下是示例

```
structure-example/
├── structure-example-api/        # 控制层（对外暴露REST API）
├── structure-example-biz/        # 业务层（核心业务逻辑）
├── structure-example-common/     # 公共层（DTO、VO、枚举、异常等）
└── structure-example-dependencies/ # 依赖管理（统一版本控制）
```

### 模块职责说明

假设项目名称为example以下是示例

| 模块                                 | 职责           | 包含包                                                                   |
| ---------------------------------- | ------------ | --------------------------------------------------------------------- |
| **structure-example-api**          | 控制层，处理HTTP请求 | `controller/`, `exampleApplication.java`                              |
| **structure-example-biz**          | 业务逻辑层        | `service/`, `manager/`, `mapper/`, `entity/`, `assembler/`, `config/` |
| **structure-example-common**       | 公共组件         | `dto/`, `vo/`, `query/`, `enums/`, `exception/`, `constant/`          |
| **structure-example-dependencies** | Maven依赖管理    | `pom.xml`                                                             |

### 包结构详解

假设项目名称为example以下是示例

```
cn.structured.example/
├── controller/     # REST API控制层，处理请求和响应
├── service/        # 业务服务层，定义业务接口和实现
├── manager/        # 数据管理层，封装数据访问逻辑
├── mapper/         # MyBatis数据访问层
├── entity/         # 数据库实体类
├── assembler/      # 对象装配器（Entity ↔ DTO/VO）
├── dto/            # 数据传输对象（请求参数）
├── vo/             # 视图对象（响应数据）
├── query/          # 查询条件对象
├── enums/          # 枚举定义（状态码、错误码等）
├── exception/      # 自定义业务异常
├── constant/       # 常量定义
└── config/         # 配置类
```

## 依赖组件配置

假设项目为example，依赖组件配置是对 structure-example-dependencies 模块进行配置。

### 依赖管理模块包配置

#### 版本设置

```xml

<version>${revision}</version>
<properties>
<revision>1.0.0-SNAPSHOT</revision>
</properties>
```

#### 父项目配置

```xml

<parent>
    <groupId>cn.structured</groupId>
    <artifactId>structure-dependencies</artifactId>
    <version>1.4.0</version>
</parent>
```

#### 子项目配置

假设项目名称为example以下是示例

```xml

<modules>
    <module>../structure-example-common</module>
    <module>../structure-example-biz</module>
    <module>../structure-example-api</module>
</modules>
```

#### 统一依赖配置structure 与 spring boot 配置

假设项目名称为example以下是示例

```xml

<properties>
    <spring-boot.version>4.0.6</spring-boot.version>
    <structure.version>1.4.1-SNAPSHOT</structure.version>
</properties>
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

    <!-- 二方库structure组件 -->
    <!-- 公共模块组件 -->
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-common</artifactId>
        <version>${structure.version}</version>
    </dependency>
    <!-- web 组件 -->
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-restful-web-starter</artifactId>
        <version>${structure.version}</version>
    </dependency>
</dependencies>
</dependencyManagement>
```

#### 支持spring cloud 配置

```xml

<properties>
    <spring-cloud.version>2025.1.0</spring-cloud.version>
    <spring-alibaba.version>2025.1.0.0</spring-alibaba.version>
    <spring-cloud-parent.version>5.0.0</spring-cloud-parent.version>
</properties>
<dependencyManagement>
<dependencies>
    <!-- Spring Cloud -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies-parent</artifactId>
        <version>${spring-cloud-parent.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>${spring-cloud.version}</version>
        <type>pom</type>
        <scope>import</scope>
    </dependency>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-alibaba-dependencies</artifactId>
        <version>${spring-alibaba.version}</version>
        <type>pom</type>
        <scope>import</scope>
    </dependency>
</dependencies>
</dependencyManagement>
```

#### 漏洞版本修复示例

假设项目名称为example以下是完整修复示例

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

#### mybatis-plus

假设项目名称为example以下是示例

```xml

<properties>
    <spring-boot.version>4.0.6</spring-boot.version>
    <structure.version>1.4.1-SNAPSHOT</structure.version>
    <mybatis-plus.version>3.5.16</mybatis-plus.version>
</properties>
<dependencyManagement>
<dependencies>
    <!-- MyBatis Plus -->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-spring-boot4-starter</artifactId>
        <version>${mybatis-plus.version}</version>
    </dependency>
    <dependency>
        <groupId>cn.structured</groupId>
        <artifactId>structure-mybatis-plus-starter</artifactId>
        <version>${structure.version}</version>
    </dependency>
</dependencies>
</dependencyManagement>
```

#### springdoc

假设项目名称为example以下是示例

```xml

<properties>
    <springdoc.version>3.0.3</springdoc.version>
</properties>
<dependencyManagement>
<dependencies>
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>${springdoc.version}</version>
    </dependency>
</dependencies>
</dependencyManagement>
```

#### 配置示例

假设项目名称为example以下是完整配置示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>cn.structured</groupId>
        <artifactId>structure-dependencies</artifactId>
        <version>1.4.0</version>
    </parent>


    <name>structure-example-dependencies</name>
    <artifactId>structure-example-dependencies</artifactId>
    <version>${revision}</version>
    <packaging>pom</packaging>
    <description>example 项目依赖包</description>

    <properties>
        <revision>1.0.0-SNAPSHOT</revision>
        <spring-boot.version>4.0.6</spring-boot.version>
        <mybatis-plus.version>3.5.16</mybatis-plus.version>
        <springdoc.version>3.0.3</springdoc.version>
        <structure.version>1.4.1-SNAPSHOT</structure.version>
        <spring-cloud.version>2025.1.0</spring-cloud.version>
        <spring-alibaba.version>2025.1.0.0</spring-alibaba.version>
        <spring-cloud-parent.version>5.0.0</spring-cloud-parent.version>
        <bouncycastle.version>1.84</bouncycastle.version>
        <commons-fileupload.version>1.6.0</commons-fileupload.version>
    </properties>

    <modules>
        <module>../structure-example-common</module>
        <module>../structure-example-biz</module>
        <module>../structure-example-api</module>
    </modules>

    <dependencyManagement>
        <dependencies>
            <!-- 内部模块依赖 -->
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

            <!-- 内部公共组件 -->
            <dependency>
                <groupId>cn.structured</groupId>
                <artifactId>structure-common</artifactId>
                <version>${structure.version}</version>
            </dependency>

            <dependency>
                <groupId>cn.structured</groupId>
                <artifactId>structure-restful-web-starter</artifactId>
                <version>${structure.version}</version>
            </dependency>

            <!-- Spring Cloud -->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies-parent</artifactId>
                <version>${spring-cloud-parent.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>${spring-alibaba.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <!-- MyBatis Plus -->
            <dependency>
                <groupId>com.baomidou</groupId>
                <artifactId>mybatis-plus-spring-boot4-starter</artifactId>
                <version>${mybatis-plus.version}</version>
            </dependency>
            <dependency>
                <groupId>cn.structured</groupId>
                <artifactId>structure-mybatis-plus-starter</artifactId>
                <version>${structure.version}</version>
            </dependency>

            <!-- SpringDoc OpenAPI -->
            <dependency>
                <groupId>org.springdoc</groupId>
                <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
                <version>${springdoc.version}</version>
            </dependency>

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

</project>
```

### 公共组件依赖

假设项目名称为example以下是公共组件依赖完整示例

```xml

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <artifactId>structure-example-dependencies</artifactId>
        <groupId>cn.structured</groupId>
        <version>${revision}</version>
        <relativePath>../structure-example-dependencies/pom.xml</relativePath>
    </parent>

    <name>structure-example-common</name>
    <artifactId>structure-example-common</artifactId>
    <description>example项目公共模块</description>
    <packaging>jar</packaging>

    <dependencies>
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-common</artifactId>
        </dependency>
    </dependencies>
</project>

```

### 业务组件依赖

假设项目名称为example以下是业务组件依赖基础示例配置

```xml

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <artifactId>structure-example-dependencies</artifactId>
        <groupId>cn.structured</groupId>
        <version>${revision}</version>
        <relativePath>../structure-example-dependencies/pom.xml</relativePath>
    </parent>

    <name>structure-example-biz</name>
    <artifactId>structure-example-biz</artifactId>
    <description>example业务模块</description>
    <packaging>jar</packaging>

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
        <!-- 三方库 lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <!-- 三方库ORM mybatis plus  -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-spring-boot4-starter</artifactId>
        </dependency>
        <!-- 二方库 mybatis plus 用户扩展二方库封装的功能 -->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-mybatis-plus-starter</artifactId>
        </dependency>
        <!-- 三方库 数据库连接驱动 -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
        </dependency>
    </dependencies>
</project>

```

· 如果有其他的依赖配置，请自行添加，并且次模块不定义任何版本依赖，如果有新的版本需要定义需要在父 pom 中定义。

### API 组件依赖

#### 基本启动示例 spring boot web starter

假设项目名称为example以下是API组件依赖基础示例仅仅只包含启动spring boot + spring boot web

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <artifactId>structure-example-dependencies</artifactId>
        <groupId>cn.structured</groupId>
        <version>${revision}</version>
        <relativePath>../structure-example-dependencies/pom.xml</relativePath>
    </parent>

    <name>structure-example-api</name>
    <artifactId>structure-example-api</artifactId>
    <description>exampleapi模块</description>
    <packaging>jar</packaging>


    <dependencies>
        <!-- 一方库业务模块-->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-example-biz</artifactId>
        </dependency>
        <!-- spring boot web starter-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- 三方库 lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <!-- 二方库 restful web starter -->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-restful-web-starter</artifactId>
        </dependency>

    </dependencies>

    <build>
        <finalName>example-server</finalName>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
            </resource>
        </resources>
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
</project>
```

#### 集成spring cloud 组件

假设项目名称为example以下是API组件依赖完整示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <artifactId>structure-example-dependencies</artifactId>
        <groupId>cn.structured</groupId>
        <version>${revision}</version>
        <relativePath>../structure-example-dependencies/pom.xml</relativePath>
    </parent>

    <name>structure-example-api</name>
    <artifactId>structure-example-api</artifactId>
    <description>exampleapi模块</description>
    <packaging>jar</packaging>


    <dependencies>
        <!-- 一方库业务模块-->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-example-biz</artifactId>
        </dependency>
        <!-- spring boot web starter-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- 三方库 lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <!-- 二方库 restful web starter -->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-restful-web-starter</artifactId>
        </dependency>
        <!-- 三方库 springdoc openapi -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        </dependency>
        <!-- spring boot actuator -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!-- spring cloud openfeign -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!-- spring cloud nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- spring cloud nacos config -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>

    </dependencies>

    <build>
        <finalName>example-server</finalName>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
            </resource>
        </resources>
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
</project>
```

#### 解决CVE漏洞

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <artifactId>structure-example-dependencies</artifactId>
        <groupId>cn.structured</groupId>
        <version>${revision}</version>
        <relativePath>../structure-example-dependencies/pom.xml</relativePath>
    </parent>

    <name>structure-example-api</name>
    <artifactId>structure-example-api</artifactId>
    <description>exampleapi模块</description>
    <packaging>jar</packaging>


    <dependencies>
        <!-- CVE 漏洞修复  原有依赖基础上添加如下依赖 -->
        <!-- CVE-2026-0636 修复 -->
        <dependency>
            <groupId>org.bouncycastle</groupId>
            <artifactId>bcprov-jdk18on</artifactId>
        </dependency>
        <dependency>
            <groupId>org.bouncycastle</groupId>
            <artifactId>bcpkix-jdk18on</artifactId>
        </dependency>
        <!-- CVE-2025-48976 修复 -->
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
        </dependency>
    </dependencies>

</project>
```

***

## 枚举规范 (enums/)

### 枚举命名规范

| 类型    | 命名模式                | 示例                     |
| ----- | ------------------- | ---------------------- |
| 状态枚举  | `{业务}StateEnum`     | `ExampleStateEnum`     |
| 类型枚举  | `{业务}TypeEnum`      | `ExampleTypeEnum`      |
| 错误码枚举 | `{业务}ExceptionEnum` | `ExampleExceptionEnum` |

***

## 异常规范 (exception/)

业务异常规范必须使用 `cn.structure.common.exception.CommonException`
该异常文件在公共组件模块中

```xml

<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-common</artifactId>
    <version>${structure.version}</version>
</dependency>
```

***

## 响应规范

使用 `cn.structure.common.utils.ResultUtilSimpleImpl` 封装响应：

```java
ResultUtilSimpleImpl.success(data);
ResultUtilSimpleImpl.

fail(code, message);
```

***

## 命名规范汇总

### 文件命名规范

| 类型         | 命名模式              | 示例                     |
| ---------- | ----------------- | ---------------------- |
| 枚举类        | `{业务}Enum`        | `exampleExceptionEnum` |
| 异常类        | `{业务}Exception`   | `exampleException`     |
| 装配器        | `{业务}Assembler`   | `exampleAssembler`     |
| 常量类        | `{业务}Constant`    | `exampleConstant`      |
| 实体类        | `{业务}`            | `example`              |
| DTO类       | `{业务}DTO`         | `exampleDTO`           |
| VO类        | `{业务}VO`          | `exampleVO`            |
| Query类     | `{业务}Query`       | `exampleQuery`         |
| Service接口  | `I{业务}Service`    | `IexampleService`      |
| Service实现  | `{业务}ServiceImpl` | `exampleServiceImpl`   |
| Manager接口  | `I{业务}Manager`    | `IexampleManager`      |
| Manager实现  | `{业务}ManagerImpl` | `exampleManagerImpl`   |
| Controller | `{业务}Controller`  | `exampleController`    |
| Mapper     | `{业务}Mapper`      | `exampleMapper`        |

***

### CRUD规范与示例

#### 控制器示例

```java
package cn.structured.example.controller;

import cn.structure.common.entity.ResResultVO;
import cn.structure.common.utils.ResultUtilSimpleImpl;
import cn.structure.common.vo.ReqPage;
import cn.structure.common.vo.ResPage;
import cn.structured.example.dto.exampleDTO;
import cn.structured.example.query.exampleQuery;
import cn.structured.example.service.IexampleService;
import cn.structured.example.vo.exampleVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "示例管理", description = "示例生命周期管理接口")
@RestController
@RequestMapping("/api/example")
@AllArgsConstructor
public class ExampleController {

    private final IExampleService exampleService;

    @Operation(summary = "创建示例")
    @PostMapping
    public ResResultVO<Long> create(@Valid @RequestBody ExampleDTO dto) {
        Long id = exampleService.create(dto);
        return ResultUtilSimpleImpl.success(id);
    }

    @Operation(summary = "更新示例")
    @PutMapping("/{id}")
    public ResResultVO<Void> update(
            @Parameter(description = "示例ID") @PathVariable Long id,
            @Valid @RequestBody ExampleDTO dto) {
        exampleService.update(id, dto);
        return ResultUtilSimpleImpl.success(null);
    }

    @Operation(summary = "删除示例")
    @DeleteMapping("/{id}")
    public ResResultVO<Void> delete(@Parameter(description = "示例ID") @PathVariable Long id) {
        exampleService.delete(id);
        return ResultUtilSimpleImpl.success(null);
    }

    @Operation(summary = "查询示例详情")
    @GetMapping("/{id}")
    public ResResultVO<ExampleVO> findById(@Parameter(description = "示例ID") @PathVariable Long id) {
        return ResultUtilSimpleImpl.success(exampleService.findById(id));
    }

    @Operation(summary = "分页查询示例列表")
    @GetMapping("/page")
    public ResResultVO<ResPage<ExampleVO>> page(ExampleQuery query, ReqPage reqPage) {
        return ResultUtilSimpleImpl.success(exampleService.page(query, reqPage));
    }
}

```

#### 服务接口示例

```java

package cn.structured.example.service;

import cn.structure.common.vo.ReqPage;
import cn.structure.common.vo.ResPage;
import cn.structured.example.dto.ExampleDTO;
import cn.structured.example.query.ExampleQuery;
import cn.structured.example.vo.ExampleVO;

/**
 * 示例Service接口
 *
 * @author chuck
 * @since 2024-01-01
 */
public interface IExampleService {

    /**
     * 创建示例
     *
     * @param dto 示例DTO
     * @return 示例ID
     */
    Long create(ExampleDTO dto);

    /**
     * 更新示例
     *
     * @param id  示例ID
     * @param dto 示例DTO
     */
    void update(Long id, ExampleDTO dto);

    /**
     * 删除示例
     *
     * @param id 示例ID
     */
    void delete(Long id);

    /**
     * 查询示例
     *
     * @param id 示例ID
     * @return 示例VO
     */
    ExampleVO findById(Long id);

    /**
     * 查询示例列表
     *
     * @param query   查询条件
     * @param reqPage 分页参数
     * @return 示例列表
     */
    ResPage<ExampleVO> page(ExampleQuery query, ReqPage reqPage);
}

```

#### 服务实现示例

```java
package cn.structured.example.service.impl;

import cn.hutool.core.util.StrUtil;
import cn.structure.common.vo.ReqPage;
import cn.structure.common.vo.ResPage;
import cn.structure.common.exception.CommonException;
import cn.structured.mybatis.plus.starter.convert.ResPageConvert;
import cn.structured.example.assembler.ExampleAssembler;
import cn.structured.example.dto.ExampleDTO;
import cn.structured.example.entity.Example;
import cn.structured.example.enums.ExampleExceptionEnum;
import cn.structured.example.manager.IExampleManager;
import cn.structured.example.query.ExampleQuery;
import cn.structured.example.service.IExampleService;
import cn.structured.example.vo.ExampleVO;
import cn.structured.mybatis.plus.starter.convert.ResPageConvert;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 示例Service实现类
 *
 * @author chuck
 * @since 2024-01-01
 */
@Slf4j
@Service
@AllArgsConstructor
public class ExampleServiceImpl implements IExampleService {

    private final IExampleManager exampleManager;

    @Override
    public Long create(ExampleDTO dto) {
        // 如果需要验证code
        long count = exampleManager.count(Wrappers.<Example>lambdaQuery()
                .eq(Example::getCode, dto.getCode()));
        if (count > 0) {
            log.warn("示例编码已存在: {}", dto.getCode());
            throw new CommonException(ExampleExceptionEnum.EXAMPLE_CODE_DUPLICATE.getCode(), ExampleExceptionEnum.EXAMPLE_CODE_DUPLICATE.getMessage());
        }
        // 调用装饰器转换成实体
        Example Example = ExampleAssembler.assembler(dto);
        ExampleManager.save(Example);
        log.info("创建示例成功, 示例ID: {}", Example.getId());
        return Example.getId();
    }

    @Override
    public void update(Long id, ExampleDTO dto) {
        Example Example = ExampleManager.getById(id);
        Example updateExample = ExampleAssembler.assembler(dto);
        // 排除掉禁止修改的部分比如 code 禁止修改
        updateExample.setCode(null);
        updateExample.setId(id);
        ExampleManager.updateById(updateExample);
        log.info("更新示例成功, 示例ID: {}", id);
    }

    @Override
    public void delete(Long id) {
        ExampleManager.removeById(id);
        log.info("删除示例成功, 示例ID: {}", id);
    }


    @Override
    public ExampleVO findById(Long id) {
        Example Example = ExampleManager.getById(id);
        return ExampleAssembler.assembler(Example);
    }

    @Override
    public ResPage<ExampleVO> page(ExampleQuery query, ReqPage reqPage) {
        // 构建分页参数
        Page<Example> page = new Page<>(reqPage.getCurrentPage(), reqPage.getPageSize());

        // 构建查询条件
        LambdaQueryWrapper<Example> queryWrapper = Wrappers.<Example>lambdaQuery()
                .eq(null != query.getUserId(), Example::getUserId, query.getUserId())
                .eq(null != query.getDeptId(), Example::getDeptId, query.getDeptId())
                .eq(null != query.getState(), Example::getState, query.getState())
                .like(StrUtil.isNotBlank(query.getPhone()), Example::getPhone, query.getPhone())
                .like(StrUtil.isNotBlank(query.getName()), Example::getName, query.getName())
                .orderByDesc(Example::getCreateTime);
        Page<Example> result = ExampleManager.page(page, queryWrapper);
        return ResPageConvert.convert(result, ExampleAssembler::assemble);
    }
}

```

#### Manager接口示例

```java

package cn.structured.example.manager;

import cn.structured.example.entity.Example;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * 示例Service接口
 *
 * @author chuck
 * @since 2024-01-01
 */
public interface IExampleManager extends IService<Example> {

}


```

#### Manager实现示例

```java
package cn.structured.example.manager.impl;

import cn.structure.common.exception.CommonException;
import cn.structured.example.entity.Example;
import cn.structured.example.enums.ExampleExceptionEnum;
import cn.structured.example.manager.IExampleManager;
import cn.structured.example.mapper.ExampleMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.Serializable;

/**
 * 示例Service实现类
 *
 * @author chuck
 * @since 2024-01-01
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ExampleManagerImpl extends ServiceImpl<ExampleMapper, Example> implements IExampleManager {

    /**
     * 如果需要判断数据是否存在场景时考虑重写抽象类中的方法
     * @param id 数据ID
     * @return Entity
     */
    @Override
    public Example getById(Serializable id) {
        Example example = super.getById(id);
        if (example == null) {
            log.warn("示例不存在, 示例ID: {}", id);
            throw new CommonException(ExampleExceptionEnum.NOT_FOUND.getCode(), ExampleExceptionEnum.NOT_FOUND.getMessage());
        }
        return example;
    }
}

```

#### Mapper示例

```java

package cn.structured.example.mapper;

import cn.structured.example.entity.Example;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * 示例Mapper接口
 *
 * @author chuck
 * @since 2024-01-01
 */
public interface ExampleMapper extends BaseMapper<Example> {

}

```

#### 实体类示例

```java

package cn.structured.example.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 示例实体类
 *
 * @author chuck
 * @since 2024-01-01
 */
@Data
@TableName("example")
public class Example {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("code")
    private String code;

    @TableField("user_id")
    private Long userId;

    @TableField("phone")
    private String phone;

    @TableField("name")
    private String name;

    @TableField("sex")
    private String sex;

    @TableField("dept_id")
    private Long deptId;

    @TableField("state")
    private Integer state;

    @TableField("organization_id")
    private Long organizationId;

    @TableField(value = "is_deleted", fill = FieldFill.INSERT)
    @TableLogic
    private Boolean deleted;

    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(value = "create_by", fill = FieldFill.INSERT)
    private Long createBy;

    @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    @TableField(value = "update_by", fill = FieldFill.INSERT_UPDATE)
    private Long updateBy;
}
```

通用字段

```
@TableField("organization_id")
private Long organizationId;

@TableField(value = "is_deleted", fill = FieldFill.INSERT)
@TableLogic
private Boolean deleted;

@TableField(value = "create_time", fill = FieldFill.INSERT)
private LocalDateTime createTime;

@TableField(value = "create_by", fill = FieldFill.INSERT)
private Long createBy;

@TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
private LocalDateTime updateTime;

@TableField(value = "update_by", fill = FieldFill.INSERT_UPDATE)
private Long updateBy;
```

#### 错误码枚举类示例

```java
package cn.structured.example.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 示例错误码枚举类
 * <p>
 * 1000XX 示例业务错误码
 * <p/>
 *
 * @author chuck
 * @since 2024-01-01
 */
@Getter
@AllArgsConstructor
public enum ExampleExceptionEnum {

    NOT_FOUND("100001", "示例不存在"),
    EXAMPLE_CODE_DUPLICATE("100002", "示例编码重复");

    private final String code;
    private final String message;
}


```

#### 业务异常示例

```java
    // 推荐抛出CommonException异常 传入枚举类
// throw new CommonException(ExampleExceptionEnum.NOT_FOUND.getCode(), ExampleExceptionEnum.NOT_FOUND.getMessage());
// 禁止直接使用字面量输出异常信息 禁止使用
// throw new CommonException(“100001”, “没有示例数据！”);
```

#### 枚举类示例

```java
package cn.structured.example.enums;


import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 示例状态枚举
 *
 * @author chuck
 * @since 2024-01-01
 */
@Getter
@AllArgsConstructor
public enum ExampleStateEnum {

    NORMAL(1, "正常"),
    RESIGNED(2, "离职"),
    DISABLED(3, "禁用");

    private final Integer code;
    private final String description;

    public static ExampleStateEnum getByCode(Integer code) {
        for (ExampleStateEnum state : values()) {
            if (state.getCode().equals(code)) {
                return state;
            }
        }
        return null;
    }
}

```

#### 启动类示例

```java

package cn.structured.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * 启动类
 *
 * @author chuck
 * @since 2024-01-01
 */
@SpringBootApplication(scanBasePackages = "cn.structured.example")
@EnableFeignClients
public class ExampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExampleApplication.class, args);
    }
}

```

### 其他示例

#### 批量删除接口示例

批量删除操作用于一次性删除多条数据，通常接收一个 ID 列表作为参数。

**Service 接口定义：**

```java
package cn.structured.example.service;

import java.util.List;

/**
 * 示例Service接口
 *
 * @author chuck
 * @since 2024-01-01
 */
public interface IExampleService {
    
    /**
     * 批量删除
     *
     * @param ids 要删除的ID列表
     */
    void batchDelete(List<Long> ids);
}
```

**Service 实现：**

```java
package cn.structured.example.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.structured.example.manager.IExampleManager;
import cn.structured.example.service.IExampleService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 示例Service实现类
 *
 * @author chuck
 * @since 2024-01-01
 */
@Slf4j
@Service
@AllArgsConstructor
public class ExampleServiceImpl implements IExampleService {

    private final IExampleManager exampleManager;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void batchDelete(List<Long> ids) {
        if (CollUtil.isEmpty(ids)) {
            return;
        }
        
        // 使用 MyBatis-Plus 批量删除
        exampleManager.removeByIds(ids);
        
        log.info("批量删除示例成功，删除数量: {}", ids.size());
    }
}
```

**Controller 定义：**

```java
package cn.structured.example.controller;

import cn.structure.common.entity.ResResultVO;
import cn.structure.common.utils.ResultUtilSimpleImpl;
import cn.structured.example.service.IExampleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 示例管理控制器
 *
 * @author chuck
 * @since 2024-01-01
 */
@Tag(name = "示例管理", description = "示例生命周期管理接口")
@RestController
@RequestMapping("/api/example")
@AllArgsConstructor
@Validated
public class ExampleController {

    private final IExampleService exampleService;

    @Operation(summary = "批量删除示例")
    @DeleteMapping("/batch")
    public ResResultVO<Void> batchDelete(
            @Parameter(description = "要删除的ID列表") 
            @NotEmpty(message = "ID列表不能为空") 
            @RequestBody List<Long> ids) {
        exampleService.batchDelete(ids);
        return ResultUtilSimpleImpl.success(null);
    }
}
```

**批量删除的注意事项：**

- 使用事务保证数据一致性
- 批量操作前建议检查数据是否存在
- 大数据量时可以分批处理避免数据库连接超时
- 前端需要进行防重复提交处理

#### 下拉选接口示例

下拉选接口用于提供可供选择的数据列表，统一使用 `cn.structure.common.vo.OptionVO` 作为数据传输对象。

**OptionVO 引用说明：**

```java
package cn.structured.example.vo;

import cn.structure.common.vo.OptionVO;  // 使用 common 组件内置的 OptionVO

import java.util.List;

/**
 * 下拉选数据说明
 * 
 * OptionVO 标准结构：
 * - id: 节点ID
 * - label: 显示名称
 * - value: 实际值/编码
 * - children: 子节点列表（用于树形下拉）
 */
```

**Service 接口定义：**

```java
package cn.structured.example.service;

import cn.structure.common.vo.OptionVO;

import java.util.List;

/**
 * 示例Service接口
 *
 * @author chuck
 * @since 2024-01-01
 */
public interface IExampleService {
    
    /**
     * 获取下拉选列表
     *
     * @param organizationId 组织ID
     * @return 下拉选列表
     */
    List<OptionVO> options(Long organizationId);
}
```

**Service 实现：**

```java
package cn.structured.example.service.impl;

import cn.structure.common.vo.OptionVO;
import cn.structured.example.entity.Example;
import cn.structured.example.manager.IExampleManager;
import cn.structured.example.service.IExampleService;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 示例Service实现类
 *
 * @author chuck
 * @since 2024-01-01
 */
@Service
@AllArgsConstructor
public class ExampleServiceImpl implements IExampleService {

    private final IExampleManager exampleManager;

    @Override
    public List<OptionVO> options(Long organizationId) {
        // 查询数据
        List<Example> examples = exampleManager.list(
            Wrappers.<Example>lambdaQuery()
                .eq(Example::getOrganizationId, organizationId)
                .eq(Example::getState, 1)
                .orderByAsc(Example::getSort)
        );
        
        // 转换成 OptionVO（复用 common 组件的 OptionVO）
        return examples.stream()
            .map(example -> {
                OptionVO vo = new OptionVO();
                vo.setId(example.getId());
                vo.setLabel(example.getName());
                vo.setValue(example.getCode());
                return vo;
            })
            .collect(Collectors.toList());
    }
}
```

**Controller 定义：**

```java
package cn.structured.example.controller;

import cn.structure.common.entity.ResResultVO;
import cn.structure.common.utils.ResultUtilSimpleImpl;
import cn.structure.common.vo.OptionVO;
import cn.structured.example.service.IExampleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 示例管理控制器
 *
 * @author chuck
 * @since 2024-01-01
 */
@Tag(name = "示例管理", description = "示例生命周期管理接口")
@RestController
@RequestMapping("/api/example")
@AllArgsConstructor
public class ExampleController {

    private final IExampleService exampleService;

    @Operation(summary = "获取下拉选列表")
    @GetMapping("/options")
    public ResResultVO<List<OptionVO>> options(
            @Parameter(description = "组织ID") @RequestParam Long organizationId) {
        return ResultUtilSimpleImpl.success(exampleService.options(organizationId));
    }
}
```

#### 树形结构接口示例

树形结构接口用于返回具有层级关系的数据，如部门树、菜单树等。

**1. TreeVO 定义：**

```java
package cn.structured.example.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

/**
 * 树形-VO
 *
 * @author chuck
 * @since 2024-01-01
 */
@Data
@Schema(description = "树形-VO")
public class TreeVO {

    @Schema(description = "节点ID")
    private Long id;

    @Schema(description = "父节点ID")
    private Long parentId;

    @Schema(description = "节点名称", example = "一级部门")
    private String name;

    @Schema(description = "节点编码", example = "dept_001")
    private String code;

    @Schema(description = "排序号", example = "1")
    private Integer sort;

    @Schema(description = "子节点")
    private List<TreeVO> children;
}
```

**2. Service 实现（递归构建树）：**

```java
package cn.structured.example.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.structured.example.entity.Dept;
import cn.structured.example.manager.IDeptManager;
import cn.structured.example.service.IDeptService;
import cn.structured.example.vo.TreeVO;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 部门Service实现类
 *
 * @author chuck
 * @since 2024-01-01
 */
@Service
@AllArgsConstructor
public class DeptServiceImpl implements IDeptService {

    private final IDeptManager deptManager;

    @Override
    public List<TreeVO> tree(Long organizationId) {
        // 查询所有数据
        List<Dept> depts = deptManager.list(
            Wrappers.<Dept>lambdaQuery()
                .eq(Dept::getOrganizationId, organizationId)
                .orderByAsc(Dept::getSort)
        );
        
        // 转换为 VO
        List<TreeVO> treeVOS = depts.stream()
            .map(this::convertToTreeVO)
            .collect(Collectors.toList());
        
        // 构建树形结构
        return buildTree(treeVOS, 0L);
    }

    /**
     * 转换实体为 TreeVO
     */
    private TreeVO convertToTreeVO(Dept dept) {
        TreeVO vo = new TreeVO();
        vo.setId(dept.getId());
        vo.setParentId(dept.getParentId());
        vo.setName(dept.getName());
        vo.setCode(dept.getCode());
        vo.setSort(dept.getSort());
        vo.setChildren(new ArrayList<>());
        return vo;
    }

    /**
     * 构建树形结构
     *
     * @param treeVOS  平铺的数据列表
     * @param parentId 父节点ID
     * @return 树形结构列表
     */
    private List<TreeVO> buildTree(List<TreeVO> treeVOS, Long parentId) {
        return treeVOS.stream()
            .filter(tree -> tree.getParentId().equals(parentId))
            .peek(tree -> {
                List<TreeVO> children = buildTree(treeVOS, tree.getId());
                if (CollUtil.isNotEmpty(children)) {
                    tree.setChildren(children);
                }
            })
            .collect(Collectors.toList());
    }
}
```

**3. Controller 定义：**

```java
package cn.structured.example.controller;

import cn.structure.common.entity.ResResultVO;
import cn.structure.common.utils.ResultUtilSimpleImpl;
import cn.structured.example.service.IDeptService;
import cn.structured.example.vo.TreeVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 部门管理控制器
 *
 * @author chuck
 * @since 2024-01-01
 */
@Tag(name = "部门管理", description = "部门管理接口")
@RestController
@RequestMapping("/api/dept")
@AllArgsConstructor
public class DeptController {

    private final IDeptService deptService;

    @Operation(summary = "获取部门树")
    @GetMapping("/tree")
    public ResResultVO<List<TreeVO>> tree(
            @Parameter(description = "组织ID") @RequestParam Long organizationId) {
        return ResultUtilSimpleImpl.success(deptService.tree(organizationId));
    }
}
```

**4. 树形结构的注意事项：**

- 根节点的 parentId 通常为 0 或 null
- 需要按 sort 字段排序保证顺序
- 大数据量时可考虑使用懒加载方式
- 前端组件如 Element Plus 的 el-tree 支持懒加载

#### 接口参数验证示例

使用 Jakarta Validation 进行接口参数验证，确保数据的合法性和完整性。

##### 1. 基于分组的参数验证

通过 ValidationGroups 定义不同的验证组，实现针对不同业务场景的验证规则。

**1.1 验证组定义：**

```java
package cn.structured.example.group;

/**
 * 验证组定义
 * 用于针对不同业务场景应用不同的验证规则
 *
 * @author chuck
 * @since 2024-01-01
 */
public class ValidationGroups {

    /**
     * 添加分组
     */
    public interface Add {
    }

    /**
     * 更新分组
     */
    public interface Update {
    }

    /**
     * 查询分组
     */
    public interface Query {
    }

    /**
     * 删除分组
     */
    public interface Delete {
    }
}
```

**1.2 DTO 定义（使用分组验证）：**

```java
package cn.structured.example.dto;

import cn.structured.example.group.ValidationGroups;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * 示例 DTO（支持分组验证）
 *
 * @author chuck
 * @since 2024-01-01
 */
@Data
@Schema(description = "示例DTO")
public class ExampleDTO {

    @NotNull(groups = {ValidationGroups.Update.class}, message = "ID不能为空")
    @Schema(description = "ID", example = "1")
    private Long id;

    // 添加时必填，更新时可选
    @NotBlank(groups = {ValidationGroups.Add.class}, message = "编码不能为空")
    @Size(min = 2, max = 32, message = "编码长度为2-32个字符")
    @Pattern(regexp = "^[a-z][a-z0-9_]*$", message = "编码必须以小写字母开头，只能包含小写字母、数字和下划线")
    @Schema(description = "编码", example = "example_001")
    private String code;

    @NotBlank(message = "名称不能为空")
    @Size(min = 1, max = 64, message = "名称长度为1-64个字符")
    @Schema(description = "名称", example = "示例名称")
    private String name;

    @NotNull(groups = {ValidationGroups.Add.class}, message = "年龄不能为空")
    @Min(value = 0, message = "年龄最小为0")
    @Max(value = 150, message = "年龄最大为150")
    @Schema(description = "年龄", example = "25")
    private Integer age;

    @DecimalMin(value = "0.01", message = "金额最小为0.01")
    @DecimalMax(value = "999999999.99", message = "金额最大为999999999.99")
    @Schema(description = "金额", example = "99.99")
    private BigDecimal amount;

    @Email(message = "邮箱格式不正确")
    @Schema(description = "邮箱", example = "example@example.com")
    private String email;

    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    @Schema(description = "手机号", example = "13800138000")
    private String phone;

    @NotEmpty(groups = {ValidationGroups.Add.class}, message = "角色不能为空")
    @Schema(description = "角色列表", example = "[\"ADMIN\", \"USER\"]")
    private List<@NotBlank(message = "角色不能为空字符串") String> roles;
}
```

**1.3 查询参数 DTO：**

```java
package cn.structured.example.query;

import cn.structured.example.group.ValidationGroups;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 查询示例 DTO
 *
 * @author chuck
 * @since 2024-01-01
 */
@Data
@Schema(description = "查询示例DTO")
public class ExampleQuery {

    @Size(max = 64, message = "名称最大64个字符")
    @Schema(description = "名称关键字")
    private String name;

    @Min(value = 0, message = "状态最小为0")
    @Max(value = 10, message = "状态最大为10")
    @Schema(description = "状态", example = "1")
    private Integer state;

    @NotNull(groups = {ValidationGroups.Query.class}, message = "当前页不能为空")
    @Min(value = 1, message = "当前页最小为1")
    @Schema(description = "当前页", example = "1")
    private Integer currentPage;

    @NotNull(groups = {ValidationGroups.Query.class}, message = "每页数量不能为空")
    @Min(value = 1, message = "每页数量最小为1")
    @Max(value = 100, message = "每页数量最大为100")
    @Schema(description = "每页数量", example = "10")
    private Integer pageSize;
}
```

**1.4 Controller 中的使用：**

```java
package cn.structured.example.controller;

import cn.structure.common.entity.ResResultVO;
import cn.structure.common.utils.ResultUtilSimpleImpl;
import cn.structured.example.dto.ExampleDTO;
import cn.structured.example.group.ValidationGroups;
import cn.structured.example.query.ExampleQuery;
import cn.structured.example.service.IExampleService;
import cn.structured.example.vo.ExampleVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.groups.Default;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 示例管理控制器
 *
 * @author chuck
 * @since 2024-01-01
 */
@Tag(name = "示例管理", description = "示例生命周期管理接口")
@RestController
@RequestMapping("/api/example")
@AllArgsConstructor
@Validated
public class ExampleController {

    private final IExampleService exampleService;

    @Operation(summary = "创建示例")
    @PostMapping
    public ResResultVO<Long> create(
            @Validated({ValidationGroups.Add.class, Default.class}) @RequestBody ExampleDTO dto) {
        return ResultUtilSimpleImpl.success(exampleService.create(dto));
    }

    @Operation(summary = "更新示例")
    @PutMapping("/{id}")
    public ResResultVO<Void> update(
            @Parameter(description = "ID") @PathVariable Long id,
            @Validated({ValidationGroups.Update.class, Default.class}) @RequestBody ExampleDTO dto) {
        exampleService.update(id, dto);
        return ResultUtilSimpleImpl.success(null);
    }

    @Operation(summary = "查询示例列表")
    @GetMapping
    public ResResultVO<List<ExampleVO>> list(
            @Validated({ValidationGroups.Query.class, Default.class}) ExampleQuery query) {
        return ResultUtilSimpleImpl.success(exampleService.list(query));
    }
}
```

##### 2. 自定义验证注解

通过自定义验证注解和验证器，实现复杂的业务验证规则。

**2.1 自定义验证注解：**

```java
package cn.structured.example.valid;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * 枚举值验证注解
 * 限制字段值必须在指定的枚举值范围内
 *
 * @author chuck
 * @since 2024-01-01
 */
@Documented
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EnumValueValidator.class)
public @interface EnumValue {

    /**
     * 错误消息
     */
    String message() default "值不在允许的范围内";

    /**
     * 分组
     */
    Class<?>[] groups() default {};

    /**
     * 负载
     */
    Class<? extends Payload>[] payload() default {};

    /**
     * 枚举类
     */
    Class<? extends Enum<?>> value();

    /**
     * 是否忽略大小写（仅对String类型有效）
     */
    boolean ignoreCase() default false;
}
```

**2.2 验证器实现：**

```java
package cn.structured.example.valid;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 枚举值验证器实现
 *
 * @author chuck
 * @since 2024-01-01
 */
public class EnumValueValidator implements ConstraintValidator<EnumValue, Object> {

    private List<Object> enumValues;
    private boolean ignoreCase;

    @Override
    public void initialize(EnumValue annotation) {
        this.ignoreCase = annotation.ignoreCase();
        this.enumValues = Arrays.stream(annotation.value())
            .flatMap(e -> Arrays.stream(e.getClass().getEnumConstants()))
            .collect(Collectors.toList());
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null) {
            return true; // 使用 @NotNull 来验证非空
        }

        if (value instanceof String) {
            String strValue = (String) value;
            if (ignoreCase) {
                return enumValues.stream()
                    .anyMatch(e -> e.toString().equalsIgnoreCase(strValue));
            }
            return enumValues.contains(strValue);
        }

        return enumValues.contains(value);
    }
}
```

**2.3 枚举类定义：**

```java
package cn.structured.example.enums;

import cn.structured.example.valid.EnumValue;

/**
 * 状态枚举
 *
 * @author chuck
 * @since 2024-01-01
 */
public enum StatusEnum {

    ENABLE("启用", 1),
    DISABLE("禁用", 0);

    private final String description;
    private final Integer value;

    StatusEnum(String description, Integer value) {
        this.description = description;
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public Integer getValue() {
        return value;
    }
}
```

**2.4 DTO 中使用自定义注解：**

```java
package cn.structured.example.dto;

import cn.structured.example.enums.StatusEnum;
import cn.structured.example.valid.EnumValue;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 示例 DTO
 *
 * @author chuck
 * @since 2024-01-01
 */
@Data
@Schema(description = "示例DTO")
public class ExampleDTO {

    @NotNull(message = "状态不能为空")
    @EnumValue(value = StatusEnum.class, message = "状态只能是启用或禁用")
    @Schema(description = "状态", example = "1")
    private Integer status;

    @NotBlank(message = "类型不能为空")
    @EnumValue(value = StatusEnum.class, ignoreCase = true, message = "类型只能是ENABLE或DISABLE")
    @Schema(description = "类型", example = "ENABLE")
    private String type;
}
```

##### 3. 高级验证玩法

**3.1 交叉字段验证（字段间的关系验证）：**

```java
package cn.structured.example.valid;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * 字段比较验证注解
 * 验证两个字段的关系，如开始日期必须早于结束日期
 *
 * @author chuck
 * @since 2024-01-01
 */
@Documented
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FieldCompareValidator.class)
public @interface FieldCompare {

    /**
     * 第一个字段名
     */
    String firstField();

    /**
     * 第二个字段名
     */
    String secondField();

    /**
     * 比较类型：LESS_THAN（第一个小于第二个）、EQUALS（相等）、NOT_EQUALS（不相等）
     */
    CompareType compareType();

    /**
     * 错误消息
     */
    String message() default "字段比较验证失败";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    enum CompareType {
        LESS_THAN,      // 第一个字段值 < 第二个字段值
        LESS_THAN_OR_EQUALS,  // 第一个字段值 <= 第二个字段值
        GREATER_THAN,   // 第一个字段值 > 第二个字段值
        EQUALS,         // 相等
        NOT_EQUALS      // 不相等
    }
}
```

**3.2 字段比较验证器：**

```java
package cn.structured.example.valid;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * 字段比较验证器实现
 *
 * @author chuck
 * @since 2024-01-01
 */
public class FieldCompareValidator implements ConstraintValidator<FieldCompare, Object> {

    private String firstField;
    private String secondField;
    private FieldCompare.CompareType compareType;

    @Override
    public void initialize(FieldCompare constraintAnnotation) {
        this.firstField = constraintAnnotation.firstField();
        this.secondField = constraintAnnotation.secondField();
        this.compareType = constraintAnnotation.compareType();
    }

    @Override
    @SuppressWarnings("unchecked")
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        try {
            Object firstValue = getFieldValue(value, firstField);
            Object secondValue = getFieldValue(value, secondField);

            // 如果两个字段都为空，则通过验证
            if (firstValue == null && secondValue == null) {
                return true;
            }

            // 如果其中一个为空，则使用默认比较逻辑
            if (firstValue == null || secondValue == null) {
                return compareType == FieldCompare.CompareType.NOT_EQUALS;
            }

            // 比较逻辑
            int comparison = compare(firstValue, secondValue);

            switch (compareType) {
                case LESS_THAN:
                    return comparison < 0;
                case LESS_THAN_OR_EQUALS:
                    return comparison <= 0;
                case GREATER_THAN:
                    return comparison > 0;
                case EQUALS:
                    return comparison == 0;
                case NOT_EQUALS:
                    return comparison != 0;
                default:
                    return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @SuppressWarnings("unchecked")
    private Object getFieldValue(Object object, String fieldName) throws Exception {
        java.lang.reflect.Field field = object.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        return field.get(object);
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private int compare(Object first, Object second) {
        if (first instanceof Comparable && second instanceof Comparable) {
            return ((Comparable) first).compareTo(second);
        }
        return first.toString().compareTo(second.toString());
    }
}
```

**3.3 使用交叉字段验证的 DTO：**

```java
package cn.structured.example.dto;

import cn.structured.example.valid.FieldCompare;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 计划 DTO
 *
 * @author chuck
 * @since 2024-01-01
 */
@Data
@Schema(description = "计划DTO")
@FieldCompare(
    firstField = "startTime",
    secondField = "endTime",
    compareType = FieldCompare.CompareType.LESS_THAN,
    message = "开始时间必须早于结束时间"
)
public class PlanDTO {

    @NotBlank(message = "计划名称不能为空")
    @Schema(description = "计划名称", example = "年度计划")
    private String name;

    @NotNull(message = "开始时间不能为空")
    @Schema(description = "开始时间", example = "2024-01-01 00:00:00")
    private String startTime;

    @NotNull(message = "结束时间不能为空")
    @Schema(description = "结束时间", example = "2024-12-31 23:59:59")
    private String endTime;
}
```

**3.4 条件验证：**

```java
package cn.structured.example.valid;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * 条件必填验证注解
 * 当满足指定条件时，字段才必填
 *
 * @author chuck
 * @since 2024-01-01
 */
@Documented
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ConditionalRequiredValidator.class)
public @interface ConditionalRequired {

    /**
     * 条件字段名
     */
    String conditionField();

    /**
     * 条件字段的期望值
     */
    String[] conditionValues();

    /**
     * 错误消息
     */
    String message() default "该字段不能为空";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
```

**3.5 条件验证器：**

```java
package cn.structured.example.valid;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.lang.reflect.Field;

/**
 * 条件必填验证器
 *
 * @author chuck
 * @since 2024-01-01
 */
public class ConditionalRequiredValidator implements ConstraintValidator<ConditionalRequired, Object> {

    private String conditionField;
    private String[] conditionValues;

    @Override
    public void initialize(ConditionalRequired constraintAnnotation) {
        this.conditionField = constraintAnnotation.conditionField();
        this.conditionValues = constraintAnnotation.conditionValues();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        return true; // 由 @NotBlank/@NotNull 处理
    }

    /**
     * 在使用时配合 @NotBlank/@NotNull 的 messageExpression 使用
     * 或在 Controller 层面进行条件验证
     */
}
```

**3.6 条件验证使用示例：**

```java
package cn.structured.example.controller;

import cn.structured.example.dto.ExampleDTO;
import cn.structure.common.entity.ResResultVO;
import cn.structure.common.utils.ResultUtilSimpleImpl;
import cn.structured.example.service.IExampleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * 示例管理控制器
 *
 * @author chuck
 * @since 2024-01-01
 */
@Tag(name = "示例管理", description = "示例生命周期管理接口")
@RestController
@RequestMapping("/api/example")
@AllArgsConstructor
@Validated
public class ExampleController {

    private final IExampleService exampleService;

    @Operation(summary = "更新示例状态")
    @PutMapping("/{id}/status")
    public ResResultVO<Void> updateStatus(
            @PathVariable Long id,
            @RequestParam Integer status) {
        
        // 条件验证：如果是禁用状态，则需要提供禁用原因
        if (status == 0) {
            // 抛出业务异常或使用自定义验证
            throw new BusinessException("禁用状态必须提供禁用原因");
        }
        
        exampleService.updateStatus(id, status);
        return ResultUtilSimpleImpl.success(null);
    }
}
```

**3.7 级联验证（嵌套对象验证）：**

```java
package cn.structured.example.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

/**
 * 订单 DTO
 *
 * @author chuck
 * @since 2024-01-01
 */
@Data
@Schema(description = "订单DTO")
public class OrderDTO {

    @NotNull(message = "订单ID不能为空")
    @Schema(description = "订单ID", example = "1")
    private Long orderId;

    @NotBlank(message = "客户名称不能为空")
    @Schema(description = "客户名称", example = "张三")
    private String customerName;

    @Valid  // 开启级联验证
    @NotNull(message = "收货地址不能为空")
    @Schema(description = "收货地址")
    private AddressDTO address;

    @Valid  // 开启级联验证
    @Schema(description = "订单明细")
    private List<OrderItemDTO> items;
}

/**
 * 收货地址 DTO
 */
@Data
@Schema(description = "收货地址DTO")
class AddressDTO {

    @NotBlank(message = "收货人不能为空")
    @Schema(description = "收货人", example = "李四")
    private String receiver;

    @NotBlank(message = "手机号不能为空")
    @Schema(description = "手机号", example = "13800138000")
    private String phone;

    @NotBlank(message = "详细地址不能为空")
    @Schema(description = "详细地址", example = "XX市XX区XX街道XX号")
    private String detailAddress;
}

/**
 * 订单明细 DTO
 */
@Data
@Schema(description = "订单明细DTO")
class OrderItemDTO {

    @NotNull(message = "商品ID不能为空")
    @Schema(description = "商品ID", example = "100")
    private Long productId;

    @NotNull(message = "数量不能为空")
    @Schema(description = "数量", example = "1")
    private Integer quantity;
}
```

##### 4. 常用验证注解说明

| 注解 | 说明 | 示例 |
|------|------|------|
| `@NotNull` | 不能为 null | `@NotNull(message = "不能为空")` |
| `@NotBlank` | 不能为空字符串 | `@NotBlank(message = "不能为空")` |
| `@NotEmpty` | 不能为空（集合/数组） | `@NotEmpty(message = "不能为空")` |
| `@Size` | 长度/大小范围 | `@Size(min=2, max=32)` |
| `@Min` / `@Max` | 数值最小/最大值 | `@Min(0)`, `@Max(150)` |
| `@DecimalMin` / `@DecimalMax` | BigDecimal 最小/最大值 | `@DecimalMin("0.01")` |
| `@Email` | 邮箱格式 | `@Email` |
| `@Pattern` | 正则表达式 | `@Pattern(regexp = "^1[3-9]\\d{9}$")` |
| `@Length` | 字符串长度（Hibernate Validator） | `@Length(min=2, max=32)` |
| `@Range` | 数值范围（Hibernate Validator） | `@Range(min=0, max=100)` |
| `@Valid` | 开启级联验证 | `@Valid private AddressDTO address;` |

#### Swagger 文档示例

使用 SpringDoc OpenAPI 生成 API 文档，提供交互式 API 文档界面。

##### 1. 依赖配置

**在 `structure-example-dependencies` 的 pom.xml 中添加：**

```xml
<properties>
    <springdoc.version>3.0.3</springdoc.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>${springdoc.version}</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

**在 `structure-example-api` 的 pom.xml 中添加：**

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
</dependency>
```

##### 2. 配置文件

```yaml
springdoc:
  api-docs:
    enabled: true
    path: /v3/api-docs
  swagger-ui:
    enabled: true
    path: /swagger-ui.html
    tags-sorter: alpha
    operations-sorter: alpha
  group-configs:
    - group: 'example'
      packages-to-scan: cn.structured.example.controller
    - group: 'user'
      packages-to-scan: cn.structured.user.controller
```

##### 3. OpenAPI 全局配置类

```java
package cn.structured.example.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI 全局配置
 *
 * @author chuck
 * @since 2024-01-01
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("示例系统 API")
                .description("示例系统 API 文档，包含了所有的业务接口说明，包括示例管理、用户管理等功能模块")
                .version("1.0.0")
                .contact(new Contact()
                    .name("技术支持团队")
                    .email("support@example.com")
                    .url("https://example.com"))
                .license(new License()
                    .name("Apache 2.0")
                    .url("https://www.apache.org/licenses/LICENSE-2.0")))
            .servers(List.of(
                new Server().url("http://localhost:8080").description("开发环境"),
                new Server().url("https://api.example.com").description("生产环境")
            ))
            .components(new Components()
                .addSecuritySchemes("bearerAuth", 
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                        .description("输入 JWT Token 进行认证"))
                .addSecuritySchemes("apiKey", 
                    new SecurityScheme()
                        .type(SecurityScheme.Type.APIKEY)
                        .in(SecurityScheme.In.HEADER)
                        .name("X-API-Key")
                        .description("API Key 认证")))
            .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}
```

##### 4. 实用场景示例：完整的用户管理接口

**4.1 统一响应 VO：**

```java
package cn.structure.common.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 统一响应结果
 *
 * @author chuck
 * @since 2024-01-01
 */
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

    public static <T> ResResultVO<T> success(T data) {
        ResResultVO<T> result = new ResResultVO<>();
        result.setCode(200);
        result.setMessage("操作成功");
        result.setData(data);
        result.setTimestamp(System.currentTimeMillis());
        return result;
    }
}
```

**4.2 分页结果 VO：**

```java
package cn.structure.common.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

/**
 * 分页结果 VO
 *
 * @author chuck
 * @since 2024-01-01
 */
@Data
@Schema(description = "分页结果")
public class PageVO<T> {

    @Schema(description = "当前页", example = "1")
    private Integer currentPage;

    @Schema(description = "每页数量", example = "10")
    private Integer pageSize;

    @Schema(description = "总记录数", example = "100")
    private Long total;

    @Schema(description = "总页数", example = "10")
    private Integer pages;

    @Schema(description = "数据列表")
    private List<T> records;
}
```

**4.3 用户查询 DTO：**

```java
package cn.structured.user.query;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 用户查询 DTO
 *
 * @author chuck
 * @since 2024-01-01
 */
@Data
@Schema(description = "用户查询条件")
public class UserQuery {

    @Schema(description = "用户名/姓名", example = "张三")
    private String keyword;

    @Schema(description = "状态：0-禁用，1-启用", example = "1")
    private Integer status;

    @Schema(description = "当前页", example = "1")
    private Integer currentPage = 1;

    @Schema(description = "每页数量", example = "10")
    private Integer pageSize = 10;
}
```

**4.4 用户创建 DTO：**

```java
package cn.structured.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * 创建用户 DTO
 *
 * @author chuck
 * @since 2024-01-01
 */
@Data
@Schema(description = "创建用户请求参数")
public class CreateUserDTO {

    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 32, message = "用户名长度为3-32个字符")
    @Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9_]*$", message = "用户名必须以字母开头，只能包含字母、数字和下划线")
    @Schema(description = "用户名", example = "zhangsan")
    private String username;

    @NotBlank(message = "真实姓名不能为空")
    @Size(min = 1, max = 64, message = "真实姓名为1-64个字符")
    @Schema(description = "真实姓名", example = "张三")
    private String realName;

    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 32, message = "密码长度为6-32个字符")
    @Schema(description = "密码", example = "******")
    private String password;

    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    @Schema(description = "手机号", example = "13800138000")
    private String phone;

    @Email(message = "邮箱格式不正确")
    @Schema(description = "邮箱", example = "zhangsan@example.com")
    private String email;

    @NotNull(message = "部门ID不能为空")
    @Min(value = 1, message = "部门ID必须大于0")
    @Schema(description = "部门ID", example = "1")
    private Long deptId;
}
```

**4.5 用户响应 VO：**

```java
package cn.structured.user.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户响应 VO
 *
 * @author chuck
 * @since 2024-01-01
 */
@Data
@Schema(description = "用户信息")
public class UserVO {

    @Schema(description = "用户ID", example = "1")
    private Long id;

    @Schema(description = "用户名", example = "zhangsan")
    private String username;

    @Schema(description = "真实姓名", example = "张三")
    private String realName;

    @Schema(description = "手机号", example = "13800138000")
    private String phone;

    @Schema(description = "邮箱", example = "zhangsan@example.com")
    private String email;

    @Schema(description = "部门ID", example = "1")
    private Long deptId;

    @Schema(description = "部门名称", example = "技术部")
    private String deptName;

    @Schema(description = "状态：0-禁用，1-启用", example = "1")
    private Integer status;

    @Schema(description = "创建时间", example = "2024-01-01 10:00:00")
    private LocalDateTime createTime;

    @Schema(description = "最后登录时间", example = "2024-01-01 10:00:00")
    private LocalDateTime lastLoginTime;
}
```

**4.6 控制器实现：**

```java
package cn.structured.user.controller;

import cn.structure.common.entity.ResResultVO;
import cn.structure.common.utils.ResultUtilSimpleImpl;
import cn.structure.common.vo.PageVO;
import cn.structured.user.dto.CreateUserDTO;
import cn.structured.user.dto.UpdateUserDTO;
import cn.structured.user.query.UserQuery;
import cn.structured.user.service.IUserService;
import cn.structured.user.vo.UserVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 用户管理控制器
 *
 * @author chuck
 * @since 2024-01-01
 */
@Tag(name = "用户管理", description = "用户生命周期管理接口，包含用户的新增、编辑、查询、删除等功能")
@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private final IUserService userService;

    @Operation(summary = "分页查询用户列表", description = "支持按用户名、姓名、手机号等条件进行分页查询")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "查询成功",
            content = @Content(schema = @Schema(implementation = PageVO.class))),
        @ApiResponse(responseCode = "400", description = "参数错误"),
        @ApiResponse(responseCode = "500", description = "服务器错误")
    })
    @GetMapping("/page")
    public ResResultVO<PageVO<UserVO>> page(UserQuery query) {
        return ResultUtilSimpleImpl.success(userService.page(query));
    }

    @Operation(summary = "获取用户详情", description = "根据用户ID获取用户的详细信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "查询成功",
            content = @Content(schema = @Schema(implementation = UserVO.class))),
        @ApiResponse(responseCode = "404", description = "用户不存在")
    })
    @GetMapping("/{id}")
    public ResResultVO<UserVO> getById(
            @Parameter(description = "用户ID", required = true, example = "1")
            @PathVariable Long id) {
        return ResultUtilSimpleImpl.success(userService.findById(id));
    }

    @Operation(summary = "创建用户", description = "创建一个新的用户账号，初始密码为必填项")
    @PostMapping
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "创建成功",
            content = @Content(schema = @Schema(description = "返回新创建的用户ID", example = "100"))),
        @ApiResponse(responseCode = "400", description = "参数错误（用户名已存在、密码格式不正确等）"),
        @ApiResponse(responseCode = "500", description = "服务器错误")
    })
    public ResResultVO<Long> create(
            @Parameter(description = "创建用户请求参数", required = true)
            @Valid @RequestBody CreateUserDTO dto) {
        return ResultUtilSimpleImpl.success(userService.create(dto));
    }

    @Operation(summary = "更新用户", description = "更新用户的基本信息，不包括密码")
    @PutMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "更新成功"),
        @ApiResponse(responseCode = "400", description = "参数错误"),
        @ApiResponse(responseCode = "404", description = "用户不存在")
    })
    public ResResultVO<Void> update(
            @Parameter(description = "用户ID", required = true, example = "1")
            @PathVariable Long id,
            @Parameter(description = "更新用户请求参数", required = true)
            @Valid @RequestBody UpdateUserDTO dto) {
        userService.update(id, dto);
        return ResultUtilSimpleImpl.success(null);
    }

    @Operation(summary = "删除用户", description = "根据用户ID删除用户，支持批量删除")
    @DeleteMapping("/{ids}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "删除成功"),
        @ApiResponse(responseCode = "400", description = "参数错误"),
        @ApiResponse(responseCode = "404", description = "用户不存在")
    })
    public ResResultVO<Void> delete(
            @Parameter(description = "用户ID，多个用逗号分隔", required = true, example = "1,2,3")
            @PathVariable String ids) {
        userService.delete(ids);
        return ResultUtilSimpleImpl.success(null);
    }

    @Operation(summary = "重置密码", description = "重置用户密码为默认密码123456")
    @PutMapping("/{id}/reset-password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "密码重置成功"),
        @ApiResponse(responseCode = "404", description = "用户不存在")
    })
    public ResResultVO<Void> resetPassword(
            @Parameter(description = "用户ID", required = true, example = "1")
            @PathVariable Long id) {
        userService.resetPassword(id);
        return ResultUtilSimpleImpl.success(null);
    }
}
```

##### 5. 接口分组管理

**5.1 多模块分组配置：**

```java
package cn.structured.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;

/**
 * OpenAPI 配置类
 * 配置多个接口分组，便于不同模块的 API 管理
 *
 * @author chuck
 * @since 2024-01-01
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("企业管理系统 API")
                .description("企业管理系统是一套完整的企业级管理解决方案，包含用户管理、权限管理、部门管理等功能模块")
                .version("1.0.0")
                .contact(new Contact()
                    .name("技术支持团队")
                    .email("support@example.com")
                    .url("https://example.com")))
            .servers(List.of(
                new Server().url("http://localhost:8080").description("开发环境"),
                new Server().url("https://api.example.com").description("生产环境"),
                new Server().url("https://api-test.example.com").description("测试环境")
            ));
    }
}
```

**5.2 配置文件中的分组管理：**

```yaml
springdoc:
  api-docs:
    enabled: true
    path: /v3/api-docs
  swagger-ui:
    enabled: true
    path: /swagger-ui.html
    tags-sorter: alpha
    operations-sorter: method
  group-configs:
    - group: 'user'
      packages-to-scan: cn.structured.user.controller
      description: '用户管理模块 - 用户生命周期管理'
    - group: 'dept'
      packages-to-scan: cn.structured.dept.controller
      description: '部门管理模块 - 组织架构管理'
    - group: 'role'
      packages-to-scan: cn.structured.role.controller
      description: '角色管理模块 - 角色权限管理'
    - group: 'menu'
      packages-to-scan: cn.structured.menu.controller
      description: '菜单管理模块 - 菜单权限管理'
```

##### 6. 常用注解说明

| 注解 | 位置 | 说明 | 示例 |
|------|------|------|------|
| `@Tag` | Controller | 接口模块分组 | `@Tag(name = "用户管理")` |
| `@Operation` | 方法 | 接口功能描述 | `@Operation(summary = "创建用户")` |
| `@Parameter` | 参数 | 参数说明 | `@Parameter(description = "用户ID")` |
| `@Schema` | DTO/VO | 字段说明 | `@Schema(description = "用户名", example = "zhangsan")` |
| `@ApiResponse` | 方法 | 响应结果说明 | `@ApiResponse(responseCode = "200", description = "成功")` |
| `@ApiResponses` | 方法 | 多响应结果 | `@ApiResponses(value = {...})` |
| `@RequestBody` | 方法参数 | 请求体说明 | `requestBody = @RequestBody(description = "请求参数")` |

##### 7. 访问地址

- **Swagger UI 界面**：`http://host:port/swagger-ui.html`
- **OpenAPI JSON**：`http://host:port/v3/api-docs`
- **OpenAPI YAML**：`http://host:port/v3/api-docs.yaml`
- **分组访问**：`http://host:port/swagger-ui.html?urls.primaryName=user`

### 更多组件集成示例

#### 日志组件集成示例

##### 依赖配置

在 `structure-example-dependencies` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-log-starter</artifactId>
    <version>${structure.version}</version>
</dependency>
```

在 `structure-example-api` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-log-starter</artifactId>
</dependency>
```

##### 配置文件示例

在 application.yml 中添加：

```yaml
structure:
  log:
    aop:
      enable: true
      expression: execution(public * cn.structured.example.controller..*Controller.*(..))
```

##### 使用说明

日志组件会自动通过 AOP 拦截 Controller 层的方法调用，记录请求和响应日志。通过配置 `expression` 可以指定需要拦截的包路径。

#### 安全组件集成示例

##### 基础依赖配置

在 `structure-example-dependencies` 的 pom.xml 中添加：

```xml
<properties>
    <structure-security.version>1.4.1-SNAPSHOT</structure-security.version>
</properties>

<dependencyManagement>
    <dependencies>
        <!-- JWT 安全组件 -->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-security-jwt-starter</artifactId>
            <version>${structure-security.version}</version>
        </dependency>
        
        <!-- Basic Auth 认证组件 -->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-security-basicauth-starter</artifactId>
            <version>${structure-security.version}</version>
        </dependency>
        
        <!-- 权限组件 -->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-security-permission-starter</artifactId>
            <version>${structure-security.version}</version>
        </dependency>
        
        <!-- 安全核心组件 -->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-security-core</artifactId>
            <version>${structure-security.version}</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

##### JWT 组件集成示例

**1. 在** **`structure-example-api`** **的 pom.xml 中添加依赖：**

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-security-jwt-starter</artifactId>
</dependency>
```

**2. 配置 application.yml：**

```yaml
structure:
  security:
    jwt:
      secret: your-secret-key
      expiration: 86400000 # 24小时
      header: Authorization
      prefix: "Bearer "
    ant-matchers:
      un-authenticated:
        - /api/public/**
        - /api/login
        - /swagger-ui/**
        - /v3/api-docs/**
```

**3. JWT 认证流程说明：**

JWT 组件通过 `JwtRequestFilter` 过滤器自动拦截请求，验证 JWT Token 的合法性：

- 从请求头中提取 Token
- 验证 Token 是否过期
- 从 Token 中解析用户信息和权限
- 将认证信息设置到 Spring Security 上下文中

**4. 登录接口示例：**

```java
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    
    private final ITokenService tokenService;
    
    @PostMapping("/login")
    public ResResultVO<String> login(@RequestBody LoginDTO loginDTO) {
        // 验证用户凭证
        StructureAuthUser user = authenticate(loginDTO);
        
        // 生成 JWT Token
        String token = tokenService.generateToken(user);
        
        return ResultUtilSimpleImpl.success(token);
    }
}
```

##### 资源组件集成示例

OAuth 2.0 资源服务器组件用于保护 API 资源，验证访问令牌并控制资源访问权限。

**1. 在 `structure-example-dependencies` 的 pom.xml 中添加依赖管理：**

```xml
<dependencyManagement>
    <dependencies>
        <!-- OAuth Resource 资源服务器组件 -->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-security-oauth-resource-starter</artifactId>
            <version>${structure-security.version}</version>
        </dependency>
        
        <!-- OAuth 公共组件 -->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-security-oauth-common</artifactId>
            <version>${structure-security.version}</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

**2. 在 `structure-example-api` 的 pom.xml 中添加依赖：**

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-security-oauth-resource-starter</artifactId>
</dependency>
```

**3. 配置文件示例：**

```yaml
structure:
  security:
    oauth:
      resource:
        # JWT 公钥位置配置
        jwt:
          public-key-location: classpath:public.cert
        # 或者使用签发者 URI 配置
        # issuer-uri: http://auth-server/oauth2
```

**4. 资源访问控制配置：**

资源服务器支持配置访问规则，使用 `antMatchers` 定义不同路径的访问权限：

```yaml
structure:
  security:
    oauth:
      resource:
        resource-id: example-resource
        ant-matchers:
          # 不需要认证的路径
          un-authenticated:
            - /api/public/**
            - /api/health/**
          # 基于角色的访问控制 (ROLE-角色名)
          ROLE-ADMIN:
            - /api/admin/**
          # 基于权限的访问控制 (AUTH-权限名)
          AUTH-read:
            - /api/read/**
          AUTH-write:
            - /api/write/**
```

**5. 受保护的资源接口示例：**

```java
@RestController
@RequestMapping("/api/resource")
public class ResourceController {
    
    /**
     * 需要认证才能访问
     */
    @GetMapping
    public String getResource(Authentication authentication) {
        // 获取当前认证用户信息
        String username = authentication.getName();
        return "Hello, " + username;
    }
    
    /**
     * 需要特定权限才能访问
     */
    @PreAuthorize("hasAuthority('SCOPE_read')")
    @GetMapping("/read")
    public String readResource() {
        return "Read Resource";
    }
    
    /**
     * 需要 ADMIN 角色才能访问
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin")
    public String adminResource() {
        return "Admin Resource";
    }
}
```

**6. 获取当前用户信息：**

```java
@Service
public class ResourceService {
    
    /**
     * 方式一：通过 Authentication 参数获取
     */
    public void processResource(Authentication authentication) {
        String username = authentication.getName();
        Collection<GrantedAuthority> authorities = authentication.getAuthorities();
    }
    
    /**
     * 方式二：通过 SecurityContext 获取
     */
    public void processResource2() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String username = authentication.getName();
            Object credentials = authentication.getCredentials();
        }
    }
    
    /**
     * 方式三：通过 @AuthenticationPrincipal 注解获取
     */
    @GetMapping("/user")
    public String getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        if (jwt != null) {
            return jwt.getSubject(); // 获取用户名
            // 获取JWT中的其他声明
            // jwt.getClaim("roles"); // 获取角色
        }
        return "anonymous";
    }
}
```

**7. JWT Token 验证流程：**

资源服务器通过 `ResourceServerConfig` 配置 JWT 验证：

```java
@Configuration
@EnableWebSecurity
public class ResourceServerConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> {
                // 配置不需要认证的路径
                auth.requestMatchers("/api/public/**").permitAll();
                // 配置需要认证的路径
                auth.requestMatchers("/api/admin/**").hasRole("ADMIN");
                // 其他请求都需要认证
                auth.anyRequest().authenticated();
            })
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .decoder(jwtDecoder)  // JWT 解码器
                    .jwtAuthenticationConverter(jwtAuthenticationConverter)  // JWT 转换器
                )
                .authenticationEntryPoint(authenticationEntryPoint)  // 认证失败入口
                .accessDeniedHandler(accessDeniedHandler)  // 访问拒绝处理器
            );
        
        return http.build();
    }
}
```

**8. 异常处理：**

资源服务器提供两种异常处理器：

- `AuthExceptionEntryPoint`：处理认证失败（如 Token 无效或过期）
- `CustomAccessDeniedHandler`：处理访问被拒绝（如权限不足）

**9. 与权限组件的区别：**

| 特性 | 资源组件 (OAuth Resource) | 权限组件 (Permission) |
|------|-------------------------|---------------------|
| 用途 | OAuth 2.0 资源保护 | 细粒度权限控制 |
| Token 类型 | OAuth 2.0 Access Token | 自定义权限体系 |
| 适用场景 | 微服务间认证、外部系统对接 | 业务功能权限控制 |
| 依赖 | OAuth 授权服务器 | 自建权限体系 |

**10. 典型使用场景：**

- **微服务间调用**：服务A调用服务B的受保护资源时，使用 OAuth Token 进行认证
- **开放平台**：为第三方应用提供 API 访问能力
- **SSO 单点登录**：统一认证后访问多个资源服务器

##### 权限组件集成示例

**1. 在** **`structure-example-api`** **的 pom.xml 中添加依赖：**

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-security-permission-starter</artifactId>
</dependency>
```

**2. 使用权限注解：**

```java
@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {
    
    @GetMapping
    @RequiresPermission("order:list")
    public ResResultVO<ResPage<OrderVO>> list(OrderQuery query, ReqPage reqPage) {
        return ResultUtilSimpleImpl.success(orderService.page(query, reqPage));
    }
    
    @PostMapping
    @RequiresPermissions(value = {"order:create", "order:approve"}, logical = Logical.AND)
    public ResResultVO<Long> create(@Valid @RequestBody OrderDTO dto) {
        return ResultUtilSimpleImpl.success(orderService.create(dto));
    }
    
    @DeleteMapping("/{id}")
    @RequiresRoles("SYS_ADMIN")
    public ResResultVO<Void> delete(@PathVariable Long id) {
        orderService.delete(id);
        return ResultUtilSimpleImpl.success(null);
    }
}
```

**3. 权限服务接口：**

```java
public interface IPermissionService {
    /**
     * 检查是否拥有指定权限
     * @param permission 权限标识，如 order:create
     * @return 是否拥有权限
     */
    boolean hasPermission(String permission);
    
    /**
     * 获取当前用户的所有权限
     * @return 权限集合
     */
    Set<UserPerm> getUserPermissions();
}
```

**4. 权限格式说明：**

支持的权限格式：

- `order:create` - 精确权限
- `order:*` - 资源级通配
- `*:read` - 动作级通配
- `system:order:create` - 三层权限
- `*:*:*` - 超级权限

##### 权限高级用法

**1. 自定义权限提供者：**

```java
@Component
public class CustomPermissionProvider implements IPermissionProvider {
    
    @Override
    public Set<UserPerm> getPermissions(String userId) {
        // 从数据库或其他数据源获取用户权限
        List<Permission> permissions = permissionMapper.selectByUserId(userId);
        
        return permissions.stream()
            .map(p -> new UserPerm(p.getResource(), p.getAction()))
            .collect(Collectors.toSet());
    }
}
```

**2. 权限匹配器：**

```java
// 检查用户是否拥有 order:create 权限
boolean hasPermission = permissionService.hasPermission("order:create");

// 检查用户是否拥有 order:* 权限（可以匹配 order:create, order:delete 等）
boolean hasWildcard = permissionService.hasPermission("order:*");

// 检查用户是否拥有超级权限
boolean hasSuper = permissionService.hasPermission("*:*:*");
```

##### basic auth 认证的使用方法

这个场景通常是内部系统调用时使用，不建议提供给三方和二方系统，仅限于一方系统之间使用。其引用目的是在于内部系统之间调用合法性验证。在特定场景下内部系统之间如果完全信任可以忽略，否则建议使用 basicauth 认证组件。一方系统不建议使用复杂的 oauth2 认证。

**1. 在** **`structure-example-api`** **的 pom.xml 中添加依赖：**

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-security-basicauth-starter</artifactId>
</dependency>
```

**2. 配置 application.yml：**

```yaml
structure:
  security:
    basicauth:
      enabled: true
      credentials:
        - username: internal-service-1
          password: service1-secret
        - username: internal-service-2
          password: service2-secret
      path-permission:
        enabled: true
        permissions:
          internal-service-1:
            - /api/internal/**
          internal-service-2:
            - /api/internal/**
            - /api/admin/**
```

**3. Basic Auth 认证流程：**

Basic Auth 组件通过 `BasicAuthFilter` 过滤器验证请求：

- 从请求头中提取 Basic Auth 凭证
- 验证用户名和密码
- 检查路径权限（可选）
- 将认证信息设置到 Spring Security 上下文中

**4. 内部服务调用示例：**

```java
@Service
public class InternalServiceClient {
    
    private final RestTemplate restTemplate;
    
    public OrderVO getOrder(Long orderId) {
        String url = "http://internal-service/api/orders/" + orderId;
        
        // 设置 Basic Auth 认证头
        String auth = "internal-service-1:service1-secret";
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());
        String authHeader = "Basic " + encodedAuth;
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authHeader);
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<OrderVO> response = restTemplate.exchange(url, HttpMethod.GET, entity, OrderVO.class);
        
        return response.getBody();
    }
}
```

**5. 使用工具类生成 Basic Auth：**

```java
import cn.structure.common.utils.BasicAuthGenerator;

// 生成 Basic Auth 认证头
String authHeader = BasicAuthGenerator.generate("username", "password");

// 解析 Basic Auth 认证头
String[] credentials = BasicAuthGenerator.parse(authHeader);
String username = credentials[0];
String password = credentials[1];
```

#### redis组件集成示例

##### 依赖配置

在 `structure-example-dependencies` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-redis-starter</artifactId>
    <version>${structure.version}</version>
</dependency>
```

在 `structure-example-api` 或 `structure-example-biz` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-redis-starter</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

##### 配置文件示例

```yaml
spring:
  data:
    redis:
      host: 172.24.20.15
      port: 6379
      password: 123456
      database: 0
      timeout: 10000ms
      lettuce:
        pool:
          max-active: 8
          max-idle: 8
          min-idle: 0
          max-wait: -1ms
```

##### 使用说明

Redis 组件会自动配置 RedisTemplate，可以直接注入使用：

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
    
    public void delete(String key) {
        redisTemplate.delete(key);
    }
}
```

#### redisson 组件集成示例

Redisson 是一个高级的 Redis 客户端，提供了分布式锁、分布式集合等高级功能。

##### 依赖配置

在 `structure-example-dependencies` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-redisson-starter</artifactId>
    <version>${structure.version}</version>
</dependency>
```

在 `structure-example-api` 或 `structure-example-biz` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-redisson-starter</artifactId>
</dependency>
```

##### 配置文件示例

**单体模式：**

```yaml
structure:
  redisson:
    model: single
    password: 123456
    single:
      address: redis://172.24.20.15:6379
    cache:
      key-group-name: example
```

**哨兵模式：**

```yaml
structure:
  redisson:
    model: sentinel
    password: 123456
    sentinel:
      sentinel-addresses: redis://192.168.2.138:26371,redis://192.168.2.138:26372,redis://192.168.2.138:26373
      master-name: mymaster
```

**主从模式：**

```yaml
structure:
  redisson:
    model: master-slave
    password: 123456
    master-slave:
      master-address: redis://192.168.2.138:26371
      slave-addresses: redis://192.168.2.138:26371,redis://192.168.2.138:26372,redis://192.168.2.138:26373
```

**集群模式：**

```yaml
structure:
  redisson:
    model: cluster
    cluster:
      node-addresses: redis://192.168.2.138:26371,redis://192.168.2.138:26372,redis://192.168.2.138:26373
```

##### 使用示例

**分布式锁：**

```java
@Service
@AllArgsConstructor
public class DistributedLockService {
    
    private final RedissonClient redissonClient;
    
    public void executeWithLock(String lockKey, Runnable task) {
        RLock lock = redissonClient.getLock(lockKey);
        try {
            // 尝试获取锁，最多等待10秒，锁自动释放时间为30秒
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

**分布式集合：**

```java
@Service
@AllArgsConstructor
public class DistributedCollectionService {
    
    private final RedissonClient redissonClient;
    
    public void addToMap(String mapName, String key, String value) {
        RMap<String, String> map = redissonClient.getMap(mapName);
        map.put(key, value);
    }
    
    public void addToSet(String setName, String value) {
        RSet<String> set = redissonClient.getSet(setName);
        set.add(value);
    }
}
```

#### minio 组件集成示例

这个组件是 minio 的封装，基本上在单体情况下使用，如果是分布式系统则会使用文件服务来管理对象文件。

##### 依赖配置

在 `structure-example-dependencies` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-minio-starter</artifactId>
    <version>${structure.version}</version>
</dependency>
```

在 `structure-example-api` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-minio-starter</artifactId>
</dependency>
```

##### 配置文件示例

```yaml
structure:
  minio:
    url: http://10.16.105.146:9010
    access-key: root
    secret-key: Abc123!@#
    endpoint-enable: true # 是否开启endpoint
```

##### 使用示例

```java
@Service
@AllArgsConstructor
public class FileService {
    
    private final MinioClient minioClient;
    
    public String uploadFile(String bucketName, String objectName, MultipartFile file) {
        try {
            minioClient.putObject(
                PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(objectName)
                    .stream(file.getInputStream(), file.getSize(), -1)
                    .contentType(file.getContentType())
                    .build()
            );
            return objectName;
        } catch (Exception e) {
            throw new CommonException("文件上传失败", e);
        }
    }
    
    public InputStream downloadFile(String bucketName, String objectName) {
        try {
            return minioClient.getObject(
                GetObjectArgs.builder()
                    .bucket(bucketName)
                    .object(objectName)
                    .build()
            );
        } catch (Exception e) {
            throw new CommonException("文件下载失败", e);
        }
    }
}
```

#### rabbitmq组件集成示例

##### 依赖配置

在 `structure-example-dependencies` 的 pom.xml 中添加：

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-amqp</artifactId>
            <version>${spring-boot.version}</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

在 `structure-example-api` 或 `structure-example-biz` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

##### 配置文件示例

```yaml
spring:
  rabbitmq:
    host: 172.24.20.15
    port: 5672
    username: guest
    password: guest
    virtual-host: /
    listener:
      simple:
        concurrency: 1
        max-concurrency: 5
        prefetch-count: 50
        acknowledge-mode: manual
```

##### RabbitMQ 配置类示例

```java
@Configuration
public class RabbitmqConfiguration {
    
    /**
     * 定义队列
     */
    @Bean
    public Queue messageQueue() {
        return new Queue("message.queue", true, false, false);
    }
    
    /**
     * 定义交换器
     */
    @Bean
    public DirectExchange messageExchange() {
        return new DirectExchange("message.exchange", true, false);
    }
    
    /**
     * 绑定队列和交换器
     */
    @Bean
    public Binding messageBinding() {
        return BindingBuilder
            .bind(messageQueue())
            .to(messageExchange())
            .with("message.routing.key");
    }
    
    /**
     * JSON 消息转换器
     */
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
    
    /**
     * 配置 RabbitTemplate
     */
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        rabbitTemplate.setMandatory(true);
        
        // 消息发送确认回调
        rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
            if (ack) {
                log.info("消息发送成功: {}", correlationData);
            } else {
                log.error("消息发送失败: {}, 原因: {}", correlationData, cause);
            }
        });
        
        // 消息返回回调（路由失败时）
        rabbitTemplate.setReturnCallback((message, replyCode, replyText, exchange, routingKey) -> {
            log.warn("消息路由失败: exchange={}, routingKey={}, replyText={}", 
                exchange, routingKey, replyText);
        });
        
        return rabbitTemplate;
    }
}
```

##### 生产者示例

```java
@Service
@AllArgsConstructor
@Slf4j
public class MessageProducer {
    
    private final RabbitTemplate rabbitTemplate;
    
    /**
     * 发送消息
     */
    public void sendMessage(String exchange, String routingKey, Object message) {
        log.info("发送消息到 RabbitMQ: exchange={}, routingKey={}, message={}", 
            exchange, routingKey, message);
        rabbitTemplate.convertAndSend(exchange, routingKey, message);
    }
    
    /**
     * 发送消息并等待响应
     */
    public Object sendAndReceive(String exchange, String routingKey, Object message) {
        log.info("发送消息并等待响应: exchange={}, routingKey={}", exchange, routingKey);
        return rabbitTemplate.convertSendAndReceive(exchange, routingKey, message);
    }
}
```

##### 消费者示例

```java
@Component
@Slf4j
public class MessageConsumer {
    
    /**
     * 监听队列
     */
    @RabbitListener(queues = "message.queue")
    public void handleMessage(MessageContext messageContext, Channel channel, 
                             @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag) {
        try {
            log.info("收到消息: {}", messageContext);
            
            // 处理消息
            processMessage(messageContext);
            
            // 手动确认消息
            channel.basicAck(deliveryTag, false);
        } catch (Exception e) {
            log.error("处理消息失败: {}", e.getMessage());
            try {
                // 消息处理失败，拒绝消息并重新入队
                channel.basicNack(deliveryTag, false, true);
            } catch (IOException ex) {
                log.error("拒绝消息失败: {}", ex.getMessage());
            }
        }
    }
    
    private void processMessage(MessageContext messageContext) {
        // 业务处理逻辑
    }
}
```

##### 异步消息发送示例

```java
@Component
@AllArgsConstructor
@Slf4j
public class MessageAsync {
    
    private final RabbitTemplate rabbitTemplate;
    
    /**
     * 异步发送消息
     */
    @Async(value = "messageExecutor")
    public void sendMessageAsync(MessageContext messageContext) {
        log.info("异步发送消息: {}", messageContext);
        rabbitTemplate.convertSendAndReceive(
            "message.exchange", 
            "message.routing.key", 
            messageContext
        );
        log.info("异步发送消息完成");
    }
}
```

#### 多租户组件集成示例

##### 依赖配置

在 `structure-example-dependencies` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-tenant-starter</artifactId>
    <version>${structure.version}</version>
</dependency>
```

在 `structure-example-api` 或 `structure-example-biz` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-tenant-starter</artifactId>
</dependency>
```

##### 配置文件示例

```yaml
structure:
  tenant:
    enabled: true
    # 默认租户ID，所有识别方式都失败时使用
    default-tenant-id: "1"
    # 请求头识别配置
    header:
      enabled: true
      name: "X-Tenant-Id"
    # 请求参数识别配置
    param:
      enabled: true
      name: "tenantId"
    # 识别器顺序，值越小优先级越高
    resolver-order:
      - "header"
      - "param"
```

##### 使用说明

多租户组件会自动从请求头或请求参数中识别租户ID，并将其设置到租户上下文中：

```java
@Service
public class TenantService {
    
    public String getCurrentTenantId() {
        // 获取当前租户ID
        return TenantContextHolder.getTenantId();
    }
    
    public void executeInTenant(String tenantId, Runnable task) {
        // 在指定租户上下文中执行任务
        TenantContextHolder.setTenantId(tenantId);
        try {
            task.run();
        } finally {
            TenantContextHolder.clear();
        }
    }
}
```

#### 数据权限组件集成示例

数据权限组件提供统一的数据隔离能力，支持行级和列级的数据权限控制。

##### 依赖配置

在 `structure-example-dependencies` 的 pom.xml 中添加：

```xml
<properties>
    <structure-datascope.version>1.4.1-SNAPSHOT</structure-datascope.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-datascope-starter</artifactId>
            <version>${structure-datascope.version}</version>
        </dependency>
        
        <!-- MyBatis-Plus 数据权限拦截器 -->
        <dependency>
            <groupId>cn.structured</groupId>
            <artifactId>structure-datascope-mybatis-plus</artifactId>
            <version>${structure-datascope.version}</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

在 `structure-example-biz` 的 pom.xml 中添加：

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-datascope-starter</artifactId>
</dependency>

<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-datascope-mybatis-plus</artifactId>
</dependency>
```

##### 配置文件示例

```yaml
structure:
  data-scope:
    enabled: true
    header-name: X-DataScope-Id
    role-header-name: X-DataScope-Roles
    permission-header-name: X-DataScope-Permissions
    org-id-header-name: X-Org-Id
    dept-ids-header-name: X-Dept-Ids
    user-id-header-name: X-User-Id

```

##### 数据权限两层模型

**第一层：行级权限（Row-Level）**

控制 WHERE 条件，在 DAO 层生效：

```sql
SELECT * 
FROM orders 
WHERE org_id = 10 
  AND dept_id IN (1,2,3)
```

**第二层：列级权限（Column-Level）**

控制字段可见性，在序列化前处理：

```java
if (!dataRuleEngine.canSeeField("user.phone")) {
    user.setPhone(null);
}
```

##### 定义数据权限规则

**使用注解定义规则：**

```java
@Data
@DataScopeRule(resource = "order")
public class OrderDTO {
    private Long id;
    private String orderNo;
    
    // 角色控制：仅管理员和财务可见
    @DataScopeField(visibleIfRoleIn = {"SYS_ADMIN", "FINANCE"})
    private BigDecimal amount;
    
    // 权限控制：拥有 order:view_phone 权限可见
    @DataScopeField(visibleIfPermissionIn = {"order:view_phone"})
    private String phone;
    
    // 组合控制：角色或权限任一满足即可见
    @DataScopeField(visibleIfRoleIn = {"SYS_ADMIN"}, 
                   visibleIfPermissionIn = {"order:view_secret"})
    private String secret;
    
    // 隐藏控制：员工角色不可见
    @DataScopeField(hiddenIfRoleIn = {"EMPLOYEE"})
    private String remark;
    
    private Long orgId;
    private Long deptId;
}
```

##### MyBatis-Plus 行级权限过滤

```java
@DataScopeRule(resource = "order")
public interface OrderMapper extends BaseMapper<Order> {
    @Select("SELECT * FROM orders")
    @DataScopeRow(fields = {"org_id", "dept_id"})
    List<Order> selectAll();
}
```

##### 列级权限过滤

```java
@Service
@AllArgsConstructor
public class OrderService {
    
    private final DataRuleEngine dataRuleEngine;
    
    public OrderDTO toDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        BeanUtils.copyProperties(order, dto);
        
        // 应用列级权限规则（自动根据角色和权限过滤）
        dataRuleEngine.filter(dto, "order");
        
        return dto;
    }
    
    // 批量过滤
    public List<OrderDTO> toDTOList(List<Order> orders) {
        return orders.stream()
            .map(order -> {
                OrderDTO dto = new OrderDTO();
                BeanUtils.copyProperties(order, dto);
                dataRuleEngine.filter(dto, "order");
                return dto;
            })
            .collect(Collectors.toList());
    }
}
```

##### 数据范围上下文使用

```java
@RestController
public class DemoController {
    
    @GetMapping("/demo")
    public String demo(@RequestHeader("X-DataScope-Id") String dataScopeId) {
        // 数据范围上下文会自动从请求头获取
        String currentScope = DataScopeContext.getDataScopeId();
        
        // 获取当前用户角色
        List<String> roles = DataScopeContext.getRoles();
        
        // 获取当前用户权限
        List<String> permissions = DataScopeContext.getPermissions();
        
        // 检查是否拥有指定角色
        boolean isAdmin = DataScopeContext.hasRole("SYS_ADMIN");
        
        // 检查是否拥有指定权限
        boolean canViewAmount = DataScopeContext.hasPermission("order:view_amount");
        
        return "Current datascope: " + currentScope;
    }
}
```

##### 手动检查字段可见性

```java
// 检查字段是否可见（基于角色和权限）
boolean canSeeAmount = dataRuleEngine.canSeeField("order", "amount");

// 检查用户是否拥有角色
boolean hasRole = DataScopeContext.hasRole("SYS_ADMIN");

// 检查用户是否拥有权限
boolean hasPermission = DataScopeContext.hasPermission("order:view_amount");

// 检查用户是否拥有任意角色
boolean hasAnyRole = DataScopeContext.hasAnyRole("SYS_ADMIN", "FINANCE");

// 检查用户是否拥有任意权限
boolean hasAnyPermission = DataScopeContext.hasAnyPermission("order:view_amount", "order:view_secret");
```

##### HTTP 请求示例

**基于角色的请求：**

```bash
# 员工访问（看不到 amount, phone, secret）
curl -H "X-DataScope-Id: scope-1" \
     -H "X-DataScope-Roles: EMPLOYEE" \
     -H "X-Org-Id: 10" \
     -H "X-User-Id: user-001" \
     http://localhost:8080/api/orders

# 财务访问（可以看到 amount）
curl -H "X-DataScope-Id: scope-2" \
     -H "X-DataScope-Roles: FINANCE" \
     -H "X-Org-Id: 10" \
     http://localhost:8080/api/orders

# 管理员访问（可以看到所有字段）
curl -H "X-DataScope-Id: scope-3" \
     -H "X-DataScope-Roles: SYS_ADMIN" \
     -H "X-Org-Id: 10" \
     http://localhost:8080/api/orders
```

**基于权限的请求：**

```bash
# 拥有查看金额权限
curl -H "X-DataScope-Id: scope-4" \
     -H "X-DataScope-Roles: EMPLOYEE" \
     -H "X-DataScope-Permissions: order:view_amount" \
     -H "X-Org-Id: 10" \
     http://localhost:8080/api/orders

# 拥有多个权限
curl -H "X-DataScope-Id: scope-5" \
     -H "X-DataScope-Roles: EMPLOYEE" \
     -H "X-DataScope-Permissions: order:view_amount,order:view_phone,order:view_secret" \
     -H "X-Org-Id: 10" \
     http://localhost:8080/api/orders
```

