<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200 to-primary/10">
    <!-- Hero Section -->
    <section
      class="hero bg-gradient-to-r from-primary to-secondary text-primary-content relative overflow-hidden"
    >
      <div class="hero-overlay bg-opacity-30"></div>
      <div class="hero-content text-center py-20 z-10">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold animate-fade-in">
            Discover Amazing Products
          </h1>
          <p class="mb-5 opacity-90 animate-fade-in">
            Find everything you need in our curated collection of quality
            products
          </p>
          <div
            class="stats bg-base-100/10 backdrop-blur-sm text-primary-content animate-fade-in"
          >
            <div class="stat">
              <div class="stat-value">{{ products.length }}+</div>
              <div class="stat-title opacity-80">Products</div>
            </div>
            <div class="stat">
              <div class="stat-value">100%</div>
              <div class="stat-title opacity-80">Quality</div>
            </div>
            <div class="stat">
              <div class="stat-value">24/7</div>
              <div class="stat-title opacity-80">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-16 -mt-8 relative z-20">
      <!-- Filters and Search -->
      <div
        class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 mb-12 overflow-hidden"
      >
        <div class="p-6 lg:p-8">
          <!-- Header -->
          <div class="mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-2">
              Cari & Filter Produk
            </h2>
            <p class="text-gray-600 text-sm">
              Temukan produk yang Anda inginkan dengan mudah
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <!-- Search Section -->
            <div class="lg:col-span-5">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                <div class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                    />
                  </svg>
                  Pencarian Produk
                </div>
              </label>
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                    />
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari nama produk, deskripsi..."
                  class="w-full pl-12 pr-4 py-3.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500"
                  @input="handleSearch"
                />
                <div
                  v-if="searchQuery"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <button
                    @click="searchQuery = ''"
                    class="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Sort Filter -->
            <div class="lg:col-span-4">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                <div class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 6H21"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M7 12H17"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M10 18H14"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Urutkan Berdasarkan
                </div>
              </label>
              <div class="relative">
                <select
                  v-model="sortBy"
                  @change="handleSort"
                  class="w-full px-4 py-3.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Pilih urutan</option>
                  <option value="name">Nama A-Z</option>
                  <option value="price">Harga Terendah</option>
                  <option value="-price">Harga Tertinggi</option>
                  <option value="-averageRating">Rating Tertinggi</option>
                </select>
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8 10L12 14L16 10"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- View Mode Toggle -->
            <div class="lg:col-span-3">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                <div class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"
                    />
                  </svg>
                  Tampilan
                </div>
              </label>
              <div class="flex rounded-2xl bg-gray-100 p-1 space-x-1">
                <button
                  :class="[
                    'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300',
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-lg shadow-blue-500/20'
                      : 'text-gray-600 hover:text-gray-900',
                  ]"
                  @click="viewMode = 'grid'"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"
                    />
                  </svg>
                  Grid
                </button>
                <button
                  :class="[
                    'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300',
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-lg shadow-blue-500/20'
                      : 'text-gray-600 hover:text-gray-900',
                  ]"
                  @click="viewMode = 'list'"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
                    />
                  </svg>
                  List
                </button>
              </div>
            </div>
          </div>

          <!-- Results Summary -->
          <div v-if="!loading" class="mt-6 pt-6 border-t border-gray-200">
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-4">
                <span class="text-gray-600">
                  Menampilkan
                  <span class="font-semibold text-gray-900">{{
                    filteredProducts.length
                  }}</span>
                  dari
                  <span class="font-semibold text-gray-900">{{
                    products.length
                  }}</span>
                  produk
                </span>
                <div v-if="searchQuery" class="flex items-center gap-2">
                  <span class="text-gray-500">untuk</span>
                  <span
                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium"
                  >
                    "{{ searchQuery }}"
                  </span>
                </div>
              </div>
              <div v-if="searchQuery || sortBy" class="flex items-center gap-2">
                <button
                  @click="clearFilters"
                  class="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Reset Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div class="products-section">
        <!-- Loading State -->
        <div v-if="loading" class="py-8">
          <div
            :class="[
              'grid gap-6',
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 max-w-4xl mx-auto',
            ]"
          >
            <div
              v-for="i in 8"
              :key="i"
              class="card bg-base-100 shadow-lg animate-pulse"
            >
              <div class="h-48 bg-base-200 rounded-t-2xl"></div>
              <div class="card-body">
                <div class="h-4 bg-base-200 rounded mb-2"></div>
                <div class="h-4 bg-base-200 rounded w-3/5 mb-4"></div>
                <div class="h-10 bg-base-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16">
          <div class="card bg-error/10 text-error-content max-w-md mx-auto">
            <div class="card-body text-center">
              <svg
                class="w-16 h-16 mx-auto mb-4 text-error"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
              <h3 class="text-xl font-semibold mb-2">
                Oops! Something went wrong
              </h3>
              <p class="mb-4 opacity-70">{{ error }}</p>
              <button @click="fetchProducts" class="btn btn-primary">
                Try Again
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="filteredProducts.length === 0"
          class="text-center py-16"
        >
          <div class="card bg-base-100 max-w-md mx-auto">
            <div class="card-body text-center">
              <svg
                class="w-16 h-16 mx-auto mb-4 text-base-content/50"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              <h3 class="text-xl font-semibold mb-2">No products found</h3>
              <p class="opacity-70">
                {{
                  searchQuery
                    ? 'Try adjusting your search terms'
                    : 'Check back later for new products'
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Products Display -->
        <div
          v-else
          :class="[
            'grid gap-6',
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 max-w-4xl mx-auto',
          ]"
        >
          <ProductItem
            v-for="product in filteredProducts"
            :key="product.code"
            :product="product"
            @product-added-to-cart="handleProductAdded"
            class="animate-fade-in"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import ProductItem from '@/components/ProductItem.vue'
import api from '@/services/api.js'
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'IndexProduct',
  components: {
    ProductItem,
  },
  setup() {
    const products = ref([])
    const searchQuery = ref('')
    const sortBy = ref('')
    const viewMode = ref('grid')
    const loading = ref(false)
    const error = ref(null)

    const { showError } = useNotification()

    const filteredProducts = computed(() => {
      let filtered = [...products.value]

      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(
          product =>
            product.name.toLowerCase().includes(query) ||
            (product.description &&
              product.description.toLowerCase().includes(query)),
        )
      }

      // Apply sorting
      if (sortBy.value) {
        filtered.sort((a, b) => {
          if (sortBy.value === 'name') {
            return a.name.localeCompare(b.name)
          } else if (sortBy.value === 'price') {
            return a.price - b.price
          } else if (sortBy.value === '-price') {
            return b.price - a.price
          } else if (sortBy.value === '-averageRating') {
            return b.averageRating - a.averageRating
          }
          return 0
        })
      }

      return filtered
    })

    const fetchProducts = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await api.get('/products')
        products.value = response.data.data || response.data
      } catch (err) {
        console.error('Error fetching products:', err)
        error.value = 'Failed to load products. Please try again.'
        showError('Failed to load products')
      } finally {
        loading.value = false
      }
    }

    const handleSearch = () => {
      // Search is reactive through computed property
    }

    const handleSort = () => {
      // Sorting is reactive through computed property
    }

    const handleProductAdded = () => {
      // Notification already handled by ProductItem component
      // Event received for potential future use (analytics, etc.)
    }

    const clearFilters = () => {
      searchQuery.value = ''
      sortBy.value = ''
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      products,
      filteredProducts,
      searchQuery,
      sortBy,
      viewMode,
      loading,
      error,
      fetchProducts,
      handleSearch,
      handleSort,
      handleProductAdded,
      clearFilters,
    }
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
