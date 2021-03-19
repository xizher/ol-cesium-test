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
      '/Cesium': {
        target: 'http://localhost:9540/Cesium',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/Cesium/, '')
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
