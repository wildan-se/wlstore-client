<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
    >
      <div
        class="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0"
      >
        <h2 class="text-xl font-semibold text-gray-900 m-0">
          {{ product ? 'Edit Product' : 'Add New Product' }}
        </h2>
        <button
          @click="$emit('close')"
          class="w-10 h-10 border-none bg-gray-100 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        >
          <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 overflow-y-auto flex-1">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Product Code -->
          <div class="flex flex-col">
            <label for="code" class="font-semibold text-gray-900 mb-2 text-sm"
              >Product Code *</label
            >
            <input
              id="code"
              v-model="form.code"
              type="text"
              class="p-3 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-3 focus:ring-blue-50 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
              placeholder="e.g., PROD001"
              required
              :disabled="!!product"
            />
          </div>

          <!-- Product Name -->
          <div class="flex flex-col md:col-span-2">
            <label for="name" class="font-semibold text-gray-900 mb-2 text-sm"
              >Product Name *</label
            >
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="p-3 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-3 focus:ring-blue-50"
              placeholder="Enter product name"
              required
            />
          </div>

          <!-- Price -->
          <div class="flex flex-col">
            <label for="price" class="font-semibold text-gray-900 mb-2 text-sm"
              >Price (Rp) *</label
            >
            <input
              id="price"
              v-model.number="form.price"
              type="number"
              class="p-3 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-3 focus:ring-blue-50"
              placeholder="0"
              min="0"
              step="1000"
              required
            />
          </div>

          <!-- Stock -->
          <div class="flex flex-col">
            <label for="stock" class="font-semibold text-gray-900 mb-2 text-sm"
              >Stock *</label
            >
            <input
              id="stock"
              v-model.number="form.stock"
              type="number"
              class="p-3 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-3 focus:ring-blue-50"
              placeholder="0"
              min="0"
              required
            />
          </div>

          <!-- Rating -->
          <div class="flex flex-col">
            <label for="rating" class="font-semibold text-gray-900 mb-2 text-sm"
              >Average Rating</label
            >
            <input
              id="rating"
              v-model.number="form.averageRating"
              type="number"
              class="p-3 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-3 focus:ring-blue-50"
              placeholder="0.0"
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          <!-- Image URL -->
          <div class="flex flex-col md:col-span-3">
            <label
              for="imageUrl"
              class="font-semibold text-gray-900 mb-2 text-sm"
              >Image</label
            >
            <div class="flex flex-col gap-4">
              <select
                v-model="form.imageUrl"
                class="p-3 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-3 focus:ring-blue-50"
              >
                <option value="">Select an image</option>
                <option
                  v-for="image in availableImages"
                  :key="image.value"
                  :value="image.value"
                >
                  {{ image.label }}
                </option>
              </select>
              <div v-if="form.imageUrl" class="self-start">
                <div
                  class="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                >
                  <img
                    :src="getImageUrl(form.imageUrl)"
                    :alt="form.name"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="flex flex-col md:col-span-3">
            <label
              for="description"
              class="font-semibold text-gray-900 mb-2 text-sm"
              >Description</label
            >
            <textarea
              id="description"
              v-model="form.description"
              class="p-3 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-3 focus:ring-blue-50 resize-vertical min-h-[100px]"
              placeholder="Enter product description"
              rows="4"
            ></textarea>
          </div>
        </div>

        <div
          class="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 flex-shrink-0"
        >
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 font-medium cursor-pointer transition-all duration-200 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-3 bg-blue-600 text-white border-none rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            :disabled="loading"
          >
            <div
              v-if="loading"
              class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
            {{
              loading
                ? 'Saving...'
                : product
                  ? 'Update Product'
                  : 'Create Product'
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'ProductModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: null,
    },
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const loading = ref(false)

    const form = ref({
      code: '',
      name: '',
      price: 0,
      stock: 0,
      averageRating: 0,
      imageUrl: '',
      description: '',
    })

    // Available images from backend /public/img folder
    const availableImages = ref([
      { value: '/img/dompet.jpg', label: 'Dompet Kulit Premium' },
      { value: '/img/ecopanda.jpg', label: 'Eco Panda Tumbler' },
      { value: '/img/febreze.jpg', label: 'Febreze Air Freshener' },
      { value: '/img/iphone.jpg', label: 'iPhone 15 Pro Max' },
      { value: '/img/kacamata.jpg', label: 'Kacamata Fashion' },
      { value: '/img/kamera.jpg', label: 'Kamera Canon EOS R6' },
      { value: '/img/lasegar.jpg', label: 'Las Egar Organic Drink' },
      { value: '/img/lensbaby.jpg', label: 'Lensbaby Photography Lens' },
      { value: '/img/sepatu-heels.jpg', label: 'Sepatu Heels Elegant' },
      { value: '/img/sepatu-kets.jpg', label: 'Sepatu Casual Kets' },
      { value: '/img/sepatu-running.jpg', label: 'Sepatu Running Nike' },
      { value: '/img/tws.jpg', label: 'TWS Earbuds Premium' },
      { value: '/img/kucing.jpg', label: 'Kucing ngantuk' },
    ])

    const getImageUrl = imageUrl => {
      if (!imageUrl) return ''
      if (imageUrl.startsWith('/img/')) {
        // Use backend server for images from /public/img
        const BASE_URL =
          import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ||
          'http://localhost:8001'
        return `${BASE_URL}${imageUrl}`
      }
      return imageUrl
    }

    const resetForm = () => {
      form.value = {
        code: '',
        name: '',
        price: 0,
        stock: 0,
        averageRating: 0,
        imageUrl: '',
        description: '',
      }
    }

    const handleSubmit = async () => {
      loading.value = true

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        emit('save', { ...form.value })
      } catch (error) {
        console.error('Error saving product:', error)
      } finally {
        loading.value = false
      }
    }

    // Watch for product changes to populate form
    watch(
      () => props.product,
      newProduct => {
        if (newProduct) {
          form.value = { ...newProduct }
        } else {
          resetForm()
        }
      },
      { immediate: true },
    )

    // Reset form when modal closes
    watch(
      () => props.show,
      show => {
        if (!show && !props.product) {
          resetForm()
        }
      },
    )

    return {
      form,
      loading,
      availableImages,
      getImageUrl,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
/* Minimal custom CSS - 98% replaced with Tailwind + DaisyUI */

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease;
}

/* Custom responsive layout for mobile */
@media (max-width: 768px) {
  .grid.grid-cols-1.md\\:grid-cols-3 {
    grid-template-columns: 1fr;
  }

  .md\\:col-span-2,
  .md\\:col-span-3 {
    grid-column: span 1;
  }

  .flex.justify-end {
    flex-direction: column;
  }
}
</style>
