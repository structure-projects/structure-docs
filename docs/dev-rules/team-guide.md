# 研发团队开发规范指南

## 前端开发规范和指南

### 研发环境和技术栈要求

- idea ：vscode 版本不限制
- git版本：2.0 +
- vue版本：3
- node版本： 18+
- npm版本：6+
- vscode插件要求： ESLint 、Prettier、Vue - Official

### vscode配置

#### 插件安装

- 搜索 `ESLint` 并安装。ESLint 是一个强大的代码检查工具，可以帮助你发现并修复代码中的错误和潜在问题。
- 搜索 `Prettier` 并安装。Prettier 是一个代码格式化器，可以自动格式化你的代码，保持一致的代码风格。

#### 配置设置

- 打开配置：点击左上角的文件菜单，选择“首选项” > “设置”（或者使用快捷键 `Ctrl+,`）。

- 启用格式化：在设置搜索框中输入 `format on save`，找到并勾选 `"Editor: Format On Save"` 选项。这会使VSCode在每次保存文件时自动进行格式化。

- 配置settings.json

  ```json
  {
    //配置保存时按照eslint文件的规则来处理一下代码
    "editor.codeActionsOnSave": {
      "source.fixAll": "explicit",
      "eslint.autoFixOnSave": "explicit"
    },
    //prettier可以格式化很多种格式，所以需要在这里对应配置下
    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[less]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    //这个设置在ctrl+s的时候，会启用默认的格式化，这里是prettier
    "editor.formatOnSave": true,
    /*  prettier的配置,为没有配置prettier使用 */
    "prettier.printWidth": 80, // 超过最大值换行
    "prettier.tabWidth": 2, // 缩进字节数
    "prettier.useTabs": false, // 句尾添加分号
    "prettier.singleQuote": false, // 使用单引号代替双引号
    "prettier.proseWrap": "preserve", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
    "prettier.eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
    "prettier.htmlWhitespaceSensitivity": "ignore",
    "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
    "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
    "prettier.parser": "babylon", // 格式化的解析器，默认是babylon
    "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
    "prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
    "prettier.trailingComma": "none", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    "prettier.tslintIntegration": false,
    "prettier.arrowParens": "avoid"
  }
  
  ```

  重启后 Ctrl+ s保存代码时会自动格式化代码

### 前端开发代码规范

附件 阿里前端开发规范

## 后端开发规范和指南

### 后端开发技术栈和环境要求

- IDE : IntelliJ idea （版本不强制要求推荐使用 2021-2023版本内核）
- 插件要求： Lombok plugin、GenerateAllSetter、Alibaba Java Coding Guidelines、SonarLint、Commit Template
- JDK版本:  17（硬性要求，CI 使用 JDK 17）
- maven : 3.6 + 版本不限制
- git版本：2.0 +
- 持久层工具：推荐使用IntelliJ DataGrip 不强制要求
- spring boot 版本：4.0.6
- spring cloud版本：2025.1.0
- spring cloud alibaba版本：2025.1.0.0
- mybatis-plus版本：3.5.16
- mysql版本要求：8.0+ 

### idea基本配置面

#### 代码模板设置

在IDEA中找到如下的路径，配置文件模板：

File > Settings > Editor > File And Code Templates

![image-20240801110310238](/images/代码模板class类注释配置指南.png)

首先是在，includes中找到File Header这个配置模板，如果没有的话就新建一个同名文件，然后再右侧的编辑区域写上@author和@since 1.8 和 @version 

- @author 为作者信息 可以变更为实际参数 例如：@author chuck            chuck则是作者笔名
- @since 为JDK版本默认值1.8 
- @version 为这个类在这个应用所属的版本号。默认值建议写1.0后续有版本变更手动调整即可
- @since 这个是一个附加属性这边默认值为 ${DATE} ${TIME} 表示日期和时间不建议修改

```java
/**
 * ${TODO}
 *
 * @author ${USER}
 * @since 1.8
 * @version 1.0
 * @since ${DATE} ${TIME}
 */
```

#### 方法注释配置

File > Settings > Editor > Live Template

我们在 Live Template模板中新建一个模板组，这个名称我用的是我自己的笔名，这个不限制

![image-20240801114336830](/images/方法注释配置指南.png)

1. 新建一个live Template

2. 配置缩写和描述信息

3. 配置模板上下文

   ```JAVA
   **
    * 
    * $param$
    * @author chuck
    * @since $date$ $time$
    * @return $retrun$
    */
   ```
   
4. 配置所属语言范围

   选择java语言即可

5. 配置参数变量和表达式

   ![image-20240801114846048](/images/代码模板表达式配置.png)

   param 参数脚本如下

   ```groovy
   groovyScript("if(\"${_1}\".length() == 2) {return '';} else {def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList();for(i = 0; i < params.size(); i++) {if(i==0){result+='@param ' + params[i] + ' '}else{result+='\\n' + ' * @param ' + params[i] + ' '}}; return result;}", methodParameters()); 
   ```

6. 配置触发条件

### JAVA开发规范

附件 阿里JAVA开发规范（黄山版）

## 分支管理指南

