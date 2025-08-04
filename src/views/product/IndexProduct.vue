<template>
  <div class="products-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title animate-fade-in">Discover Amazing Products</h1>
          <p class="hero-subtitle animate-fade-in">
            Find everything you need in our curated collection of quality
            products
          </p>
          <div class="hero-stats animate-fade-in">
            <div class="stat-item">
              <span class="stat-number">{{ products.length }}+</span>
              <span class="stat-label">Products</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-label">Quality</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <!-- Filters and Search -->
        <div class="products-header">
          <div class="search-section">
            <div class="search-box">
              <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                class="search-input"
                @input="handleSearch"
              />
            </div>
          </div>

          <div class="filter-section">
            <select v-model="sortBy" @change="handleSort" class="filter-select">
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-averageRating">Rating</option>
            </select>

            <div class="view-toggle">
              <button
                :class="['view-btn', { active: viewMode === 'grid' }]"
                @click="viewMode = 'grid'"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"
                  />
                </svg>
              </button>
              <button
                :class="['view-btn', { active: viewMode === 'list' }]"
                @click="viewMode = 'list'"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Products Grid/List -->
        <div class="products-section">
          <!-- Loading State -->
          <div v-if="loading" class="loading-section">
            <div class="loading-grid">
              <div v-for="i in 8" :key="i" class="skeleton-card">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
                <div class="skeleton skeleton-button"></div>
              </div>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="error-section">
            <div class="error-content">
              <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
              <h3 class="error-title">Oops! Something went wrong</h3>
              <p class="error-message">{{ error }}</p>
              <button @click="fetchProducts" class="btn btn-primary retry-btn">
                Try Again
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredProducts.length === 0" class="empty-section">
            <div class="empty-content">
              <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              <h3 class="empty-title">No products found</h3>
              <p class="empty-message">
                {{
                  searchQuery
                    ? 'Try adjusting your search terms'
                    : 'Check back later for new products'
                }}
              </p>
            </div>
          </div>

          <!-- Products Display -->
          <div v-else :class="['products-container', viewMode]">
            <ProductItem
              v-for="product in filteredProducts"
              :key="product.code"
              :product="product"
              @product-added-to-cart="handleProductAdded"
              class="animate-fade-in"
            />
          </div>
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
    }
  },
}
</script>

<style scoped>
.products-page {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--gray-50) 0%,
    var(--primary-50) 100%
  );
}

/* Hero Section */
.hero-section {
  background: var(--gradient-primary);
  color: white;
  padding: var(--space-20) 0 var(--space-16);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.5;
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: var(--space-6);
  background: linear-gradient(135deg, white 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: var(--space-12);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-12);
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Main Content */
.main-content {
  padding: var(--space-16) 0;
  margin-top: -var(--space-8);
  position: relative;
  z-index: 2;
}

/* Products Header */
.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-6);
  margin-bottom: var(--space-12);
  flex-wrap: wrap;
}

.search-section {
  flex: 1;
  max-width: 400px;
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  left: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  padding: var(--space-3) var(--space-4) var(--space-3) var(--space-12);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-elevated);
  font-size: 0.875rem;
  transition: all var(--transition);
}

.search-input:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-section {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.filter-select {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-elevated);
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color var(--transition);
}

.filter-select:focus {
  border-color: var(--primary-500);
}

.view-toggle {
  display: flex;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.view-btn {
  padding: var(--space-2) var(--space-3);
  border: none;
  background: var(--surface-elevated);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-btn svg {
  width: 18px;
  height: 18px;
}

.view-btn:hover {
  background: var(--surface);
  color: var(--text-primary);
}

.view-btn.active {
  background: var(--primary-500);
  color: white;
}

/* Loading Section */
.loading-section {
  padding: var(--space-8) 0;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}

.skeleton-card {
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow);
}

.skeleton-image {
  height: 200px;
  margin-bottom: var(--space-4);
}

.skeleton-text {
  height: 16px;
  margin-bottom: var(--space-3);
}

.skeleton-text.short {
  width: 60%;
}

.skeleton-button {
  height: 36px;
  width: 100%;
  margin-top: var(--space-4);
}

/* Error Section */
.error-section {
  padding: var(--space-16) 0;
  text-align: center;
}

.error-content {
  max-width: 400px;
  margin: 0 auto;
}

.error-icon {
  width: 64px;
  height: 64px;
  color: var(--error-500);
  margin-bottom: var(--space-6);
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.error-message {
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
  line-height: 1.6;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

/* Empty Section */
.empty-section {
  padding: var(--space-16) 0;
  text-align: center;
}

.empty-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: var(--gray-400);
  margin-bottom: var(--space-6);
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.empty-message {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Products Container */
.products-container {
  display: grid;
  gap: var(--space-6);
}

.products-container.grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.products-container.list {
  grid-template-columns: 1fr;
  max-width: 800px;
  margin: 0 auto;
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
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .hero-stats {
    gap: var(--space-8);
  }

  .stat-number {
    font-size: 2rem;
  }

  .products-header {
    flex-direction: column;
    align-items: stretch;
  }

  .search-section {
    max-width: none;
  }

  .filter-section {
    justify-content: space-between;
  }

  .main-content {
    padding: var(--space-12) 0;
  }

  .products-container.grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-4);
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: var(--space-6);
  }

  .products-container.grid {
    grid-template-columns: 1fr;
  }

  .loading-grid {
    grid-template-columns: 1fr;
  }
}
</style>
