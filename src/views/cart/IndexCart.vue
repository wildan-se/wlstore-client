<template>
  <div class="cart-page">
    <!-- Header Section -->
    <div class="cart-header">
      <div class="container">
        <div class="header-content">
          <div class="header-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="header-text">
            <h1 class="page-title">Keranjang Belanja</h1>
            <p class="page-subtitle">Kelola pesanan Anda sebelum checkout</p>
          </div>
          <div class="cart-stats" v-if="!loading && cartItems.length > 0">
            <div class="stat-item">
              <span class="stat-number">{{ totalItems }}</span>
              <span class="stat-label">Items</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-section">
          <div class="loading-card">
            <div class="loading-spinner"></div>
            <h3 class="loading-title">Memuat Keranjang</h3>
            <p class="loading-text">Mohon tunggu sebentar...</p>
          </div>
        </div>

        <!-- Empty Cart -->
        <div v-else-if="cartItems.length === 0" class="empty-section">
          <div class="empty-content animate-fade-in">
            <div class="empty-icon">
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
            </div>
            <h3 class="empty-title">Keranjang Anda Kosong</h3>
            <p class="empty-message">
              Belum ada produk di keranjang. Mari mulai berbelanja dan temukan
              produk favorit Anda!
            </p>
            <router-link to="/" class="btn btn-primary">
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
              Mulai Belanja
            </router-link>
          </div>
        </div>

        <!-- Cart Content -->
        <div v-else class="cart-content animate-fade-in">
          <div class="cart-layout">
            <!-- Cart Items -->
            <div class="cart-items">
              <div class="section-header">
                <h2 class="section-title">Item Anda</h2>
                <span class="item-count-badge"
                  >{{ cartItems.length }} item</span
                >
              </div>

              <div class="items-list">
                <div
                  v-for="(item, index) in cartItems"
                  :key="item.productCode"
                  class="item-wrapper"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  <ItemCart
                    :ref="`itemCart-${item.productCode}`"
                    :item="item"
                    @update-quantity="handleUpdateQuantity"
                    @remove-item="handleRemoveItem"
                  />
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="order-summary">
              <div class="summary-card">
                <div class="summary-header">
                  <h3 class="summary-title">Ringkasan Pesanan</h3>
                </div>

                <div class="summary-content">
                  <div class="summary-row">
                    <span class="summary-label"
                      >Subtotal ({{ totalItems }} item)</span
                    >
                    <span class="summary-value"
                      >Rp {{ subtotal.toLocaleString('id-ID') }}</span
                    >
                  </div>

                  <div class="summary-row">
                    <span class="summary-label">Ongkos Kirim</span>
                    <span class="summary-value free">GRATIS</span>
                  </div>

                  <div class="summary-divider"></div>

                  <div class="summary-row total">
                    <span class="summary-label">Total</span>
                    <span class="summary-value"
                      >Rp {{ totalPrice.toLocaleString('id-ID') }}</span
                    >
                  </div>
                </div>

                <div class="summary-actions">
                  <button
                    class="btn btn-primary btn-lg checkout-btn"
                    @click="checkout"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12L11 14L15 10"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                    Lanjutkan ke Checkout
                  </button>

                  <router-link to="/" class="btn btn-outline continue-shopping">
                    Lanjut Belanja
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCart from '@/components/ItemCart.vue'
import OrderService from '@/services/order.service'

export default {
  name: 'IndexCart',
  components: {
    ItemCart,
  },
  data() {
    return {
      cartItems: [],
      loading: true,
      message: '', // Untuk pesan sukses/error
    }
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((total, item) => {
        return total + (item.productDetails?.price || 0) * item.quantity
      }, 0)
    },
    totalPrice() {
      // For now, total is same as subtotal (free shipping)
      return this.subtotal
    },
    totalItems() {
      return this.cartItems.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    },
  },
  methods: {
    async fetchCart() {
      this.loading = true
      try {
        const response = await OrderService.getUserCart()
        if (response.data.cart && response.data.cart.cart_items) {
          this.cartItems = response.data.cart.cart_items
        } else {
          this.cartItems = []
        }
      } catch (error) {
        console.error('Error fetching cart:', error)
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          'Terjadi kesalahan saat mengambil keranjang.'
        this.cartItems = []
      } finally {
        this.loading = false
      }
    },
    async handleUpdateQuantity(productCode, newQuantity) {
      // Optimistic update - update UI immediately
      const itemIndex = this.cartItems.findIndex(
        item => item.productCode === productCode,
      )
      if (itemIndex !== -1) {
        // Store original quantity for rollback if needed
        const originalQuantity = this.cartItems[itemIndex].quantity

        // Update UI immediately
        this.cartItems[itemIndex].quantity = newQuantity

        try {
          const response = await OrderService.updateCartItemQuantity(
            productCode,
            newQuantity,
          )

          // Reset loading state
          const itemRef = this.$refs[`itemCart-${productCode}`]
          if (itemRef && itemRef[0] && itemRef[0].setLoading) {
            itemRef[0].setLoading(false)
          }

          // Update with server response if different
          if (response.data.cart && response.data.cart.cart_items) {
            this.cartItems = response.data.cart.cart_items
            this.message = response.data.message
          } else {
            // Jika keranjang kosong setelah update (misal semua dihapus)
            this.cartItems = []
            this.message = response.data.message
          }
        } catch (error) {
          // Rollback on error
          this.cartItems[itemIndex].quantity = originalQuantity

          // Reset loading state
          const itemRef = this.$refs[`itemCart-${productCode}`]
          if (itemRef && itemRef[0] && itemRef[0].setLoading) {
            itemRef[0].setLoading(false)
          }

          console.error('Error updating cart quantity:', error)
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            'Gagal memperbarui kuantitas produk.'

          // Refresh from server on error
          this.fetchCart()
        }
      }
    },
    async handleRemoveItem(productCode) {
      // Optimistic update - remove from UI immediately
      const originalItems = [...this.cartItems]
      const itemIndex = this.cartItems.findIndex(
        item => item.productCode === productCode,
      )

      if (itemIndex !== -1) {
        // Remove from UI immediately
        this.cartItems.splice(itemIndex, 1)

        try {
          const response = await OrderService.removeFromCart(productCode)
          if (response.data.cart && response.data.cart.cart_items) {
            this.cartItems = response.data.cart.cart_items
            this.message = response.data.message
          } else {
            // Cart is empty
            this.cartItems = []
            this.message = response.data.message
          }
        } catch (error) {
          // Rollback on error
          this.cartItems = originalItems

          console.error('Error removing item from cart:', error)
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            'Gagal menghapus produk dari keranjang.'
        }
      }
    },
    checkout() {
      alert('Fitur checkout akan segera hadir!')
      // this.$router.push("/checkout"); // Jika nanti ada halaman checkout
    },
  },
  mounted() {
    this.fetchCart()
  },
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--gray-50) 0%,
    var(--primary-50) 100%
  );
}

