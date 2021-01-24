import { RouteRecordRaw } from 'vue-router'

const DYNAMIC_ROUTE_REGEX = /^\/([:*])/

function cleanChildrenRoutes(
  routes: RouteRecordRaw[],
  isChild = false,
  routeNameSplitter = '-',
  parentRouteName = ''
) {
  const regExpIndex = new RegExp(`${routeNameSplitter}index$`)
  const regExpParentRouteName = new RegExp(`^${parentRouteName}${routeNameSplitter}`)
  const routesIndex: any[] = []
  routes.forEach((route: RouteRecordRaw) => {
    if (regExpIndex.test(route.name as string) || route.name === 'index') {
      const res = (route.name as string).replace(regExpParentRouteName, '').split(routeNameSplitter)
      routesIndex.push(res)
    }
  })
  routes.forEach(route => {
    route.path = isChild ? route.path.replace('/', '') : route.path
    if (route.path.includes('?')) {
      if ((route.name as string).endsWith(`${routeNameSplitter}index`)) {
        route.path = route.path.replace(/\?$/, '')
      }
      const names = (route.name as string)
        .replace(regExpParentRouteName, '')
        .split(routeNameSplitter)
      const paths = route.path.split('/')
      if (!isChild) {
        paths.shift()
      } // clean first / for parents
      routesIndex.forEach(r => {
        const i = r.indexOf('index')
        if (i < paths.length) {
          for (let a = 0; a <= i; a++) {
            if (a === i) {
              paths[a] = paths[a].replace('?', '')
            }
            if (a < i && names[a] !== r[a]) {
              break
            }
          }
        }
      })
      route.path = (isChild ? '' : '/') + paths.join('/')
    }
    route.name = (route.name as string).replace(regExpIndex, '')
    if (route.children) {
      const defaultChildRoute = route.children.find(
        child => child.path === '/' || child.path === ''
      )
      const routeName = route.name
      if (defaultChildRoute) {
        route.children.forEach(child => {
          if (child.path !== defaultChildRoute.path) {
            const parts = child.path.split('/')
            parts[1] = parts[1].endsWith('?') ? parts[1].substr(0, parts[1].length - 1) : parts[1]
            child.path = parts.join('/')
          }
        })
        delete route.name
      }
      route.children = cleanChildrenRoutes(route.children, true, routeNameSplitter, routeName)
    }
  })
  return routes
}

export const sortRoutes = function sortRoutes(routes: RouteRecordRaw[]) {
  routes.sort((a, b) => {
    if (!a.path.length) {
      return -1
    }
    if (!b.path.length) {
      return 1
    }
    // Order: /static, /index, /:dynamic
    // Match exact route before index: /login before /index/_slug
    if (a.path === '/') {
      return DYNAMIC_ROUTE_REGEX.test(b.path) ? -1 : 1
    }
    if (b.path === '/') {
      return DYNAMIC_ROUTE_REGEX.test(a.path) ? 1 : -1
    }

    let i
    let res = 0
    let y = 0
    let z = 0
    const _a = a.path.split('/')
    const _b = b.path.split('/')
    for (i = 0; i < _a.length; i++) {
      if (res !== 0) {
        break
      }
      y = _a[i] === '*' ? 2 : _a[i].includes(':') ? 1 : 0
      z = _b[i] === '*' ? 2 : _b[i].includes(':') ? 1 : 0
      res = y - z
      // If a.length >= b.length
      if (i === _b.length - 1 && res === 0) {
        // unless * found sort by level, then alphabetically
        res =
          _a[i] === '*'
            ? -1
            : _a.length === _b.length
            ? a.path.localeCompare(b.path)
            : _a.length - _b.length
      }
    }

    if (res === 0) {
      // unless * found sort by level, then alphabetically
      res =
        _a[i - 1] === '*' && _b[i]
          ? 1
          : _a.length === _b.length
          ? a.path.localeCompare(b.path)
          : _a.length - _b.length
    }
    return res
  })

  routes.forEach(route => {
    if (route.children) {
      sortRoutes(route.children)
    }
  })

  return routes
}

/**
 * 生成路由
 * @param dynamicViewsModules 动态导入的模块组
 * @param pagesDir 页面组件所在的目录
 */
export function createRoutes(
  dynamicViewsModules: Record<string, () => Promise<{ [key: string]: any }>>,
  pagesDir = '../views'
) {
  const routes: RouteRecordRaw[] = []
  let files = Object.keys(dynamicViewsModules)

  // 进行一次防路由重复的处理
  const componentsMap: any = {}
  files.forEach(f => {
    const key = f
      .replace(/\.(js|ts|tsx|vue)$/, '')
      .replace(`${pagesDir}`, '')
      .replace(/\/{2,}/g, '/')
    if (/\.vue$/.test(f) || !componentsMap[key]) {
      componentsMap[key] = dynamicViewsModules[f]
    }
  })
  files = Object.keys(componentsMap)

  // 拼凑name和component
  files.map(file => {
    const keys = file.split('/').splice(1)
    const route = {
      name: '',
      path: '',
      chunkName: '',
      component: componentsMap[file],
    }

    let parent = routes

    keys.forEach((key, i) => {
      // remove underscore only, if its the prefix
      const sanitizedKey = key.startsWith('_') ? key.substr(1) : key
      route.name = route.name ? `${route.name}-${sanitizedKey}` : sanitizedKey
      route.name += key === '_' ? 'all' : ''
      route.chunkName = file
      const child = parent.find(parentRoute => parentRoute.name === route.name)

      if (child) {
        child.children = child.children || []
        parent = child.children
        route.path = ''
      } else if (key === 'index' && i + 1 === keys.length) {
        route.path += i > 0 ? '' : '/'
      } else {
        route.path += '/' + (key === '_' ? '*' : key.replace('_', ':'))
        if (key !== '_' && key.indexOf('_') !== -1) {
          route.path += '?'
        }
      }
    })
    parent.push(route)
  })
  sortRoutes(routes)
  return cleanChildrenRoutes(routes)
}
