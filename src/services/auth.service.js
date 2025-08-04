import api from './api'

class AuthService {
  constructor() {
    this.token = localStorage.getItem('authToken')
  }

  async login(credentials) {
    const response = await api.post('/auth/login', credentials)

    const { token, user } = response.data

    // Store auth data
    localStorage.setItem('authToken', token)
    localStorage.setItem('userRole', user.role)
    localStorage.setItem('userEmail', user.email)
    localStorage.setItem('userName', user.name)

    this.token = token

    return response.data
  }

  async register(userData) {
    const response = await api.post('/auth/register', userData)
    return response.data
  }

  logout() {
    localStorage.removeItem('authToken')
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
    return !!localStorage.getItem('authToken')
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
    return localStorage.getItem('authToken')
  }

  // Demo login methods
  async demoLogin(isAdmin = false) {
    try {
      const response = await api.post('/auth/demo-login', {
        isAdmin: isAdmin,
      })

      const { accessToken, username, email, roles } = response.data

      // Store auth data
      localStorage.setItem('authToken', accessToken)
      localStorage.setItem(
        'userRole',
        roles.includes('admin') ? 'admin' : 'user',
      )
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userName', username)
      localStorage.setItem('user', JSON.stringify(response.data))

      this.token = accessToken

      return response.data
    } catch (error) {
      console.error('Demo login failed:', error)
      throw error
    }
  }

  async loginDemo(credentials) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const isAdmin = credentials.role === 'admin' || credentials.isAdmin
    return this.demoLogin(isAdmin)
  }
}

export default new AuthService()
