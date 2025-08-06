<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100"
  >
    <!-- Floating Particles Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 left-10 w-32 h-32 bg-blue-300/20 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute top-40 right-20 w-24 h-24 bg-indigo-300/20 rounded-full blur-2xl animate-float-delayed"
      ></div>
      <div
        class="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl animate-float-slow"
      ></div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="min-h-screen flex items-center justify-center relative z-10"
    >
      <div
        class="text-center bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20"
      >
        <div class="relative mb-6">
          <div
            class="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"
          ></div>
          <div
            class="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-indigo-400 rounded-full animate-spin mx-auto"
            style="animation-delay: -0.5s"
          ></div>
        </div>
        <h3
          class="text-2xl font-bold mb-3 text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Memuat Detail Produk
        </h3>
        <p class="text-gray-600 text-lg">Mohon tunggu sebentar...</p>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="container mx-auto px-4 py-8 relative z-10">
      <!-- Product Detail -->
      <div
        class="bg-white/80 backdrop-blur-xl my-14 mx-10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in border border-white/30"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Product Gallery -->
          <div class="relative p-4 lg:p-6">
            <div
              class="aspect-square bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 rounded-3xl overflow-hidden relative group shadow-inner"
            >
              <img
                :src="getFullImageUrl(product.imageUrl)"
                :alt="product.name"
                class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                loading="lazy"
              />
              <!-- Gradient overlay on hover -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>

              <!-- Stock badge -->
              <div
                v-if="product.stock <= 5"
                class="absolute top-4 right-4 z-10"
              >
                <div
                  class="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-2xl shadow-xl border border-white/30 backdrop-blur-sm"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="w-2 h-2 bg-white rounded-full animate-pulse"
                    ></div>
                    <span class="text-xs font-bold">Stok Terbatas</span>
                  </div>
                </div>
              </div>

              <!-- Zoom indicator -->
              <div
                class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0"
              >
                <div
                  class="bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/20"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="8"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              </div>

              <!-- Floating action button -->
              <div
                class="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0"
              >
                <button
                  class="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-white/30 hover:bg-white transition-colors"
                >
                  <svg
                    class="w-5 h-5 text-gray-700"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 9V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V9"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M3 9V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V9"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path d="M9 12V16" stroke="currentColor" stroke-width="2" />
                    <path
                      d="M15 12V16"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-4 lg:p-6 space-y-5">
            <!-- Product Header -->
            <div class="space-y-4">
              <div class="flex items-start justify-between gap-4">
                <h1
                  class="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text"
                >
                  {{ product.name }}
                </h1>
                <div class="flex-shrink-0">
                  <div
                    class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-xl shadow-lg"
                  >
                    <span class="text-xs font-bold tracking-wider">{{
                      product.code
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Rating -->
              <div
                v-if="product.averageRating"
                class="flex items-center gap-4 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200"
              >
                <div class="flex items-center gap-1">
                  <div v-for="star in 5" :key="star" class="text-lg">
                    <svg
                      :class="
                        star <= Math.floor(product.averageRating)
                          ? 'text-amber-400 drop-shadow-sm'
                          : 'text-gray-300'
                      "
                      class="w-5 h-5 transition-all duration-200 hover:scale-110"
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
                  <span class="text-lg font-bold text-amber-700">{{
                    product.averageRating.toFixed(1)
                  }}</span>
                  <span class="text-sm text-amber-600 ml-1">dari 5</span>
                </div>
              </div>
            </div>

            <!-- Price Section -->
            <div
              class="relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-2xl overflow-hidden"
            >
              <!-- Background pattern -->
              <div class="absolute inset-0 opacity-10">
                <div
                  class="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"
                ></div>
                <div
                  class="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"
                ></div>
              </div>

              <div class="relative flex items-center justify-between">
                <div>
                  <p class="text-blue-100 mb-2 text-sm font-medium">
                    Harga Special
                  </p>
                  <div class="flex items-baseline gap-2">
                    <span class="text-lg text-blue-200">Rp</span>
                    <span class="text-3xl lg:text-4xl font-black">
                      {{ parseFloat(product.price).toLocaleString('id-ID') }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-blue-100 mb-2 text-sm font-medium">
                    Stok Tersedia
                  </p>
                  <div class="flex items-center justify-end gap-3">
                    <div class="relative">
                      <div
                        :class="[
                          'w-4 h-4 rounded-full',
                          product.stock > 10
                            ? 'bg-green-400'
                            : product.stock > 5
                              ? 'bg-yellow-400'
                              : 'bg-red-400',
                        ]"
                      ></div>
                      <div
                        :class="[
                          'absolute inset-0 w-4 h-4 rounded-full animate-ping',
                          product.stock > 10
                            ? 'bg-green-400'
                            : product.stock > 5
                              ? 'bg-yellow-400'
                              : 'bg-red-400',
                        ]"
                        style="animation-duration: 2s"
                      ></div>
                    </div>
                    <span class="text-2xl font-bold">{{ product.stock }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description Section -->
            <div
              class="relative bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-3xl border border-gray-200 shadow-inner"
            >
              <div
                class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl"
              ></div>
              <h3
                class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3"
              >
                <div
                  class="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M14 2H6C5.4 2 4.9 2.4 4.9 3V21C4.9 21.6 5.3 22 5.9 22H18C18.6 22 19 21.6 19 21V7L14 2Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M14 2V7H19"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path d="M16 13H8" stroke="currentColor" stroke-width="2" />
                    <path d="M16 17H8" stroke="currentColor" stroke-width="2" />
                  </svg>
                </div>
                Deskripsi Produk
              </h3>
              <p
                class="text-gray-700 leading-relaxed text-sm lg:text-base relative z-10"
              >
                {{ product.description }}
              </p>
            </div>

            <!-- Action Section -->
            <div class="space-y-4">
              <button
                class="group relative w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-bold py-5 px-6 rounded-3xl transition-all duration-500 transform hover:scale-[1.02] shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                @click="addToCart(product.code)"
                :disabled="product.stock === 0 || loading"
              >
                <!-- Button background animation -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                <div class="relative flex items-center justify-center gap-3">
                  <div v-if="loading" class="flex items-center gap-2">
                    <div
                      class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"
                    ></div>
                    <div
                      class="w-2 h-2 bg-white rounded-full animate-bounce"
                      style="animation-delay: 0.1s"
                    ></div>
                    <div
                      class="w-2 h-2 bg-white rounded-full animate-bounce"
                      style="animation-delay: 0.2s"
                    ></div>
                    <div
                      class="w-2 h-2 bg-white rounded-full animate-bounce"
                      style="animation-delay: 0.3s"
                    ></div>
                  </div>
                  <svg
                    v-else
                    class="w-6 h-6 transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="9"
                      cy="20"
                      r="1"
                      stroke="currentColor"
                      stroke-width="2.5"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="1"
                      stroke="currentColor"
                      stroke-width="2.5"
                    />
                  </svg>
                  <span class="text-lg font-bold tracking-wide">
                    {{
                      loading
                        ? 'Menambahkan...'
                        : product.stock === 0
                          ? 'Stok Habis'
                          : 'Tambah ke Keranjang'
                    }}
                  </span>
                </div>
              </button>

              <!-- Feature highlights -->
              <div class="grid grid-cols-3 gap-3">
                <div
                  class="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-2xl text-center border border-green-200 hover:shadow-lg transition-shadow"
                >
                  <div
                    class="bg-gradient-to-r from-green-500 to-emerald-600 w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p class="text-xs font-bold text-green-700">
                    Kualitas Premium
                  </p>
                </div>
                <div
                  class="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-2xl text-center border border-blue-200 hover:shadow-lg transition-shadow"
                >
                  <div
                    class="bg-gradient-to-r from-blue-500 to-indigo-600 w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13 10V3L4 14H11V21L20 10H13Z"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p class="text-xs font-bold text-blue-700">Kirim Cepat</p>
                </div>
                <div
                  class="bg-gradient-to-br from-purple-50 to-violet-100 p-4 rounded-2xl text-center border border-purple-200 hover:shadow-lg transition-shadow"
                >
                  <div
                    class="bg-gradient-to-r from-purple-500 to-violet-600 w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p class="text-xs font-bold text-purple-700">
                    Aman Terpercaya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <NotFound v-else />
  </div>
</template>

<script>
import axios from 'axios'
import OrderService from '@/services/order.service'
import NotFound from '../error/404Page.vue'
import { useNotification } from '@/composables/useNotification'

export default {
  components: {
    NotFound,
  },
  props: ['id'],
  setup() {
    const { showError, showSuccess } = useNotification()
    return { showError, showSuccess }
  },
  data() {
    return {
      product: null,
      loading: false,
      addingToCart: false,
      API_BASE_URL:
        import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ||
        'http://localhost:8001',
    }
  },
  methods: {
    // Fungsi baru untuk mendapatkan URL gambar lengkap
    getFullImageUrl(relativePath) {
      if (!relativePath) return '/placeholder-product.jpg'
      if (
        relativePath &&
        (relativePath.startsWith('http://') ||
          relativePath.startsWith('https://'))
      ) {
        return relativePath
      }
      // For all relative paths (both /img/ and /uploads/), use backend server
      return `${this.API_BASE_URL}${relativePath}`
    },
    async addToCart(productCode) {
      // Stronger debounce protection
      if (this.loading || this.addingToCart) {
        return
      }

      // Check authentication first
      const token = localStorage.getItem('token')
      if (!token) {
        this.showError('Silakan login terlebih dahulu')
        this.$router.push('/login')
        return
      }

      this.loading = true
      this.addingToCart = true

      try {
        await OrderService.addToCart(productCode, 1)

        // Show success notification ONLY once
        this.showSuccess('Produk berhasil ditambahkan ke keranjang!')
      } catch (error) {
        console.error('Failed to add product to cart:', error)
        let errorMessage = 'Gagal menambahkan produk. Silakan coba lagi.'

        if (error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
            errorMessage = 'Silakan login terlebih dahulu'
            this.showError(errorMessage)
            this.$router.push('/login')
            return
          }
          if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message
          }
        }

        this.showError(errorMessage)
      } finally {
        this.loading = false
        this.addingToCart = false
      }
    },
    async fetchProduct() {
      this.loading = true
      try {
        const result = await axios.get(
          `${this.API_BASE_URL}/api/products/${this.id}`,
        )
        this.product = result.data
      } catch (error) {
        console.error('Failed to fetch product data:', error)
        this.product = null
      } finally {
        this.loading = false
      }
    },
  },
  created() {
    this.fetchProduct()
  },
  watch: {
    id: 'fetchProduct',
  },
}
</script>

