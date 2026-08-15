# Conda 环境管理指南

## 目录
- [Conda 简介](#conda-简介)
  - [Anaconda 与 Miniconda](#anaconda-与-miniconda)
- [Conda 安装](#conda-安装)
  - [macOS](#macos)
  - [Linux](#linux)
  - [Windows](#windows)
- [Conda 初始化与配置](#conda-初始化与配置)
  - [初始化 shell](#初始化-shell)
  - [配置国内镜像源](#配置国内镜像源)
  - [常用配置项](#常用配置项)
- [环境管理](#环境管理)
  - [创建环境](#创建环境)
  - [激活与退出环境](#激活与退出环境)
  - [查看环境](#查看环境)
  - [克隆环境](#克隆环境)
  - [删除环境](#删除环境)
  - [导出与导入环境](#导出与导入环境)
- [包管理](#包管理)
  - [安装包](#安装包)
  - [卸载与更新包](#卸载与更新包)
  - [搜索包](#搜索包)
- [Conda 与 pip 配合使用](#conda-与-pip-配合使用)
- [常用命令速查](#常用命令速查)

---

## Conda 简介

Conda 是一个开源的包管理和环境管理工具，支持 Python、R 等多种语言。它能够创建隔离的虚拟环境，并在不同环境中安装不同版本的 Python 和依赖包，避免版本冲突。

### Anaconda 与 Miniconda

| 特性 | Anaconda | Miniconda |
|------|----------|-----------|
| 大小 | 约 3GB+（含大量预装包） | 约 100MB（仅基础） |
| 内容 | 包含 conda + 数百个科学计算包 | 仅包含 conda + Python + 基础依赖 |
| 适用场景 | 数据科学、机器学习入门 | 日常开发，按需安装包 |

> **推荐**：日常开发使用 Miniconda，更轻量、灵活，需要什么包再安装什么包。

## Conda 安装

### macOS

#### 使用 Homebrew (推荐)
```bash
# 安装 Homebrew (如果未安装)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Miniconda
brew install --cask miniconda

# 或安装 Anaconda
brew install --cask anaconda
```

#### 使用官方安装脚本
```bash
# Apple Silicon (M1/M2/M3) 下载 ARM64 版本
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh
bash Miniconda3-latest-MacOSX-arm64.sh

# Intel Mac 下载 x86_64 版本
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
bash Miniconda3-latest-MacOSX-x86_64.sh
```

### Linux

#### 使用官方安装脚本
```bash
# 下载 Miniconda (x86_64)
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

# 或 aarch64 (ARM 架构)
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
bash Miniconda3-latest-Linux-aarch64.sh
```

安装过程中：
1. 阅读并接受许可协议（输入 `yes`）
2. 选择安装路径（默认 `~/miniconda3`，回车确认）
3. 选择是否初始化 conda（输入 `yes`）

安装完成后：
```bash
# 重新加载 shell 配置
source ~/.bashrc

# 验证安装
conda --version
```

### Windows

#### 方式一：官方安装包 (推荐)
1. 访问 [Miniconda 下载页面](https://docs.conda.io/en/latest/miniconda.html) 或 [Anaconda 下载页面](https://www.anaconda.com/download)
2. 下载 Windows 安装包 `.exe`
3. 运行安装程序，建议勾选 "Add Anaconda/Miniconda to my PATH environment variable"
4. 验证安装
```cmd
conda --version
```

#### 方式二：使用 Chocolatey
```powershell
# 安装 Chocolatey (管理员权限)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 安装 Miniconda
choco install miniconda3

# 或安装 Anaconda
choco install anaconda3
```

---

## Conda 初始化与配置

### 初始化 shell

```bash
# 初始化 conda (bash)
conda init bash

# 初始化 conda (zsh)
conda init zsh

# 初始化 conda (PowerShell)
conda init powershell

# 初始化后重新加载 shell 或重开终端
source ~/.zshrc
```

### 配置国内镜像源

国内访问 Anaconda 官方源较慢，建议配置清华镜像源。

#### 方式一：使用命令配置
```bash
# 添加清华镜像源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/

# 设置搜索时显示 channel 地址
conda config --set show_channel_urls yes
```

#### 方式二：直接编辑配置文件

编辑 `~/.condarc` 文件：

```yaml
channels:
  - defaults
  - conda-forge
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```

### 常用配置项

```bash
# 查看当前配置
conda config --show

# 查看配置来源
conda config --show-sources

# 设置是否每次启动自动激活 base 环境
conda config --set auto_activate_base false

# 恢复默认配置
conda config --remove-key channels
```

---

## 环境管理

### 创建环境

```bash
# 创建指定 Python 版本的环境
conda create -n myenv python=3.11

# 创建环境并同时安装包
conda create -n myenv python=3.11 numpy pandas

# 创建环境并指定 conda-forge 源
conda create -n myenv -c conda-forge python=3.11

# 克隆现有环境
conda create -n myenv_clone --clone myenv
```

### 激活与退出环境

```bash
# 激活环境
conda activate myenv

# 退出当前环境 (回到 base)
conda deactivate
```

### 查看环境

```bash
# 列出所有环境
conda env list

# 或
conda info --envs

# 查看当前环境中的包
conda list

# 查看当前环境信息
conda info
```

### 克隆环境

```bash
# 克隆环境 (适用于快速复制相同依赖的环境)
conda create -n newenv --clone oldenv
```

### 删除环境

```bash
# 删除环境
conda env remove -n myenv

# 或 (需先退出该环境)
conda remove -n myenv --all
```

### 导出与导入环境

```bash
# 导出当前环境到文件
conda env export > environment.yml

# 导出环境 (仅显式安装的包，不含依赖)
conda env export --from-history > environment.yml

# 从文件创建环境
conda env create -f environment.yml

# 更新环境 (根据 yml 文件更新现有环境)
conda env update -f environment.yml
```

---

## 包管理

### 安装包

```bash
# 安装单个包
conda install numpy

# 安装指定版本
conda install numpy=1.26.0

# 同时安装多个包
conda install numpy pandas matplotlib

# 从指定 channel 安装
conda install -c conda-forge numpy

# 安装到指定环境
conda install -n myenv numpy
```

### 卸载与更新包

```bash
# 卸载包
conda remove numpy

# 卸载多个包
conda remove numpy pandas

# 更新包
conda update numpy

# 更新所有包
conda update --all

# 更新 conda 自身
conda update conda
```

### 搜索包

```bash
# 搜索包
conda search numpy

# 搜索指定版本的包
conda search numpy=1.26.0
```

---

## Conda 与 pip 配合使用

在 conda 环境中，conda 和 pip 可以配合使用，但需注意优先级：

1. **优先使用 conda 安装**：conda 能更好地管理依赖关系和版本冲突
2. **conda 装不了的再用 pip**：某些纯 Python 包可能只在 PyPI 上有

```bash
# 激活环境
conda activate myenv

# 先使用 conda 安装
conda install numpy pandas

# 再使用 pip 安装 conda 中没有的包
pip install some-package
```

> **注意事项**：
> - 在 conda 环境中使用 pip 时，确认使用的是当前环境的 pip：`which pip`
> - 尽量避免在 conda 和 pip 之间来回安装同一个包，可能导致依赖冲突
> - 建议先 `conda install` 再用 `pip install` 补装

---

## 常用命令速查

```bash
# 版本与信息
conda --version                    # conda 版本
conda info                         # 环境信息
conda info --envs                  # 环境列表

# 环境管理
conda create -n <name> python=3.11 # 创建环境
conda activate <name>              # 激活环境
conda deactivate                   # 退出环境
conda env list                     # 列出环境
conda env remove -n <name>         # 删除环境
conda env export > env.yml         # 导出环境
conda env create -f env.yml        # 导入环境

# 包管理
conda list                         # 列出当前环境包
conda install <pkg>                # 安装包
conda remove <pkg>                 # 卸载包
conda update <pkg>                 # 更新包
conda update --all                 # 更新所有包
conda search <pkg>                 # 搜索包

# 配置
conda config --show                # 查看配置
conda config --show-sources        # 查看配置来源
conda config --add channels <url>  # 添加源
conda config --remove-key <key>    # 删除配置
```