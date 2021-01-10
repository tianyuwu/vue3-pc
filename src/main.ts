import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
import { setupElementUI } from './setup/element'

const app = createApp(App)
setupElementUI(app)

app.mount('#app')
