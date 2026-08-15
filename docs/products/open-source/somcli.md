# somcli

> 统一容器管理工具 · 最新版本 **v0.1.2-alpha** · [GitHub](https://github.com/structure-projects/somcli)

somcli（structure-ops-cli）是一个统一的容器管理工具，提供从基础设施到应用部署的全生命周期管理。它整合 Docker、Docker Compose、Harbor、Swarm 和 Kubernetes 等主流容器技术，通过一致的命令行界面简化运维工作。

## 核心特性

- **全栈支持**：统一管理 Docker、Compose、Swarm 和 Kubernetes
- **一键部署**：自动化安装和配置容器环境
- **镜像全生命周期**：拉取、推送、导出、导入一站式操作
- **企业级仓库**：内置 Harbor 仓库管理
- **离线支持**：完整离线部署解决方案
- **代理加速**：内置 GitHub 代理支持

## 快速开始

```bash
# 安装
curl -L "https://github.com/structure-projects/somcli/releases/latest/download/somcli-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m | sed 's/x86_64/amd64/')" -o /usr/local/bin/somcli
chmod +x /usr/local/bin/somcli

# 配置代理
somcli config set github_proxy "https://gh-proxy.com/"
```

## 核心模块

| 模块 | 说明 |
|------|------|
| Docker 管理 | 容器引擎安装与管理 |
| Docker Compose 管理 | 编排部署 |
| 镜像管理 | 镜像拉取/推送/导出/导入 |
| Registry 管理 | Harbor 仓库管理 |
| 集群管理 | Kubernetes 集群创建与节点管理 |
| 离线管理 | 离线部署解决方案 |
| Swarm 管理 | 原生容器编排 |
| Kubernetes 管理 | K8s 集群管理 |

> 详细命令与配置参考 [somcli 仓库 README](https://github.com/structure-projects/somcli)。
