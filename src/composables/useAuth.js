import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api.js'

/**
 * Composable untuk autentikasi (login dan register)
 */
export function useAuth() {
  const router = useRouter()
  const isLoading = ref(false)

  // Login function
  const login = async (credentials, showMessage) => {
    isLoading.value = true

    try {
      const response = await api.post('/auth/signin', credentials)

      if (response.data.accessToken) {
        // Check if user has admin role
        const userRoles = response.data.roles || []
        const isAdmin =
          userRoles.includes('admin') || userRoles.includes('ROLE_ADMIN')

        // Store token and user data
        localStorage.setItem('token', response.data.accessToken)
        localStorage.setItem('user', JSON.stringify(response.data))

        if (isAdmin) {
          // Set admin role and redirect to admin dashboard
          localStorage.setItem('userRole', 'admin')
          showMessage(
            'Login admin berhasil! Mengalihkan ke dashboard...',
            'success',
          )

          setTimeout(() => {
            router.push('/admin/products')
          }, 1500)
        } else {
          // Set user role and redirect to products page
          localStorage.setItem('userRole', 'user')
          showMessage('Login berhasil! Mengalihkan...', 'success')

          setTimeout(() => {
            router.push('/')
          }, 1500)
        }
      }
    } catch (error) {
      console.error('Login error:', error)

      let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.'

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`
      } else if (error.request) {
        errorMessage =
          'Tidak dapat terhubung ke server. Pastikan server berjalan.'
      } else {
        errorMessage = error.message || 'Terjadi kesalahan tidak terduga.'
      }

      showMessage(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  // Register function
  const register = async (userData, showMessage) => {
    isLoading.value = true

    try {
      const response = await api.post('/auth/signup', userData)

      if (response.data.message) {
        showMessage('Registrasi berhasil! Silakan login.', 'success')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (error) {
      console.error('Register error:', error)

      let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.'

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`
      } else if (error.request) {
        errorMessage =
          'Tidak dapat terhubung ke server. Pastikan server berjalan.'
      } else {
        errorMessage = error.message || 'Terjadi kesalahan tidak terduga.'
      }

      showMessage(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userRole')
    router.push('/login')
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('token')
  }

  // Check if user is admin
  const isAdmin = () => {
    const userRole = localStorage.getItem('userRole')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return (
      userRole === 'admin' ||
      (user.roles &&
        (user.roles.includes('admin') || user.roles.includes('ROLE_ADMIN')))
    )
  }

  // Get current user
  const getCurrentUser = () => {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  }

  return {
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    getCurrentUser,
  }
}
