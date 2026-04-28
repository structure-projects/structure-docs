# 生态规范与开发指南

Structure 社区为开发者提供一套标准化的开发与协作规范，助力高效开发。

## 一、代码规范

### 1.1 Java 代码规范

#### 命名规范

| 类型 | 规则 | 示例 |
|------|------|------|
| 类名 | 大驼峰，首字母大写 | `UserService` |
| 方法名 | 小驼峰，首字母小写 | `getUserById` |
| 变量名 | 小驼峰，首字母小写 | `userName` |
| 常量名 | 全大写，下划线分隔 | `MAX_SIZE` |
| 包名 | 全小写，域名倒序 | `cn.structured.boot` |

#### 格式规范

- 使用 4 个空格缩进
- 每行不超过 120 字符
- 方法之间空一行
- 类成员之间空一行

#### 注释规范

```java
/**
 * 用户服务接口
 * 
 * @author Structure Team
 * @version 1.0.0
 */
public interface UserService {
    
    /**
     * 根据ID获取用户
     * 
     * @param id 用户ID
     * @return 用户信息
     * @throws IllegalArgumentException 当ID为空时
     */
    User getUserById(Long id);
}
```

### 1.2 Vue 代码规范

#### 组件命名

- 文件名使用大驼峰或短横线分隔
- 组件名使用 PascalCase

```vue
<!-- UserList.vue -->
<template>
  <div class="user-list">
    <!-- 内容 -->
  </div>
</template>
```

#### 脚本规范

```typescript
import { ref, computed } from 'vue'

export default {
  name: 'UserList',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const activeId = ref<number | null>(null)
    
    const filteredUsers = computed(() => {
      return props.users.filter(u => u.status === 'active')
    })
    
    return {
      activeId,
      filteredUsers
    }
  }
}
```

## 二、贡献流程

### 2.1 贡献步骤

```bash
# 1. Fork 仓库
# 2. 克隆到本地
git clone https://github.com/your-username/structure-boot.git

# 3. 创建特性分支
git checkout -b feature/your-feature-name

# 4. 开发并提交
git add .
git commit -m "feat: 添加XX功能"

# 5. 推送到远程
git push origin feature/your-feature-name

# 6. 创建 Pull Request
```

### 2.2 Commit 规范

采用 Conventional Commits 规范：

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 添加 Redis 分布式锁` |
| `fix` | 修复 Bug | `fix: 修复空指针异常` |
| `docs` | 文档更新 | `docs: 更新 API 文档` |
| `style` | 代码格式 | `style: 格式化代码` |
| `refactor` | 代码重构 | `refactor: 优化查询逻辑` |
| `test` | 测试相关 | `test: 添加单元测试` |

### 2.3 Pull Request 规范

1. **标题**: 清晰描述变更内容
2. **描述**: 说明变更目的、实现方案
3. **关联 Issue**: 如果修复 Issue，请引用
4. **检查清单**:
   - [ ] 代码通过 lint 检查
   - [ ] 添加了必要的测试
   - [ ] 更新了相关文档
   - [ ] 没有破坏现有功能

## 三、版本管理

### 3.1 版本号规则

采用 Semantic Versioning：

```
MAJOR.MINOR.PATCH
```

- **MAJOR**: 不兼容的 API 变更
- **MINOR**: 向后兼容的功能新增
- **PATCH**: 向后兼容的问题修复

### 3.2 发布流程

1. 更新版本号到 `pom.xml`
2. 更新 CHANGELOG.md
3. 创建 GitHub Release
4. 发布到 Maven Central

## 四、文档编写规范

### 4.1 Markdown 规范

- 使用 `#` 到 `######` 表示标题层级
- 使用反引号 `` ` `` 包裹代码片段
- 使用 ``` 包裹代码块，并指定语言
- 使用表格展示数据
- 使用有序/无序列表

### 4.2 文档结构

```
docs/
├── guide.md          # 指南文档
├── api/              # API 文档
│   ├── user.md       # 用户相关 API
│   └── order.md      # 订单相关 API
└── examples/         # 使用示例
    └── quickstart.md # 快速入门
```

## 五、开发者须知

### 5.1 环境要求

| 工具 | 版本 |
|------|------|
| JDK | 8+ |
| Maven | 3.6+ |
| Node.js | 16+ |
| npm | 8+ |

### 5.2 开发流程

1. **需求分析**: 理解需求，确定实现方案
2. **代码开发**: 遵循代码规范
3. **单元测试**: 编写测试用例
4. **代码审查**: 创建 PR，等待审查
5. **合并发布**: 通过审查后合并到主分支

### 5.3 问题反馈

遇到问题请通过以下方式反馈：

1. **GitHub Issues**: 提交详细的问题描述
2. **邮件**: 发送到 361648887@qq.com
3. **社区交流**: 关注社区动态获取帮助

> 欢迎参与社区贡献，共同推动 Structure 生态发展！