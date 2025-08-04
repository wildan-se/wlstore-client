<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <!-- Logo Section -->
        <div class="logo-section">
          <div class="logo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
          <h1 class="app-name">WLStore</h1>
          <p class="app-subtitle">Admin & Customer Portal</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <circle cx="12" cy="16" r="1" fill="currentColor" />
                <path
                  d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="password-toggle"
              >
                <svg v-if="showPassword" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 2 12 2 12C3.24389 9.68192 5.231 7.81663 7.62 6.68"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 22 12 22 12C21.393 13.1356 20.5894 14.1901 19.76 15.12"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1749 15.0074 10.8016 14.8565C10.4283 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5717 9.14351 13.1984C8.99262 12.8251 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4858 9.58525 10.1546 9.88 9.88"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path d="M2 2L22 22" stroke="currentColor" stroke-width="2" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none">
                  <path
                    d="M2 12S5 4 12 4S22 12 22 12S19 20 12 20S2 12 2 12Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-wrapper">
              <input
                v-model="form.isAdmin"
                type="checkbox"
                class="checkbox-input"
              />
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">Login sebagai Admin</span>
            </label>
          </div>

          <button type="submit" class="login-btn" :disabled="loading">
            <div v-if="loading" class="loading-spinner"></div>
            <svg v-else viewBox="0 0 24 24" fill="none">
              <path
                d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M10 17L15 12L10 7"
                stroke="currentColor"
                stroke-width="2"
              />
              <path d="M15 12H3" stroke="currentColor" stroke-width="2" />
            </svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <!-- Demo Credentials -->
        <div class="demo-section">
          <h3 class="demo-title">Demo Credentials</h3>
          <div class="demo-cards">
            <div class="demo-card" @click="fillAdminCredentials">
              <div class="demo-header">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7H9V9H21ZM12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8Z"
                  />
                </svg>
                <span>Admin</span>
              </div>
              <div class="demo-details">
                <p>admin@wlstore.com</p>
                <p>admin123</p>
              </div>
            </div>

            <div class="demo-card" @click="fillUserCredentials">
              <div class="demo-header">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  />
                </svg>
                <span>User</span>
              </div>
              <div class="demo-details">
                <p>user@wlstore.com</p>
                <p>user123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Pattern -->
    <div class="bg-pattern"></div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from '@/composables/useNotification'
import AuthService from '@/services/auth.service'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const { showSuccess, showError } = useNotification()

    const form = ref({
      email: '',
      password: '',
      isAdmin: false,
    })

    const loading = ref(false)
    const showPassword = ref(false)

    const handleLogin = async () => {
      loading.value = true
      try {
        const credentials = {
          email: form.value.email,
          password: form.value.password,
          role: form.value.isAdmin ? 'admin' : 'user',
        }

        // Use AuthService for login
        await AuthService.loginDemo(credentials)

        if (form.value.isAdmin) {
          showSuccess('Admin login berhasil!')
          router.push('/admin/products')
        } else {
          showSuccess('Login berhasil!')
          router.push('/')
        }
      } catch (error) {
        console.error('Login error:', error)
        showError('Login gagal. Periksa kredensial Anda.')
      } finally {
        loading.value = false
      }
    }

    const fillAdminCredentials = () => {
      form.value.email = 'admin@wlstore.com'
      form.value.password = 'admin123'
      form.value.isAdmin = true
    }

    const fillUserCredentials = () => {
      form.value.email = 'user@wlstore.com'
      form.value.password = 'user123'
      form.value.isAdmin = false
    }

    return {
      form,
      loading,
      showPassword,
      handleLogin,
      fillAdminCredentials,
      fillUserCredentials,
    }
  },
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--primary-600) 0%,
    var(--primary-800) 100%
  );
  position: relative;
  overflow: hidden;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="login-pattern" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23login-pattern)"/></svg>');
  opacity: 0.3;
}

.login-container {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  padding: var(--space-6);
  position: relative;
  z-index: 1;
}

.login-card {
  background: var(--surface-elevated);
  border-radius: var(--radius-2xl);
  padding: var(--space-10);
  box-shadow: var(--shadow-2xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}

.logo-section {
  text-align: center;
  margin-bottom: var(--space-10);
}

.logo {
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
  color: white;
}

.logo svg {
  width: 32px;
  height: 32px;
}

.app-name {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.app-subtitle {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

.login-form {
  margin-bottom: var(--space-8);
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  font-size: 0.875rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: var(--space-4) var(--space-4) var(--space-4) var(--space-12);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all var(--transition);
}

.form-input:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.password-toggle {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius);
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-toggle:hover {
  background: var(--gray-100);
  color: var(--text-primary);
}

.password-toggle svg {
  width: 18px;
  height: 18px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  position: relative;
  transition: all var(--transition);
}

.checkbox-input:checked + .checkbox-custom {
  background: var(--primary-500);
  border-color: var(--primary-500);
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 500;
}

.login-btn {
  width: 100%;
  padding: var(--space-4);
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 48px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.login-btn svg {
  width: 18px;
  height: 18px;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.demo-section {
  border-top: 1px solid var(--border);
  padding-top: var(--space-6);
}

.demo-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  text-align: center;
}

.demo-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.demo-card {
  padding: var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition);
  background: var(--surface);
}

.demo-card:hover {
  border-color: var(--primary-300);
  background: var(--primary-50);
  transform: translateY(-2px);
}

.demo-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.demo-header svg {
  width: 16px;
  height: 16px;
  color: var(--primary-600);
}

.demo-header span {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.demo-details p {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0;
  font-family: var(--font-mono);
}

@media (max-width: 480px) {
  .login-container {
    padding: var(--space-4);
  }

  .login-card {
    padding: var(--space-6);
  }

  .app-name {
    font-size: 1.75rem;
  }

  .demo-cards {
    grid-template-columns: 1fr;
  }
}
</style>
