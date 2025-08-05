<template>
  <div
    class="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900"
  >
    <!-- Admin Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Grid Pattern -->
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_1px,transparent_1px)] bg-[length:40px_40px]"
      ></div>

      <!-- Floating Elements -->
      <div
        class="absolute rounded-full w-72 h-72 top-10 left-10 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 blur-3xl animate-float"
      ></div>
      <div
        class="absolute w-56 h-56 rounded-full top-32 right-16 bg-gradient-to-br from-purple-500/10 to-blue-600/10 blur-3xl animate-float-delayed"
      ></div>
      <div
        class="absolute rounded-full bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-500/5 to-blue-600/5 blur-3xl animate-float-slow"
      ></div>

      <!-- Geometric Shapes -->
      <div
        class="absolute w-16 h-16 rotate-45 border top-1/4 right-1/3 border-blue-400/20 animate-spin-slow"
      ></div>
      <div
        class="absolute w-8 h-8 rounded-full bottom-1/3 left-1/4 bg-gradient-to-br from-blue-400/30 to-transparent animate-pulse"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 w-full max-w-lg">
      <!-- Admin Logo Section -->
      <div class="mb-8 text-center animate-fade-in-up">
        <div class="relative inline-block mb-6">
          <div
            class="absolute inset-0 rounded-full opacity-75 bg-gradient-to-br from-blue-600 to-indigo-700 blur-lg animate-pulse"
          ></div>
          <div
            class="relative flex items-center justify-center w-24 h-24 rounded-full shadow-2xl bg-gradient-to-br from-blue-600 to-indigo-700"
          >
            <svg
              class="w-12 h-12 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
              />
            </svg>
          </div>
        </div>
        <h1 class="mb-3 text-4xl font-bold text-white">Admin Panel</h1>
        <p class="text-xl text-blue-200/80">WLStore Management System</p>
        <div
          class="inline-block px-4 py-2 mt-4 border rounded-full bg-blue-500/20 border-blue-400/30"
        >
          <span class="text-sm font-medium text-blue-300"
            >Administrator Access Only</span
          >
        </div>
      </div>

      <!-- Admin Login Card -->
      <div class="relative group animate-fade-in-up animation-delay-200">
        <!-- Card Glow Effect -->
        <div
          class="absolute inset-0 transition-opacity duration-500 opacity-75 bg-gradient-to-r from-blue-600/20 to-indigo-700/20 rounded-2xl blur-xl group-hover:opacity-100"
        ></div>

        <!-- Main Card -->
        <div
          class="relative overflow-hidden border shadow-2xl bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl"
        >
          <!-- Card Header Gradient -->
          <div
            class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
          ></div>

          <div class="p-8">
            <!-- Header -->
            <div class="mb-8 text-center">
              <h2 class="mb-3 text-2xl font-bold text-white">Admin Login</h2>
              <p class="text-blue-200/70">
                Masuk untuk mengakses dashboard administrasi
              </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleAdminLogin" class="space-y-6">
              <!-- Username Field -->
              <div class="form-control group">
                <label class="label" for="adminUsername">
                  <span
                    class="flex items-center gap-2 font-semibold text-white"
                  >
                    <div
                      class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20"
                    >
                      <svg
                        class="w-3 h-3 text-blue-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    Admin Username
                  </span>
                </label>
                <div class="relative">
                  <input
                    type="text"
                    id="adminUsername"
                    v-model="username"
                    required
                    placeholder="Masukkan username admin"
                    class="w-full px-4 py-3 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-xl placeholder-white/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none"
                    :class="{
                      'border-red-400 bg-red-500/10':
                        username && username.length < 3,
                    }"
                  />
                  <div
                    class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl group-focus-within:opacity-100"
                  ></div>
                </div>
                <label v-if="username && username.length < 3" class="label">
                  <span class="text-sm text-red-400"
                    >Username minimal 3 karakter</span
                  >
                </label>
              </div>

              <!-- Password Field -->
              <div class="form-control group">
                <label class="label" for="adminPassword">
                  <span
                    class="flex items-center gap-2 font-semibold text-white"
                  >
                    <div
                      class="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20"
                    >
                      <svg
                        class="w-3 h-3 text-indigo-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    Admin Password
                  </span>
                </label>
                <div class="relative">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="adminPassword"
                    v-model="password"
                    required
                    placeholder="Masukkan password admin"
                    class="w-full px-4 py-3 pr-12 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-xl placeholder-white/50 focus:bg-white/20 focus:border-indigo-400 focus:outline-none"
                    :class="{
                      'border-red-400 bg-red-500/10':
                        password && password.length < 6,
                    }"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute transition-colors duration-200 transform -translate-y-1/2 right-3 top-1/2 text-white/50 hover:text-white"
                  >
                    <svg
                      v-if="showPassword"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 4.02811 7.65663 6.17 6.08L17.94 17.94Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19L9.9 4.24Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <line
                        x1="1"
                        y1="1"
                        x2="23"
                        y2="23"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-xl group-focus-within:opacity-100"
                  ></div>
                </div>
                <label v-if="password && password.length < 6" class="label">
                  <span class="text-sm text-red-400"
                    >Password minimal 6 karakter</span
                  >
                </label>
              </div>

              <!-- Admin Login Button -->
              <button
                type="submit"
                class="relative w-full py-4 mt-8 overflow-hidden font-semibold text-white group rounded-xl"
                :disabled="isLoading || !isFormValid"
                :class="{
                  'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300':
                    isFormValid && !isLoading,
                  'bg-gray-600 cursor-not-allowed': !isFormValid || isLoading,
                }"
              >
                <!-- Button Background Effect -->
                <div
                  class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:opacity-100"
                ></div>

                <!-- Button Content -->
                <div class="relative flex items-center justify-center gap-3">
                  <div
                    v-if="isLoading"
                    class="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"
                  ></div>
                  <svg
                    v-else
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>{{
                    isLoading ? 'Memverifikasi...' : 'Login as Administrator'
                  }}</span>
                </div>
              </button>
            </form>

            <!-- Divider -->
            <div class="flex items-center my-8">
              <div
                class="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              ></div>
              <span class="px-4 text-sm text-white/60">atau</span>
              <div
                class="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              ></div>
            </div>

            <!-- Quick Admin Access -->
            <div class="text-center">
              <p class="mb-4 text-white/70">Perlu akses cepat?</p>
              <div class="flex flex-col gap-3">
                <button
                  @click="createAndLoginAdmin"
                  :disabled="isCreatingAdmin"
                  class="relative px-6 py-3 font-medium text-white transition-all duration-300 border bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-400/30 rounded-xl hover:from-emerald-500/30 hover:to-green-500/30 hover:border-emerald-400/50 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div class="flex items-center justify-center gap-2">
                    <div
                      v-if="isCreatingAdmin"
                      class="w-4 h-4 border-2 rounded-full border-emerald-300/30 border-t-emerald-400 animate-spin"
                    ></div>
                    <svg
                      v-else
                      class="w-4 h-4 text-emerald-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 7C9 9.20914 10.7909 11 13 11C15.2091 11 17 9.20914 17 7C17 4.79086 15.2091 3 13 3C10.7909 3 9 4.79086 9 7Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23 21V19C23 18.1645 22.7155 17.3737 22.2094 16.7812C21.7033 16.1887 20.9926 15.8352 20.2 15.79"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    {{
                      isCreatingAdmin ? 'Setup Admin...' : 'Setup Admin Account'
                    }}
                  </div>
                </button>

                <router-link
                  to="/login"
                  class="relative px-6 py-3 font-medium text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-xl hover:bg-white/20 group"
                >
                  <div class="flex items-center justify-center gap-2">
                    <svg
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Login sebagai User
                  </div>
                </router-link>
              </div>
            </div>

            <!-- Alert Message -->
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div v-if="message" class="mt-6">
                <div
                  :class="[
                    'flex items-center gap-3 p-4 rounded-xl border backdrop-blur-sm',
                    messageType === 'success'
                      ? 'bg-green-500/20 border-green-400/50 text-green-100'
                      : 'bg-red-500/20 border-red-400/50 text-red-100',
                  ]"
                >
                  <div class="flex-shrink-0">
                    <svg
                      v-if="messageType === 'success'"
                      class="w-5 h-5 text-green-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 12L11 14L15 10"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-5 h-5 text-red-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <path
                        d="M15 9L9 15"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 9L15 15"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <span class="font-medium">{{ message }}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="mt-8 text-center text-white/50 animate-fade-in-up animation-delay-400"
      >
        <p class="text-sm">© 2025 WLStore Admin Panel</p>
        <p class="mt-1 text-xs">Secure Administrator Access</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api.js'

