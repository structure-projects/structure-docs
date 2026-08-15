# 参数验证规范

## 1. 常用验证注解

| 注解 | 说明 | 示例 |
|------|------|------|
| `@NotNull` | 不能为null | `@NotNull(message = "不能为空")` |
| `@NotBlank` | 不能为空字符串 | `@NotBlank(message = "不能为空")` |
| `@NotEmpty` | 不能为空（集合/数组） | `@NotEmpty(message = "不能为空")` |
| `@Size` | 长度/大小范围 | `@Size(min=2, max=32)` |
| `@Min` / `@Max` | 数值最小/最大值 | `@Min(0)`, `@Max(150)` |
| `@DecimalMin` / `@DecimalMax` | BigDecimal最小/最大值 | `@DecimalMin("0.01")` |
| `@Email` | 邮箱格式 | `@Email` |
| `@Pattern` | 正则表达式 | `@Pattern(regexp = "^1[3-9]\\d{9}$")` |
| `@Valid` | 开启级联验证 | `@Valid private AddressDTO address;` |

## 2. 基础DTO验证

```java
package cn.structured.example.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
@Schema(description = "示例DTO")
public class ExampleDTO {

    @NotBlank(message = "编码不能为空")
    @Size(min = 2, max = 32, message = "编码长度为2-32个字符")
    @Pattern(regexp = "^[a-z][a-z0-9_]*$", message = "编码必须小写字母开头")
    @Schema(description = "编码", example = "example_001")
    private String code;

    @NotBlank(message = "名称不能为空")
    @Size(min = 1, max = 64, message = "名称长度为1-64个字符")
    @Schema(description = "名称", example = "示例名称")
    private String name;

    @NotNull(message = "年龄不能为空")
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
}
```

## 3. 分组验证

### 3.1 验证组定义

```java
package cn.structured.example.group;

public class ValidationGroups {

    public interface Add {
    }

    public interface Update {
    }

    public interface Query {
    }

    public interface Delete {
    }
}
```

### 3.2 DTO分组使用

```java
@Data
@Schema(description = "示例DTO")
public class ExampleDTO {

    @NotNull(groups = {ValidationGroups.Update.class}, message = "ID不能为空")
    @Schema(description = "ID")
    private Long id;

    @NotBlank(groups = {ValidationGroups.Add.class}, message = "编码不能为空")
    @Schema(description = "编码")
    private String code;

    @NotBlank(message = "名称不能为空") // 通用验证，两个场景都生效
    @Schema(description = "名称")
    private String name;
}
```

### 3.3 Controller分组指定

```java
@RestController
@RequestMapping("/api/example")
@AllArgsConstructor
@Validated
public class ExampleController {

    @PostMapping
    public ResResultVO<Long> create(
            @Validated({ValidationGroups.Add.class, Default.class}) @RequestBody ExampleDTO dto) {
        return ResultUtilSimpleImpl.success(exampleService.create(dto));
    }

    @PutMapping("/{id}")
    public ResResultVO<Void> update(
            @Validated({ValidationGroups.Update.class, Default.class}) @RequestBody ExampleDTO dto) {
        exampleService.update(id, dto);
        return ResultUtilSimpleImpl.success(null);
    }
}
```

## 4. 级联验证

### 4.1 嵌套对象验证

```java
@Data
@Schema(description = "订单DTO")
public class OrderDTO {

    @NotNull(message = "订单ID不能为空")
    private Long orderId;

    @NotBlank(message = "客户名称不能为空")
    private String customerName;

    @Valid  // 开启级联验证
    @NotNull(message = "收货地址不能为空")
    private AddressDTO address;

    @Valid  // 开启级联验证
    private List<OrderItemDTO> items;
}

@Data
@Schema(description = "收货地址DTO")
class AddressDTO {

    @NotBlank(message = "收货人不能为空")
    private String receiver;

    @NotBlank(message = "手机号不能为空")
    private String phone;

    @NotBlank(message = "详细地址不能为空")
    private String detailAddress;
}
```

## 5. 自定义验证注解

### 5.1 注解定义

```java
package cn.structured.example.valid;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EnumValueValidator.class)
public @interface EnumValue {

    String message() default "值不在允许的范围内";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    Class<? extends Enum<?>> value();

    boolean ignoreCase() default false;
}
```

### 5.2 验证器实现

```java
package cn.structured.example.valid;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
            return true;
        }

        if (value instanceof String && ignoreCase) {
            return enumValues.stream()
                .anyMatch(e -> e.toString().equalsIgnoreCase((String) value));
        }
        return enumValues.contains(value);
    }
}
```

### 5.3 DTO中使用

```java
@Data
public class ExampleDTO {

    @NotNull(message = "状态不能为空")
    @EnumValue(value = StatusEnum.class, message = "状态只能是启用或禁用")
    private Integer status;

    @NotBlank(message = "类型不能为空")
    @EnumValue(value = StatusEnum.class, ignoreCase = true)
    private String type;
}
```

## 6. 异常规范

### 6.1 抛出业务异常

```java
// 推荐：使用枚举定义错误码
throw new CommonException(ExampleExceptionEnum.NOT_FOUND.getCode(),
        ExampleExceptionEnum.NOT_FOUND.getMessage());

// 禁止：直接使用字面量
throw new CommonException("100001", "示例不存在"); // 禁止
```

### 6.2 全局异常处理

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResResultVO<Void> handleValidException(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldError().getDefaultMessage();
        return ResultUtilSimpleImpl.fail("400", message);
    }

    @ExceptionHandler(CommonException.class)
    public ResResultVO<Void> handleCommonException(CommonException e) {
        return ResultUtilSimpleImpl.fail(e.getCode(), e.getMessage());
    }
}
```

