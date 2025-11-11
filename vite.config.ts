import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: true,
    fs: {
      // 允许访问项目根目录以外的文件
      strict: false,
    },
  },
  optimizeDeps: {
    include: [], // 不预构建任何依赖
  },
  plugins: [
    
  // <!-- DEV-INJECT-START -->
  {
    name: 'dev-inject',
    enforce: 'post', // 确保在 HTML 注入阶段最后执行
    transformIndexHtml(html) {
      if (!html.includes('data-id="dev-inject-monitor"')) {
        return html.replace("</head>", `
    <script data-id="dev-inject-monitor">
      (function() {
        const remote = "/sdk/dev-monitor.js";
        const separator = remote.includes('?') ? '&' : '?';
        const script = document.createElement('script');
        script.src = remote + separator + 't=' + Date.now();
        script.dataset.id = 'dev-inject-monitor-script';
        script.defer = true;
        // 防止重复注入
        if (!document.querySelector('[data-id="dev-inject-monitor-script"]')) {
          document.head.appendChild(script);
        }
      })();
    </script>
  \n</head>`);
      }
      return html;
    }
  },
  // <!-- DEV-INJECT-END -->
  
    
  ],
  });
