<template>
  <div
    class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col"
    @click="goToDetail"
  >
    <!-- Image Container -->
    <figure class="relative overflow-hidden bg-base-200 h-48">
      <img
        :src="imageUrl"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        @error="handleImageError"
      />

      <!-- Hover Overlay -->
      <div
        class="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4"
      >
        <button
          class="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-black"
          @click.stop="goToDetail"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            />
          </svg>
          View Details
        </button>
        <button
          class="btn btn-primary btn-sm"
          @click.stop="addToCart"
          :disabled="product.stock === 0"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            />
          </svg>
          Add to Cart
        </button>
      </div>

      <!-- Stock Badges -->
      <div class="absolute top-3 right-3">
        <div
          v-if="product.stock <= 5 && product.stock > 0"
          class="badge badge-warning badge-sm"
        >
          Only {{ product.stock }} left!
        </div>
        <div v-else-if="product.stock === 0" class="badge badge-error badge-sm">
          Out of Stock
        </div>
      </div>
    </figure>

    <!-- Card Body -->
    <div class="card-body p-4 flex-1 flex flex-col">
      <!-- Product Header -->
      <div class="mb-3">
        <h3 class="card-title text-base line-clamp-2 mb-2">
          {{ product.name }}
        </h3>

        <!-- Rating -->
        <div v-if="product.averageRating > 0" class="flex items-center gap-2">
          <div class="rating rating-sm">
            <span
              v-for="i in 5"
              :key="i"
              class="mask mask-star-2"
              :class="
                i <= Math.round(product.averageRating)
                  ? 'bg-orange-400'
                  : 'bg-gray-300'
              "
            ></span>
          </div>
          <span class="text-xs text-base-content/70"
            >({{ product.averageRating.toFixed(1) }})</span
          >
        </div>
      </div>

      <!-- Description -->
      <p
        v-if="product.description"
        class="text-sm text-base-content/70 line-clamp-3 mb-4 flex-1"
      >
        {{ truncatedDescription }}
      </p>

      <!-- Card Actions -->
      <div class="card-actions justify-between items-end">
        <!-- Price -->
        <div>
          <div class="text-lg font-bold text-primary">
            {{ formatPrice(product.price) }}
          </div>
          <div class="text-xs text-base-content/60">per item</div>
        </div>

        <!-- Add Button -->
        <button
          class="btn btn-primary btn-sm"
          @click.stop="addToCart"
          :disabled="product.stock === 0 || loading"
          :class="{ loading: loading }"
        >
          <svg
            v-if="!loading"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M19 7v4H5.83l-.42-.83L4.05 7H19m0-2H3.27l2 4 .73 1.46L7.58 16H19v-2H9.58l-.42-.83L10.73 9H21V7z"
            />
          </svg>
          {{ loading ? '' : 'Add' }}
        </button>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="absolute inset-0 bg-base-100/80 flex items-center justify-center"
    >
      <span class="loading loading-spinner loading-md text-primary"></span>
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

      // Cek login menggunakan token
      const token = localStorage.getItem('token')
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
/* Line clamp utilities for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