### Git Flow 分支使用规范和指南

![git-flow](/images/git-flow.png)

#### Git 的常用分支介绍

- **Master** ：**主线分支** 
- **Develop** ：**开发分支**
- **Feature**:  **功能分支**。这个分支主要是用来开发一个新的功能，一旦开发完成，我们合并回 Develop 分支进入下一个
  Release。
- **Release**: **发行分支**。当你需要一个发布一个新 Release 的时候，我们基于 Develop 分支创建一个 Release 分支，完
  成 Release 后，我们合并到 Master 和 Develop 分支。
- **Hotfix**：当我们在 Production 发现新的 Bug 时候，我们需要创建一个 Hotfix, 完成 Hotfix 后，我们合
  并回 Master 和 Develop 分支，所以 Hotfix 的改动会进入下一个 Release。

#### Git Flow 各分支操作原理示意

##### **Master/Develop 分支**

- **Master分支**：所有分支都应由Master直接或间接创建、在进行发布时应在Master上创建Tag、Master分支应保证拉取即能运行。
- **Develop分支**：Develop分支由Master分支创建，他是研发主线分支应保证功能完整的完整性，要保证拉取后能在研发环境下直接运行。

Master 分支为主分支不允许Commit ，只允许merge 一般情况由其他分支merge到Master分支，下图是Master分支和Develop分支的示意图

![git-master-develop](/images/git-master-develop.png)

##### **Feature 分支**

Feature 分支是某一个功能分支，由Develop分支创建，在研发主线上附加功能，此类分支属于临时分支在个功能开发完成并合并到develop分支后方此类分支的生命周期也已经结束可选择保留观察也可以直接清理。

![Feature](/images/Feature.png)

##### Release 分支

Release 分支基于 Develop 分支创建，打完 Release 分支之后，我们可以在这个 Release 分支上测试，修改 Bug 等。同时，其它开发人员可以基于 Develop 分支新建 Feature (记住：一旦打了Release 分支之后不要从 Develop 分支上合并新的改动到 Release 分支)发布 Release 分支时，合并Release 到 Master 和Develop， 同时在 Master 分支上打个 Tag 记录 Release 版本号。

![release](/images/release.png)

##### Hotfix 分支

hotfix 分支主要是生产版本或在已经发行的版本上存在bug的情况需要创建的分支，一般情况由master创建，在修复完成后应和master和develop合并，并更新Tag版本。

![hotfix](/images/hotfix.png)



#### 分支命名规范

所有分支的命名均为小写：Master Develop 分别为两个不同的主线分支，不需要特殊命名但是也是小写命名比如：master、develop

Feature,Hotfix ,Release分支属于临时分支，命名可参考如下示例

- Feature： feature-*  ，命名格式推荐用小写前缀-功能编号，可参考禅道功能任务列表的ID和前缀组合命名（推荐）
- Hotfix： hotfix-*，命名格式推荐用小写前缀-功能编号，可参考禅道BUG列表的bug ID和前缀组合命名（推荐）
- Release: release-版本号（发行的版本）

### 约定式提交规范和使用指南

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 新增一个功能                                                 |
| fix      | 修复一个Bug                                                  |
| docs     | 文档变更                                                     |
| style    | 代码格式（不影响功能，例如空格、分号等格式修正）             |
| refactor | 代码重构                                                     |
| perf     | 改善性能                                                     |
| test     | 测试                                                         |
| build    | 变更项目构建或外部依赖（例如scopes: webpack、gulp、npm等）   |
| ci       | 更改持续集成软件的配置文件和package中的scripts命令，例如scopes: Travis, Circle等 |
| chore    | 变更构建流程或辅助工具                                       |
| revert   | 代码回退                                                     |

## 后端框架使用指南

### 工程结构

::: tip 新项目默认 DDD 7+1

新业务中心默认采用 **DDD 7+1 多模块**结构（`domain` / `infra` / `repository-mybatis` 等），详见 [DDD 架构与模式](./ddd-architecture.md) 与 [项目创建与多模块](./project-scaffolding.md)。以下为单体兼容形态。

:::

```
structure-{项目名}/                        # 项目根目录
├── structure-{项目名}-api/                # 控制层（对外暴露 REST API）
├── structure-{项目名}-biz/                # 业务层（核心业务逻辑）
├── structure-{项目名}-common/              # 公共层（DTO、VO、枚举、异常等）
└── structure-{项目名}-dependencies/        # 依赖管理（统一版本控制）
```

### 目录结构

