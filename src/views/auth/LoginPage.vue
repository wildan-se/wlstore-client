<template>
  <div
    class="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex"
  >
    <!-- Left Side - Login Form -->
    <div
      class="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden"
    >
      <!-- Animated Background for Left Side -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Grid Pattern -->
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"
        ></div>

        <!-- Floating Orbs -->
        <div
          class="absolute w-48 h-48 rounded-full top-20 left-10 bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl animate-float"
        ></div>
        <div
          class="absolute w-32 h-32 rounded-full bottom-20 right-10 bg-gradient-to-br from-purple-400/20 to-pink-600/20 blur-3xl animate-float-delayed"
        ></div>

        <!-- Geometric Shapes -->
        <div
          class="absolute w-16 h-16 rotate-45 border top-1/4 right-1/4 border-white/10 animate-spin-slow"
        ></div>
        <div
          class="absolute w-4 h-4 rotate-45 top-1/2 left-1/6 bg-purple-400/30 animate-bounce-slow"
        ></div>
      </div>

      <!-- Form Container -->
      <div class="relative z-10 w-full max-w-sm">
        <!-- Logo Section for Mobile -->
        <div class="mb-6 text-center lg:hidden animate-fade-in-up">
          <div class="relative inline-block mb-3">
            <div
              class="absolute inset-0 rounded-full opacity-75 bg-gradient-to-br from-blue-500 to-purple-600 blur-lg animate-pulse"
            ></div>
            <div
              class="relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600"
            >
              <svg
                class="w-7 h-7 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
          </div>
          <h1 class="mb-1 text-xl font-bold text-white">WLStore</h1>
        </div>

        <!-- Login Card -->
        <div class="relative group animate-fade-in-up animation-delay-200">
          <!-- Card Glow Effect -->
          <div
            class="absolute inset-0 transition-opacity duration-500 opacity-75 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover:opacity-100"
          ></div>

          <!-- Main Card -->
          <div
            class="relative overflow-hidden border shadow-2xl bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl"
          >
            <!-- Card Header Gradient -->
            <div
              class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            ></div>

            <div class="p-6">
              <!-- Header -->
              <div class="mb-6 text-center">
                <h2 class="mb-2 text-xl font-bold text-white">
                  Selamat Datang!
                </h2>
                <p class="text-blue-200/70 text-sm">
                  Masuk ke akun Anda untuk melanjutkan
                </p>
              </div>

              <!-- Form -->
              <form @submit.prevent="handleLogin" class="space-y-4">
                <!-- Username Field -->
                <div class="form-control group">
                  <label class="label" for="username">
                    <span
                      class="flex items-center gap-2 font-semibold text-white text-sm"
                    >
                      <div
                        class="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500/20"
                      >
                        <svg
                          class="w-3 h-3 text-blue-400"
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
                      </div>
                      Username
                    </span>
                  </label>
                  <div class="relative">
                    <input
                      type="text"
                      id="username"
                      v-model="username"
                      required
                      placeholder="Masukkan username"
                      class="w-full px-4 py-2.5 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-xl placeholder-white/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none text-sm"
                      :class="{
                        'border-red-400 bg-red-500/10':
                          username && username.length < 3,
                      }"
                    />
                    <div
                      class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl group-focus-within:opacity-100"
                    ></div>
                  </div>
                  <label v-if="username && username.length < 3" class="label">
                    <span class="text-xs text-red-400">Minimal 3 karakter</span>
                  </label>
                </div>

                <!-- Password Field -->
                <div class="form-control group">
                  <label class="label" for="password">
                    <span
                      class="flex items-center gap-2 font-semibold text-white text-sm"
                    >
                      <div
                        class="flex items-center justify-center w-4 h-4 rounded-full bg-cyan-500/20"
                      >
                        <svg
                          class="w-3 h-3 text-cyan-400"
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
                      Password
                    </span>
                  </label>
                  <div class="relative">
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      id="password"
                      v-model="password"
                      required
                      placeholder="Masukkan password"
                      class="w-full px-4 py-2.5 text-white transition-all duration-300 border pr-12 bg-white/10 border-white/20 rounded-xl placeholder-white/50 focus:bg-white/20 focus:border-cyan-400 focus:outline-none text-sm"
                      :class="{
                        'border-red-400 bg-red-500/10':
                          password && password.length < 6,
                      }"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute flex items-center -mt-9 justify-center w-8 h-8 transition-all duration-300 rounded-lg right-1 text-white/60 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    >
                      <!-- Eye Open Icon -->
                      <svg
                        v-if="!showPassword"
                        class="w-4 h-4 transition-all duration-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>

                      <!-- Eye Closed Icon -->
                      <svg
                        v-else
                        class="w-4 h-4 transition-all duration-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path
                          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68"
                        />
                        <path
                          d="M6.61 6.61A13.526 13.526 0 0 0 1 12s4 8 11 8a9.74 9.74 0 0 0 5.39-1.61"
                        />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
                    </button>
                    <div
                      class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl group-focus-within:opacity-100"
                    ></div>
                  </div>
                  <label v-if="password && password.length < 6" class="label">
                    <span class="text-xs text-red-400">Minimal 6 karakter</span>
                  </label>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="relative w-full py-3 mt-6 overflow-hidden font-semibold text-white group rounded-xl"
                  :disabled="isLoading || !isFormValid"
                  :class="{
                    'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300':
                      isFormValid && !isLoading,
                    'bg-gray-600 cursor-not-allowed': !isFormValid || isLoading,
                  }"
                >
                  <!-- Button Background Effect -->
                  <div
                    class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:opacity-100"
                  ></div>

                  <!-- Button Content -->
                  <div class="relative flex items-center justify-center gap-2">
                    <div
                      v-if="isLoading"
                      class="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"
                    ></div>
                    <svg
                      v-else
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 17L15 12L10 7"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 12H3"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span class="text-sm">{{
                      isLoading ? 'Memproses...' : 'Masuk Sekarang'
                    }}</span>
                  </div>
                </button>
              </form>

              <!-- Divider -->
              <div class="flex items-center my-5">
                <div
                  class="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                ></div>
                <span class="px-3 text-xs text-white/60">atau</span>
                <div
                  class="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                ></div>
              </div>

              <!-- Register Link -->
              <div class="text-center">
                <p class="mb-2 text-white/70 text-xs">Belum punya akun?</p>
                <router-link
                  to="/register"
                  class="relative inline-flex items-center justify-center w-full px-4 py-2.5 font-medium text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-xl hover:bg-white/20 hover:border-white/30 group overflow-hidden"
                >
                  <!-- Background Effect -->
                  <div
                    class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:opacity-100"
                  ></div>

                  <!-- Content -->
                  <div class="relative flex items-center justify-center gap-2">
                    <svg
                      class="w-3 h-3 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 7.5V3C19 2.73478 18.8946 2.48043 18.7071 2.29289C18.5196 2.10536 18.2652 2 18 2H6C5.73478 2 5.48043 2.10536 5.29289 2.29289C5.10536 2.48043 5 2.73478 5 3V7.5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3 7.5H21C21.5523 7.5 22 7.94772 22 8.5V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V8.5C2 7.94772 2.44772 7.5 3 7.5Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 11V17"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 14H15"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span
                      class="transition-transform duration-300 group-hover:translate-x-1 text-xs"
                    >
                      Daftar Akun Baru
                    </span>
                    <svg
                      class="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12H19" />
                      <path d="M12 5L19 12L12 19" />
                    </svg>
                  </div>
                </router-link>
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
                <div v-if="message" class="mt-4">
                  <div
                    :class="[
                      'flex items-center gap-2 p-3 rounded-xl border backdrop-blur-sm',
                      messageType === 'success'
                        ? 'bg-green-500/20 border-green-400/50 text-green-100'
                        : 'bg-red-500/20 border-red-400/50 text-red-100',
                    ]"
                  >
                    <div class="flex-shrink-0">
                      <svg
                        v-if="messageType === 'success'"
                        class="w-4 h-4 text-green-400"
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
                        class="w-4 h-4 text-red-400"
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
                    <span class="font-medium text-xs">{{ message }}</span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Branding & Information -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <!-- Animated Background for Right Side -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
      >
        <!-- Animated Patterns -->
        <div class="absolute inset-0 opacity-30">
          <div
            class="absolute w-96 h-96 rounded-full top-10 right-10 bg-gradient-to-br from-white/10 to-transparent blur-3xl animate-float-slow"
          ></div>
          <div
            class="absolute w-64 h-64 rounded-full bottom-20 left-10 bg-gradient-to-br from-white/10 to-transparent blur-3xl animate-float"
          ></div>
          <div
            class="absolute w-32 h-32 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white/20 to-transparent blur-2xl animate-pulse"
          ></div>
        </div>

        <!-- Geometric Elements -->
        <div class="absolute inset-0">
          <div
            class="absolute w-24 h-24 border-2 border-white/20 rotate-45 top-1/4 left-1/4 animate-spin-slow"
          ></div>
          <div
            class="absolute w-16 h-16 border border-white/30 rounded-full top-3/4 right-1/3 animate-bounce-slow"
          ></div>
          <div
            class="absolute w-8 h-8 bg-white/20 rotate-45 top-1/2 right-1/4 animate-pulse"
          ></div>
        </div>
      </div>

      <!-- Content -->
      <div
        class="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white"
      >
        <!-- Logo -->
        <div class="mb-8 animate-fade-in-up">
          <div class="relative inline-block mb-6">
            <div
              class="absolute inset-0 rounded-full bg-white/20 blur-2xl animate-pulse"
            ></div>
            <div
              class="relative flex items-center justify-center w-24 h-24 rounded-full shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <svg
                class="w-12 h-12 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
          </div>
          <h1 class="text-4xl font-bold mb-4">WLStore</h1>
          <p class="text-xl text-white/80 mb-8">
            Platform E-commerce Terpercaya
          </p>
        </div>

        <!-- Features -->
        <div class="space-y-6 animate-fade-in-up animation-delay-200">
          <div class="flex items-center gap-4 text-left">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg">Produk Berkualitas</h3>
              <p class="text-white/70 text-sm">
                Ribuan produk pilihan dengan kualitas terjamin
              </p>
            </div>
          </div>

          <div class="flex items-center gap-4 text-left">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14H11V21L20 10H13Z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg">Pengiriman Cepat</h3>
              <p class="text-white/70 text-sm">
                Pengiriman express ke seluruh Indonesia
              </p>
            </div>
          </div>

          <div class="flex items-center gap-4 text-left">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg">Transaksi Aman</h3>
              <p class="text-white/70 text-sm">
                Sistem pembayaran yang aman dan terpercaya
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-12 text-white/50 animate-fade-in-up animation-delay-400">
          <p class="text-sm">© 2025 WLStore. Semua hak dilindungi.</p>
          <p class="mt-1 text-xs">Powered by Vue.js & Tailwind CSS</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useAuth } from '../../composables/useAuth.js'
import { useMessage } from '../../composables/useFormValidation.js'

export default {
  name: 'LoginPage',
  setup() {
    const { login, isLoading } = useAuth()
    const { message, messageType, showMessage } = useMessage()

    // Reactive state
    const username = ref('')
    const password = ref('')
    const showPassword = ref(false)

    // Computed properties
    const isFormValid = computed(() => {
      return username.value.length >= 3 && password.value.length >= 6
    })

    const handleLogin = async () => {
      if (!isFormValid.value) {
        showMessage('Mohon lengkapi username dan password dengan benar!')
        return
      }

      await login(
        {
          username: username.value,
          password: password.value,
        },
        showMessage,
      )
    }

    return {
      username,
      password,
      showPassword,
      isLoading,
      message,
      messageType,
      isFormValid,
      handleLogin,
    }
  },
}
</script>

<style scoped>
/* Prevent scrolling */
html,
body {
  overflow: hidden !important;
  height: 100% !important;
}

/* Import the same animations from authPage.vue */
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

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
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
