import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { createGuard } from './guard'

const modules = import.meta.glob('../views/**/*.{vue,tsx}')

function dynamicRoutes(
  dynamicViewsModules: Record<
    string,
    () => Promise<{
      [key: string]: any
    }>
  >
) {
  console.log(dynamicViewsModules)

  const keys = Object.keys(dynamicViewsModules)
  const routes: RouteRecordRaw[] = []
  keys.map(item => {
    console.log(item)
    const k = item.replace('../views', '').replace('/index.vue', '')
    // TODO, 还要解决参数路由的问题

    const route = {
      path: k,
      component: dynamicViewsModules[item],
    }
    routes.push(route)
  })
  console.log(routes)
  return routes
}

const routes: RouteRecordRaw[] = dynamicRoutes(modules)

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
