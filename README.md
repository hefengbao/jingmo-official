# 京墨文库 · 官方网站

京墨文库(开源的中华文化阅读 APP)的官方落地页。项目已从 `legacy/` 中的静态 HTML 重构为
**Astro** 静态站点,视觉风格参考 [nuwax.com](https://nuwax.com/) 的深色科技风,并融入东方墨韵配色。

---

## ✨ 特性

- **Astro 静态站点** — 默认零客户端 JS 框架,构建产物为纯静态文件
- **手写设计系统** — 基于 CSS 自定义属性,不依赖 Tailwind 等额外构建链,离线也能构建
- **明暗双主题** — 首屏前由内联脚本写入 `data-theme`,无闪白(FOUC);偏好持久化到 `localStorage`
- **响应式布局** — 桌面 / 平板 / 手机三档断点,移动端优先降级
- **无障碍与动效** — 支持 `prefers-reduced-motion`,无 JS 时内容依然完整可见
- **内容数据分离** — 站点文案在 `src/data/site.ts`,法务正文在 Markdown 中
- **法务文档 Markdown 化** — 用户协议 / 隐私政策以 `.md` 为唯一事实来源,改动即干净的文本 diff

---

## 🚀 快速开始

### 前置要求

- **Node.js >= 22.22.0**(Astro 7 的硬性要求)
- 包管理器:`pnpm`(推荐)或 `npm`

```bash
# 安装依赖
pnpm install

# 启动开发服务器 → http://localhost:4321
pnpm dev

# 构建生产版本 → dist/
pnpm build

# 本地预览构建产物
pnpm preview
```

> ⚠️ **Node 版本**
> 若你的 Node 低于 22.22.0,Astro 会直接报错终止:
> `Node.js vX is not supported by Astro! Please upgrade Node.js to a supported version: ">=22.22.0"`。
> 请升级 Node(推荐 `nvm install 22` / `fnm use 22`),或直接使用更高版本的 Node 运行。

---

## 📁 项目结构

```
.
├─ public/                    # 静态资源,原样复制到 dist/
│   ├─ app.png                # 首页产品展示图
│   ├─ feature-1..4.png       # 功能展示截图
│   ├─ logo.png / logo.svg
│   ├─ robots.txt
│   └─ baidu_verify_codeva-*.html
│
├─ src/
│   ├─ components/
│   │   ├─ Header.astro       # 吸顶玻璃导航 + 主题切换
│   │   ├─ Footer.astro       # 页脚
│   │   └─ FeatureCard.astro  # 功能展示卡片
│   │
│   ├─ content/
│   │   └─ docs/
│   │       ├─ user-agreement.md   # 《用户协议》正文(Markdown)
│   │       └─ privacy-policy.md   # 《隐私政策》正文(Markdown)
│   │
│   ├─ data/
│   │   ├─ site.ts            # 站点文案 / 导航 / 功能 / 统计数据
│   │   └─ docs.ts            # 文档注册表:slug → Markdown 模块
│   │
│   ├─ layouts/
│   │   └─ BaseLayout.astro   # <head>、SEO、主题初始化、全局脚本
│   │
│   ├─ pages/
│   │   ├─ index.astro                 # 首页 → /
│   │   ├─ 404.astro                   # → /404.html
│   │   └─ docs/
│   │       └─ [slug].astro            # 文档页 → /docs/<slug>/
│   │
│   └─ styles/
│       └─ global.css         # 设计系统(设计令牌 + 组件样式)
│
├─ astro.config.mjs
├─ legacy/                    # 重构前的原始静态页面(保留作参考)
└─ dist/                      # 构建产物(git 忽略)
```

---

## 🎨 设计说明

### 设计令牌

所有颜色、圆角、阴影集中在 `src/styles/global.css` 顶部,通过 CSS 变量切换主题:

| 令牌 | 亮色(宣纸) | 暗色(墨夜) |
|------|------------|------------|
| `--bg` | `#f5f3ef` | `#070a12` |
| `--bg-elev` | `#ffffff` | `#0e1320` |
| `--text` | `#15171f` | `#eef1f8` |
| `--border` | `rgba(21,23,31,.10)` | `rgba(255,255,255,.09)` |

品牌强调色三色渐变 `--gradient-brand`:`#6366f1` → `#a855f7` → `#22d3ee`;
另设鎏金 `--gold: #d8a95f` 用于品牌名,呼应「京墨」的东方气质。

### 风格来源

参考 nuwax.com 的以下手法:

- 吸顶玻璃导航(滚动后浮现毛玻璃底 + 描边)
- 首页左侧大标题 + 右侧产品图的双栏 Hero
- 每个区块「英文 kicker + 中文主标题 + 说明」的标题组节奏
- 深色面板 + 径向辉光 + 卡片悬停上浮
- 全站 64px 网格背景 + 顶部径向光晕

### 修改主题

只需改 `global.css` 里的令牌,无需改组件:

```css
:root {
  --accent-1: #6366f1;  /* 改这里 */
}
```

---

## 📝 法务文档(Markdown 驱动)

《用户协议》与《隐私政策》的**正文以 Markdown 存放**,页面只负责渲染:

```
src/content/docs/user-agreement.md   ← 正文在这里,改这个文件
src/data/docs.ts                     ← 注册表:slug → Markdown 模块
src/pages/docs/[slug].astro          ← 渲染模板(不含任何法务文本)
```

好处:法务文本的修正在 git 里表现为干净的文本 diff,不再混杂在 HTML 模板中。

### 新增一份文档

**第一步** — 新建 `src/content/docs/<slug>.md`,写好 frontmatter:

```markdown
---
title: 服务协议
description: 用于 <meta name="description"> 与社交分享
lastUpdated: '2025-08-28'
effectiveDate: '2025-08-28'
lead: 开篇导语,渲染为 .lead 样式
---

## 一级小节

正文……支持 **粗体**、[链接](/docs/privacy-policy/) 与有序 / 无序列表。
```

**第二步** — 在 `src/data/docs.ts` 注册一行:

```ts
import XxxContent, { frontmatter as xxxMeta } from '../content/docs/<slug>.md';

export const docs: Record<string, DocEntry> = {
  // …
  xxx: { Content: XxxContent, frontmatter: xxxMeta },
};
```

访问 `/docs/xxx/` 即可,**文件名即 slug**。

### 三个注意点

- **日期要加引号**。`lastUpdated: '2025-08-28'` 若写成不带引号的形式,YAML 会把它解析成
  时间戳,页面上将显示为 `2025-08-28T00:00:00.000Z`。
- **Markdown 里可以内联 HTML**。隐私政策页的绿色高亮块就是这样写的
  (`<div class="callout">…</div>`),无需额外插件。
- **HTML 注释会被原样输出**到产物里(`<!-- … -->`),不要用它写编辑备注。

### 正文样式

标题、段落、列表、链接与锚点滚动偏移都由 `global.css` 的 `.doc-body` 规则统一负责。
渲染出的 `<h2>` / `<h3>` 会自动带上可作为锚点的 `id`,直接复制浏览器地址栏即可分享定位。

---

## 🧩 常见改动

**改文案或统计数据** → 编辑 `src/data/site.ts`,首页会自动更新。

**改法务文本** → 编辑 `src/content/docs/` 下的 `.md`,见上一节。

**新增一个区块** → 在 `src/pages/index.astro` 里加 `<section class="section">`,
标题套用 `.section-head` + `.kicker` + `.section-title`,动画加 `.reveal` 类即可。

**新增一个页面** → 在 `src/pages/` 下新建 `.astro` 文件,复用 `BaseLayout`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---
<BaseLayout title="页面标题">
  <Header variant="doc" />
  <main>…</main>
  <Footer />
</BaseLayout>
```

文件路径即路由:`src/pages/about.astro` → `/about`。

---

## 🔧 环境适配说明

本项目在受限环境(工作区外不可写、`node_modules` 只读、无外网)下同样可以构建:

- **Vite 缓存目录**已从默认的 `node_modules/.vite` 移到 `.astro/vite`
  (见 `astro.config.mjs`),以适配只读的 `node_modules`。
  若你的环境允许写 `node_modules`,无需改动,该配置同样正常工作。

- **有意未使用 Astro Content Collections**。在受限环境下,`astro sync` 会把 `node_modules`
  中的 CJS 依赖(先是 `yaml`,接着是 `picomatch`)当作 ESM 内联求值,抛出
  `require is not defined` 并中断构建。因此文档改为 **Markdown 直接导入**
  (见 `src/data/docs.ts` 的静态 import 与 `src/pages/docs/[slug].astro`)。

  两者效果一致:Markdown 同样是唯一事实来源,同样支持 frontmatter 与动态路由。
  若你的环境不触发该问题,也可以迁回 Content Collections
  (新增 `src/content.config.ts` + `astro:content`),**Markdown 文件本身无需任何改动**。

---

## 📦 部署

```bash
pnpm build
```

`dist/` 为纯静态产物,可直接部署到任意静态托管(Gitee Pages、GitHub Pages、Vercel、
Netlify、阿里云 OSS + CDN 等)。

### 域名配置

`astro.config.mjs` 中的 `site` 当前为 `https://jingmo.ruaruan.com`。如需更换:

```bash
# 方式一:改 astro.config.mjs 里的 site
# 方式二:构建时注入环境变量(适合 CI)
SITE_URL=https://你的域名 pnpm build
```

`site` 是真实域名时,canonical、og:url、og:image 会输出为绝对地址;
若仍是 `*.example.com` 占位符,这些标签会被**刻意省略**,以免把占位域名发布上线。

---

## 📄 许可证

内容与代码版权归原作者所有。详见站内《[用户协议](/docs/user-agreement/)》与
《[隐私政策](/docs/privacy-policy/)》。
