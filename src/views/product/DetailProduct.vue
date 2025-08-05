<template>
  <div class="min-h-screen bg-base-200">
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <span
          class="loading loading-spinner loading-lg text-primary mb-4"
        ></span>
        <h3 class="text-xl font-semibold mb-2">Memuat Detail Produk</h3>
        <p class="text-base-content/70">Mohon tunggu sebentar...</p>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <div class="breadcrumbs text-sm mb-8">
        <ul>
          <li>
            <router-link
              to="/"
              class="flex items-center gap-2 hover:text-primary"
            >
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9L12 2L21 9V20C21 20.6 20.6 21 20 21H4C3.4 21 3 20.6 3 20V9Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 22V12H15V22"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Beranda
            </router-link>
          </li>
          <li>
            <span class="truncate max-w-xs">{{ product.name }}</span>
          </li>
        </ul>
      </div>

      <!-- Product Detail -->
      <div class="card bg-base-100 shadow-xl animate-fade-in">
        <div class="card-body p-0">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Product Gallery -->
            <div class="relative">
              <figure
                class="aspect-square bg-base-200 rounded-2xl overflow-hidden relative"
              >
                <img
                  :src="getFullImageUrl(product.imageUrl)"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  v-if="product.stock <= 5"
                  class="badge badge-warning absolute top-4 right-4"
                >
                  <span class="text-xs font-medium">Stok Terbatas</span>
                </div>
              </figure>
            </div>

            <!-- Product Info -->
            <div class="p-8 space-y-6">
              <!-- Product Header -->
              <div class="space-y-4">
                <h1 class="text-3xl font-bold text-base-content">
                  {{ product.name }}
                </h1>
                <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div
                    v-if="product.averageRating"
                    class="flex items-center gap-2"
                  >
                    <div class="rating rating-sm">
                      <span
                        v-for="star in 5"
                        :key="star"
                        :class="[
                          'mask mask-star-2',
                          star <= Math.floor(product.averageRating)
                            ? 'bg-orange-400'
                            : 'bg-base-300',
                        ]"
                      ></span>
                    </div>
                    <span class="text-sm text-base-content/70">
                      {{ product.averageRating.toFixed(1) }} dari 5
                    </span>
                  </div>
                  <div class="text-sm text-base-content/70">
                    Kode:
                    <span class="font-mono font-medium">{{
                      product.code
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Price Section -->
              <div class="bg-primary/10 p-4 rounded-2xl">
                <div class="flex items-baseline gap-2">
                  <span class="text-lg text-base-content/70">Rp</span>
                  <span class="text-3xl font-bold text-primary">
                    {{ parseFloat(product.price).toLocaleString('id-ID') }}
                  </span>
                </div>
              </div>

              <!-- Stock Section -->
              <div class="flex items-center gap-3 p-4 bg-base-200 rounded-xl">
                <svg
                  class="w-5 h-5 text-base-content/70"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path d="M3 10H21" stroke="currentColor" stroke-width="2" />
                </svg>
                <span class="text-base-content/70">
                  <strong class="text-base-content">{{ product.stock }}</strong>
                  tersedia
                </span>
              </div>

              <!-- Description Section -->
              <div class="divider"></div>
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-base-content">
                  Deskripsi Produk
                </h3>
                <p class="text-base-content/80 leading-relaxed">
                  {{ product.description }}
                </p>
              </div>

              <!-- Action Section -->
              <div class="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  class="btn btn-primary btn-lg flex-1"
                  @click="addToCart(product.code)"
                  :disabled="product.stock === 0 || loading"
                >
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="9"
                      cy="20"
                      r="1"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="1"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  {{
                    loading
                      ? 'Menambahkan...'
                      : product.stock === 0
                        ? 'Stok Habis'
                        : 'Tambah ke Keranjang'
                  }}
                </button>
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
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
