<template>
  <div class="navbar bg-primary text-primary-content shadow-lg">
    <div class="navbar-start">
      <!-- Mobile dropdown menu -->
      <div class="dropdown lg:hidden">
        <div tabindex="0" role="button" class="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-base-content"
        >
          <!-- Customer Mobile Navigation -->
          <template v-if="!isAdmin">
            <li>
              <RouterLink
                :to="{ name: 'index-product' }"
                class="flex items-center gap-2"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
                Products
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'index-cart' }"
                class="flex items-center gap-2"
              >
                <div class="indicator">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    />
                  </svg>
                  <span
                    v-if="cartItemCount > 0"
                    class="badge badge-sm badge-secondary indicator-item"
                    >{{ cartItemCount }}</span
                  >
                </div>
                Cart
              </RouterLink>
            </li>
          </template>

          <!-- Admin Mobile Navigation -->
          <template v-if="isAdmin">
            <li>
              <RouterLink
                :to="{ name: 'admin-dashboard' }"
                class="flex items-center gap-2"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                  />
                </svg>
                Dashboard
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'admin-products' }"
                class="flex items-center gap-2"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                  />
                  <path d="M3 10H21" />
                </svg>
                Kelola Produk
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'admin-orders' }"
                class="flex items-center gap-2"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                  />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="20" cy="20" r="1" />
                </svg>
                Kelola Pesanan
              </RouterLink>
            </li>
          </template>
        </ul>
      </div>

      <!-- Brand/Logo -->
      <RouterLink to="/" class="btn btn-ghost text-xl font-bold">
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 bg-primary-content/20 rounded-lg flex items-center justify-center"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
          </div>
          WLstore
        </div>
      </RouterLink>
    </div>

    <!-- Desktop Navigation -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-2">
        <!-- Customer Desktop Navigation -->
        <template v-if="!isAdmin">
          <li>
            <RouterLink
              :to="{ name: 'index-product' }"
              class="flex items-center gap-2"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              Products
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'index-cart' }"
              class="flex items-center gap-2"
            >
              <div class="indicator">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                  />
                </svg>
                <span
                  v-if="cartItemCount > 0"
                  class="badge badge-sm badge-secondary indicator-item"
                  >{{ cartItemCount }}</span
                >
              </div>
              Cart
            </RouterLink>
          </li>
        </template>

        <!-- Admin Desktop Navigation -->
        <template v-if="isAdmin">
          <li>
            <RouterLink
              :to="{ name: 'admin-dashboard' }"
              class="flex items-center gap-2"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                />
              </svg>
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'admin-products' }"
              class="flex items-center gap-2"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                />
                <path d="M3 10H21" />
              </svg>
              Kelola Produk
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'admin-orders' }"
              class="flex items-center gap-2"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                />
                <circle cx="9" cy="20" r="1" />
                <circle cx="20" cy="20" r="1" />
              </svg>
              Kelola Pesanan
            </RouterLink>
          </li>
        </template>
      </ul>
    </div>

    <!-- Auth Actions -->
    <div class="navbar-end">
      <!-- Login Button -->
      <RouterLink
        v-if="!isLoggedIn"
        :to="{ name: 'login' }"
        class="btn btn-ghost gap-2"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"
          />
        </svg>
        Login
      </RouterLink>

      <!-- User Dropdown -->
      <div v-if="isLoggedIn" class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div
            class="w-8 h-8 rounded-full bg-primary-content/20 flex items-center justify-center text-sm font-semibold"
          >
            {{ userInitials }}
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-base-content"
        >
          <li class="menu-title">
            <span class="text-base-content/70">{{ userName }}</span>
            <span class="text-xs text-base-content/50">{{ userRole }}</span>
          </li>
          <li><hr class="my-2" /></li>
          <li>
            <button @click="logout" class="text-error hover:bg-error/10">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5-5-5zm-1-1H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12v-2H4V8h12V6z"
                />
              </svg>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

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
    const userInitials = computed(() => {
      return props.userName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    })

    const logout = () => {
      emit('logout')
    }

    return {
      userInitials,
      logout,
    }
  },
}
</script>

<style scoped>
/* No custom styles needed - using DaisyUI components */
</style>
