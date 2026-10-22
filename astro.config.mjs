// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

// 京墨文库官网 —— Astro 静态站点
// 说明:本项目使用 Astro 内置的 CSS 支持(手写设计系统),
// 不依赖 Tailwind / PostCSS 等额外构建链,便于离线构建与部署。
export default defineConfig({
  // ⚠️ 部署前请把 site 改为正式域名,或在构建时设置 SITE_URL 环境变量。
  // 保持占位域名时不会输出 canonical / og:url(见 BaseLayout.astro),避免污染 SEO。
  site: process.env.SITE_URL || 'https://jingmo.ruaruan.com',
  output: 'static',
  build: {
    // 产出 ./dist,可直接部署到任意静态托管
    assets: 'assets',
  },
  vite: {
    // 缓存目录默认位于 node_modules/.vite,而只读 node_modules 的环境写不进去。
    // 用绝对路径,避免被任何 Vite 环境(含内容同步用的 sync 环境)重定位回 node_modules。
    cacheDir: fileURLToPath(new URL('./.astro/vite', import.meta.url)),
    build: {
      // 站点体量小,合并资源减少请求数
      cssCodeSplit: false,
    },
  },
});
