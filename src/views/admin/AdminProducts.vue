<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
          <span>WLStore Admin</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <h3 class="nav-title">Main</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/admin/dashboard" class="nav-link">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="9"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="5"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <rect
                    x="14"
                    y="12"
                    width="7"
                    height="9"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <rect
                    x="3"
                    y="16"
                    width="7"
                    height="5"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/products" class="nav-link active">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path d="M3 10H21" stroke="currentColor" stroke-width="2" />
                </svg>
                Products
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/orders" class="nav-link">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                    stroke="currentColor"
                    stroke-width="2"
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
                Orders
              </router-link>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <h3 class="nav-title">Settings</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <a @click="handleLogout" class="nav-link logout">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M16 17L21 12L16 7"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path d="M21 12H9" stroke="currentColor" stroke-width="2" />
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
      <!-- Header -->
      <header class="admin-header">
        <div class="header-content">
          <div class="header-left">
            <h1 class="page-title">Product Management</h1>
            <p class="page-subtitle">Manage your store products</p>
          </div>
          <div class="header-right">
            <button @click="showModal = true" class="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              Add Product
            </button>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="admin-content">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon primary">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                />
                <path d="M3 10H21" />
              </svg>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ products.length }}</h3>
              <p class="stat-label">Total Products</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon success">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12L11 14L15 10" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ activeProducts }}</h3>
              <p class="stat-label">Active Products</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon warning">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                />
              </svg>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">{{ lowStockProducts }}</h3>
              <p class="stat-label">Low Stock</p>
            </div>
          </div>
        </div>

        <!-- Products Table -->
        <div class="table-container">
          <div class="table-header">
            <div class="table-title">
              <h2>Products List</h2>
            </div>
            <div class="table-actions">
              <div class="search-box">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" />
                  <path d="M21 21L16.65 16.65" stroke="currentColor" />
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products..."
                  class="search-input"
                />
              </div>
            </div>
          </div>

          <div class="table-wrapper">
            <table class="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Code</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="product in filteredProducts"
                  :key="product.code"
                  class="table-row"
                >
                  <td>
                    <div class="product-image">
                      <img
                        :src="getProductImage(product.imageUrl)"
                        :alt="product.name"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="product-info">
                      <h4 class="product-name">{{ product.name }}</h4>
                      <p class="product-description">
                        {{ truncateText(product.description, 50) }}
                      </p>
                    </div>
                  </td>
                  <td>
                    <span class="product-code">{{ product.code }}</span>
                  </td>
                  <td>
                    <span class="product-price"
                      >Rp {{ formatPrice(product.price) }}</span
                    >
                  </td>
                  <td>
                    <span
                      :class="['stock-badge', getStockClass(product.stock)]"
                    >
                      {{ product.stock }}
                    </span>
                  </td>
                  <td>
                    <div class="rating">
                      <span class="rating-value">{{
                        product.averageRating.toFixed(1)
                      }}</span>
                      <div class="stars">
                        <span
                          v-for="i in 5"
                          :key="i"
                          :class="[
                            'star',
                            { filled: i <= Math.round(product.averageRating) },
                          ]"
                        >
                          ★
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button
                        @click="editProduct(product)"
                        class="btn-action edit"
                        title="Edit"
                      >
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                          <path
                            d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                        </svg>
                      </button>
                      <button
                        @click="deleteProduct(product)"
                        class="btn-action delete"
                        title="Delete"
                      >
                        <svg viewBox="0 0 24 24" fill="none">
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
    const { showSuccess, showError, showWarning } = useNotification()

    const products = ref([])
    const searchQuery = ref('')
    const showModal = ref(false)
    const editingProduct = ref(null)

    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001'

    // Check if user is admin, if not, try demo login first
    const ensureAdminAccess = async () => {
      if (!AuthService.isAuthenticated()) {
        try {
          // Auto demo login as admin
          await AuthService.demoLogin(true)
          showSuccess('Auto logged in as admin for demo')
        } catch (error) {
          console.error('Failed to login as admin:', error)
          showError('Authentication required. Redirecting to login...')
          router.push('/login')
          return false
        }
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
              await AuthService.demoLogin(true)
              showWarning('Re-authenticated as admin. Please try again.')
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
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--gray-50);
}

