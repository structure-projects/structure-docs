# Go 环境配置与版本管理指南

## 目录
- [Go 简介](#go-简介)
- [Go 安装](#go-安装)
  - [macOS](#macos)
  - [Linux](#linux)
  - [Windows](#windows)
- [环境变量配置](#环境变量配置)
  - [GOROOT](#goroot)
  - [GOPATH](#gopath)
  - [PATH](#path)
- [版本管理工具](#版本管理工具)
  - [gvm (Go Version Manager)](#gvm-go-version-manager)
  - [goenv](#goenv)
  - [GOTOOLCHAIN (内置工具链管理)](#gotoolchain-内置工具链管理)
- [依赖管理 (Go Modules)](#依赖管理-go-modules)
- [GOPROXY 配置](#goproxy-配置)
- [常用命令](#常用命令)

---

## Go 简介

Go（又称 Golang）是由 Google 开发的开源编程语言。安装 Go 后，需要正确配置环境变量才能正常开发和编译。

## Go 安装

### macOS

#### 方式一：使用 Homebrew (推荐)
```bash
# 安装 Homebrew (如果未安装)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Go 最新版本
brew install go

# 或安装指定版本
brew install go@1.22

# 验证安装
go version
```

#### 方式二：官方安装包
1. 访问 [Go 官网](https://go.dev/dl/) 下载 `.pkg` 安装包
2. 双击运行安装程序，按提示完成安装
3. 验证安装
```bash
go version
```

### Linux

#### 方式一：使用官方二进制包 (推荐)
```bash
# 下载最新版本 (以 1.22.x 为例，请替换为实际版本号)
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz

# 解压到 /usr/local
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz

# 配置环境变量
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
source ~/.bashrc

# 验证安装
go version
```

#### 方式二：使用包管理器
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y golang-go

# CentOS/RHEL
sudo yum install -y golang
```

### Windows

#### 方式一：官方 MSI 安装包
1. 访问 [Go 官网](https://go.dev/dl/) 下载 Windows `.msi` 安装包
2. 运行安装程序，按默认选项完成安装（安装程序会自动配置 PATH）
3. 验证安装
```cmd
go version
```

#### 方式二：使用 Chocolatey
```powershell
# 安装 Chocolatey (管理员权限)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 安装 Go
choco install golang

# 验证
go version
```

#### 方式三：使用 Scoop
```powershell
# 安装 Scoop (如果未安装)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# 安装 Go
scoop install go

# 验证
go version
```

---

## 环境变量配置

Go 开发主要涉及三个环境变量：

### GOROOT
- Go 的安装目录，包含 Go 编译器和标准库
- 使用官方安装包时通常自动设置
- 通过 `go env GOROOT` 查看

### GOPATH
- Go 的工作目录，存放源码、依赖和编译产物
- 默认值为 `$HOME/go` (macOS/Linux) 或 `%USERPROFILE%\go` (Windows)
- Go Modules 模式下不再强制依赖 GOPATH

### PATH
- 需要将 Go 的 `bin` 目录加入 PATH，以便使用 `go` 命令

#### 手动配置示例

**macOS/Linux (bash/zsh)**
```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin

# 重新加载
source ~/.zshrc
```

**Windows (系统环境变量)**
```powershell
# 通过图形界面：系统属性 -> 高级 -> 环境变量
# 或使用 PowerShell 设置用户环境变量
[Environment]::SetEnvironmentVariable("GOPATH", "$env:USERPROFILE\go", "User")
[Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:USERPROFILE\go\bin", "User")
```

#### 查看环境配置
```bash
# 查看所有 Go 环境变量
go env

# 查看单个变量
go env GOPATH
go env GOROOT
go env GOPROXY
```

---

## 版本管理工具

在需要同时使用多个 Go 版本时，可以使用版本管理工具。

### gvm (Go Version Manager)

支持 macOS 和 Linux（Windows 需在 WSL 或 Git Bash 下使用）。

```bash
# 安装 gvm
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)

# 配置环境变量
echo '[[ -s "$HOME/.gvm/scripts/gvm" ]] && source "$HOME/.gvm/scripts/gvm"' >> ~/.zshrc
source ~/.zshrc

# 安装指定 Go 版本
gvm install go1.22.0

# 切换到指定版本 (作为默认版本)
gvm use go1.22.0 --default

# 列出已安装版本
gvm list

# 列出可安装版本
gvm listall
```

### goenv

轻量级版本管理工具，类似 pyenv/rbenv。

```bash
# 安装 (macOS)
brew install goenv

# 安装 (Linux)
git clone https://github.com/syndbg/goenv.git ~/.goenv
echo 'export GOENV_ROOT="$HOME/.goenv"' >> ~/.bashrc
echo 'export PATH="$GOENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(goenv init -)"' >> ~/.bashrc
source ~/.bashrc

# 安装指定版本
goenv install 1.22.0

# 设置全局版本
goenv global 1.22.0

# 设置当前目录版本
goenv local 1.21.0

# 查看版本
goenv versions
```

### GOTOOLCHAIN (内置工具链管理)

Go 1.21+ 内置了工具链管理功能，会自动下载并使用 `go.mod` 中指定的版本。

```bash
# 查看当前工具链设置
go env GOTOOLCHAIN

# 设置为 auto (默认，按 go.mod 自动切换)
go env -w GOTOOLCHAIN=auto

# 强制使用本地版本
go env -w GOTOOLCHAIN=local

# 在 go.mod 中指定最低工具链版本
# go 1.22.0
```

---

## 依赖管理 (Go Modules)

Go 1.11+ 引入 Go Modules 作为官方依赖管理方案。

### 初始化模块
```bash
# 初始化新模块
go mod init github.com/yourname/project

# 查看 go.mod 文件内容
cat go.mod
```

### 常用依赖操作
```bash
# 添加依赖 (自动更新 go.mod 和 go.sum)
go get github.com/gin-gonic/gin

# 添加指定版本
go get github.com/gin-gonic/gin@v1.9.0

# 升级依赖
go get -u github.com/gin-gonic/gin

# 移除未使用的依赖并整理
go mod tidy

# 下载依赖到本地缓存
go mod download

# 查看依赖关系
go mod graph

# 查看为什么依赖某个包
go mod why github.com/gin-gonic/gin

# 查看依赖列表
go list -m all
```

### vendor 模式
```bash
# 将依赖复制到 vendor 目录
go mod vendor

# 使用 vendor 目录构建
go build -mod=vendor
```

---

## GOPROXY 配置

在国内网络环境下，建议配置 GOPROXY 使用国内镜像加速。

```bash
# 设置七牛云代理 (推荐)
go env -w GOPROXY=https://goproxy.cn,direct

# 或设置阿里云代理
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct

# 或使用官方代理
go env -w GOPROXY=https://proxy.golang.org,direct

# 关闭代理校验
go env -w GOSUMDB=off

# 查看当前配置
go env GOPROXY
go env GOSUMDB
```

### 私有仓库配置 (GOPRIVATE)
```bash
# 设置私有仓库 (不走代理)
go env -w GOPRIVATE=github.com/yourcompany/*

# 或设置多个
go env -w GOPRIVATE=gitlab.yourcompany.com/*,github.com/yourcompany/*
```

---

## 常用命令

```bash
# 编译
go build                    # 编译当前目录
go build -o app ./cmd/app   # 指定输出文件名

# 运行
go run main.go              # 直接运行
go run .                    # 运行当前模块

# 测试
go test                     # 运行当前包测试
go test ./...               # 运行所有测试
go test -v                  # 显示详细输出
go test -cover              # 显示覆盖率
go test -bench=.            # 运行基准测试

# 代码格式化
go fmt ./...                # 格式化代码
gofmt -w file.go            # 格式化单个文件

# 静态检查
go vet ./...                # 代码静态检查

# 安装工具
go install ./...            # 编译并安装到 $GOPATH/bin

# 清理缓存
go clean -cache             # 清理构建缓存
go clean -modcache          # 清理模块缓存

# 查看文档
go doc fmt.Println          # 查看函数文档

# 交叉编译
GOOS=linux GOARCH=amd64 go build   # 编译 Linux 版本
GOOS=windows GOARCH=amd64 go build # 编译 Windows 版本
GOOS=darwin GOARCH=arm64 go build  # 编译 macOS (Apple Silicon) 版本
```

### 查看 Go 信息
```bash
go version                  # Go 版本
go env                      # 环境变量
go env GOROOT GOPATH        # 关键路径
go list -m all              # 依赖列表
```