export default {
  name: 'AdminLogin',
  setup() {
    const router = useRouter()

    // Reactive state
    const username = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const isLoading = ref(false)
    const isCreatingAdmin = ref(false)
    const message = ref('')
    const messageType = ref('error')

    // Computed properties
    const isFormValid = computed(() => {
      return username.value.length >= 3 && password.value.length >= 6
    })

    // Methods
    const clearMessage = () => {
      message.value = ''
      messageType.value = 'error'
    }

    const showMessage = (msg, type = 'error') => {
      message.value = msg
      messageType.value = type
      setTimeout(clearMessage, 5000)
    }

    const handleAdminLogin = async () => {
      if (!isFormValid.value) {
        showMessage('Mohon lengkapi username dan password dengan benar!')
        return
      }

      isLoading.value = true
      clearMessage()

      try {
        const response = await api.post('/auth/signin', {
          username: username.value,
          password: password.value,
        })

        if (response.data.accessToken) {
          // Check if user has admin role
          const userRoles = response.data.roles || []
          const isAdmin =
            userRoles.includes('admin') || userRoles.includes('ROLE_ADMIN')

          if (!isAdmin) {
            showMessage('Akses ditolak! Akun ini bukan administrator.')
            return
          }

          // Store admin token and user data
          localStorage.setItem('token', response.data.accessToken)
          localStorage.setItem('user', JSON.stringify(response.data))
          localStorage.setItem('userRole', 'admin')

          showMessage(
            'Login admin berhasil! Mengalihkan ke dashboard...',
            'success',
          )

          // Redirect to admin dashboard
          setTimeout(() => {
            router.push('/admin/products')
          }, 1500)
        }
      } catch (error) {
        console.error('Admin login error:', error)

        let errorMessage = 'Login gagal. Periksa username dan password.'

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

    const createAndLoginAdmin = async () => {
      isCreatingAdmin.value = true
      clearMessage()

      try {
        // Create admin account with predefined credentials
        const adminData = {
          username: 'admin',
          email: 'admin@wlstore.com',
          name: 'Administrator WLStore',
          phone: '08123456789',
          password: 'admin123',
          roles: ['admin', 'user'], // Include both roles for full access
        }

        const response = await api.post('/auth/signup', adminData)

        if (response.data.message) {
          showMessage('Admin account created successfully!', 'success')

          // Auto-fill login form
          username.value = 'admin'
          password.value = 'admin123'

          // Auto-login after creation
          setTimeout(() => {
            handleAdminLogin()
          }, 1000)
        }
      } catch (error) {
        console.error('Admin creation error:', error)

        if (error.response?.data?.message?.includes('already taken')) {
          showMessage(
            'Admin account already exists! Auto-filling credentials...',
            'success',
          )
          // Auto-fill if admin exists
          username.value = 'admin'
          password.value = 'admin123'
        } else {
          let errorMessage = 'Gagal membuat akun admin.'
          if (error.response?.data?.message) {
            errorMessage = error.response.data.message
          } else if (error.request) {
            errorMessage =
              'Tidak dapat terhubung ke server. Pastikan server berjalan.'
          }
          showMessage(errorMessage)
        }
      } finally {
        isCreatingAdmin.value = false
      }
    }

    return {
      username,
      password,
      showPassword,
      isLoading,
      isCreatingAdmin,
      message,
      messageType,
      isFormValid,
      handleAdminLogin,
      createAndLoginAdmin,
    }
  },
}
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(-5deg);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation classes */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

/* Glass morphism effects */
.backdrop-blur-xl {
  backdrop-filter: blur(16px);
}

/* Smooth transitions */
* {
  transition: all 0.3s ease;
}

/* Form focus effects */
input:focus {
  transform: translateY(-1px);
}

/* Button hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
}

/* Loading animation for buttons */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Enhanced glass effect for form elements */
.form-control input:focus {
  box-shadow:
    0 0 0 1px rgba(59, 130, 246, 0.5),
    0 0 20px rgba(59, 130, 246, 0.2);
}
</style>
