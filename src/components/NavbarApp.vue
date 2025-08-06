<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Mobile menu button -->
        <div class="flex items-center lg:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              :class="{ 'rotate-90': isMobileMenuOpen }"
              class="h-6 w-6 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <!-- Logo and Brand -->
        <div class="flex items-center">
          <RouterLink
            to="/"
            class="flex items-center gap-3 group"
            @click="closeMobileMenu"
          >
            <div class="relative">
              <div
                class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <svg
                  class="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                  />
                </svg>
              </div>
              <div
                class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"
              ></div>
            </div>
            <div class="hidden sm:block">
              <h1
                class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              >
                WLstore
              </h1>
              <p class="text-xs text-gray-500 -mt-1">Premium Store</p>
            </div>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-1">
          <!-- Customer Navigation -->
          <template v-if="!isAdmin">
            <RouterLink
              :to="{ name: 'index-product' }"
              class="relative flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              <svg
                class="h-5 w-5 transition-colors"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              <span>Produk</span>
            </RouterLink>

            <RouterLink
              :to="{ name: 'index-cart' }"
              class="relative flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              <svg
                class="h-5 w-5 transition-colors"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                />
              </svg>
              <span>Keranjang</span>
              <span
                v-if="cartItemCount > 0"
                class="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1.5"
              >
                {{ cartItemCount }}
              </span>
            </RouterLink>
          </template>

          <!-- Admin Navigation -->
          <template v-if="isAdmin">
            <RouterLink
              :to="{ name: 'admin-dashboard' }"
              class="relative flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              <svg
                class="h-5 w-5 transition-colors"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                />
              </svg>
              <span>Dashboard</span>
            </RouterLink>

            <RouterLink
              :to="{ name: 'admin-products' }"
              class="relative flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              <svg
                class="h-5 w-5 transition-colors"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16ZM3 10H21"
                />
              </svg>
              <span>Kelola Produk</span>
            </RouterLink>

            <RouterLink
              :to="{ name: 'admin-orders' }"
              class="relative flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              <svg
                class="h-5 w-5 transition-colors"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                />
                <circle cx="9" cy="20" r="1" />
                <circle cx="20" cy="20" r="1" />
              </svg>
              <span>Kelola Pesanan</span>
            </RouterLink>
          </template>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-3">
          <!-- Login Button -->
          <RouterLink
            v-if="!isLoggedIn"
            :to="{ name: 'login' }"
            class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"
              />
            </svg>
            Masuk
          </RouterLink>

          <!-- User Profile Dropdown -->
          <div v-if="isLoggedIn" class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div
                class="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white text-sm font-semibold shadow-lg"
              >
                {{ userInitials }}
              </div>
              <div class="hidden sm:block text-left">
                <p
                  class="text-sm font-semibold text-gray-900 truncate max-w-24"
                >
                  {{ userName }}
                </p>
                <p class="text-xs text-gray-500">{{ userRole }}</p>
              </div>
              <svg
                :class="{ 'rotate-180': isUserMenuOpen }"
                class="w-4 h-4 text-gray-500 transition-transform duration-200"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8 10L12 14L16 10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <!-- User Dropdown Menu -->
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200/50 py-2 z-50"
              @click.stop
            >
              <div class="px-4 py-3 border-b border-gray-100">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-semibold"
                  >
                    {{ userInitials }}
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ userName }}</p>
                    <p class="text-sm text-gray-500">{{ userRole }}</p>
                  </div>
                </div>
              </div>

              <div class="py-2">
                <button
                  @click="handleLogout"
                  class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5-5-5zm-1-1H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12v-2H4V8h12V6z"
                    />
                  </svg>
                  <span class="font-medium">Keluar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
      @click="closeMobileMenu"
    ></div>

    <!-- Mobile Menu -->
    <div
      :class="[
        'fixed top-16 left-0 right-0 bg-white shadow-2xl z-40 lg:hidden transition-all duration-300 border-t border-gray-200',
        isMobileMenuOpen
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0',
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 py-6">
        <!-- Customer Mobile Navigation -->
        <template v-if="!isAdmin">
          <div class="space-y-2">
            <RouterLink
              :to="{ name: 'index-product' }"
              @click="closeMobileMenu"
              class="relative flex items-center gap-4 p-4 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              <div
                class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="h-5 w-5 transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
              </div>
              <span class="flex-1">Produk</span>
            </RouterLink>

            <RouterLink
              :to="{ name: 'index-cart' }"
              @click="closeMobileMenu"
              class="relative flex items-center gap-4 p-4 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              <div
                class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="h-5 w-5 transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                  />
                </svg>
              </div>
              <span class="flex-1">Keranjang</span>
              <span
                v-if="cartItemCount > 0"
                class="min-w-[24px] h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-2"
              >
                {{ cartItemCount }}
              </span>
            </RouterLink>
          </div>
        </template>

        <!-- Admin Mobile Navigation -->
        <template v-if="isAdmin">
          <div class="space-y-2">
            <RouterLink
              :to="{ name: 'admin-dashboard' }"
              @click="closeMobileMenu"
              class="relative flex items-center gap-4 p-4 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              <div
                class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="h-5 w-5 transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                  />
                </svg>
              </div>
              <span class="flex-1">Dashboard</span>
            </RouterLink>

            <RouterLink
              :to="{ name: 'admin-products' }"
              @click="closeMobileMenu"
              class="relative flex items-center gap-4 p-4 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              <div
                class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="h-5 w-5 transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16ZM3 10H21"
                  />
                </svg>
              </div>
              <span class="flex-1">Kelola Produk</span>
            </RouterLink>

            <RouterLink
              :to="{ name: 'admin-orders' }"
              @click="closeMobileMenu"
              class="relative flex items-center gap-4 p-4 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              <div
                class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="h-5 w-5 transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                  />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="20" cy="20" r="1" />
                </svg>
              </div>
              <span class="flex-1">Kelola Pesanan</span>
            </RouterLink>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'NavbarApp',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cartItemCount: {
      type: Number,
      default: 0,
    },
    userName: {
      type: String,
      default: 'User',
    },
    userRole: {
      type: String,
      default: 'Customer',
    },
  },
  emits: ['logout'],
  setup(props, { emit }) {
    const isMobileMenuOpen = ref(false)
    const isUserMenuOpen = ref(false)

    const userInitials = computed(() => {
      return props.userName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    })

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
      isUserMenuOpen.value = false
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    const toggleUserMenu = () => {
      isUserMenuOpen.value = !isUserMenuOpen.value
      isMobileMenuOpen.value = false
    }

    const handleLogout = () => {
      isUserMenuOpen.value = false
      emit('logout')
    }

    const handleClickOutside = event => {
      if (!event.target.closest('.relative')) {
        isUserMenuOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      userInitials,
      isMobileMenuOpen,
      isUserMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      toggleUserMenu,
      handleLogout,
    }
  },
}
</script>

<style scoped>
/* Smooth animations */
.nav-link {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glass morphism effects */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

/* Custom focus styles */
button:focus {
  outline: none;
}

/* Ensure proper z-index stacking */
.dropdown-menu {
  z-index: 60;
}
</style>
