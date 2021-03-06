import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      // '/supermap': 'http://localhost:9540/supermap',
      '/supermap': {
        target: 'http://localhost:9540/supermap',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/supermap/, '')
      },
      '/cesium': {
        target: 'http://localhost/cesium',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cesium/, '')
      },
      '/3dtile_test_data': {
        target: 'http://localhost:9540/3dtile_test_data',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/3dtile_test_data/, '')
      },
      '/zhd-api-docs': {
        target: 'http://localhost:9540/zhd-api-docs',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/zhd-api-docs/, '')
      }
    },
  },
  resolve: {
    alias: {
      // 'cesium': 'http://localhost:8080/supermap/Build/Cesium/Cesium.js'
    }
  },
  optimizeDeps: {
    exclude: [
      // 'cesium'
    ]
  },
  plugins: [
    vue(),
    vueJsx(),
  ]
})
