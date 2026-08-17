# gvm 版本管理指南

## 目录
- [gvm 简介](#gvm-简介)
  - [平台支持](#平台支持)
  - [与其他方案对比](#与其他方案对比)
- [前置依赖](#前置依赖)
  - [macOS](#macos)
  - [Linux](#linux)
  - [Windows (WSL)](#windows-wsl)
- [gvm 安装](#gvm-安装)
  - [执行安装脚本](#执行安装脚本)
  - [配置 shell](#配置-shell)
  - [验证安装](#验证安装)
- [Go 版本管理](#go-版本管理)
  - [查看可安装版本](#查看可安装版本)
  - [安装 Go 版本](#安装-go-版本)
  - [切换版本](#切换版本)
  - [卸载版本](#卸载版本)
- [pkgset 包环境隔离](#pkgset-包环境隔离)
- [gvm 与环境变量](#gvm-与环境变量)
- [项目级版本约定](#项目级版本约定)
- [升级与卸载 gvm](#升级与卸载-gvm)
- [常见问题](#常见问题)
- [命令速查](#命令速查)

---

## gvm 简介

gvm (Go Version Manager) 是 Go 的多版本管理工具，可以在同一台机器上安装多个 Go 版本并快速切换，同时通过 pkgset 隔离不同项目的依赖目录。

Structure 生态中的项目跨越多个 Go 版本（如 structure-boot 与部分微服务组件的最低版本要求不同），推荐统一使用 gvm 管理本地 Go 版本，避免反复重装 Go 或手工改 `GOROOT`。

### 平台支持

| 平台 | 支持情况 |
|------|----------|
| macOS (Intel / Apple Silicon) | 支持 |
| Linux (Debian/Ubuntu/CentOS/RHEL) | 支持 |
| Windows | 不直接支持，需在 WSL2 中使用 |

> gvm 是纯 shell 实现，依赖 bash/zsh，因此不支持原生 Windows（PowerShell/CMD）。Windows 用户请在 WSL2 中安装，或改用 [goenv](/dev-env/go#goenv)、[GOTOOLCHAIN](/dev-env/go#gotoolchain-内置工具链管理)。

### 与其他方案对比

| 方案 | 多版本切换 | 依赖隔离 | Windows 原生 | 适用场景 |
|------|-----------|---------|-------------|---------|
| **gvm** | 支持 | 支持 (pkgset) | 不支持 | 需要在多个 Go 版本间频繁切换 |
| goenv | 支持 | 不支持 | 不支持 | 偏好 pyenv/rbenv 风格，需目录级自动切换 |
| GOTOOLCHAIN | 自动按 `go.mod` 切换 | 不适用 | 支持 | Go 1.21+，只需按项目跟随工具链版本 |
| Homebrew / 官方包 | 需手工处理 | 不适用 | 支持 | 只用单一 Go 版本 |

---

## 前置依赖

gvm 在从源码编译 Go 时需要编译工具链。即使只使用二进制安装（`-B`），也建议先装好 `git` 与 `curl`。

### macOS

```bash
# 安装 Xcode 命令行工具
xcode-select --install

# 安装编译依赖 (mercurial 用于拉取较早的 Go 版本源码)
brew install mercurial
```

### Linux

```bash
# Debian / Ubuntu
sudo apt-get update
sudo apt-get install -y curl git mercurial make binutils bison gcc build-essential

# CentOS / RHEL
sudo yum install -y curl git make bison gcc glibc-devel

# Alpine
apk add --no-cache curl git mercurial make bison gcc musl-dev bash
```

### Windows (WSL)

```powershell
# 以管理员身份安装 WSL2 (Ubuntu)
wsl --install -d Ubuntu
```

安装完成后进入 WSL 终端，按上面的 Linux 步骤准备依赖，再继续安装 gvm。

---

## gvm 安装

### 执行安装脚本

```bash
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
```

脚本会将 gvm 安装到 `$HOME/.gvm`，并尝试自动向 shell 配置文件追加 source 语句。

### 配置 shell

若安装脚本未自动写入，或使用的是 zsh，需要手动追加：

```bash
# zsh
echo '[[ -s "$HOME/.gvm/scripts/gvm" ]] && source "$HOME/.gvm/scripts/gvm"' >> ~/.zshrc
source ~/.zshrc

# bash
echo '[[ -s "$HOME/.gvm/scripts/gvm" ]] && source "$HOME/.gvm/scripts/gvm"' >> ~/.bashrc
source ~/.bashrc
```

> **注意**：gvm 会接管 `GOROOT`、`GOPATH` 和 `PATH`。若之前在 `~/.zshrc` / `~/.bashrc` 中手工写死了 `export GOROOT=...`、`export GOPATH=...`，请删除或注释掉这些行，否则切换版本后 `go` 命令仍指向旧安装。

### 验证安装

```bash
gvm version
```

---

## Go 版本管理

### 查看可安装版本

```bash
# 列出全部可安装版本
gvm listall

# 只看 1.22 系列
gvm listall | grep go1.22
```

若列表中缺少最近发布的版本，先更新 gvm 自身的版本索引：

```bash
gvm get
```

### 安装 Go 版本

推荐使用 `-B`（binary）从官方下载预编译包，速度快且不需要本地编译：

```bash
# 安装指定版本 (二进制方式，推荐)
gvm install go1.22.0 -B

# 安装多个版本
gvm install go1.21.13 -B
gvm install go1.23.4 -B
```

如需从源码编译（例如目标平台没有官方二进制包），Go 1.5+ 需要一个 Go 引导编译器：

```bash
# 1. 先用二进制方式装一个引导版本
gvm install go1.20.14 -B
gvm use go1.20.14

# 2. 指定引导编译器
export GOROOT_BOOTSTRAP=$GOROOT

# 3. 从源码编译目标版本
gvm install go1.22.0
```

查看已安装版本：

```bash
gvm list
```

### 切换版本

```bash
# 仅在当前 shell 会话生效
gvm use go1.22.0

# 切换并设为默认版本 (新开终端同样生效)
gvm use go1.22.0 --default

# 验证
go version
go env GOROOT
```

### 卸载版本

```bash
# 卸载指定版本 (保留其 pkgset 数据)
gvm uninstall go1.21.13
```

---

## pkgset 包环境隔离

pkgset 为同一个 Go 版本提供多套独立的 `GOPATH`，可以让不同项目的 `$GOPATH/bin` 工具与 `$GOPATH/pkg` 缓存互不干扰。

```bash
# 先选定 Go 版本
gvm use go1.22.0

# 创建 pkgset
gvm pkgset create structure-boot

# 切换到该 pkgset
gvm pkgset use structure-boot

# 查看当前版本下的所有 pkgset
gvm pkgset list

# 删除 pkgset
gvm pkgset delete structure-boot
```

每个 Go 版本都自带一个 `global` pkgset，其中安装的包对该版本下所有 pkgset 可见：

```bash
gvm pkgset use global
go install golang.org/x/tools/cmd/goimports@latest
```

查看/修改当前 pkgset 的环境：

```bash
gvm pkgenv
```

> Go Modules 已经解决了依赖版本隔离问题，pkgset 的主要价值在于隔离 **全局安装的命令行工具**（如不同版本的 `golangci-lint`、`protoc-gen-go`）。仅做业务开发时无需刻意使用 pkgset。

---

## gvm 与环境变量

切换版本后，相关环境变量由 gvm 自动指向当前版本目录：

| 变量 | gvm 管理下的取值 |
|------|-----------------|
| `GOROOT` | `$HOME/.gvm/gos/<version>` |
| `GOPATH` | `$HOME/.gvm/pkgsets/<version>/<pkgset>` |
| `PATH` | 自动插入当前版本的 `$GOROOT/bin` 与 `$GOPATH/bin` |

GOPROXY 等配置不属于版本范畴，但 `go env -w` 写入的是 `GOENV` 指向的全局配置文件，切换版本后仍然保留，只需配置一次：

```bash
go env -w GOPROXY=https://goproxy.cn,direct
```

详见 [GOPROXY 配置](/dev-env/go#goproxy-配置)。

---

## 项目级版本约定

gvm 本身不支持进入目录时自动切换版本。团队协作推荐两种做法：

**方式一：go.mod + GOTOOLCHAIN（推荐）**

在 `go.mod` 中声明版本，由 Go 1.21+ 的工具链机制自动对齐，gvm 只负责提供一个基础版本：

```
// go.mod
go 1.22.0
```

```bash
go env -w GOTOOLCHAIN=auto
```

**方式二：在项目文档/脚本中固定 gvm 命令**

```bash
# Makefile 或 scripts/dev-env.sh
gvm use go1.22.0 --default
gvm pkgset use structure-boot
```

---

## 升级与卸载 gvm

```bash
# 升级 gvm 自身
gvm get

# 完全卸载 gvm (会删除 ~/.gvm 下所有 Go 版本与 pkgset)
gvm implode
```

`gvm implode` 不会清理 shell 配置文件中的 source 语句，需手动从 `~/.zshrc` / `~/.bashrc` 中删除：

```bash
[[ -s "$HOME/.gvm/scripts/gvm" ]] && source "$HOME/.gvm/scripts/gvm"
```

---

## 常见问题

### gvm 命令找不到 (command not found: gvm)

shell 配置未生效。确认 source 语句已写入当前 shell 使用的配置文件（zsh 是 `~/.zshrc`，bash 登录 shell 可能读取 `~/.bash_profile` 而非 `~/.bashrc`），然后重新加载：

```bash
source ~/.zshrc
gvm version
```

### 切换版本后 go version 没变

通常是 PATH 中存在其他方式安装的 Go，且优先级更高。

```bash
# 查看实际使用的 go
which -a go
```

处理方式：

```bash
# 移除 Homebrew 安装的 go
brew uninstall go

# 或确认 gvm 的 source 语句位于 rc 文件中自定义 PATH 设置之后
```

同时检查 rc 文件中是否残留手工 `export GOROOT=/usr/local/go`。

### listall 看不到新版本

```bash
gvm get
gvm listall | tail -20
```

### Apple Silicon 上安装老版本失败

Go 官方从 1.16 起才提供 `darwin/arm64` 二进制包。在 M 系列芯片上安装 1.16 之前的版本时，`-B` 会因找不到对应架构的包而失败。可改为安装 `amd64` 版本并通过 Rosetta 运行，或直接使用 1.16+ 版本。

```bash
# 强制安装 amd64 二进制 (需已安装 Rosetta 2)
gvm install go1.15.15 -B --with-build-tools
```

### 源码编译报 GOROOT_BOOTSTRAP 相关错误

Go 1.5+ 用 Go 自身编写编译器，编译需要已有的 Go。按 [安装 Go 版本](#安装-go-版本) 中的引导步骤先装一个二进制版本并设置 `GOROOT_BOOTSTRAP`，或直接使用 `-B` 避免编译。

### 网络导致安装脚本或版本下载失败

```bash
# 若 raw.githubusercontent.com 无法访问，可先克隆仓库再执行安装脚本
git clone https://github.com/moovweb/gvm.git ~/.gvm-src
bash ~/.gvm-src/binscripts/gvm-installer
```

版本包下载失败时，也可退回官方二进制包方式安装 Go，参见 [Go 环境配置](/dev-env/go#go-安装)。

---

## 命令速查

```bash
# gvm 自身
gvm version                     # 查看 gvm 版本
gvm get                         # 升级 gvm
gvm implode                     # 卸载 gvm 及所有版本
gvm help                        # 帮助

# 版本管理
gvm listall                     # 可安装版本
gvm list                        # 已安装版本
gvm install go1.22.0 -B         # 安装 (二进制)
gvm install go1.22.0            # 安装 (源码编译)
gvm use go1.22.0                # 当前会话切换
gvm use go1.22.0 --default      # 切换并设为默认
gvm uninstall go1.22.0          # 卸载版本

# pkgset
gvm pkgset create <name>        # 创建
gvm pkgset use <name>           # 切换
gvm pkgset list                 # 列出
gvm pkgset delete <name>        # 删除
gvm pkgenv                      # 查看/编辑当前 pkgset 环境

# 验证
go version
go env GOROOT GOPATH
```

---

## 相关文档

- [Go 环境配置与版本管理指南](/dev-env/go) — 安装、环境变量、Go Modules、GOPROXY
- [gvm 官方仓库](https://github.com/moovweb/gvm)
- [Go 官方下载页](https://go.dev/dl/)