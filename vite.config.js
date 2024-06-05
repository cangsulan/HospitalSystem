import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 监听所有 IP 地址
    port: 5173, // 你希望使用的端口
    // 如果需要可以添加以下配置
    // strictPort: true, // 如果端口被占用，则会直接退出
    // https: true, // 如果需要使用 HTTPS

    //使用正向代理，解决浏览器跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite:(path)=>path.replace(/^\/api/, '')
      }
    }
  }
})