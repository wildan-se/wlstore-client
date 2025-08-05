<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 w-72 h-screen bg-white border-r border-gray-200 flex flex-col z-10"
    >
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center gap-3 font-bold text-gray-900">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8 text-blue-600"
          >
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
          <span>WLStore Admin</span>
        </div>
      </div>

      <nav class="flex-1 p-6 flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h3
            class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0"
          >
            Manajemen
          </h3>
          <ul class="list-none m-0 p-0 flex flex-col gap-1">
            <li>
              <router-link
                to="/admin/dashboard"
                class="flex items-center gap-3 px-4 py-3 rounded-md text-gray-600 no-underline font-medium transition-all duration-200 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="9"
                    stroke="currentColor"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="5"
                    stroke="currentColor"
                  />
                  <rect
                    x="14"
                    y="12"
                    width="7"
                    height="9"
                    stroke="currentColor"
                  />
                  <rect
                    x="3"
                    y="16"
                    width="7"
                    height="5"
                    stroke="currentColor"
                  />
                </svg>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/products"
                class="flex items-center gap-3 px-4 py-3 rounded-md bg-blue-50 text-blue-600 no-underline font-medium transition-all duration-200 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <path
                    d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                    stroke="currentColor"
                  />
                  <path d="M3 10H21" stroke="currentColor" />
                </svg>
                Kelola Produk
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/orders"
                class="flex items-center gap-3 px-4 py-3 rounded-md text-gray-600 no-underline font-medium transition-all duration-200 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                    stroke="currentColor"
                  />
                  <circle cx="9" cy="20" r="1" stroke="currentColor" />
                  <circle cx="20" cy="20" r="1" stroke="currentColor" />
                </svg>
                Kelola Pesanan
              </router-link>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h3
            class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0"
          >
            Sistem
          </h3>
          <ul class="list-none m-0 p-0 flex flex-col gap-1">
            <li>
              <a
                @click="handleLogout"
                class="flex items-center gap-3 px-4 py-3 rounded-md text-red-500 no-underline font-medium transition-all duration-200 cursor-pointer hover:bg-red-50 hover:text-red-600"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                    stroke="currentColor"
                  />
                  <path d="M16 17L21 12L16 7" stroke="currentColor" />
                  <path d="M21 12H9" stroke="currentColor" />
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 ml-72 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 p-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-1">Kelola Produk</h1>
            <p class="text-gray-600 m-0">Manajemen produk toko Anda</p>
          </div>
          <div>
            <button
              @click="showModal = true"
              class="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white border-none rounded-md font-medium cursor-pointer transition-all duration-200 hover:bg-blue-700"
            >
              <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                <path d="M12 5V19M5 12H19" stroke="currentColor" />
              </svg>
              Tambah Produk
            </button>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="flex-1 p-6 overflow-auto">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-blue-600"
                >
                  <path
                    d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                  />
                  <path d="M3 10H21" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-1">
                  {{ products.length }}
                </h3>
                <p class="text-gray-600 text-sm m-0">Total Produk</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-green-600"
                >
                  <path d="M9 12L11 14L15 10" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-1">
                  {{ activeProducts }}
                </h3>
                <p class="text-gray-600 text-sm m-0">Produk Aktif</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-amber-600"
                >
                  <path
                    d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-1">
                  {{ lowStockProducts }}
                </h3>
                <p class="text-gray-600 text-sm m-0">Stok Rendah</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Table -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-xl font-semibold text-gray-900 m-0">
                  Daftar Produk
                </h2>
              </div>
              <div>
                <div class="relative">
                  <svg
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 stroke-2"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle cx="11" cy="11" r="8" stroke="currentColor" />
                    <path d="M21 21L16.65 16.65" stroke="currentColor" />
                  </svg>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari produk..."
                    class="w-80 pl-11 pr-3 py-3 border border-gray-200 rounded-md text-sm transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-50"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr>
                  <th
                    class="bg-gray-50 px-6 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Gambar
                  </th>
                  <th
                    class="bg-gray-50 px-6 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Produk
                  </th>
                  <th
                    class="bg-gray-50 px-6 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Kode
                  </th>
                  <th
                    class="bg-gray-50 px-6 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Harga
                  </th>
                  <th
                    class="bg-gray-50 px-6 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Stok
                  </th>
                  <th
                    class="bg-gray-50 px-6 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Rating
                  </th>
                  <th
                    class="bg-gray-50 px-6 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="product in filteredProducts"
                  :key="product.code"
                  class="table-row"
                >
                  <td class="px-6 py-4 border-b border-gray-200">
                    <div class="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        :src="getProductImage(product.imageUrl)"
                        :alt="product.name"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200">
                    <div class="flex flex-col gap-1">
                      <h4 class="font-semibold text-gray-900 m-0">
                        {{ product.name }}
                      </h4>
                      <p class="text-gray-600 text-sm m-0">
                        {{ truncateText(product.description, 50) }}
                      </p>
                    </div>
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200">
                    <span class="text-sm font-mono text-gray-700">{{
                      product.code
                    }}</span>
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200">
                    <span class="font-semibold text-gray-900"
                      >Rp {{ formatPrice(product.price) }}</span
                    >
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200">
                    <span
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-medium',
                        'stock-badge',
                        getStockClass(product.stock),
                      ]"
                    >
                      {{ product.stock }}
                    </span>
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200">
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-medium text-gray-900">{{
                        product.averageRating.toFixed(1)
                      }}</span>
                      <div class="flex">
                        <span
                          v-for="i in 5"
                          :key="i"
                          :class="[
                            'text-lg',
                            i <= Math.round(product.averageRating)
                              ? 'text-yellow-400'
                              : 'text-gray-300',
                          ]"
                        >
                          ★
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200">
                    <div class="flex gap-2">
                      <button
                        @click="editProduct(product)"
                        class="w-8 h-8 rounded-md border border-gray-200 bg-white flex items-center justify-center cursor-pointer transition-all duration-200 text-blue-600 hover:bg-blue-50 hover:border-blue-600"
                        title="Edit"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          class="w-4 h-4 stroke-2"
                        >
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="currentColor"
                          />
                          <path
                            d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                            stroke="currentColor"
                          />
                        </svg>
                      </button>
                      <button
                        @click="deleteProduct(product)"
                        class="w-8 h-8 rounded-md border border-gray-200 bg-white flex items-center justify-center cursor-pointer transition-all duration-200 text-red-600 hover:bg-red-50 hover:border-red-600"
                        title="Delete"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          class="w-4 h-4 stroke-2"
                        >
                          <path
                            d="M3 6H5H21"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                          <path
                            d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                          <path
                            d="M10 11V17M14 11V17"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Product Modal -->
    <ProductModal
      v-if="showModal"
      :show="showModal"
      :product="editingProduct"
      @close="closeModal"
      @save="handleSaveProduct"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from '@/composables/useNotification'
