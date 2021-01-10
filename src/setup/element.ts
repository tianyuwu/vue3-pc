import type { App } from 'vue'

// import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { ElButton } from 'element-plus'

export function setupElementUI(app: App<Element>) {
  app.use(ElButton)
}
