import type { App } from 'vue'

import ElementPlus from 'element-plus'
// import { locale } from 'element-plus'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
import './theme.scss'

// import { ElButton } from 'element-plus'

export function setupElementUI(app: App<Element>) {
  app.use(ElementPlus)
}
