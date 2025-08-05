import api from './api'

class AuthService {
  constructor() {
    this.token = localStorage.getItem('token')
  }

  async login(credentials) {
    const response = await api.post('/auth/signin', credentials)

    const { accessToken, username, email, name, roles } = response.data

    // Store auth data
    localStorage.setItem('token', accessToken)
    localStorage.setItem('userRole', roles.includes('admin') ? 'admin' : 'user')
    localStorage.setItem('userEmail', email)
    localStorage.setItem('userName', name || username)
    localStorage.setItem('user', JSON.stringify(response.data))

    this.token = accessToken

    return response.data
  }

  async register(userData) {
    const response = await api.post('/auth/signup', userData)
    return response.data
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    localStorage.removeItem('user')
    this.token = null

    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }

  isLoggedIn() {
    return this.isAuthenticated()
  }

  isAdmin() {
    return localStorage.getItem('userRole') === 'admin'
  }

  getCurrentUser() {
    return {
      email: localStorage.getItem('userEmail'),
      name: localStorage.getItem('userName'),
      role: localStorage.getItem('userRole'),
    }
  }

  getToken() {
    return localStorage.getItem('token')
  }
}

export default new AuthService()
