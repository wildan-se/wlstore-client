import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import global styles
import '@/assets/styles/globals.css'

const app = createApp(App)

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, info)
  // You can send error to logging service here
}

app.use(router)
app.mount('#app')
