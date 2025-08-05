<template>
  <nav
    class="bg-gradient-to-r from-slate-800 via-gray-900 to-slate-800 text-white shadow-2xl"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Admin Logo & Brand -->
        <div class="flex items-center gap-4">
          <router-link
            to="/admin/products"
            class="flex items-center gap-3 hover:bg-white/10 rounded-lg p-2 transition-all duration-300"
          >
            <div class="relative">
              <div
                class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg blur-sm opacity-75"
              ></div>
              <div
                class="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg"
              >
                <svg
                  class="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h1 class="text-xl font-bold">WLStore Admin</h1>
              <p class="text-xs text-blue-200/70">Management Panel</p>
            </div>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center gap-2">
          <router-link
            to="/admin/products"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/admin/products' }"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7L9 18L4 13"
              />
            </svg>
            Products
          </router-link>

          <router-link
            to="/admin/orders"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/admin/orders' }"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Orders
          </router-link>

          <router-link
            to="/admin/dashboard"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/admin/dashboard' }"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Dashboard
          </router-link>
        </div>

        <!-- Admin Profile & Actions -->
        <div class="flex items-center gap-4">
          <!-- View Store -->
          <router-link
            to="/"
            class="hidden md:flex items-center gap-2 px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View Store
          </router-link>

          <!-- Admin Info -->
          <div
            class="hidden md:flex items-center gap-3 px-4 py-2 bg-white/10 rounded-lg"
          >
            <div
              class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                />
              </svg>
            </div>
            <div class="text-sm">
              <p class="font-medium">{{ adminName }}</p>
              <p class="text-blue-200/70">Administrator</p>
            </div>
          </div>

          <!-- Logout Button -->
          <button
            @click="logout"
            class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 hover:border-red-400/50 rounded-lg transition-all duration-300 text-red-200 hover:text-white"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span class="hidden md:inline">Logout</span>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-2 opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden py-4 border-t border-white/10"
        >
          <div class="flex flex-col gap-2">
            <router-link
              to="/admin/products"
              class="mobile-nav-link"
              :class="{
                'mobile-nav-link-active': $route.path === '/admin/products',
              }"
              @click="closeMobileMenu"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7L9 18L4 13"
                />
              </svg>
              Products
            </router-link>

            <router-link
              to="/admin/orders"
              class="mobile-nav-link"
              :class="{
                'mobile-nav-link-active': $route.path === '/admin/orders',
              }"
              @click="closeMobileMenu"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Orders
            </router-link>

            <router-link
              to="/admin/dashboard"
              class="mobile-nav-link"
              :class="{
                'mobile-nav-link-active': $route.path === '/admin/dashboard',
              }"
              @click="closeMobileMenu"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Dashboard
            </router-link>

            <div class="border-t border-white/10 mt-2 pt-2">
              <router-link
                to="/"
                class="mobile-nav-link"
                @click="closeMobileMenu"
              >
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Store
              </router-link>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'NavbarAdmin',
  setup() {
    const router = useRouter()
    const isMobileMenuOpen = ref(false)

    const adminName = computed(() => {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      return user.name || user.username || 'Admin'
    })

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    const logout = () => {
      // Clear all stored data
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('userRole')

      // Redirect to admin login
      router.push('/admin/login')
    }

    // Close mobile menu when route changes
    onMounted(() => {
      router.afterEach(() => {
        closeMobileMenu()
      })
    })

    return {
      isMobileMenuOpen,
      adminName,
      toggleMobileMenu,
      closeMobileMenu,
      logout,
    }
  },
}
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
}

.nav-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link-active {
  background-color: rgba(59, 130, 246, 0.2);
  color: rgb(191, 219, 254);
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
}

.mobile-nav-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-nav-link-active {
  background-color: rgba(59, 130, 246, 0.2);
  color: rgb(191, 219, 254);
  border: 1px solid rgba(96, 165, 250, 0.3);
}
</style>
