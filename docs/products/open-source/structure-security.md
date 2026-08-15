# Structure Security

> 企业级安全认证与授权框架 · 最新版本 **1.1.5** · [GitHub](https://github.com/structure-projects/structure-security)

Structure Security 是一套基于 Spring Security 的企业级安全认证与授权框架，提供完整的 JWT 认证、权限管理、OAuth2 支持和 Basic Auth 等功能模块。

## 核心特性

- **多种认证方式**：支持 JWT、Basic Auth、OAuth2 等
- **权限管理**：基于通配符的多层级权限模型，支持多种权限获取方式
- **开箱即用**：Spring Boot Starter 自动配置，快速集成
- **高性能**：支持本地缓存、分布式权限获取等优化
- **灵活扩展**：丰富的扩展点与接口，支持自定义实现

## 技术栈

| 技术 | 说明 | 版本 |
|------|------|------|
| Spring Boot | Web 框架 | 4.0.6 |
| Spring Security | 安全框架 | 由 Spring Boot 管理 |
| JJWT | JWT 库 | 0.12.7 |
| Java | 开发语言 | 17 (LTS) |
| Maven | 构建工具 | 3.9+ |

## 兼容性

| JDK | 支持情况 |
|-----|---------|
| JDK 8-11 | ❌ 不支持（需使用 1.0.x 版本） |
| JDK 17 | ✅ 完全支持（推荐 LTS） |
| JDK 21 | ✅ 完全支持（推荐 LTS） |

## 快速引入

```xml
<dependency>
    <groupId>cn.structured</groupId>
    <artifactId>structure-security-starter</artifactId>
    <version>1.1.5</version>
</dependency>
```

> 详细用法以 [structure-security 仓库 README](https://github.com/structure-projects/structure-security) 为准。