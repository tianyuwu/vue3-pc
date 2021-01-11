import { createApp } from 'vue'
import App from './App.vue'
import { setupElementUI } from './setup/element'

const app = createApp(App)
setupElementUI(app)

import './assets/styles/index.scss'

app.mount('#app')
