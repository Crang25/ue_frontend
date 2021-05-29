import { createApp } from 'vue'
import store from './store'
import router from './routers'
import App from './App.vue'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')