import { createRouter, createWebHistory } from 'vue-router'
import IndexProduct from '@/views/product/IndexProduct.vue'
import DetailProduct from '@/views/product/DetailProduct.vue'
import IndexCart from '@/views/cart/IndexCart.vue'
import NotFound from '@/views/error/404Page.vue'
import AdminProducts from '@/views/admin/AdminProducts.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminOrders from '@/views/admin/AdminOrders.vue'
import LoginPage from '@/views/auth/LoginPage.vue'

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
      component: LoginPage,
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
  const userRole = localStorage.getItem('userRole')
  const isAuthenticated = !!localStorage.getItem('authToken')
  const isAdmin = userRole === 'admin'

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Jika rute butuh otentikasi tapi belum login, redirect ke halaman login
    next({ name: 'login' })
  } else if (to.meta.requiresAdmin && !isAdmin) {
    // Jika rute butuh admin role tapi bukan admin, redirect ke home
    next({ name: 'index-product' })
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Jika rute hanya untuk tamu (misal halaman login), tapi sudah login, redirect sesuai role
    if (isAdmin) {
      next({ name: 'admin-dashboard' })
    } else {
      next({ name: 'index-product' })
    }
  } else if (isAdmin && to.name === 'index-product') {
    // Redirect admin dari halaman product ke dashboard
    next({ name: 'admin-dashboard' })
  } else if (isAdmin && to.name === 'index-cart') {
    // Redirect admin dari halaman cart ke dashboard
    next({ name: 'admin-dashboard' })
  } else {
    next() // Lanjutkan navigasi
  }
})

export default router
