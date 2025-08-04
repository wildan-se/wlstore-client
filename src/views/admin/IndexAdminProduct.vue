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
          <h3 class="nav-title">Manajemen</h3>
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
                Kelola Produk
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
                Kelola Pesanan
              </router-link>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <h3 class="nav-title">Sistem</h3>
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
            <h1 class="page-title">Kelola Produk</h1>
            <p class="page-subtitle">Manajemen inventori dan produk toko</p>
          </div>
          <div class="header-right">
            <button @click="openAddModal" class="btn btn-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Tambah Produk
            </button>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="admin-content">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Memuat produk...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="errorMessage" class="error-state">
          <div class="error-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M15 9L9 15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 9L15 15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h3>Gagal Memuat Produk</h3>
          <p>{{ errorMessage }}</p>
          <button @click="fetchProducts" class="btn btn-outline">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 4V10H17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.49 15C19.9828 16.8393 18.8661 18.4608 17.3278 19.6281C15.7895 20.7953 13.9269 21.4502 12 21.5C8.64 21.5 5.81 19.45 4.64 16.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 20V14H7"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.51 9C4.01716 7.16071 5.13394 5.53914 6.67218 4.37188C8.21042 3.20461 10.0731 2.54976 12 2.5C15.36 2.5 18.19 4.55 19.36 7.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Coba Lagi
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="products.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg
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
          </div>
          <h3>Belum Ada Produk</h3>
          <p>Mulai dengan menambahkan produk pertama Anda.</p>
          <button @click="openAddModal" class="btn btn-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 12H19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Tambah Produk
          </button>
        </div>

        <!-- Products Table -->
        <div v-else class="products-section">
          <div class="section-header">
            <h2 class="section-title">Daftar Produk</h2>
            <div class="section-actions">
              <button @click="fetchProducts" class="btn btn-outline">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 4V10H17"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.49 15C19.9828 16.8393 18.8661 18.4608 17.3278 19.6281C15.7895 20.7953 13.9269 21.4502 12 21.5C8.64 21.5 5.81 19.45 4.64 16.5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1 20V14H7"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.51 9C4.01716 7.16071 5.13394 5.53914 6.67218 4.37188C8.21042 3.20461 10.0731 2.54976 12 2.5C15.36 2.5 18.19 4.55 19.36 7.5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Refresh
              </button>
            </div>
          </div>

          <div class="products-container">
            <div class="products-table">
              <div class="table-header">
                <div class="header-cell">Gambar</div>
                <div class="header-cell">Kode</div>
                <div class="header-cell">Nama</div>
                <div class="header-cell">Harga</div>
                <div class="header-cell">Stok</div>
                <div class="header-cell">Rating</div>
                <div class="header-cell">Aksi</div>
              </div>

              <div class="table-body">
                <div
                  v-for="product in products"
                  :key="product.id"
                  class="table-row"
                >
                  <div class="table-cell">
                    <img
                      :src="getFullImageUrl(product.imageUrl)"
                      alt="Product"
                      class="product-image"
                    />
                  </div>
                  <div class="table-cell">
                    <span class="product-code">{{ product.code }}</span>
                  </div>
                  <div class="table-cell">
                    <span class="product-name">{{ product.name }}</span>
                  </div>
                  <div class="table-cell">
                    <span class="product-price"
                      >Rp {{ formatCurrency(product.price) }}</span
                    >
                  </div>
                  <div class="table-cell">
                    <span
                      :class="['stock-badge', getStockStatus(product.stock)]"
                    >
                      {{ product.stock }}
                    </span>
                  </div>
                  <div class="table-cell">
                    <div class="rating-display">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="star-icon"
                      >
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        />
                      </svg>
                      <span>{{ product.averageRating || '0.0' }}</span>
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="action-buttons">
                      <button
                        @click="openEditModal(product)"
                        class="btn btn-sm btn-outline"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                          <path
                            d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        @click="confirmDelete(product.code)"
                        class="btn btn-sm btn-danger"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 6H5H21"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                            stroke="currentColor"
                            stroke-width="2"
                          />
                        </svg>
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Notification -->
    <transition name="fade">
      <div
        v-if="notification"
        :class="['notification-popup', notificationType]"
      >
        {{ notification }}
      </div>
    </transition>

    <!-- Product Modal -->
    <AdminProductModal
      :isVisible="isModalVisible"
      :productToEdit="selectedProduct"
      @close="closeModal"
      @save-product="handleSaveProduct"
    />
  </div>
