# Node.js 环境配置指南 (nvm + nrm)

## 目录
- [概述](#概述)
- [nvm 简介](#nvm-简介)
- [nvm 安装](#nvm-安装)
  - [macOS](#macos)
  - [Linux](#linux)
  - [Windows](#windows)
- [nvm 使用](#nvm-使用)
  - [安装 Node.js 版本](#安装-nodejs-版本)
  - [切换 Node.js 版本](#切换-nodejs-版本)
  - [其他常用命令](#其他常用命令)
- [nrm 简介](#nrm-简介)
- [nrm 安装](#nrm-安装)
- [nrm 使用](#nrm-使用)
- [npm 常用命令](#npm-常用命令)
- [常见问题](#常见问题)

---

## 概述

Node.js 开发中通常需要：
- **nvm** (Node Version Manager)：管理多个 Node.js 版本
- **nrm** (npm registry manager)：管理 npm 镜像源/仓库地址

## nvm 简介

nvm 是一个 Node.js 版本管理工具，可以在同一台机器上安装和切换多个 Node.js 版本。

> **重要提示**：Windows 平台的 nvm 与 macOS/Linux 平台的 nvm 是**两个不同的项目**：
> - macOS/Linux 使用 [nvm-sh/nvm](https://github.com/nvm-sh/nvm)
> - Windows 使用 [coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)

## nvm 安装

### macOS

#### 方式一：使用 Homebrew (推荐)
```bash
# 安装 Homebrew (如果未安装)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 nvm
brew install nvm

# 创建 nvm 目录
mkdir ~/.nvm

# 配置环境变量 (zsh)
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"' >> ~/.zshrc

# 重新加载配置
source ~/.zshrc

# 验证安装
nvm --version
```

> 注：Intel Mac 的 Homebrew 路径为 `/usr/local/opt/nvm`，Apple Silicon Mac 为 `/opt/homebrew/opt/nvm`。

#### 方式二：使用官方安装脚本
```bash
# 使用 curl 安装
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 或使用 wget 安装
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 重新加载配置
source ~/.zshrc

# 验证安装
nvm --version
```

### Linux

#### 使用官方安装脚本 (推荐)
```bash
# 使用 curl 安装
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 或使用 wget 安装
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 脚本会自动写入 ~/.bashrc，重新加载配置
source ~/.bashrc

# 验证安装
nvm --version
```

#### 使用包管理器
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nvm
source /usr/share/nvm/nvm.sh

# 或通过 Git 手动安装
git clone https://github.com/nvm-sh/nvm.git ~/.nvm
cd ~/.nvm
git checkout v0.39.7
source ~/.nvm/nvm.sh
```

### Windows

Windows 使用 **nvm-windows**，通过安装包安装。

#### 方式一：官方安装包 (推荐)
1. 访问 [nvm-windows 发布页面](https://github.com/coreybutler/nvm-windows/releases)
2. 下载最新版本的 `nvm-setup.exe`
3. 运行安装程序，按提示完成安装（默认安装到 `C:\Users\<用户名>\AppData\Roaming\nvm`）
4. 验证安装
```cmd
nvm version
```

> **注意**：安装 nvm-windows 前请先卸载已安装的 Node.js，避免环境变量冲突。

#### 方式二：使用 Chocolatey
```powershell
# 安装 Chocolatey (管理员权限)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 安装 nvm
choco install nvm

# 验证
nvm version
```

#### 方式三：使用 Scoop
```powershell
# 安装 Scoop (如果未安装)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# 安装 nvm
scoop install nvm

# 验证
nvm version
```

---

## nvm 使用

以下命令在 macOS/Linux 的 nvm 与 Windows 的 nvm-windows 中基本一致。

### 安装 Node.js 版本
```bash
# 安装最新版本
nvm install node

# 安装最新 LTS 版本
nvm install --lts

# 安装指定版本
nvm install 20.11.0

# 安装指定大版本 (自动安装该大版本最新版)
nvm install 20
```

### 切换 Node.js 版本
```bash
# 切换到指定版本
nvm use 20.11.0

# 切换到指定大版本
nvm use 20

# 设置默认版本 (新终端默认使用)
nvm alias default 20.11.0
```

### 其他常用命令
```bash
# 查看已安装版本
nvm ls
nvm list

# 查看可安装版本
nvm ls-remote            # macOS/Linux
nvm list available       # Windows

# 查看当前版本
nvm current

# 卸载指定版本
nvm uninstall 18.19.0

# 查看某个版本安装路径
nvm which 20.11.0

# 在指定版本下运行命令
nvm run 20.11.0 app.js

# 设置别名
nvm alias my-alias 20.11.0
```

### .nvmrc 文件

在项目根目录创建 `.nvmrc` 文件指定 Node 版本，方便团队统一版本。

```bash
# 在项目根目录写入版本号
echo "20.11.0" > .nvmrc

# 使用 .nvmrc 中指定的版本
nvm use

# 或自动切换到 .nvmrc 版本 (需在 shell 配置中加入以下脚本)
# 添加到 ~/.zshrc 或 ~/.bashrc
cd() { builtin cd "$@" && [ -f .nvmrc ] && nvm use; }
```

---

## nrm 简介

nrm (npm registry manager) 是 npm 镜像源管理工具，可以快速切换 npm 仓库地址（registry），在国内网络环境下非常实用。

## nrm 安装

nrm 是全局 npm 包，需要先安装 Node.js 和 npm。

```bash
# 全局安装 nrm
npm install -g nrm

# 验证安装
nrm --version
```

## nrm 使用

### 查看可用源
```bash
# 列出所有配置的源，带 * 的为当前使用的源
nrm ls
```

输出示例：
```
* npm ---- https://registry.npmjs.org/
  yarn --- https://registry.yarnpkg.com/
  tencent- https://mirrors.cloud.tencent.com/npm/
  cnpm --- https://r.cnpmjs.org/
  taobao - https://registry.npmmirror.com/
  npmMirror https://skimnpm.skima.xyz/
```

### 切换源
```bash
# 切换到淘宝镜像 (推荐国内使用)
nrm use taobao

# 切换到官方源
nrm use npm

# 切换到腾讯镜像
nrm use tencent
```

### 测试源速度
```bash
# 测试所有源的响应速度
nrm test

# 测试指定源
nrm test taobao
```

### 添加/删除自定义源
```bash
# 添加自定义源
nrm add <name> <url>
nrm add company http://registry.company.com/

# 删除源
nrm del <name>
nrm del company

# 重命名源 (旧版 nrm)
nrm rename <oldName> <newName>
```

### 查看当前源
```bash
# 查看当前使用的源地址
nrm current
```

---

## npm 常用命令

```bash
# 查看版本
node -v
npm -v

# 初始化项目
npm init
npm init -y                # 使用默认配置

# 安装依赖
npm install                # 安装 package.json 中所有依赖
npm install <package>      # 安装依赖并写入 dependencies
npm install <package> --save-dev   # 安装开发依赖
npm install <package> -g   # 全局安装
npm install <package>@1.2.3  # 安装指定版本

# 卸载依赖
npm uninstall <package>
npm uninstall <package> -g

# 更新依赖
npm update
npm update <package>

# 查看已安装依赖
npm list
npm list -g                # 查看全局包
npm outdated               # 查看可更新依赖

# 运行脚本
npm run <script>
npm start
npm test

# 清理缓存
npm cache clean --force

# 查看配置
npm config list
npm config get registry    # 查看当前 registry

# 直接设置 registry (不使用 nrm 时)
npm config set registry https://registry.npmmirror.com/
```

---

## 常见问题

### 1. nvm 安装后命令找不到
```bash
# macOS/Linux：确保 ~/.bashrc 或 ~/.zshrc 中包含 nvm 初始化脚本
source ~/.nvm/nvm.sh
# Windows：重新打开终端或检查环境变量 NVM_HOME 和 NVM_SYMLINK
```

### 2. 切换 Node 版本后全局包丢失
- 全局包安装在每个 Node 版本对应的目录下，切换版本后全局包不共享
- 建议在项目中使用本地依赖，或使用 `nvm reinstall-packages` 迁移

```bash
# 从一个版本迁移全局包到当前版本
nvm reinstall-packages 18.19.0
```

### 3. nrm ls 显示慢或失败
- 网络问题导致，可手动添加源
```bash
nrm add taobao https://registry.npmmirror.com/
nrm use taobao
```

### 4. npm 安装慢
- 使用国内镜像源
```bash
npm config set registry https://registry.npmmirror.com/
# 或
nrm use taobao
```

### 5. Windows 下 nvm use 报权限错误
- 使用管理员权限打开终端（CMD/PowerShell）再执行 `nvm use`