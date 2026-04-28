import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Structure Docs',
  description: 'Structure 开源社区官方文档 - 企业级开发生态',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/quickstart' },
      { text: '核心产品', link: '/products' },
      { text: 'Structure Boot', link: '/structure-boot' },
      { text: 'Structure Cloud', link: '/structure-cloud' },
      { text: '运维架构', link: '/ops-architecture' },
      { text: '开发指南', link: '/guide' },
      { text: '行业AI', link: '/industry-ai' },
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
          { text: '产品概述', link: '/product-overview' },
          { text: '开源产品与集成方案', link: '/products' },
          { text: 'Structure Boot', link: '/structure-boot' },
          { text: 'Structure Cloud', link: '/structure-cloud' },
        ]
      },
      {
        text: '开发指南',
        items: [
          { text: '生态规范与开发指南', link: '/guide' },
        ]
      },
      {
        text: '运维架构',
        items: [
          { text: '运维与架构', link: '/ops-architecture' },
        ]
      },
      {
        text: '行业AI',
        items: [
          { text: '行业技术栈与 AI 开源', link: '/industry-ai' },
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
