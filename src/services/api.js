// src/services/api.js
import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') // Ubah dari 'authToken' ke 'token'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default api