/* Header Section */
.cart-header {
  background: var(--gradient-primary);
  color: white;
  padding: var(--space-16) 0 var(--space-12);
  position: relative;
  overflow: hidden;
}

.cart-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="cart-pattern" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23cart-pattern)"/></svg>');
  opacity: 0.3;
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  position: relative;
  z-index: 1;
}

.header-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.header-icon svg {
  width: 32px;
  height: 32px;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 var(--space-2);
  background: linear-gradient(135deg, white 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 0;
  line-height: 1.5;
}

.cart-stats {
  display: flex;
  gap: var(--space-8);
}

.stat-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Main Content */
.main-content {
  padding: var(--space-12) 0;
  margin-top: -var(--space-6);
  position: relative;
  z-index: 2;
}

/* Loading Section */
.loading-section {
  padding: var(--space-16) 0;
  display: flex;
  justify-content: center;
}

.loading-card {
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-12);
  text-align: center;
  box-shadow: var(--shadow-lg);
  max-width: 400px;
  width: 100%;
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

/* Empty Section */
.empty-section {
  padding: var(--space-16) 0;
  display: flex;
  justify-content: center;
}

.empty-content {
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-16);
  text-align: center;
  box-shadow: var(--shadow-lg);
  max-width: 500px;
  width: 100%;
}

.empty-icon {
  width: 80px;
  height: 80px;
  color: var(--gray-400);
  margin: 0 auto var(--space-8);
}

.empty-icon svg {
  width: 100%;
  height: 100%;
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
  margin-bottom: var(--space-8);
}

/* Cart Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--space-8);
  align-items: start;
}

/* Cart Items */
.cart-items {
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.item-count-badge {
  background: var(--primary-100);
  color: var(--primary-700);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.item-wrapper {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Order Summary */
.order-summary {
  position: sticky;
  top: var(--space-8);
}

.summary-card {
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
}

.summary-header {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border);
}

.summary-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.summary-content {
  margin-bottom: var(--space-8);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) 0;
}

.summary-row.total {
  font-weight: 600;
  font-size: 1.125rem;
  padding: var(--space-4) 0;
}

.summary-label {
  color: var(--text-secondary);
}

.summary-row.total .summary-label {
  color: var(--text-primary);
}

.summary-value {
  font-weight: 500;
  color: var(--text-primary);
}

.summary-value.free {
  color: var(--success-600);
  font-weight: 600;
}

.summary-row.total .summary-value {
  color: var(--primary-600);
  font-size: 1.25rem;
}

.summary-divider {
  height: 1px;
  background: var(--border);
  margin: var(--space-4) 0;
}

.summary-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.checkout-btn {
  width: 100%;
  justify-content: center;
  font-weight: 600;
}

.continue-shopping {
  text-align: center;
  color: var(--text-secondary);
  font-weight: 500;
}

.continue-shopping:hover {
  color: var(--primary-600);
  background: var(--primary-50);
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
  .cart-layout {
    grid-template-columns: 1fr 350px;
    gap: var(--space-6);
  }
}

@media (max-width: 768px) {
  .cart-header {
    padding: var(--space-12) 0 var(--space-8);
  }

  .header-content {
    flex-direction: column;
    text-align: center;
    gap: var(--space-4);
  }

  .header-icon {
    width: 50px;
    height: 50px;
  }

  .header-icon svg {
    width: 24px;
    height: 24px;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .cart-layout {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .order-summary {
    position: static;
    order: -1;
  }

  .main-content {
    padding: var(--space-8) 0;
  }

  .cart-items,
  .summary-card {
    padding: var(--space-6);
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.75rem;
  }

  .empty-content,
  .loading-card {
    padding: var(--space-8);
  }

  .empty-icon {
    width: 60px;
    height: 60px;
  }

  .cart-items,
  .summary-card {
    padding: var(--space-4);
  }
}
</style>
