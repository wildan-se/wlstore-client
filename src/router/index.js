import { createRouter, createWebHistory } from 'vue-router'
import IndexProduct from '@/views/product/IndexProduct.vue'
import DetailProduct from '@/views/product/DetailProduct.vue'
import IndexCart from '@/views/cart/IndexCart.vue'
import NotFound from '@/views/error/404Page.vue'

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
    },
    {
      path: '/cart',
      name: 'index-cart',
      component: IndexCart,
    },
    {
      path: '/:pathMatch(.*)*', // 404 Not Found
      component: NotFound,
    },
  ],
})

export default router
