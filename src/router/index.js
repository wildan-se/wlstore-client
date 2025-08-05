import { createRouter, createWebHistory } from 'vue-router'
import IndexProduct from '@/views/product/IndexProduct.vue'
import DetailProduct from '@/views/product/DetailProduct.vue'
import IndexCart from '@/views/cart/IndexCart.vue'
import NotFound from '@/views/error/404Page.vue'
import AdminProducts from '@/views/admin/AdminProducts.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminOrders from '@/views/admin/AdminOrders.vue'
import AuthPage from '@/views/auth/authPage.vue'
import AdminLogin from '@/views/admin/AdminLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index-product',
      component: IndexProduct,
    },
    {
      path: '/product/:id',
      name: 'detail-product',
      component: DetailProduct,
      props: true,
    },
    {
      path: '/cart',
      name: 'index-cart',
      component: IndexCart,
    },
    {
      path: '/login',
      name: 'login',
      component: AuthPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: AuthPage,
      meta: { requiresGuest: true },
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin,
      meta: { requiresGuest: true },
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: AdminProducts,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: AdminOrders,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const userRole = localStorage.getItem('userRole')
  const isAuthenticated = !!token
  const isAdmin =
    userRole === 'admin' ||
    (user.roles &&
      (user.roles.includes('admin') || user.roles.includes('ROLE_ADMIN')))

  // Prevent admin users from accessing user login/register pages
  if (
    (to.name === 'login' || to.name === 'register') &&
    isAuthenticated &&
    isAdmin
  ) {
    next({ name: 'admin-products' })
    return
  }

  // Prevent regular users from accessing admin routes
  if (to.path.startsWith('/admin') && to.name !== 'admin-login') {
    if (!isAuthenticated) {
      next({ name: 'admin-login' })
      return
    }
    if (!isAdmin) {
      next({ name: 'index-product' })
      return
    }
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Jika rute butuh otentikasi tapi belum login
    if (to.path.startsWith('/admin')) {
      // Untuk rute admin, redirect ke admin login
      next({ name: 'admin-login' })
    } else {
      // Untuk rute user, redirect ke user login
      next({ name: 'login' })
    }
  } else if (to.meta.requiresAdmin && !isAdmin) {
    // Jika rute butuh admin role tapi bukan admin, redirect ke admin login atau home
    if (isAuthenticated) {
      next({ name: 'index-product' })
    } else {
      next({ name: 'admin-login' })
    }
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Jika rute hanya untuk tamu tapi sudah login, redirect sesuai role
    if (isAdmin) {
      next({ name: 'admin-products' })
    } else {
      next({ name: 'index-product' })
    }
  } else if (isAdmin && to.name === 'index-product') {
    // Redirect admin dari halaman product ke dashboard
    next({ name: 'admin-products' })
  } else if (isAdmin && to.name === 'index-cart') {
    // Redirect admin dari halaman cart ke dashboard
    next({ name: 'admin-products' })
  } else {
    next() // Lanjutkan navigasi
  }
})

export default router
