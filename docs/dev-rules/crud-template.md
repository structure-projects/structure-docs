# CRUD 代码模板规范

## 1. 命名规范速查

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

## 2. Controller模板

```java
package cn.structured.example.controller;

import cn.structure.common.entity.ResResultVO;
import cn.structure.common.utils.ResultUtilSimpleImpl;
import cn.structure.common.vo.ReqPage;
import cn.structure.common.vo.ResPage;
import cn.structured.example.dto.ExampleDTO;
import cn.structured.example.query.ExampleQuery;
import cn.structured.example.service.IexampleService;
import cn.structured.example.vo.ExampleVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "{业务}管理", description = "{业务}生命周期管理接口")
@RestController
@RequestMapping("/api/{业务名小写}")
@AllArgsConstructor
public class {业务}Controller {

    private final I{业务}Service {业务小写}Service;

    @Operation(summary = "创建{业务}")
    @PostMapping
    public ResResultVO<Long> create(@Valid @RequestBody {业务}DTO dto) {
        Long id = {业务小写}Service.create(dto);
        return ResultUtilSimpleImpl.success(id);
    }

    @Operation(summary = "更新{业务}")
    @PutMapping("/{id}")
    public ResResultVO<Void> update(
            @Parameter(description = "ID") @PathVariable Long id,
            @Valid @RequestBody {业务}DTO dto) {
        {业务小写}Service.update(id, dto);
        return ResultUtilSimpleImpl.success(null);
    }

    @Operation(summary = "删除{业务}")
    @DeleteMapping("/{id}")
    public ResResultVO<Void> delete(@Parameter(description = "ID") @PathVariable Long id) {
        {业务小写}Service.delete(id);
        return ResultUtilSimpleImpl.success(null);
    }

    @Operation(summary = "查询{业务}详情")
    @GetMapping("/{id}")
    public ResResultVO<{业务}VO> findById(@Parameter(description = "ID") @PathVariable Long id) {
        return ResultUtilSimpleImpl.success({业务小写}Service.findById(id));
    }

    @Operation(summary = "分页查询{业务}列表")
    @GetMapping("/page")
    public ResResultVO<ResPage<{业务}VO>> page({业务}Query query, ReqPage reqPage) {
        return ResultUtilSimpleImpl.success({业务小写}Service.page(query, reqPage));
    }
}
```

## 3. Service接口模板

```java
package cn.structured.example.service;

import cn.structure.common.vo.ReqPage;
import cn.structure.common.vo.ResPage;
import cn.structured.example.dto.ExampleDTO;
import cn.structured.example.query.ExampleQuery;
import cn.structured.example.vo.ExampleVO;

public interface IExampleService {

    Long create(ExampleDTO dto);

    void update(Long id, ExampleDTO dto);

    void delete(Long id);

    ExampleVO findById(Long id);

    ResPage<ExampleVO> page(ExampleQuery query, ReqPage reqPage);
}
```

