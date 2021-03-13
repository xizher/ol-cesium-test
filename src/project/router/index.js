import { createRouter, createMemoryHistory } from 'vue-router'

/** @type { import("vue-router").RouteRecordRaw[] } */
const routes = [
  {
    path: '/',
    name: 'VOpenlayers',
    component: () => import('../views/VOpenlayers.vue')
  }, {
    path: '/cesium',
    name: 'VCesium',
    component: () => import('../views/VCesium.vue')
  }, {
    path: '/oc-linkage',
    name: 'VOCLinkage',
    component: () => import('../views/VOCLinkage.vue')
  }, {
    path: '/config',
    name: 'VConfig',
    component: () => import('../views/VConfig.vue')
  }, {
    path: '/api-docs',
    name: 'VApiDocs',
    component: () => import('../views/VApiDocs.vue')
  }, {
    path: '/about',
    name: 'VAbout',
    component: () => import('../views/VAbout.vue')
  }
]

const router = createRouter({
  routes,
  history: createMemoryHistory()
})

export default router
