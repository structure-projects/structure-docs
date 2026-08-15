# Git 与开发流程

本文是**所有项目形态通用**的 Git 分支、提交与变更管理规范。

## 1. 分支模型

主分支默认 `master`（替代 `main`），采用 Git Flow 分支模型：

```
master → develop → feat-* / fix-* / release-* / hotfix-*
```

| 分支 | 说明 |
|------|------|
| `master` | 主线分支，只允许 merge，保证拉取即能运行 |
| `develop` | 研发主线分支，保证研发环境可直接运行 |
| `feature-*` | 功能分支，由 develop 创建，合并回 develop |
| `release-*` | 发布分支，基于 develop，合并回 master + develop 并打 Tag |
| `hotfix-*` | 热修复分支，由 master 创建，合并回 master + develop |

**铁律**：

- **禁止**直接在 `master` 或 `develop` 上推送代码。
- **禁止** `feat-*` 直接合并到 `master`。
- 已发布的 commit 不可变，**禁止** force push 公共分支。

### 分支命名

- `feature-*`：小写前缀 + 功能编号（推荐关联任务 ID）
- `hotfix-*`：小写前缀 + Bug 编号
- `release-*`：`release-版本号`

## 2. 约定式提交（Conventional Commits）

| 值 | 描述 |
|----|------|
| `feat` | 新增功能 |
| `fix` | 修复 Bug |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 代码重构 |
| `perf` | 性能优化 |
| `test` | 测试 |
| `build` | 构建或外部依赖变更 |
| `ci` | CI 配置变更 |
| `chore` | 构建流程或辅助工具 |
| `revert` | 代码回退 |

提交信息格式：`<type>(<scope>): <subject>`，提交信息需通过约定式提交校验（CI 已配 commit-msg 钩子拦截），不要绕过校验直接 `git commit`。

## 3. 版本管理

- `X.Y.Z` 三段式语义化版本：
  - X = 架构版本（模块拆分/合并、框架大版本升级）
  - Y = 功能版本（新增功能）
  - Z = 修复版本（Bug 修复，每次必增）
- 版本号不可重复、不可回退。
- 开发阶段使用 `{X}.{Y}.{Z}-SNAPSHOT`。
- Maven 版本号用 `${revision}` CI-friendly 方式管理。

## 4. 变更分级

按变更大小走不同流程：

| 级别 | 触发场景 | 流程 |
|------|----------|------|
| **trivial** | typo、文档、格式 | 直接改 + changelog |
| **minor** | 小功能调整、简单 bug | 简化 proposal（5 字段） |
| **major** | 新功能、架构调整 | 完整 proposal + design + tasks |
| **hotfix** | 生产紧急修复 | 极简 proposal + 事后 24h 补全 + 复盘 |

**流程默认**：

- 动手写代码前先写一份变更提案（`changes/proposals/<id>/proposal.md`），记录要做什么、怎么做。
- 部署前做好验证，不要直接操作生产环境；生产环境操作需先确认。
- 变更完成后归档，并更新 changelog。

## 5. 文档与开发前置验证

编码前先完成验证：

1. 确认目标版本号（X/Y/Z 哪段自增）。
2. 验证设计文档存在（`docs/features/` 下对应详细设计）。
3. 确认预期交付物清单。
4. 设计文档缺失或版本号不明时**禁止编码**。

每次变更写入 `docs/{version}/changelog/{序号}.md`。

## 6. 相关页面

- 环境与 IDE 配置：[研发团队指南](./team-guide.md)
- 项目选型：[项目形态选型与创建](./project-scaffolding.md)
