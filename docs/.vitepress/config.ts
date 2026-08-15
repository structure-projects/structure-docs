import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Structure Docs',
  description: 'Structure 开源社区官方文档 - 企业级开发生态',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/quickstart' },
      { text: '产品中心', link: '/products/' },
      { text: '部署与运维', link: '/deploy/' },
      { text: '开发规范', link: '/dev-rules/' },
      { text: '开发环境', link: '/dev-env/' },
      { text: 'AI 工具', link: '/ai/' },
      { text: '社区', link: '/community' },
      { text: 'GitHub', link: 'https://github.com/structure-projects' },
    ],
    sidebar: [
      {
        text: '入门',
        items: [
          { text: '首页', link: '/' },
          { text: '快速开始', link: '/quickstart' },
        ]
      },
      {
        text: '产品中心',
        items: [
          { text: '产品总览', link: '/products/' },
          { text: '开源产品', link: '/products/open-source/' },
          { text: 'SaaS 产品', link: '/products/saas/' },
          { text: 'Structure Boot', link: '/products/open-source/structure-boot' },
          { text: 'Structure Infra', link: '/products/open-source/structure-infra' },
          { text: 'Structure Security', link: '/products/open-source/structure-security' },
          { text: 'Structure Datascope', link: '/products/open-source/structure-datascope' },
          { text: 'Structure Pro', link: '/products/open-source/structure-pro' },
          { text: 'somcli', link: '/products/open-source/somcli' },
        ]
      },
      {
        text: '部署与运维',
        items: [
          { text: '部署总览', link: '/deploy/' },
          { text: 'Docker 在线安装', link: '/deploy/docker-install-online' },
          { text: 'Docker 离线安装', link: '/deploy/docker-install-offline' },
          { text: 'Docker Swarm 集群', link: '/deploy/docker-swarm' },
          { text: 'Kubernetes 部署', link: '/deploy/kubernetes' },
          { text: 'KubeKey / KubeSphere', link: '/deploy/kubernetes-kubekey' },
          { text: 'K8s 在线部署 v1.20', link: '/deploy/kubernetes-online-v120' },
          { text: 'K8s NFS 存储', link: '/deploy/kubernetes-nfs' },
          { text: 'Nomad 部署', link: '/deploy/nomad' },
          { text: 'Helm 部署', link: '/deploy/helm' },
          { text: 'Serverless 部署', link: '/deploy/serverless' },
        ]
      },
      {
        text: '开发规范',
        items: [
          { text: '规范索引', link: '/dev-rules/' },
          {
            text: '通用规范',
            collapsed: false,
            items: [
              { text: 'API 接口规范', link: '/dev-rules/api-design' },
              { text: '数据模型设计规范', link: '/dev-rules/data-model-design' },
              { text: '编码与命名规范', link: '/dev-rules/coding-conventions' },
              { text: '参数校验', link: '/dev-rules/validation' },
              { text: 'Swagger 规范', link: '/dev-rules/swagger' },
              { text: 'Git 与开发流程', link: '/dev-rules/git-workflow' },
            ]
          },
          {
            text: '场景规范',
            collapsed: false,
            items: [
              { text: '项目形态选型与创建', link: '/dev-rules/project-scaffolding' },
              { text: '单体常规', link: '/dev-rules/monolith-conventional' },
              { text: '单体 DDD', link: '/dev-rules/monolith-ddd' },
              { text: '分布式微服务', link: '/dev-rules/distributed-microservice' },
              { text: '分布式多模块 DDD 7+1', link: '/dev-rules/ddd-architecture' },
            ]
          },
          { text: '项目结构总览', link: '/dev-rules/project-structure' },
          { text: '依赖配置', link: '/dev-rules/dependency-config' },
          { text: 'CRUD 模板', link: '/dev-rules/crud-template' },
          { text: '组件集成', link: '/dev-rules/component-integration' },
          { text: '研发团队指南', link: '/dev-rules/team-guide' },
          { text: '完整规范（旧版）', link: '/dev-rules/structure-projects-rule' },
        ]
      },
      {
        text: '开发环境',
        items: [
          { text: '环境总览', link: '/dev-env/' },
          { text: 'Go 环境', link: '/dev-env/go' },
          { text: 'Node.js 环境', link: '/dev-env/node' },
          { text: 'JDK / Maven', link: '/dev-env/jdk-maven' },
          { text: 'Python 环境', link: '/dev-env/python' },
          { text: 'Conda 详解', link: '/dev-env/python-conda' },
        ]
      },
      {
        text: 'AI 工具',
        items: [
          { text: 'AI 工具总览', link: '/ai/' },
          { text: 'AI 编程 Agent', link: '/ai/agents/' },
          { text: '工作流平台', link: '/ai/workflow/' },
          { text: 'LLM 私有化部署', link: '/ai/llm/' },
        ]
      },
      {
        text: '社区',
        items: [
          { text: '社区介绍', link: '/community' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/structure-projects' }
    ]
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {}
      }
    }
  }
});