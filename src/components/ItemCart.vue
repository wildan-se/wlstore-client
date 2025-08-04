<template>
  <div class="cart-item" :class="{ loading: loading }">
    <div class="item-image-container">
      <img
        :src="imageUrl"
        :alt="item.productDetails?.name || 'Product'"
        class="item-image"
        loading="lazy"
        @error="handleImageError"
      />
    </div>

    <div class="item-content">
      <div class="item-info">
        <h3 class="item-name">
          {{ item.productDetails?.name || 'Unknown Product' }}
        </h3>
        <div class="item-meta">
          <span class="item-code">Kode: {{ item.productCode }}</span>
          <span class="item-price"
            >Rp {{ formatPrice(item.productDetails?.price || 0) }}</span
          >
        </div>
      </div>

      <div class="item-controls">
        <div class="quantity-section">
          <label class="quantity-label">Jumlah:</label>
          <div class="quantity-controls">
            <button
              class="quantity-btn decrease"
              @click="decreaseQuantity"
              :disabled="loading || item.quantity <= 1"
              aria-label="Kurangi jumlah"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <span class="quantity-display" :class="{ updating: loading }">{{
              item.quantity
            }}</span>

            <button
              class="quantity-btn increase"
              @click="increaseQuantity"
              :disabled="loading"
              aria-label="Tambah jumlah"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="item-actions">
          <button
            class="action-btn save-later"
            :disabled="loading"
            title="Simpan untuk nanti"
            @click="saveForLater"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 21L12 16L5 21V5C5 4.4 5.4 4 6 4H18C18.6 4 19 4.4 19 5V21Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            class="action-btn remove"
            @click="removeItem"
            :disabled="loading"
            title="Hapus dari keranjang"
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
                d="M8 6V4C8 3.4 8.4 3 9 3H15C15.6 3 16 3.4 16 4V6M19 6V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V6H19Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 11V17M14 11V17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="item-summary">
      <div class="subtotal">
        <span class="subtotal-label">Subtotal</span>
        <span class="subtotal-value">
          Rp
          {{ formatPrice((item.productDetails?.price || 0) * item.quantity) }}
        </span>
      </div>
    </div>

    <!-- Loading overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'ItemCart',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  emits: ['update-quantity', 'remove-item'],
  setup(props, { emit }) {
    const loading = ref(false)
    const { showWarning } = useNotification()

    const BASE_URL =
      import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ||
      'http://localhost:8001'

    const imageUrl = computed(() => {
      if (!props.item?.productDetails?.imageUrl)
        return '/placeholder-product.jpg'
      if (props.item.productDetails.imageUrl.startsWith('http'))
        return props.item.productDetails.imageUrl
      // For all relative paths (both /img/ and /uploads/), use backend server
      return `${BASE_URL}${props.item.productDetails.imageUrl}`
    })

    const formatPrice = price => {
      return new Intl.NumberFormat('id-ID').format(price || 0)
    }

    const handleImageError = event => {
      event.target.src = '/placeholder-product.jpg'
    }

    const decreaseQuantity = async () => {
      if (loading.value) return

      if (props.item.quantity > 1) {
        // Set loading with auto-clear after 2 seconds as fallback
        loading.value = true
        setTimeout(() => {
          loading.value = false
        }, 2000)

        emit('update-quantity', props.item.productCode, props.item.quantity - 1)
      } else {
        removeItem()
      }
    }

    const increaseQuantity = async () => {
      if (loading.value) return

      // Set loading with auto-clear after 2 seconds as fallback
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 2000)

      emit('update-quantity', props.item.productCode, props.item.quantity + 1)
    }

    const removeItem = () => {
      if (loading.value) return

      const productName = props.item.productDetails?.name || 'this product'
      if (
        confirm(
          `Apakah Anda yakin ingin menghapus ${productName} dari keranjang?`,
        )
      ) {
        loading.value = true
        emit('remove-item', props.item.productCode)
        // Loading will be set to false in parent component
      }
    }

    const saveForLater = () => {
      showWarning('Fitur simpan untuk nanti akan segera hadir!')
    }

    // Watch for loading changes from parent
    const setLoading = value => {
      loading.value = value
    }

    return {
      loading,
      imageUrl,
      formatPrice,
      handleImageError,
      decreaseQuantity,
      increaseQuantity,
      removeItem,
      saveForLater,
      setLoading,
    }
  },
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: all var(--transition);
  position: relative;
}

.cart-item:hover {
  border-color: var(--primary-200);
  box-shadow: var(--shadow);
  transform: translateY(-1px);
}

/* Image Container */
.item-image-container {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition);
}

.cart-item:hover .item-image {
  transform: scale(1.05);
}

/* Item Content */
.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-2);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.item-code {
  font-size: 0.875rem;
  color: var(--text-secondary);
  background: var(--gray-100);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius);
  font-family: var(--font-mono);
}

.item-price {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-600);
}

/* Item Controls */
.item-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.quantity-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface-elevated);
}

.quantity-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn svg {
  width: 16px;
  height: 16px;
}

.quantity-btn:hover:not(:disabled) {
  background: var(--primary-50);
  color: var(--primary-600);
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-display {
  min-width: 48px;
  text-align: center;
  font-weight: 600;
  color: var(--text-primary);
  padding: 0 var(--space-2);
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  background: var(--surface);
}

.item-actions {
  display: flex;
  gap: var(--space-2);
}

.action-btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  background: var(--surface-elevated);
  color: var(--text-secondary);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

.action-btn.save-later:hover {
  border-color: var(--primary-300);
  background: var(--primary-50);
  color: var(--primary-600);
}

.action-btn.remove:hover {
  border-color: var(--error-300);
  background: var(--error-50);
  color: var(--error-600);
}

/* Item Summary */
.item-summary {
  flex-shrink: 0;
  text-align: right;
  min-width: 120px;
}

.subtotal {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.subtotal-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.subtotal-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    gap: var(--space-4);
  }

  .item-image-container {
    width: 100%;
    height: 200px;
  }

  .item-content {
    width: 100%;
  }

  .item-controls {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-4);
  }

  .quantity-section {
    justify-content: center;
  }

  .item-actions {
    justify-content: center;
  }

  .item-summary {
    text-align: center;
    min-width: auto;
  }

  .subtotal {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-3);
    background: var(--gray-50);
    border-radius: var(--radius);
  }
}

@media (max-width: 480px) {
  .cart-item {
    padding: var(--space-4);
  }

  .item-image-container {
    height: 160px;
  }

  .item-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }

  .quantity-controls {
    width: 100%;
  }

  .quantity-btn {
    flex: 1;
  }

  .quantity-display {
    flex: 1;
  }
}

/* Loading state */
.cart-item.loading {
  opacity: 0.7;
  pointer-events: none;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--gray-200);
  border-top-color: var(--primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Animation for quantity changes */
.quantity-display {
  transition: all 0.2s ease;
}

.quantity-display.updating {
  background: var(--primary-100);
  color: var(--primary-700);
  transform: scale(1.05);
}
</style>
