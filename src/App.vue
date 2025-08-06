<template>
  <NavbarApp
    v-if="!isAdminRoute"
    :isLoggedIn="isLoggedIn"
    :isAdmin="isAdmin"
    :cartItemCount="cartItemCount"
    :userName="userName"
    :userRole="userRole"
    @logout="handleLogout"
  />
  <RouterView @auth-success="handleAuthSuccess" />
  <NotificationContainer />
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import NavbarApp from './components/NavbarApp.vue'
import NotificationContainer from './components/NotificationContainer.vue'
import { useAuth } from './composables/useAuth.js'
import { useCart } from './composables/useCart.js'

export default {
  name: 'App',
  components: {
    NavbarApp,
    NotificationContainer,
  },
  setup() {
    const route = useRoute()
    const {
      logout,
      isAuthenticated,
      isAdmin: checkIsAdmin,
      getCurrentUser,
    } = useAuth()
    const { cartItemCount, loadCart } = useCart()

    // Reactive state
    const isLoggedIn = ref(false)
    const isAdmin = ref(false)
    const userName = ref('User')
    const userRole = ref('Customer')

    // Check if current route is an admin route
    const isAdminRoute = computed(() => {
      return route.path.startsWith('/admin')
    })

    const checkAuthStatus = () => {
      isLoggedIn.value = isAuthenticated()
      isAdmin.value = checkIsAdmin()

      if (isLoggedIn.value) {
        const user = getCurrentUser()
        userName.value = user?.name || user?.username || 'User'
        userRole.value = isAdmin.value ? 'Admin' : 'Customer'
      } else {
        userName.value = 'User'
        userRole.value = 'Customer'
      }
    }

    const handleAuthSuccess = () => {
      checkAuthStatus()
    }

    const handleLogout = () => {
      logout()
      isLoggedIn.value = false
      isAdmin.value = false
      userName.value = 'User'
      userRole.value = 'Customer'
    }

    // Watch route changes
    watch(route, () => {
      checkAuthStatus()
    })

    // Check auth status and load cart on mount
    onMounted(() => {
      checkAuthStatus()
      loadCart()
    })

    return {
      isLoggedIn,
      isAdmin,
      cartItemCount,
      userName,
      userRole,
      isAdminRoute,
      handleAuthSuccess,
      handleLogout,
    }
  },
}
</script>

<style>
/* Global styles already imported from main.js */
</style>
