// Import fungsi dan komponen yang dibutuhkan untuk konfigurasi Vue Router
import { createRouter, createWebHistory } from 'vue-router'
// Mengimpor komponen untuk setiap halaman yang akan dihubungkan dengan rute
import IndexProduct from '@/views/product/IndexProduct.vue' // Halaman utama produk
import DetailProduct from '@/views/product/DetailProduct.vue' // Halaman detail produk
import IndexCart from '@/views/cart/IndexCart.vue' // Halaman keranjang belanja
import NotFound from '@/views/error/404Page.vue' // Halaman untuk rute tidak ditemukan

// Membuat instance router dengan konfigurasi
const router = createRouter({
  // Menggunakan mode history untuk navigasi berbasis URL yang bersih
  history: createWebHistory(import.meta.env.BASE_URL),
  // Daftar rute
  routes: [
    {
      path: '/', // URL untuk halaman utama
      name: 'index-product', // Nama rute, digunakan untuk navigasi programatik
      component: IndexProduct, // Komponen yang dirender untuk rute ini
    },
    {
      path: '/product/:id', // URL dengan parameter dinamis ":id"
      name: 'detail-product', // Nama rute untuk halaman detail produk
      component: DetailProduct, // Komponen yang dirender
    },
    {
      path: '/cart', // URL untuk halaman keranjang belanja
      name: 'index-cart', // Nama rute untuk navigasi ke halaman keranjang
      component: IndexCart, // Komponen yang dirender
    },
    {
      path: '/:pathMatch(.*)*', // Rute untuk menangkap semua URL yang tidak sesuai rute lain
      component: NotFound, // Komponen halaman 404 (tidak ditemukan)
    },
  ],
})

// Mengekspor instance router agar dapat digunakan di file utama aplikasi
export default router
