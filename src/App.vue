<template>
  <NavbarApp
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
import { defineComponent } from 'vue'
import NavbarApp from './components/NavbarApp.vue'
import NotificationContainer from './components/NotificationContainer.vue'
import AuthService from '@/services/auth.service'

export default defineComponent({
  components: {
    NavbarApp,
    NotificationContainer,
  },
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      cartItemCount: 0,
      userName: 'User',
      userRole: 'Customer',
    }
  },
  created() {
    this.checkAuthStatus()
  },
  methods: {
    checkAuthStatus() {
      this.isLoggedIn = AuthService.isLoggedIn()
      this.isAdmin = AuthService.isAdmin()

      if (this.isLoggedIn) {
        const user = AuthService.getCurrentUser()
        this.userName = user.name || user.username || 'User'
        this.userRole = this.isAdmin ? 'Admin' : 'Customer'
      } else {
        this.userName = 'User'
        this.userRole = 'Customer'
      }
    },
    handleAuthSuccess() {
      this.checkAuthStatus()
    },
    handleLogout() {
      AuthService.logout()
      this.isLoggedIn = false
      this.isAdmin = false
      this.userName = 'User'
      this.userRole = 'Customer'
      this.$router.push({ name: 'login' })
    },
  },
  watch: {
    $route: 'checkAuthStatus',
  },
})
</script>

<style>
/* Global styles already imported from main.js */
</style>