## 4. Service实现模板

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
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class ExampleServiceImpl implements IExampleService {

    private final IExampleManager exampleManager;

    @Override
    public Long create(ExampleDTO dto) {
        // 验证code唯一性
        long count = exampleManager.count(Wrappers.<Example>lambdaQuery()
                .eq(Example::getCode, dto.getCode()));
        if (count > 0) {
            throw new CommonException(ExampleExceptionEnum.EXAMPLE_CODE_DUPLICATE.getCode(),
                    ExampleExceptionEnum.EXAMPLE_CODE_DUPLICATE.getMessage());
        }
        // 转换并保存
        Example entity = ExampleAssembler.assembler(dto);
        exampleManager.save(entity);
        log.info("创建成功, ID: {}", entity.getId());
        return entity.getId();
    }

    @Override
    public void update(Long id, ExampleDTO dto) {
        Example entity = exampleManager.getById(id);
        Example updateEntity = ExampleAssembler.assembler(dto);
        updateEntity.setCode(null); // 禁止修改code
        updateEntity.setId(id);
        exampleManager.updateById(updateEntity);
        log.info("更新成功, ID: {}", id);
    }

    @Override
    public void delete(Long id) {
        exampleManager.removeById(id);
        log.info("删除成功, ID: {}", id);
    }

    @Override
    public ExampleVO findById(Long id) {
        Example entity = exampleManager.getById(id);
        return ExampleAssembler.assembler(entity);
    }

    @Override
    public ResPage<ExampleVO> page(ExampleQuery query, ReqPage reqPage) {
        Page<Example> page = new Page<>(reqPage.getCurrentPage(), reqPage.getPageSize());
        LambdaQueryWrapper<Example> wrapper = Wrappers.<Example>lambdaQuery()
                .eq(null != query.getUserId(), Example::getUserId, query.getUserId())
                .eq(null != query.getDeptId(), Example::getDeptId, query.getDeptId())
                .eq(null != query.getState(), Example::getState, query.getState())
                .like(StrUtil.isNotBlank(query.getPhone()), Example::getPhone, query.getPhone())
                .like(StrUtil.isNotBlank(query.getName()), Example::getName, query.getName())
                .orderByDesc(Example::getCreateTime);
        Page<Example> result = exampleManager.page(page, wrapper);
        return ResPageConvert.convert(result, ExampleAssembler::assemble);
    }
}
```

## 5. Manager模板

### 5.1 Manager接口

```java
package cn.structured.example.manager;

import cn.structured.example.entity.Example;
import com.baomidou.mybatisplus.extension.service.IService;

public interface IExampleManager extends IService<Example> {

}
```

### 5.2 Manager实现

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

@Slf4j
@Service
@RequiredArgsConstructor
public class ExampleManagerImpl extends ServiceImpl<ExampleMapper, Example> implements IExampleManager {

    @Override
    public Example getById(Serializable id) {
        Example entity = super.getById(id);
        if (entity == null) {
            log.warn("数据不存在, ID: {}", id);
            throw new CommonException(ExampleExceptionEnum.NOT_FOUND.getCode(),
                    ExampleExceptionEnum.NOT_FOUND.getMessage());
        }
        return entity;
    }
}
```

## 6. Mapper模板

```java
package cn.structured.example.mapper;

import cn.structured.example.entity.Example;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface ExampleMapper extends BaseMapper<Example> {

}
```

## 7. Entity模板

```java
package cn.structured.example.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

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

    // 通用字段
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

## 8. Assembler模板

```java
package cn.structured.example.assembler;

import cn.structured.example.dto.ExampleDTO;
import cn.structured.example.entity.Example;
import cn.structured.example.vo.ExampleVO;

public class ExampleAssembler {

    public static Example assembler(ExampleDTO dto) {
        if (dto == null) {
            return null;
        }
        Example entity = new Example();
        // 属性映射
        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        entity.setPhone(dto.getPhone());
        entity.setSex(dto.getSex());
        entity.setState(dto.getState());
        return entity;
    }

    public static ExampleVO assembler(Example entity) {
        if (entity == null) {
            return null;
        }
        ExampleVO vo = new ExampleVO();
        // 属性映射
        vo.setId(entity.getId());
        vo.setCode(entity.getCode());
        vo.setName(entity.getName());
        vo.setPhone(entity.getPhone());
        vo.setSex(entity.getSex());
        vo.setState(entity.getState());
        vo.setCreateTime(entity.getCreateTime());
        return vo;
    }
}
```

## 9. 枚举类模板

### 9.1 错误码枚举

```java
package cn.structured.example.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * {业务}错误码枚举
 * <p>1000XX {业务}业务错误码
 */
@Getter
@AllArgsConstructor
public enum ExampleExceptionEnum {

    NOT_FOUND("100001", "{业务}不存在"),
    CODE_DUPLICATE("100002", "{业务}编码重复");

    private final String code;
    private final String message;
}
```

### 9.2 状态枚举

```java
package cn.structured.example.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExampleStateEnum {

    NORMAL(1, "正常"),
    DISABLED(2, "禁用");

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

## 10. 启动类模板

```java
package cn.structured.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication(scanBasePackages = "cn.structured.example")
@EnableFeignClients
public class ExampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExampleApplication.class, args);
    }
}
```

