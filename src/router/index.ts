import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { createGuard } from './guard'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../views/home/index.vue') },
  { path: '/about', component: () => import('../views/about/index.vue') },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export function setupRouter(app: App<Element>) {
  app.use(router)
  createGuard(router)
}

export default router
