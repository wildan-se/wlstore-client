<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200 to-primary/10">
    <!-- Header Section -->
    <div
      class="hero bg-gradient-to-r from-primary to-secondary text-primary-content"
    >
      <div class="hero-overlay bg-opacity-30"></div>
      <div class="hero-content text-center py-16 z-10">
        <div class="max-w-md">
          <div class="flex items-center justify-center gap-6 mb-6">
            <div
              class="flex items-center justify-center w-16 h-16 bg-primary-content/20 rounded-full"
            >
              <svg
                class="w-8 h-8"
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
            <div class="text-left">
              <h1 class="text-4xl font-bold">Keranjang Belanja</h1>
              <p class="text-lg opacity-90">
                Kelola pesanan Anda sebelum checkout
              </p>
            </div>
            <div
              v-if="!loading && cartItems.length > 0"
              class="stat bg-primary-content/20 backdrop-blur-sm text-primary-content"
            >
              <div class="stat-value text-2xl">{{ totalItems }}</div>
              <div class="stat-title opacity-80">Items</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-16 -mt-8 relative z-20">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center min-h-96">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body text-center">
            <span
              class="loading loading-spinner loading-lg text-primary mb-4"
            ></span>
            <h3 class="text-xl font-semibold mb-2">Memuat Keranjang</h3>
            <p class="text-base-content/70">Mohon tunggu sebentar...</p>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div
        v-else-if="cartItems.length === 0"
        class="flex items-center justify-center min-h-96"
      >
        <div class="card bg-base-100 shadow-xl max-w-md">
          <div class="card-body text-center animate-fade-in">
            <div class="flex justify-center mb-6">
              <div
                class="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-12 h-12 text-base-content/50"
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
            </div>
            <h3 class="text-2xl font-bold mb-4">Keranjang Anda Kosong</h3>
            <p class="text-base-content/70 mb-6">
              Belum ada produk di keranjang. Mari mulai berbelanja dan temukan
              produk favorit Anda!
            </p>
            <router-link to="/" class="btn btn-primary btn-wide">
              <svg
                class="w-5 h-5"
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
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in">
        <!-- Cart Items -->
        <div class="xl:col-span-2">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold">Item Anda</h2>
                <div class="badge badge-primary badge-lg">
                  {{ cartItems.length }} item
                </div>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(item, index) in cartItems"
                  :key="item.productCode"
                  class="animate-fade-in"
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
          </div>
        </div>

        <!-- Order Summary -->
        <div class="xl:col-span-1">
          <div class="sticky top-14 pt-6 mt-6">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="text-xl font-bold mb-6">Ringkasan Pesanan</h3>

                <div class="space-y-4">
                  <div class="flex justify-between">
                    <span class="text-base-content/70"
                      >Subtotal ({{ totalItems }} item)</span
                    >
                    <span class="font-semibold"
                      >Rp {{ subtotal.toLocaleString('id-ID') }}</span
                    >
                  </div>

                  <div class="flex justify-between">
                    <span class="text-base-content/70">Ongkos Kirim</span>
                    <span class="text-success font-semibold">GRATIS</span>
                  </div>

                  <div class="divider"></div>

                  <div class="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span class="text-primary"
                      >Rp {{ totalPrice.toLocaleString('id-ID') }}</span
                    >
                  </div>
                </div>

                <div class="space-y-3 mt-6">
                  <button
                    class="btn btn-primary btn-lg w-full"
                    @click="checkout"
                  >
                    <svg
                      class="w-5 h-5"
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

                  <router-link to="/" class="btn btn-outline w-full">
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
/* Minimal custom CSS - 98% replaced with Tailwind + DaisyUI */

/* Enhanced fade-in animation for Tailwind */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in-up 0.6s ease-out forwards;
}

/* Staggered animation delays for cart items */
[style*='animation-delay'] {
  opacity: 0;
  animation: fade-in-up 0.6s ease-out forwards;
}
</style>
