import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './project/router'
import 'element-plus/lib/theme-chalk/index.css'
import './project/styles/layout.scss'
import './project/styles/animation.scss'

createApp(App)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
