import { createRouter, createMemoryHistory } from 'vue-router'
import appConfig from '../config/app.config'

/** @type { import("vue-router").RouteRecordRaw[] } */
const routes = appConfig.appHeaderConfig.menuConfig.menuItems.map(item => ({
  path: item.path,
  name: item.name,
  component: () => import(`../views/${item.name}.vue`)
}))

const router = createRouter({
  routes,
  history: createMemoryHistory()
})

export default router
