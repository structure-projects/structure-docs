import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Structure Docs',
  description: 'Structure 开源社区官方文档',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '社区介绍', link: '/community' },
      { text: '生态规范', link: '/guide' },
      { text: '开源产品', link: '/products' },
      { text: '运维与架构', link: '/ops-architecture' },
      { text: '行业技术栈与AI', link: '/industry-ai' },
      { text: 'github', link: '/pd' },
    ],
    sidebar: [
      {
        text: '基础',
        items: [
          { text: '首页', link: '/' },
          { text: '社区介绍', link: '/community' },
          { text: '生态规范与开发指南', link: '/guide' },
        ]
      },
      {
        text: '产品与方案',
        items: [
          { text: '开源产品与集成方案', link: '/products' },
          { text: '运维与架构', link: '/ops-architecture' },
        ]
      },
      {
        text: '前沿技术',
        items: [
          { text: '行业技术栈与 AI 开源', link: '/industry-ai' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: '产品定义（PD）', link: '/pd' },
        ]
      }
    ]
  }
}); 