import AuthService from '@/services/auth.service'
import ProductModal from '@/components/ProductModal.vue'
import api from '@/services/api.js'

export default {
  name: 'AdminProducts',
  components: {
    ProductModal,
  },
  setup() {
    const router = useRouter()
    const { showSuccess, showError } = useNotification()

    const products = ref([])
    const searchQuery = ref('')
    const showModal = ref(false)
    const editingProduct = ref(null)

    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001'

    // Check if user is admin
    const ensureAdminAccess = async () => {
      if (!AuthService.isAuthenticated()) {
        showError('Authentication required. Redirecting to login...')
        router.push('/login')
        return false
      } else if (!AuthService.isAdmin()) {
        showError('Admin access required')
        router.push('/login')
        return false
      }
      return true
    }

    const filteredProducts = computed(() => {
      if (!searchQuery.value) return products.value

      const query = searchQuery.value.toLowerCase()
      return products.value.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.code.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query),
      )
    })

    const activeProducts = computed(
      () => products.value.filter(p => p.stock > 0).length,
    )

    const lowStockProducts = computed(
      () => products.value.filter(p => p.stock <= 5 && p.stock > 0).length,
    )

    const fetchProducts = async () => {
      try {
        const response = await api.get('/products')
        products.value = response.data.data || response.data
      } catch (error) {
        console.error('Error fetching products:', error)
        let errorMessage = 'Failed to load products'

        if (error.response) {
          if (error.response.status === 403) {
            errorMessage = 'Access denied. Please check your permissions.'
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message
          }
        } else if (error.message === 'Network Error') {
          errorMessage = 'Network error. Please check if the server is running.'
        }

        showError(errorMessage)
      }
    }

    const getProductImage = imageUrl => {
      if (!imageUrl) return '/placeholder-product.jpg'
      if (imageUrl.startsWith('http')) return imageUrl
      if (imageUrl.startsWith('/img/')) {
        try {
          return new URL(`../../assets${imageUrl}`, import.meta.url).href
        } catch {
          return '/placeholder-product.jpg'
        }
      }
      return `${API_BASE_URL}${imageUrl}`
    }

    const formatPrice = price => {
      return price.toLocaleString('id-ID')
    }

    const truncateText = (text, length) => {
      if (!text) return ''
      return text.length > length ? text.substring(0, length) + '...' : text
    }

    const getStockClass = stock => {
      if (stock === 0) return 'out-of-stock'
      if (stock <= 5) return 'low-stock'
      return 'in-stock'
    }

    const editProduct = product => {
      editingProduct.value = { ...product }
      showModal.value = true
    }

    const deleteProduct = async product => {
      if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return

      try {
        await api.delete(`/products/${product.code}`)
        await fetchProducts()
        showSuccess('Product deleted successfully!')
      } catch (error) {
        console.error('Error deleting product:', error)
        let errorMessage = 'Failed to delete product'

        if (error.response) {
          if (error.response.status === 403) {
            errorMessage = 'Access denied. Admin authentication required.'
          } else if (error.response.status === 404) {
            errorMessage = 'Product not found.'
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message
          }
        }

        showError(errorMessage)
      }
    }

    const handleSaveProduct = async productData => {
      try {
        if (editingProduct.value) {
          // Update existing product
          await api.put(`/products/${editingProduct.value.code}`, productData)
          showSuccess('Product updated successfully!')
        } else {
          // Create new product
          await api.post('/products', productData)
          showSuccess('Product created successfully!')
        }

        await fetchProducts()
        closeModal()
      } catch (error) {
        console.error('Error saving product:', error)
        let errorMessage = 'Failed to save product'

        if (error.response) {
          if (error.response.status === 403) {
            errorMessage = 'Access denied. Admin authentication required.'
            // Try to re-authenticate
            try {
              showError('Authentication required. Please login again.')
              router.push('/login')
              return
            } catch (authError) {
              console.error('Re-authentication failed:', authError)
              errorMessage = 'Authentication failed. Please login as admin.'
            }
          } else if (error.response.status === 401) {
            errorMessage = 'Session expired. Please login again.'
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message
          }
        } else if (error.message === 'Network Error') {
          errorMessage = 'Network error. Please check if the server is running.'
        }

        showError(errorMessage)
      }
    }

    const closeModal = () => {
      showModal.value = false
      editingProduct.value = null
    }

    const handleLogout = () => {
      AuthService.logout()
    }

    onMounted(async () => {
      await ensureAdminAccess()
      await fetchProducts()
    })

    return {
      products,
      searchQuery,
      showModal,
      editingProduct,
      filteredProducts,
      activeProducts,
      lowStockProducts,
      getProductImage,
      formatPrice,
      truncateText,
      getStockClass,
      editProduct,
      deleteProduct,
      handleSaveProduct,
      closeModal,
      handleLogout,
      ensureAdminAccess,
    }
  },
}
</script>

<style scoped>
/* Minimal custom CSS - 98% replaced with Tailwind + DaisyUI */

/* Enhanced hover effects for products table */
.table-row:hover {
  background-color: rgb(249 250 251);
}

/* Custom stock badge color gradients not available in DaisyUI */
.stock-badge.in-stock {
  background: rgb(220 252 231);
  color: rgb(22 163 74);
}

.stock-badge.low-stock {
  background: rgb(254 249 195);
  color: rgb(217 119 6);
}

.stock-badge.out-of-stock {
  background: rgb(254 242 242);
  color: rgb(220 38 38);
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease;
}

/* Responsive layout for mobile */
@media (max-width: 1024px) {
  .ml-72 {
    margin-left: 0;
  }

  .w-72 {
    width: 100%;
    position: relative;
    height: auto;
  }

  .flex.min-h-screen {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .grid.grid-cols-1.md\\:grid-cols-3 {
    grid-template-columns: 1fr;
  }

  .w-80 {
    width: 100%;
  }

  .overflow-x-auto {
    overflow-x: scroll;
  }

  table {
    min-width: 800px;
  }
}
</style>
