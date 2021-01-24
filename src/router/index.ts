import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { createGuard } from './guard'
import { createRoutes } from './helper/routeHelper'

const dynamicViewsModules = import.meta.glob('../views/**/*.{vue,tsx, js}')

const routes: RouteRecordRaw[] = createRoutes(dynamicViewsModules)

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