```
cn.structured.{项目名}/
├── controller/        # REST API 控制层
│   └── assembler/     # 对象装配器（Entity ↔ DTO/VO）
├── service/           # 业务服务层（接口）
│   └── impl/          # 业务服务实现
├── manager/           # 数据管理层（封装数据访问）
│   └── impl/          # 数据管理层实现
├── mapper/            # MyBatis Mapper 接口
├── entity/            # 数据库实体类
├── dto/               # 数据传输对象（请求参数）
├── vo/                # 视图对象（响应数据）
├── query/             # 查询条件对象
├── enums/             # 枚举定义（状态码、错误码等）
├── exception/         # 自定义业务异常
├── constant/          # 常量定义
└── config/            # 配置类
resource
	db.migration			存放数据库文件，比如数据库初始化文件和版本更新文件（注意事项就是这里的版本要和数据库中的版本一致， 还有就是这里的sql为只读不要修改可以创建新的版本，如果修改了就会导致和数据库中的版本比一致启动会报错，还有就是格式化时候应该注意忽略这个文件，不要因为格式化导致你提交的代码更改了这个文件导致和数据库中的版本有冲突）
	mapper					存放dao层xml文件的位置
	generator-config.yaml	mybatis-plus 代码生成配置规则文件 建议只生成mapper 和 entity(windows 和其他系统盘符有区别，建根根据系统类型调整适合自己的生成路径，这个文件不建议提交)
```

### 依赖组件版本说明

​	spring-boot 框架版本 4.0.6

​	structure         框架版本 1.4.4      框架说明： structure 是基于 spring-boot 包装的快速开发框架（groupId: cn.structured），插件使用指南：https://www.structured.cn/boot/

源码地址 ： https://github.com/structure-projects/structure-boot.git

​			boot  单体情况下一般需要配置mybatis-plus、redis、log、jwt插件 详细的配置参考模板工程的pom.xml

​			cloud  为服务情况一般需要配置 cloud 依赖 mybatis-plus、redis、log、ouath-resource插件 详细的配置参考模板工程的pom.xml

​	hutool           工具版本 5.8.25                       工具类推荐优先使用hutool,主要是工具集完整，尽量减少依赖

​	fastjson         工具版本  1.2.83 / 2.x               JSON 序列化优先使用 FastJSON（禁止混用 Jackson/Gson）

​	lombok          工具版本 : 1.18.30                   推荐使用 lombok插件减少代码冗余和代码复杂度

> 完整依赖版本（含 spring-cloud 2025.1.0、mybatis-plus 3.5.16、springdoc 3.0.3，以及 CVE 漏洞修复版本 bouncycastle 1.84、commons-fileupload 1.6.0 等）见 `rule/02-dependency-config.md`。

### 配置文件说明

```yaml
spring:
  datasource:  # 数据库配置保留原生配置
    username: chuck
    password: Aa123456
    url: jdbc:mysql://rm-0jl94h45ehb2t04bgdo.mysql.rds.aliyuncs.com:3306/chuck_test?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
    driver-class-name: com.mysql.cj.jdbc.Driver
  redis:   # redis 原生配置
    database: 3
    password: 87Hodyu2*72k(k
    host: 8.130.133.92
  flyway:   # 数据同步工具
    enabled: true # 开启flyway
    clean-disabled: true # 禁止清理数据表
    table: flyway_schema_history # 版本控制信息表名，默认为flyway_schema_history
    out-of-order: false # 是否允许不按顺序迁移
    baseline-on-migrate: true # 如果数据库不是空表，需要设置为true，否则启动报错
    baseline-version: 1 # 和baseline-on-migrate搭配使用，小于此版本的不执行
    # schemas: 不设置使用默认Spring连接数据的地址和数据库
    validate-on-migrate: true # 执行迁移时是否自动调用验证
    locations: classpath:migration
  # 配置数据库，flyway那边就无需再进行数据的配置了
structure: # 如果您是单体这需要使用 jwt 插件 
  jwt:
    secret: 12345646
    antMatchers:
      unAuthenticated:
        # 不经过身份验证的接口
        - /api/user/login
        - /doc.html
        - /webjars/**
        - /swagger-resources/**
        - /v2/api-docs/**
  log:             # 日志插件配置
    aop:
      expression: execution(public * com.github.radium.controller..*Controller.*(..))
swagger:          # swagger 插件配置
  title: 框架API
  description: 框架基础模板
  version: v1.0.1
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      logic-delete-field: deleted #默认deleted
      logic-delete-value: 1
      logic-not-delete-value: 0

```

## 前端框架使用指南

### 前台框架目录结构

```
public 			共开资源 目前存放网站的小图标文件
src    			代码的主要存放目录
    api    		存放api接口的目录
    assets 		静态资源存放的目录
    components	框架组建存放的目录
    config		框架的配置目录
    directive	框架对权限控制的目录
    enums		框架枚举类配置目录
    lang		国际化，语言目录
    layout		layout目录
    plugins		插件目录		权限插件
    router		路由目录	
    store		store目录
    styles		样式目录		公共样式
    types		类型目录		比如公共类型
    utils		工具类目录        比如为那管理请求工具
	views		页面存放目录		
	App.vue		vue程序入口
	main.ts		程序入口
	settings.ts	框架系统配置目录比如样式
	.env.development	开发环境配置
	.env.production		生产环境配置
	Dockerfile	dockerfile文件用于打包dockek镜像的配置
	index.html	
	package.json	
	tsconfig.json
	uno.config.ts 
	vite.config.ts  vite配置
```

### 框架依赖

vue3 + element-plus  + vite

### 语法建议

推荐优先使用 vue3语法，框架中封装了 avue底代码的解决方案，部分单表逻辑可以使用这个avue框架开发，复杂页面不建议使用低代码。

