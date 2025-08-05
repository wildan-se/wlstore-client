import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Tailwind CSS
import '@/assets/tailwind.css'

const app = createApp(App)

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, info)
  // You can send error to logging service here
}

app.use(router)
app.mount('#app')
