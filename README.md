# 在线制作 ICO 图标 / Favicon Generator

> 📢 **升级公告**：本项目原站点 `ico.fengjun.wang` 已全新升级为 **[https://favicon.pub/](https://favicon.pub/)**，功能与体验均在原地址继续维护，欢迎访问。

一个开箱即用的在线 favicon 图标制作工具：上传图片，即可转换为 `favicon.ico`，纯前端 Canvas 处理、隐私友好、无需注册。

[![license: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss)

在线地址：**[https://favicon.pub/](https://favicon.pub/)**

## ✨ 功能特性

- **多格式输入**：支持 JPEG、PNG、GIF 图片上传（单张最大 5MB）。
- **多种图标尺寸**：可选 16×16、32×32、48×48、64×64、128×128，覆盖浏览器标签页、任务栏、高分辨率屏等不同场景。
- **实时预览**：上传后立即在页面内预览图片效果。
- **一键生成下载**：将图片缩放处理后导出为标准 `favicon.ico` 并自动下载。
- **验证码防滥用**：内置纯前端 Canvas 图形验证码，轻量拦截机器批量调用。
- **隐私友好**：图片尺寸缩放等核心处理在浏览器本地 Canvas 完成，不存储用户文件。
- **相关工具推荐**：底部集成「相关工具」模块，可对接统一的工具目录 JSON 做同站长尾内链。
- **使用指引**：内置「什么是 Favicon / 如何使用 / 最佳实践」等说明区块，利于 SEO 与新手上手。

## 🧱 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | [Next.js 15](https://nextjs.org/)（App Router）+ [React 19](https://react.dev/) |
| 语言 | [TypeScript](https://www.typescriptlang.org/) |
| 样式 | [TailwindCSS 3](https://tailwindcss.com/) |
| 组件 | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| 图标 | [lucide-react](https://lucide.dev/) |
| 提示 | [sonner](https://sonner.emilkowal.ski/) |
| 图片处理 | 浏览器原生 Canvas API |

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) 18.18 及以上（推荐 20+）
- 包管理器：`npm` / `pnpm` 任一即可

### 安装与本地运行

```bash
# 1. 克隆仓库
git clone https://github.com/fengjun8/ico.fengjun.wang.git
cd ico.fengjun.wang

# 2. 安装依赖
npm install        # 或 pnpm install

# 3. 启动开发服务器
npm run dev        # 或 pnpm dev
```

打开浏览器访问 `http://localhost:3000` 即可看到站点。

### 构建与生产启动

```bash
npm run build      # 构建生产产物
npm start          # 启动生产服务
```

## ☁️ 部署

项目自带 `vercel.json`，推荐直接部署到 Vercel：

1. 将仓库推送到 GitHub；
2. 在 [Vercel](https://vercel.com/) 中 Import 该仓库；
3. 框架会被自动识别为 Next.js，保持默认配置直接 Deploy 即可。

也可以部署到任意支持 Node.js 的服务器：`npm run build` 后用 `npm start` 常驻运行，或用 `pm2` 等进程管理器托管。

## 📁 项目结构

```
.
├── app/                      # Next.js App Router 目录
│   ├── api/convert/route.ts  # 图标导出接口（返回 image/x-icon 附件）
│   ├── components/
│   │   ├── convert-section.tsx       # 上传 / 缩放 / 验证码 / 转换核心交互
│   │   └── documentation-section.tsx # 使用说明与 SEO 文案区块
│   ├── layout.tsx            # 根布局（metadata、统计脚本）
│   └── page.tsx              # 首页
├── components/               # 通用组件与 shadcn/ui
│   ├── related-tools.tsx     # 相关工具推荐模块
│   └── ui/                   # shadcn/ui 组件
├── lib/                      # 工具函数
├── public/                   # 静态资源
├── styles/                   # 全局样式
├── next.config.mjs
├── tailwind.config.ts
└── vercel.json               # Vercel 部署配置
```

## 🔧 自定义配置

- **站点信息 / SEO**：修改 `app/layout.tsx` 中的 `metadata`（title、description、keywords）与 `app/page.tsx` 中的页头页脚文案。
- **可选尺寸**：编辑 `app/components/convert-section.tsx` 里的 `ICON_SIZES` 常量。
- **上传限制**：同文件中的 `SUPPORTED_FORMATS` 与 5MB 大小校验。
- **相关工具数据源**：`components/related-tools.tsx` 默认从 `https://cdn.fengjun.wang/common/tools-data.json` 拉取工具目录，可替换为你自己的 JSON 地址或本地文件。

## 📝 更多作品 More Tools

作者维护了一系列免费在线工具，欢迎访问：

**Calculators 计算器** · [Bitumen Calculator](https://bitumencalculator.world) · [CPM Calculator](https://cpmcalculator.world) · [Wattly](https://wattly.world) · [Subway Calculator](https://subwaycalculator.com) · [Starbucks Nutrition Calculator](https://starbucksnutritioncalculator.app) · [Cooking Calculator](https://cookingcalculator.app)

**Utilities 实用工具** · [Counter](https://counter.best/zh) · [Download All](https://downloadall.app) · [PDF Tools](https://pdf.fj.cn)

**Security & IT 安全 / IT** · [Evaluation Cat](https://evaluationcat.com) · [Password Remover](https://passwordremover.org) · [Email Toolbox](https://emailtoolbox.io)

**Geography & Travel 国家 / 地理 / 旅行** · [National Flags](https://nationalflag.io) · [Country Drawing](https://countrydrawing.com) · [Area Code](https://818.pw) · [Place Generator](https://placegenerator.com) · [TV Channels](https://tvchannel.world) · [Stadium](https://stadiumview.com)

**Business 商业 / 时间** · [Market Hours](https://markethours.io)

**Knowledge & Education 知识 / 教育 / 百科** · [Car Brands](https://carbrandindex.com) · [Power Wheels](https://powerwheels.world) · [古诗文网](https://fengjinwei.com) · [Cell Diagram](https://celldiagram.world)

**Entertainment & Generators 娱乐 / 生成器** · [Name Generator](https://fantasyname.world) · [Pokémon Generator](https://randompokemon.online) · [Virtual Piano](https://playpiano.me) · [Click Test](https://clicktest.world) · [Scoreboard](https://scoreboard.best) · [Warm Moments](https://warmmoments.app)

## 📄 License

本项目基于 [MIT License](LICENSE) 开源，可自由用于学习与商用，但请保留版权声明。
