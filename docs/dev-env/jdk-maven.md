# SDKMAN 环境管理指南 (JDK + Maven)

## 目录
- [SDKMAN 简介](#sdkman-简介)
- [SDKMAN 安装](#sdkman-安装)
  - [Linux](#linux)
  - [macOS](#macos)
  - [Windows (WSL)](#windows-wsl)
- [SDKMAN 基本使用](#sdkman-基本使用)
- [管理 JDK 环境](#管理-jdk-环境)
  - [安装 JDK](#安装-jdk)
  - [切换 JDK 版本](#切换-jdk-版本)
  - [卸载 JDK](#卸载-jdk)
- [管理 Maven 环境](#管理-maven-环境)
  - [安装 Maven](#安装-maven)
  - [切换 Maven 版本](#切换-maven-版本)
  - [卸载 Maven](#卸载-maven)
- [Maven 配置](#maven-配置)
  - [阿里云镜像源](#阿里云镜像源)
  - [本地仓库路径](#本地仓库路径)
- [其他常用 SDKMAN 命令](#其他常用-sdkman-命令)
- [常见问题](#常见问题)

---

## SDKMAN 简介

SDKMAN (Software Development Kit Manager) 是一个用于管理多个软件开发工具包（SDK）版本的工具，主要用于 JVM 生态，支持管理：

- **JDK**：Java 开发工具包（Oracle、OpenJDK、Zulu、Temurin、GraalVM 等）
- **Maven**：Java 构建工具
- **Gradle**：Java 构建工具
- **Kotlin**、**Scala**、**Groovy**、**Ant**、**Spring Boot CLI** 等

> **平台支持**：SDKMAN 原生支持 macOS 和 Linux。Windows 需要通过 WSL (Windows Subsystem for Linux) 使用，或使用 Cygwin/Git Bash（部分支持）。

## SDKMAN 安装

SDKMAN 安装前需要安装：
- `curl` 或 `wget`
- `zip` / `unzip`

### Linux

```bash
# 安装依赖 (Ubuntu/Debian)
sudo apt update
sudo apt install -y curl zip unzip

# 安装 SDKMAN
curl -s "https://get.sdkman.io" | bash

# 或使用 wget
# wget -qO- "https://get.sdkman.io" | bash

# 重新加载配置 (自动写入 ~/.bashrc)
source "$HOME/.sdkman/bin/sdkman-init.sh"

# 验证安装
sdk version
```

### macOS

```bash
# 安装依赖
brew install curl zip unzip

# 安装 SDKMAN
curl -s "https://get.sdkman.io" | bash

# 重新加载配置
source "$HOME/.sdkman/bin/sdkman-init.sh"

# 验证安装
sdk version
```

> 如果使用 zsh，SDKMAN 初始化脚本会写入 `~/.zshrc`，执行 `source ~/.zshrc` 即可。

### Windows (WSL)

```bash
# 1. 先安装 WSL (在 PowerShell 管理员权限下)
wsl --install

# 2. 进入 WSL 后，按 Linux 方式安装 SDKMAN
sudo apt update
sudo apt install -y curl zip unzip
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# 验证
sdk version
```

---

## SDKMAN 基本使用

```bash
# 查看当前使用的 SDKMAN 版本
sdk version

# 列出所有可安装的 SDK 类型
sdk list

# 列出某个 SDK 的所有可用版本
sdk list java
sdk list maven

# 查看已安装的 SDK
sdk current
sdk current java
sdk current maven
```

---

## 管理 JDK 环境

### 安装 JDK

```bash
# 列出可安装的 JDK 发行版
sdk list java

# 安装指定发行版的 JDK
sdk install java 21.0.2-tem        # Eclipse Temurin (Adoptium) 21
sdk install java 17.0.10-tem       # Eclipse Temurin 17
sdk install java 21.0.2-oracle     # Oracle JDK 21
sdk install java 21.0.2-zulu       # Azul Zulu 21
sdk install java 21.0.2-graal      # GraalVM 21

# 安装默认推荐版本
sdk install java
```

### 切换 JDK 版本

```bash
# 切换到指定版本 (仅当前 shell 生效)
sdk use java 17.0.10-tem

# 设置默认版本 (全局生效)
sdk default java 21.0.2-tem

# 查看当前使用的 JDK 版本
sdk current java
java -version
```

### 卸载 JDK

```bash
# 卸载指定版本
sdk uninstall java 17.0.10-tem
```

---

## 管理 Maven 环境

### 安装 Maven

```bash
# 列出可安装的 Maven 版本
sdk list maven

# 安装指定版本
sdk install maven 3.9.6

# 安装最新稳定版
sdk install maven
```

### 切换 Maven 版本

```bash
# 切换到指定版本 (仅当前 shell 生效)
sdk use maven 3.9.6

# 设置默认版本 (全局生效)
sdk default maven 3.9.6

# 查看当前 Maven 版本
sdk current maven
mvn -version
```

### 卸载 Maven

```bash
# 卸载指定版本
sdk uninstall maven 3.9.6
```

---

## Maven 配置

### 阿里云镜像源

编辑 Maven 配置文件 `~/.m2/settings.xml`（或 SDKMAN 安装目录下 Maven 的 `conf/settings.xml`）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
          http://maven.apache.org/xsd/settings-1.0.0.xsd">

    <mirrors>
        <!-- 阿里云公共仓库 -->
        <mirror>
            <id>aliyunmaven</id>
            <mirrorOf>*</mirrorOf>
            <name>阿里云公共仓库</name>
            <url>https://maven.aliyun.com/repository/public</url>
        </mirror>
    </mirrors>
</settings>
```

### 本地仓库路径

默认本地仓库在 `~/.m2/repository`，可在 `settings.xml` 中自定义：

```xml
<settings>
    <localRepository>/path/to/your/repository</localRepository>
</settings>
```

### 查看 Maven 配置信息
```bash
# 查看 Maven 版本和 Java 版本
mvn -version

# 查看生效的配置
mvn help:effective-settings

# 查看本地仓库路径
mvn help:evaluate -Dexpression=settings.localRepository -q -DforceStdout
```

---

## 其他常用 SDKMAN 命令

```bash
# 安装其他 SDK (Gradle、Kotlin、Spring Boot CLI 等)
sdk install gradle 8.5
sdk install kotlin 1.9.22
sdk install springboot 3.2.2

# 更新 SDKMAN 自身
sdk selfupdate

# 强制更新 (SDKMAN 缓存过期时)
sdk selfupdate force

# 刷新 SDK 列表缓存
sdk flush

# 查看 SDKMAN 版本信息
sdk version

# 离线使用 (设置后不再联网检查)
sdk offline enable
sdk offline disable

# 查看所有当前使用的 SDK
sdk current

# 查看可升级的 SDK
sdk upgrade

# 查看帮助
sdk help
```

---

## 常见问题

### 1. SDKMAN 安装后命令找不到
```bash
# 手动执行初始化脚本
source "$HOME/.sdkman/bin/sdkman-init.sh"

# 或检查 shell 配置文件中是否包含 SDKMAN 初始化脚本
# ~/.bashrc 或 ~/.zshrc 末尾应有：
# export SDKMAN_DIR="$HOME/.sdkman"
# [[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"
```

### 2. sdk install 下载慢或失败
- SDKMAN 默认从国外服务器下载，国内可使用代理或配置 CDN
```bash
# 使用代理
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
```

### 3. 切换 JDK 后 java -version 没变化
- `sdk use` 仅对当前 shell 生效，新终端请使用 `sdk default` 设置默认版本
- 检查是否设置了全局 `JAVA_HOME`，SDKMAN 管理的 JAVA_HOME 会自动指向当前版本

### 4. 如何查看 SDKMAN 安装的 JDK 路径
```bash
# SDKMAN 安装的 SDK 都在 ~/.sdkman/candidates/ 目录下
ls ~/.sdkman/candidates/java/
ls ~/.sdkman/candidates/maven/

# JAVA_HOME 自动指向当前版本
echo $JAVA_HOME
```