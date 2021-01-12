import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupElementUI } from './setup/element'
import './assets/styles/index.scss'

const app = createApp(App)

setupRouter(app)
setupElementUI(app)

app.mount('#app')