<style scoped>
/* Enhanced animations */
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Floating background elements */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(-3deg);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
  animation-delay: 4s;
}

/* Enhanced gradient shimmer effect */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.loading-shimmer {
  background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
  background-size: 200px 100%;
  animation: shimmer 2s infinite;
}

/* Button glow effects */
@keyframes glow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
  }
}

.btn-glow:hover {
  animation: glow 2s ease-in-out infinite;
}

/* Image hover effects */
.group:hover .group-hover\\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\\:rotate-1 {
  transform: rotate(1deg) scale(1.1);
}

/* Pulse animation for status indicators */
@keyframes pulse-custom {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

.animate-pulse-custom {
  animation: pulse-custom 2s ease-in-out infinite;
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced ripple effect */
@keyframes ripple {
  0% {
    transform: scale(0) translate(-50%, -50%);
    opacity: 1;
  }
  100% {
    transform: scale(4) translate(-50%, -50%);
    opacity: 0;
  }
}

.btn-ripple {
  position: relative;
  overflow: hidden;
}

.btn-ripple::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: translate(-50%, -50%);
  transition:
    width 0.6s,
    height 0.6s;
}

.btn-ripple:active::before {
  width: 300px;
  height: 300px;
  animation: ripple 0.6s ease-out;
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-xl {
    backdrop-filter: blur(16px);
  }
  .backdrop-blur-lg {
    backdrop-filter: blur(12px);
  }
  .backdrop-blur-md {
    backdrop-filter: blur(8px);
  }
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

/* Glass morphism effects */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Scroll reveal animations */
@keyframes slideInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in-up {
  animation: slideInUp 0.6s ease-out forwards;
}

/* Loading dots animation */
@keyframes bounce-dots {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.bounce-dot {
  animation: bounce-dots 1.4s infinite ease-in-out both;
}

.bounce-dot:nth-child(1) {
  animation-delay: -0.32s;
}
.bounce-dot:nth-child(2) {
  animation-delay: -0.16s;
}
.bounce-dot:nth-child(3) {
  animation-delay: 0s;
}
</style>
