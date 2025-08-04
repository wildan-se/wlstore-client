<template>
  <div class="product-detail-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-section">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <h3 class="loading-title">Memuat Detail Produk</h3>
        <p class="loading-text">Mohon tunggu sebentar...</p>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="main-content">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <router-link to="/" class="breadcrumb-link">
            <svg
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
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ product.name }}</span>
        </nav>

        <!-- Product Detail -->
        <div class="product-detail animate-fade-in">
          <div class="product-gallery">
            <div class="main-image">
              <img
                :src="getFullImageUrl(product.imageUrl)"
                :alt="product.name"
                class="product-image"
                loading="lazy"
              />
              <div class="image-badge" v-if="product.stock <= 5">
                <span class="badge-text">Stok Terbatas</span>
              </div>
            </div>
          </div>

          <div class="product-info">
            <div class="product-header">
              <h1 class="product-title">{{ product.name }}</h1>
              <div class="product-meta">
                <div class="rating-section" v-if="product.averageRating">
                  <div class="stars">
                    <span
                      v-for="star in 5"
                      :key="star"
                      :class="[
                        'star',
                        { filled: star <= Math.floor(product.averageRating) },
                      ]"
                    >
                      ★
                    </span>
                  </div>
                  <span class="rating-text"
                    >{{ product.averageRating.toFixed(1) }} dari 5</span
                  >
                </div>
                <div class="product-code">
                  Kode: <span class="code-value">{{ product.code }}</span>
                </div>
              </div>
            </div>

            <div class="price-section">
              <div class="price-main">
                <span class="currency">Rp</span>
                <span class="amount">{{
                  parseFloat(product.price).toLocaleString('id-ID')
                }}</span>
              </div>
            </div>

            <div class="stock-section">
              <div class="stock-info">
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
                <span class="stock-text">
                  <strong>{{ product.stock }}</strong> tersedia
                </span>
              </div>
            </div>

            <div class="description-section">
              <h3 class="section-title">Deskripsi Produk</h3>
              <p class="product-description">{{ product.description }}</p>
            </div>

            <div class="action-section">
              <button
                class="btn btn-primary btn-lg add-to-cart-btn"
                @click="addToCart(product.code)"
                :disabled="product.stock === 0 || loading"
              >
                <svg
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
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
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
.product-detail-page {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--gray-50) 0%,
    var(--primary-50) 100%
  );
  padding: var(--space-8) 0;
}

/* Loading Section */
.loading-section {
  padding: var(--space-20) 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.loading-content {
  text-align: center;
  background: var(--surface-elevated);
  padding: var(--space-12);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--gray-200);
  border-top: 4px solid var(--primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--space-6);
}

.loading-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.loading-text {
  color: var(--text-secondary);
  margin: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Main Content */
.main-content {
  padding: var(--space-8) 0;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
  font-size: 0.875rem;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition);
}

.breadcrumb-link svg {
  width: 16px;
  height: 16px;
}

.breadcrumb-link:hover {
  color: var(--primary-600);
}

.breadcrumb-separator {
  color: var(--text-secondary);
}

.breadcrumb-current {
  color: var(--text-primary);
  font-weight: 500;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Product Detail */
.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
}

/* Product Gallery */
.product-gallery {
  position: relative;
}

.main-image {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--gray-100);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition);
}

.main-image:hover .product-image {
  transform: scale(1.05);
}

.image-badge {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  background: var(--warning-500);
  color: white;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.product-header {
  border-bottom: 1px solid var(--border);
  padding-bottom: var(--space-6);
}

.product-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-4);
  line-height: 1.3;
}

.product-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.rating-section {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: var(--gray-300);
  font-size: 1.125rem;
  transition: color var(--transition);
}

.star.filled {
  color: var(--warning-400);
}

.rating-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.product-code {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.code-value {
  font-family: var(--font-mono);
  background: var(--gray-100);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius);
  color: var(--text-primary);
}

/* Price Section */
.price-section {
  padding: var(--space-6);
  background: var(--primary-50);
  border-radius: var(--radius-lg);
  border: 1px solid var(--primary-200);
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.currency {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-600);
}

.amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-700);
  line-height: 1;
}

/* Stock Section */
.stock-section {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.stock-info {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--success-600);
}

.stock-info svg {
  width: 20px;
  height: 20px;
}

.stock-text {
  font-size: 0.875rem;
}

/* Description Section */
.description-section {
  border-top: 1px solid var(--border);
  padding-top: var(--space-6);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-4);
}

.product-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* Action Section */
.action-section {
  display: flex;
  gap: var(--space-4);
  margin-top: auto;
}

.add-to-cart-btn {
  flex: 1;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
}

.add-to-cart-btn:disabled {
  background: var(--gray-300);
  color: var(--gray-500);
  border-color: var(--gray-300);
  cursor: not-allowed;
}

.wishlist-btn {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
}

.wishlist-btn svg {
  width: 20px;
  height: 20px;
}

/* Animations */
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

/* Responsive */
@media (max-width: 1024px) {
  .product-detail {
    gap: var(--space-8);
  }

  .product-title {
    font-size: 1.75rem;
  }

  .amount {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .product-detail-page {
    padding: var(--space-4) 0;
  }

  .product-detail {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    padding: var(--space-6);
  }

  .breadcrumb-current {
    max-width: 150px;
  }

  .product-title {
    font-size: 1.5rem;
  }

  .currency {
    font-size: 1.25rem;
  }

  .amount {
    font-size: 1.75rem;
  }

  .action-section {
    flex-direction: column;
  }

  .wishlist-btn {
    width: 100%;
    height: 48px;
  }

  .notification {
    top: var(--space-4);
    right: var(--space-4);
    left: var(--space-4);
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .product-detail {
    padding: var(--space-4);
  }

  .product-title {
    font-size: 1.25rem;
  }

  .amount {
    font-size: 1.5rem;
  }

  .rating-section {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
}
</style>
