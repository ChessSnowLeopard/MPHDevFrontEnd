import { createApp } from 'vue'
import App from './App.vue'
import router from '../router' // 路径根据实际情况调整

const app = createApp(App)
app.use(router)
app.mount('#app')