</template>

<script>
import api from '@/services/api.js'
import AuthService from '@/services/auth.service'
import AdminProductModal from '@/components/AdminProductModal.vue'

export default {
  components: {
    AdminProductModal,
  },
  data() {
    return {
      products: [],
      loading: false,
      errorMessage: null,
      notification: null,
      notificationType: '',

      isModalVisible: false,
      selectedProduct: null,

      API_BASE_URL:
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001',
    }
  },
  methods: {
    async fetchProducts() {
      this.loading = true
      this.errorMessage = null
      try {
        const response = await api.get('/products')
        this.products = response.data.data || response.data
      } catch (error) {
        console.error('Error fetching products:', error)
        this.errorMessage = 'Gagal memuat produk. Silakan coba lagi.'
      } finally {
        this.loading = false
      }
    },
    openAddModal() {
      this.selectedProduct = null
      this.isModalVisible = true
    },
    openEditModal(product) {
      this.selectedProduct = product
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
      this.selectedProduct = null
    },
    getFullImageUrl(relativePath) {
      if (
        relativePath &&
        (relativePath.startsWith('http://') ||
          relativePath.startsWith('https://'))
      ) {
        return relativePath
      }
      return `${this.API_BASE_URL}${relativePath}`
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID').format(parseFloat(amount))
    },
    getStockStatus(stock) {
      if (stock <= 5) return 'low'
      if (stock <= 20) return 'medium'
      return 'high'
    },
    async handleSaveProduct(formData, isEditMode) {
      try {
        if (isEditMode) {
          await api.put(`/products/${formData.get('code')}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          this.showNotification('Produk berhasil diperbarui!', 'success')
        } else {
          await api.post('/products', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          this.showNotification('Produk berhasil ditambahkan!', 'success')
        }
        await this.fetchProducts()
        this.closeModal()
      } catch (error) {
        console.error('Error saving product:', error)
        let msg = 'Gagal menyimpan produk.'
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          msg = error.response.data.message
        } else if (error.message === 'Network Error') {
          msg += ' Pastikan backend berjalan dan dapat diakses.'
        } else if (error.response && error.response.status === 413) {
          msg = 'File gambar terlalu besar. Maksimal 2MB.'
        }
        this.showNotification(msg, 'error')
      }
    },
    async confirmDelete(productCode) {
      if (
        confirm(
          `Apakah Anda yakin ingin menghapus produk dengan kode: ${productCode}?`,
        )
      ) {
        try {
          await api.delete(`/products/${productCode}`)
          this.showNotification('Produk berhasil dihapus!', 'success')
          await this.fetchProducts()
        } catch (error) {
          console.error('Error deleting product:', error)
          let msg = 'Gagal menghapus produk. Silakan coba lagi.'
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            msg = error.response.data.message
          }
          this.showNotification(msg, 'error')
        }
      }
    },
    showNotification(message, type) {
      this.notification = message
      this.notificationType = type
      setTimeout(() => {
        this.notification = null
        this.notificationType = ''
      }, 3000)
    },
    handleLogout() {
      AuthService.logout()
    },
  },
  created() {
    // Check if user is admin
    if (!AuthService.isAdmin()) {
      this.$router.push('/login')
      return
    }
    this.fetchProducts()
  },
}
</script>

<style scoped>
/* Import the same CSS variables as AdminDashboard.vue */
:root {
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  --success-50: #f0fdf4;
  --success-600: #16a34a;
  --warning-50: #fffbeb;
  --warning-600: #d97706;
  --info-50: #f0f9ff;
  --info-600: #0891b2;
  --error-50: #fef2f2;
  --error-600: #dc2626;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --surface-elevated: #ffffff;
  --border: var(--gray-200);
  --text-primary: var(--gray-900);
  --text-secondary: var(--gray-600);
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg:
    0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--gray-50);
}

/* Sidebar - Same as AdminDashboard.vue */
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
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.nav-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.nav-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin: 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.nav-link:hover {
  background: var(--gray-100);
  color: var(--text-primary);
}

.nav-link.active {
  background: var(--primary-50);
  color: var(--primary-600);
}

.nav-link svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.nav-link.logout {
  color: #ef4444;
}

.nav-link.logout:hover {
  background: #fef2f2;
  color: #dc2626;
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
  padding: var(--space-6);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-1) 0;
}

.page-subtitle {
  color: var(--text-secondary);
  margin: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-sm {
  padding: var(--space-1) var(--space-3);
  font-size: 0.75rem;
}

.btn-outline {
  background: var(--surface-elevated);
  color: var(--text-secondary);
}

.btn-outline:hover {
  background: var(--gray-50);
  color: var(--text-primary);
}

.btn-primary {
  background: var(--primary-600);
  color: white;
  border-color: var(--primary-600);
}

.btn-primary:hover {
  background: var(--primary-700);
  border-color: var(--primary-700);
}

.btn-danger {
  background: var(--error-600);
  color: white;
  border-color: var(--error-600);
}

.btn-danger:hover {
  background: #b91c1c;
  border-color: #b91c1c;
}

.btn svg {
  width: 16px;
  height: 16px;
}

.btn-sm svg {
  width: 14px;
  height: 14px;
}

.admin-content {
  flex: 1;
  padding: var(--space-6);
  overflow: auto;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: var(--space-8);
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--gray-200);
  border-top: 3px solid var(--primary-600);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--space-4);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-state {
  text-align: center;
  padding: var(--space-8);
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}

.error-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--space-4);
  color: var(--error-600);
}

.error-icon svg {
  width: 100%;
  height: 100%;
}

.error-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.error-state p {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--space-8);
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--space-4);
  color: var(--gray-400);
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

/* Products Section */
.products-section {
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  overflow: hidden;
}

.section-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.section-actions {
  display: flex;
  gap: var(--space-3);
}

.products-container {
  padding: var(--space-6);
}

/* Products Table */
.products-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 80px 100px 1fr 120px 80px 100px 140px;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--gray-50);
  border-bottom: 1px solid var(--border);
}

.header-cell {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  grid-template-columns: 80px 100px 1fr 120px 80px 100px 140px;
  gap: var(--space-4);
  padding: var(--space-4);
  border-bottom: 1px solid var(--border);
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background: var(--gray-50);
}

.table-cell {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}

.product-code {
  font-family: monospace;
  font-weight: 600;
  color: var(--primary-600);
}

.product-name {
  font-weight: 500;
  color: var(--text-primary);
}

.product-price {
  font-weight: 600;
  color: var(--text-primary);
}

.stock-badge {
  padding: var(--space-1) var(--space-3);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
}

.stock-badge.low {
  background: var(--error-50);
  color: var(--error-600);
}

.stock-badge.medium {
  background: var(--warning-50);
  color: var(--warning-600);
}

.stock-badge.high {
  background: var(--success-50);
  color: var(--success-600);
}

.rating-display {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.star-icon {
  width: 16px;
  height: 16px;
  color: #fbbf24;
}

.action-buttons {
  display: flex;
  gap: var(--space-2);
}

/* Notification */
.notification-popup {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  font-weight: 500;
  animation: slideIn 0.3s ease forwards;
}

.notification-popup.success {
  background: var(--success-600);
  color: white;
}

.notification-popup.error {
  background: var(--error-600);
  color: white;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .admin-sidebar {
    width: 240px;
  }

  .table-header,
  .table-row {
    grid-template-columns: 60px 80px 1fr 100px 60px 80px 120px;
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

  .admin-content {
    padding: var(--space-4);
  }

  .products-container {
    overflow-x: auto;
  }

  .products-table {
    min-width: 700px;
  }

  .header-content {
    flex-direction: column;
    gap: var(--space-4);
    align-items: flex-start;
  }
}
</style>
