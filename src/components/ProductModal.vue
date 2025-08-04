<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title">
          {{ product ? 'Edit Product' : 'Add New Product' }}
        </h2>
        <button @click="$emit('close')" class="modal-close">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-grid">
          <!-- Product Code -->
          <div class="form-group span-1">
            <label for="code" class="form-label">Product Code *</label>
            <input
              id="code"
              v-model="form.code"
              type="text"
              class="form-input"
              placeholder="e.g., PROD001"
              required
              :disabled="!!product"
            />
          </div>

          <!-- Product Name -->
          <div class="form-group span-2">
            <label for="name" class="form-label">Product Name *</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="form-input"
              placeholder="Enter product name"
              required
            />
          </div>

          <!-- Price -->
          <div class="form-group span-1">
            <label for="price" class="form-label">Price (Rp) *</label>
            <input
              id="price"
              v-model.number="form.price"
              type="number"
              class="form-input"
              placeholder="0"
              min="0"
              step="1000"
              required
            />
          </div>

          <!-- Stock -->
          <div class="form-group span-1">
            <label for="stock" class="form-label">Stock *</label>
            <input
              id="stock"
              v-model.number="form.stock"
              type="number"
              class="form-input"
              placeholder="0"
              min="0"
              required
            />
          </div>

          <!-- Rating -->
          <div class="form-group span-1">
            <label for="rating" class="form-label">Average Rating</label>
            <input
              id="rating"
              v-model.number="form.averageRating"
              type="number"
              class="form-input"
              placeholder="0.0"
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          <!-- Image URL -->
          <div class="form-group span-3">
            <label for="imageUrl" class="form-label">Image</label>
            <div class="image-input-group">
              <select v-model="form.imageUrl" class="form-select">
                <option value="">Select an image</option>
                <option
                  v-for="image in availableImages"
                  :key="image.value"
                  :value="image.value"
                >
                  {{ image.label }}
                </option>
              </select>
              <div v-if="form.imageUrl" class="image-preview">
                <img :src="getImageUrl(form.imageUrl)" :alt="form.name" />
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="form-group span-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              class="form-textarea"
              placeholder="Enter product description"
              rows="4"
            ></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" @click="$emit('close')" class="btn btn-outline">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <div v-if="loading" class="loading-spinner"></div>
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
}

.modal-container {
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.modal-close {
  width: 40px;
  height: 40px;
  border: none;
  background: var(--gray-100);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.modal-close:hover {
  background: var(--gray-200);
  color: var(--text-primary);
}

.modal-close svg {
  width: 20px;
  height: 20px;
}

.modal-body {
  padding: var(--space-6);
  overflow-y: auto;
  flex: 1;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.span-1 {
  grid-column: span 1;
}

.form-group.span-2 {
  grid-column: span 2;
}

.form-group.span-3 {
  grid-column: span 3;
}

.form-label {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  font-size: 0.875rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: border-color var(--transition);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: var(--primary-500);
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:disabled {
  background: var(--gray-100);
  color: var(--text-secondary);
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.image-input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.image-preview {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--gray-100);
  border: 1px solid var(--border);
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  flex-shrink: 0;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: var(--space-2);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .modal-container {
    margin: var(--space-4);
    max-height: calc(100vh - 2rem);
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.span-1,
  .form-group.span-2,
  .form-group.span-3 {
    grid-column: span 1;
  }

  .modal-header {
    padding: var(--space-4);
  }

  .modal-body {
    padding: var(--space-4);
  }

  .modal-footer {
    padding: var(--space-4);
    flex-direction: column;
  }
}
</style>
