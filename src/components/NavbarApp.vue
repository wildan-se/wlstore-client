<template>
  <header class="modern-header">
    <div class="nav-container">
      <!-- Logo/Brand -->
      <div class="brand">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            />
          </svg>
        </div>
        <h1 class="brand-text">WLstore</h1>
      </div>

      <!-- Navigation -->
      <nav class="nav-menu">
        <!-- Customer Navigation -->
        <template v-if="!isAdmin">
          <RouterLink :to="{ name: 'index-product' }" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            <span>Products</span>
          </RouterLink>

          <RouterLink :to="{ name: 'index-cart' }" class="nav-item cart-item">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
            <span>Cart</span>
            <div class="cart-badge" v-if="cartItemCount > 0">
              {{ cartItemCount }}
            </div>
          </RouterLink>
        </template>

        <!-- Admin Navigation -->
        <template v-if="isAdmin">
          <RouterLink
            :to="{ name: 'admin-dashboard' }"
            class="nav-item admin-item"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
              />
            </svg>
            <span>Dashboard</span>
          </RouterLink>

          <RouterLink
            :to="{ name: 'admin-products' }"
            class="nav-item admin-item"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
              />
              <path d="M3 10H21" />
            </svg>
            <span>Kelola Produk</span>
          </RouterLink>

          <RouterLink
            :to="{ name: 'admin-orders' }"
            class="nav-item admin-item"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
              />
              <circle cx="9" cy="20" r="1" />
              <circle cx="20" cy="20" r="1" />
            </svg>
            <span>Kelola Pesanan</span>
          </RouterLink>
        </template>

        <!-- Auth Actions -->
        <div class="auth-actions">
          <RouterLink
            v-if="!isLoggedIn"
            :to="{ name: 'login' }"
            class="btn btn-primary login-btn"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"
              />
            </svg>
            <span>Login</span>
          </RouterLink>

          <div v-if="isLoggedIn" class="user-menu">
            <button class="user-avatar" @click="toggleUserMenu">
              <div class="avatar-circle">{{ userInitials }}</div>
            </button>
            <div v-if="showUserMenu" class="user-dropdown">
              <div class="user-info">
                <div class="user-name">{{ userName }}</div>
                <div class="user-role">{{ userRole }}</div>
              </div>
              <hr class="dropdown-divider" />
              <button @click="logout" class="dropdown-item logout-item">
                <svg
                  class="dropdown-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5-5-5zm-1-1H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12v-2H4V8h12V6z"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <div class="hamburger" :class="{ active: showMobileMenu }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ active: showMobileMenu }">
      <!-- Customer Mobile Navigation -->
      <template v-if="!isAdmin">
        <RouterLink
          :to="{ name: 'index-product' }"
          class="mobile-nav-item"
          @click="closeMobileMenu"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
          <span>Products</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'index-cart' }"
          class="mobile-nav-item"
          @click="closeMobileMenu"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            />
          </svg>
          <span>Cart</span>
          <div class="cart-badge" v-if="cartItemCount > 0">
            {{ cartItemCount }}
          </div>
        </RouterLink>
      </template>

      <!-- Admin Mobile Navigation -->
      <template v-if="isAdmin">
        <RouterLink
          :to="{ name: 'admin-dashboard' }"
          class="mobile-nav-item"
          @click="closeMobileMenu"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
            />
          </svg>
          <span>Dashboard</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'admin-products' }"
          class="mobile-nav-item"
          @click="closeMobileMenu"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
            />
            <path d="M3 10H21" />
          </svg>
          <span>Kelola Produk</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'admin-orders' }"
          class="mobile-nav-item"
          @click="closeMobileMenu"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
            />
            <circle cx="9" cy="20" r="1" />
            <circle cx="20" cy="20" r="1" />
          </svg>
          <span>Kelola Pesanan</span>
        </RouterLink>
      </template>

      <div class="mobile-auth-section">
        <RouterLink
          v-if="!isLoggedIn"
          :to="{ name: 'login' }"
          class="btn btn-primary mobile-login-btn"
          @click="closeMobileMenu"
        >
          <span>Login</span>
        </RouterLink>

        <button
          v-if="isLoggedIn"
          @click="logout"
          class="btn btn-secondary mobile-logout-btn"
        >
          <span>Logout</span>
        </button>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      v-if="showMobileMenu"
      class="mobile-backdrop"
      @click="closeMobileMenu"
    ></div>
  </header>
