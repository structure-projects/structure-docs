# Swagger 文档规范

## 1. 依赖配置

### 1.1 dependencies模块

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

### 1.2 api模块

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
</dependency>
```

## 2. 配置文件

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
```

## 3. 常用注解

| 注解 | 位置 | 说明 | 示例 |
|------|------|------|------|
| `@Tag` | Controller | 接口模块分组 | `@Tag(name = "用户管理")` |
| `@Operation` | 方法 | 接口功能描述 | `@Operation(summary = "创建用户")` |
| `@Parameter` | 参数 | 参数说明 | `@Parameter(description = "用户ID")` |
| `@Schema` | DTO/VO | 字段说明 | `@Schema(description = "用户名", example = "zhangsan")` |
| `@ApiResponse` | 方法 | 响应结果说明 | `@ApiResponse(responseCode = "200", description = "成功")` |
| `@RequestBody` | 参数 | 请求体说明 | `@RequestBody(description = "请求参数")` |

## 4. OpenAPI全局配置

```java
package cn.structured.example.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("示例系统 API")
                .description("示例系统 API 文档")
                .version("1.0.0")
                .contact(new Contact()
                    .name("技术支持团队")
                    .email("support@example.com")))
            .servers(List.of(
                new Server().url("http://localhost:8080").description("开发环境"),
                new Server().url("https://api.example.com").description("生产环境")
            ));
    }
}
```

## 5. Controller文档注解

```java
@Tag(name = "用户管理", description = "用户生命周期管理接口，包含用户的新增、编辑、查询、删除等功能")
@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    @Operation(summary = "分页查询用户列表", description = "支持按用户名、姓名、手机号等条件进行分页查询")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "查询成功"),
        @ApiResponse(responseCode = "400", description = "参数错误"),
        @ApiResponse(responseCode = "500", description = "服务器错误")
    })
    @GetMapping("/page")
    public ResResultVO<PageVO<UserVO>> page(UserQuery query) {
        return ResultUtilSimpleImpl.success(userService.page(query));
    }

    @Operation(summary = "获取用户详情", description = "根据用户ID获取用户的详细信息")
    @GetMapping("/{id}")
    public ResResultVO<UserVO> getById(
            @Parameter(description = "用户ID", required = true, example = "1")
            @PathVariable Long id) {
        return ResultUtilSimpleImpl.success(userService.findById(id));
    }

    @Operation(summary = "创建用户", description = "创建一个新的用户账号")
    @PostMapping
    public ResResultVO<Long> create(
            @Parameter(description = "创建用户请求参数", required = true)
            @Valid @RequestBody CreateUserDTO dto) {
        return ResultUtilSimpleImpl.success(userService.create(dto));
    }

    @Operation(summary = "更新用户", description = "更新用户的基本信息，不包括密码")
    @PutMapping("/{id}")
    public ResResultVO<Void> update(
            @Parameter(description = "用户ID", required = true)
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserDTO dto) {
        userService.update(id, dto);
        return ResultUtilSimpleImpl.success(null);
    }

    @Operation(summary = "删除用户", description = "根据用户ID删除用户")
    @DeleteMapping("/{ids}")
    public ResResultVO<Void> delete(
            @Parameter(description = "用户ID，多个用逗号分隔", required = true)
            @PathVariable String ids) {
        userService.delete(ids);
        return ResultUtilSimpleImpl.success(null);
    }
}
```

## 6. DTO/VO文档注解

```java
@Data
@Schema(description = "创建用户请求参数")
public class CreateUserDTO {

    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 32, message = "用户名长度为3-32个字符")
    @Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9_]*$", message = "用户名必须以字母开头")
    @Schema(description = "用户名", example = "zhangsan")
    private String username;

    @NotBlank(message = "真实姓名不能为空")
    @Size(min = 1, max = 64, message = "真实姓名为1-64个字符")
    @Schema(description = "真实姓名", example = "张三")
    private String realName;

    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    @Schema(description = "手机号", example = "13800138000")
    private String phone;
}

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

    @Schema(description = "状态：0-禁用，1-启用", example = "1")
    private Integer status;

    @Schema(description = "创建时间", example = "2024-01-01 10:00:00")
    private LocalDateTime createTime;
}

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

## 7. 访问地址

- **Swagger UI界面**: `http://host:port/swagger-ui.html`
- **OpenAPI JSON**: `http://host:port/v3/api-docs`
- **OpenAPI YAML**: `http://host:port/v3/api-docs.yaml`
- **分组访问**: `http://host:port/swagger-ui.html?urls.primaryName=user`

