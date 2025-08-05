<template>
  <div
    class="card bg-base-100 shadow hover:shadow-lg transition-all duration-300"
    :class="{ 'opacity-70 pointer-events-none': loading }"
  >
    <div class="card-body p-4">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Product Image -->
        <div class="flex-shrink-0">
          <div class="avatar">
            <div class="w-24 h-24 lg:w-32 lg:h-32 rounded-lg">
              <img
                :src="imageUrl"
                :alt="item.productDetails?.name || 'Product'"
                class="object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
                @error="handleImageError"
              />
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex-1 space-y-3">
          <!-- Product Name & Code -->
          <div>
            <h3 class="font-semibold text-lg line-clamp-2">
              {{ item.productDetails?.name || 'Unknown Product' }}
            </h3>
            <div class="flex flex-wrap items-center gap-3 mt-2">
              <div class="badge badge-outline badge-sm">
                {{ item.productCode }}
              </div>
              <div class="text-primary font-semibold">
                Rp {{ formatPrice(item.productDetails?.price || 0) }}
              </div>
            </div>
          </div>

          <!-- Quantity Controls -->
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium">Jumlah:</span>
              <div class="join">
                <button
                  class="btn btn-sm join-item"
                  @click="decreaseQuantity"
                  :disabled="loading || item.quantity <= 1"
                  aria-label="Kurangi jumlah"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>

                <div
                  class="btn btn-sm join-item no-animation bg-base-200"
                  :class="{ 'bg-primary/20 text-primary': loading }"
                >
                  {{ item.quantity }}
                </div>

                <button
                  class="btn btn-sm join-item"
                  @click="increaseQuantity"
                  :disabled="loading"
                  aria-label="Tambah jumlah"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2">
              <button
                class="btn btn-sm btn-ghost tooltip"
                :disabled="loading"
                data-tip="Simpan untuk nanti"
                @click="saveForLater"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 21L12 16L5 21V5C5 4.4 5.4 4 6 4H18C18.6 4 19 4.4 19 5V21Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </button>

              <button
                class="btn btn-sm btn-error btn-ghost tooltip"
                @click="removeItem"
                :disabled="loading"
                data-tip="Hapus dari keranjang"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 6H5H21M8 6V4C8 3.4 8.4 3 9 3H15C15.6 3 16 3.4 16 4V6M19 6V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V6H19ZM10 11V17M14 11V17"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Subtotal -->
        <div class="flex-shrink-0 text-right lg:text-left">
          <div class="stats shadow-sm">
            <div class="stat py-2 px-4">
              <div class="stat-title text-xs">Subtotal</div>
              <div class="stat-value text-lg">
                Rp
                {{
                  formatPrice((item.productDetails?.price || 0) * item.quantity)
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div
        v-if="loading"
        class="absolute inset-0 bg-base-100/80 rounded-2xl flex items-center justify-center"
      >
        <span class="loading loading-spinner loading-md text-primary"></span>
      </div>
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
/* Line clamp utility for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