</template>

<script>
import { ref, computed } from 'vue'

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
    const showUserMenu = ref(false)
    const showMobileMenu = ref(false)

    const userInitials = computed(() => {
      return props.userName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    })

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
    }

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }

    const logout = () => {
      showUserMenu.value = false
      showMobileMenu.value = false
      emit('logout')
    }

    return {
      showUserMenu,
      showMobileMenu,
      userInitials,
      toggleUserMenu,
      toggleMobileMenu,
      closeMobileMenu,
      logout,
    }
  },
}
</script>

<style scoped>
.modern-header {
  background: var(--gradient-primary);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all var(--transition);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-6);
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: white;
}

.logo-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
}

.logo-icon svg {
  width: 20px;
  height: 20px;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, white 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

/* Navigation */
.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: var(--radius);
  font-weight: 500;
  transition: all var(--transition);
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transition: left var(--transition-slow);
}

.nav-item:hover::before {
  left: 100%;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.nav-item.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.nav-icon {
  width: 18px;
  height: 18px;
  opacity: 0.9;
}

/* Cart Badge */
.cart-item {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--error-500);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--radius-full);
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 0.5s ease-out;
}

/* Auth Actions */
.auth-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-left: var(--space-4);
}

.login-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

/* User Menu */
.user-menu {
  position: relative;
}

.user-avatar {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-full);
  padding: 0;
  cursor: pointer;
  transition: all var(--transition);
}

.user-avatar:hover {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.5);
}

.avatar-circle {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
}

.user-dropdown {
  position: absolute;
  top: calc(100% + var(--space-2));
  right: 0;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  min-width: 200px;
  z-index: 1001;
  animation: fadeIn 0.2s ease-out;
}

.user-info {
  padding: var(--space-4);
}

.user-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.user-role {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.dropdown-divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 0;
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color var(--transition);
}

.dropdown-item:hover {
  background: var(--surface);
}

.logout-item {
  color: var(--error-600);
}

.logout-item:hover {
  background: var(--error-50);
}

.dropdown-icon {
  width: 16px;
  height: 16px;
}

/* Mobile Menu */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
}

.hamburger {
  width: 24px;
  height: 18px;
  position: relative;
  transform: rotate(0deg);
  transition: var(--transition);
}

.hamburger span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: white;
  border-radius: 2px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: var(--transition);
}

.hamburger span:nth-child(1) {
  top: 0px;
}

.hamburger span:nth-child(2) {
  top: 8px;
}

.hamburger span:nth-child(3) {
  top: 16px;
}

.hamburger.active span:nth-child(1) {
  top: 8px;
  transform: rotate(135deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.hamburger.active span:nth-child(3) {
  top: 8px;
  transform: rotate(-135deg);
}

.mobile-nav {
  position: fixed;
  top: 100%;
  left: 0;
  width: 100%;
  height: calc(100vh - 100%);
  background: var(--surface-elevated);
  border-top: 1px solid var(--border);
  transform: translateY(100%);
  transition: transform var(--transition-slow);
  z-index: 999;
  padding: var(--space-6);
  overflow-y: auto;
}

.mobile-nav.active {
  transform: translateY(0);
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  color: var(--text-primary);
  text-decoration: none;
  border-radius: var(--radius);
  font-weight: 500;
  margin-bottom: var(--space-2);
  transition: background-color var(--transition);
  position: relative;
}

.mobile-nav-item:hover {
  background: var(--surface);
}

.mobile-nav-item.router-link-active {
  background: var(--primary-50);
  color: var(--primary-600);
}

.mobile-auth-section {
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border);
}

.mobile-login-btn,
.mobile-logout-btn {
  width: 100%;
  justify-content: center;
}

.mobile-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  animation: fadeIn 0.3s ease-out;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .nav-container {
    padding: var(--space-3) var(--space-4);
  }

  .brand-text {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .logo-icon {
    width: 28px;
    height: 28px;
  }

  .logo-icon svg {
    width: 16px;
    height: 16px;
  }

  .brand-text {
    font-size: 1.125rem;
  }
}
</style>
