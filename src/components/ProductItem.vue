<template>
  <div class="product-card" @click="goToDetail">
    <div class="product-image-container">
      <img
        :src="imageUrl"
        :alt="product.name"
        class="product-image"
        loading="lazy"
        @error="handleImageError"
      />
      <div class="image-overlay">
        <div class="overlay-content">
          <button class="quick-view-btn" @click.stop="goToDetail">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
              />
            </svg>
            View Details
          </button>
          <button class="add-to-cart-btn" @click.stop="addToCart">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
      <div
        v-if="product.stock <= 5 && product.stock > 0"
        class="stock-badge low-stock"
      >
        Only {{ product.stock }} left!
      </div>
      <div v-else-if="product.stock === 0" class="stock-badge out-of-stock">
        Out of Stock
      </div>
    </div>

    <div class="product-info">
      <div class="product-header">
        <h3 class="product-name">{{ product.name }}</h3>
        <div class="rating" v-if="product.averageRating > 0">
          <div class="stars">
            <span
              v-for="i in 5"
              :key="i"
              class="star"
              :class="{ filled: i <= Math.round(product.averageRating) }"
            >
              ★
            </span>
          </div>
          <span class="rating-text"
            >({{ product.averageRating.toFixed(1) }})</span
          >
        </div>
      </div>

      <p class="product-description" v-if="product.description">
        {{ truncatedDescription }}
      </p>

      <div class="product-footer">
        <div class="price-section">
          <span class="product-price">{{ formatPrice(product.price) }}</span>
          <span class="price-label">per item</span>
        </div>

        <div class="action-buttons">
          <button
            class="btn btn-primary add-btn"
            @click.stop="addToCart"
            :disabled="product.stock === 0"
          >
            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 7v4H5.83l-.42-.83L4.05 7H19m0-2H3.27l2 4 .73 1.46L7.58 16H19v-2H9.58l-.42-.83L10.73 9H21V7z"
              />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>

    <!-- Loading state for add to cart -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatPrice, truncateText } from '@/utils/formatters'
import { useNotification } from '@/composables/useNotification'
import OrderService from '@/services/order.service'

export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  emits: ['product-added-to-cart'],
  setup(props, { emit }) {
    const router = useRouter()
    const loading = ref(false)
    const { showSuccess, showError } = useNotification()

    const BASE_URL =
      import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ||
      'http://localhost:8001'

    const imageUrl = computed(() => {
      if (!props.product.imageUrl) return '/placeholder-product.jpg'
      if (props.product.imageUrl.startsWith('http'))
        return props.product.imageUrl
      // For all relative paths (both /img/ and /uploads/), use backend server
      return `${BASE_URL}${props.product.imageUrl}`
    })

    const truncatedDescription = computed(() => {
      return truncateText(props.product.description, 80)
    })

    const goToDetail = () => {
      router.push({
        name: 'detail-product',
        params: { id: props.product.code },
      })
    }

    const handleImageError = event => {
      event.target.src = '/placeholder-product.jpg'
    }

    const addToCart = async () => {
      if (props.product.stock === 0) {
        showError('Product is out of stock')
        return
      }

      // Cek login menggunakan authToken
      const token = localStorage.getItem('authToken')
      if (!token) {
        showError('Silakan login untuk menambah ke keranjang')
        router.push({ name: 'login' })
        return
      }

      // Prevent double clicking
      if (loading.value) {
        return
      }

      loading.value = true
      try {
        const response = await OrderService.addToCart(props.product.code, 1)

        // Check if product was added to existing item or as new item
        const addedItem = response.data?.cart?.cart_items?.find(
          item => item.productCode === props.product.code,
        )

        if (addedItem && addedItem.quantity > 1) {
          showSuccess(
            `${props.product.name} quantity updated to ${addedItem.quantity} in cart!`,
          )
        } else {
          showSuccess(`${props.product.name} added to cart!`)
        }

        emit('product-added-to-cart', props.product)
      } catch (error) {
        console.error('Failed to add product to cart:', error)
        const errorMessage =
          error.response?.data?.message || 'Failed to add item to cart'
        showError(errorMessage)
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      imageUrl,
      truncatedDescription,
      formatPrice,
      goToDetail,
      handleImageError,
      addToCart,
    }
  },
}
</script>

<style scoped>
.product-card {
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all var(--transition);
  cursor: pointer;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: var(--gray-100);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  opacity: 0;
  transition: opacity var(--transition);
}

.product-card:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: var(--space-3);
  padding: var(--space-4);
}

.quick-view-btn,
.add-to-cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
  width: 100%;
  max-width: 200px;
}

.quick-view-btn {
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
}

.quick-view-btn:hover {
  background: white;
  transform: translateY(-2px);
}

.add-to-cart-btn {
  background: var(--gradient-primary);
  color: white;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.quick-view-btn svg,
.add-to-cart-btn svg {
  width: 16px;
  height: 16px;
}

.stock-badge {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.low-stock {
  background: var(--warning-100);
  color: var(--warning-800);
  border: 1px solid var(--warning-200);
}

.out-of-stock {
  background: var(--error-100);
  color: var(--error-800);
  border: 1px solid var(--error-200);
}

.product-info {
  padding: var(--space-6);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-header {
  margin-bottom: var(--space-4);
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.stars {
  display: flex;
  gap: 1px;
}

.star {
  color: var(--gray-300);
  font-size: 0.875rem;
  transition: color var(--transition);
}

.star.filled {
  color: var(--warning-400);
}

.rating-text {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.product-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: var(--space-4);
  flex: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-4);
  margin-top: auto;
}

.price-section {
  flex: 1;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
  line-height: 1.2;
}

.price-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: var(--space-1);
}

.action-buttons {
  display: flex;
  gap: var(--space-2);
}

.add-btn {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-4);
  font-size: 0.875rem;
  white-space: nowrap;
}

.add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.add-btn:disabled:hover {
  transform: none !important;
  box-shadow: none !important;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--gray-200);
  border-top-color: var(--primary-500);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .product-image-container {
    height: 200px;
  }

  .product-info {
    padding: var(--space-4);
  }

  .product-name {
    font-size: 1rem;
  }

  .product-price {
    font-size: 1.125rem;
  }

  .overlay-content {
    padding: var(--space-3);
    gap: var(--space-2);
  }

  .quick-view-btn,
  .add-to-cart-btn {
    padding: var(--space-2) var(--space-4);
    font-size: 0.875rem;
  }
}
</style>