/* Sidebar */
.admin-sidebar {
  width: 280px;
  background: var(--surface-elevated);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 700;
  color: var(--text-primary);
}

.logo svg {
  width: 32px;
  height: 32px;
  color: var(--primary-600);
}

.sidebar-nav {
  flex: 1;
  padding: var(--space-6);
  overflow-y: auto;
}

.nav-section {
  margin-bottom: var(--space-8);
}

.nav-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-4);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: var(--space-2);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition);
  cursor: pointer;
}

.nav-link:hover {
  background: var(--gray-100);
  color: var(--text-primary);
}

.nav-link.active {
  background: var(--primary-100);
  color: var(--primary-700);
}

.nav-link.logout:hover {
  background: var(--error-100);
  color: var(--error-700);
}

.nav-link svg {
  width: 20px;
  height: 20px;
}

/* Main Content */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.admin-header {
  background: var(--surface-elevated);
  border-bottom: 1px solid var(--border);
  padding: var(--space-6) var(--space-8);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-1);
}

.page-subtitle {
  color: var(--text-secondary);
  margin: 0;
}

/* Content */
.admin-content {
  flex: 1;
  padding: var(--space-8);
  overflow-y: auto;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.stat-card {
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-icon.primary {
  background: var(--primary-100);
  color: var(--primary-600);
}

.stat-icon.success {
  background: var(--success-100);
  color: var(--success-600);
}

.stat-icon.warning {
  background: var(--warning-100);
  color: var(--warning-600);
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-1);
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

/* Table */
.table-container {
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  overflow: hidden;
}

.table-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-title h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.search-box {
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  padding: var(--space-3) var(--space-3) var(--space-3) var(--space-10);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  font-size: 0.875rem;
}

.table-wrapper {
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table th {
  background: var(--gray-50);
  padding: var(--space-4) var(--space-6);
  text-align: left;
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.875rem;
  border-bottom: 1px solid var(--border);
}

.products-table td {
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.table-row:hover {
  background: var(--gray-50);
}

.product-image {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--gray-100);
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  min-width: 200px;
}

.product-name {
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-1);
  font-size: 0.875rem;
}

.product-description {
  color: var(--text-secondary);
  font-size: 0.75rem;
  margin: 0;
  line-height: 1.4;
}

.product-code {
  font-family: var(--font-mono);
  background: var(--gray-100);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius);
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.product-price {
  font-weight: 600;
  color: var(--text-primary);
}

.stock-badge {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
}

.stock-badge.in-stock {
  background: var(--success-100);
  color: var(--success-800);
}

.stock-badge.low-stock {
  background: var(--warning-100);
  color: var(--warning-800);
}

.stock-badge.out-of-stock {
  background: var(--error-100);
  color: var(--error-800);
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-1);
}

.rating-value {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.stars {
  display: flex;
  gap: 1px;
}

.star {
  color: var(--gray-300);
  font-size: 0.75rem;
}

.star.filled {
  color: var(--warning-400);
}

.action-buttons {
  display: flex;
  gap: var(--space-2);
}

.btn-action {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-action svg {
  width: 16px;
  height: 16px;
}

.btn-action.edit {
  background: var(--primary-100);
  color: var(--primary-600);
}

.btn-action.edit:hover {
  background: var(--primary-200);
}

.btn-action.delete {
  background: var(--error-100);
  color: var(--error-600);
}

.btn-action.delete:hover {
  background: var(--error-200);
}

@media (max-width: 1024px) {
  .admin-sidebar {
    width: 240px;
  }

  .admin-content {
    padding: var(--space-6);
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-layout {
    flex-direction: column;
  }

  .admin-sidebar {
    width: 100%;
    height: auto;
  }

  .header-content {
    flex-direction: column;
    gap: var(--space-4);
    align-items: flex-start;
  }

  .table-header {
    flex-direction: column;
    gap: var(--space-4);
    align-items: flex-start;
  }

  .search-box {
    width: 100%;
  }
}
</style>
