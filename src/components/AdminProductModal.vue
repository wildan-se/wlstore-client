<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="code">Product Code:</label>
          <input
            type="text"
            id="code"
            v-model="product.code"
            :disabled="isEditMode"
            required
          />
          <small v-if="isEditMode" class="hint-text"
            >Code cannot be changed in edit mode.</small
          >
        </div>

        <div class="form-group">
          <label for="name">Product Name:</label>
          <input type="text" id="name" v-model="product.name" required />
        </div>

        <div class="form-group">
          <label for="price">Price:</label>
          <input
            type="number"
            id="price"
            v-model.number="product.price"
            step="0.01"
            required
            min="0"
          />
        </div>

        <div class="form-group">
          <label for="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            v-model.number="product.stock"
            required
            min="0"
          />
        </div>

        <div class="form-group">
          <label for="imageUpload">Product Image (Upload File):</label>
          <input
            type="file"
            id="imageUpload"
            ref="imageFileInput"
            @change="handleFileChange"
            accept="image/*"
          />
          <small class="hint-text">Max 2MB. Only image files allowed.</small>
        </div>

        <div v-if="product.imageUrl" class="current-image-preview">
          <label>Current Image:</label>
          <img
            :src="getFullImageUrl(product.imageUrl)"
            alt="Current Product Image"
            class="preview-thumb"
          />
          <button
            type="button"
            @click="removeImage"
            class="remove-image-button"
          >
            Remove Image
          </button>
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="product.description"></textarea>
        </div>

        <div class="form-group">
          <label for="averageRating">Average Rating:</label>
          <input
            type="number"
            id="averageRating"
            v-model.number="product.averageRating"
            step="0.1"
            min="0"
            max="5"
          />
        </div>

        <div class="modal-actions">
          <button type="submit" class="save-button" :disabled="isLoading">
            {{
              isLoading
                ? 'Saving...'
                : isEditMode
                  ? 'Update Product'
                  : 'Add Product'
            }}
          </button>
          <button
            type="button"
            class="cancel-button"
            @click="closeModal"
            :disabled="isLoading"
          >
            Cancel
          </button>
        </div>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
// Tidak perlu nextTick lagi di sini karena kita pakai ref
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    productToEdit: {
      type: Object,
      default: null,
    },
  },
  emits: ['close', 'save-product'],
  data() {
    return {
      product: {
        code: '',
        name: '',
        price: 0,
        description: '',
        imageUrl: '',
        averageRating: 0,
        stock: 0,
      },
      selectedFile: null,
      isEditMode: false,
      isLoading: false,
      errorMessage: null,
      API_BASE_URL:
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001',
    }
  },
  watch: {
    productToEdit: {
      handler(newVal) {
        if (newVal) {
          this.product = { ...newVal }
          this.isEditMode = true
        } else {
          this.resetForm()
          this.isEditMode = false
        }
        this.selectedFile = null
        this.errorMessage = null
      },
      immediate: true,
    },
    isVisible(newVal) {
      if (!newVal) {
        // Hanya reset form dan file input jika modal sedang ditutup
        this.resetForm()
        this.selectedFile = null
        this.errorMessage = null
      }
    },
  },
  methods: {
    resetForm() {
      this.product = {
        code: '',
        name: '',
        price: 0,
        description: '',
        imageUrl: '',
        averageRating: 0,
        stock: 0,
      }
      // Gunakan ref untuk mengakses input file dan meresetnya
      if (this.$refs.imageFileInput) {
        // Pastikan ref tersedia sebelum mencoba mengaksesnya
        this.$refs.imageFileInput.value = ''
      }
    },
    closeModal() {
      this.$emit('close')
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          this.errorMessage = 'File size exceeds 2MB limit.'
          this.selectedFile = null
          if (this.$refs.imageFileInput) {
            this.$refs.imageFileInput.value = '' // Clear file input
          }
          return
        }
        if (!file.type.startsWith('image/')) {
          this.errorMessage = 'Only image files are allowed.'
          this.selectedFile = null
          if (this.$refs.imageFileInput) {
            this.$refs.imageFileInput.value = '' // Clear file input
          }
          return
        }

        this.selectedFile = file
        this.errorMessage = null
      } else {
        this.selectedFile = null
      }
    },
    removeImage() {
      this.product.imageUrl = ''
      this.selectedFile = null
      if (this.$refs.imageFileInput) {
        this.$refs.imageFileInput.value = ''
      }
    },
    getFullImageUrl(relativePath) {
      if (
        relativePath &&
        (relativePath.startsWith('http://') ||
          relativePath.startsWith('https://'))
      ) {
        return relativePath
      }
      return `${this.API_BASE_URL}${relativePath}`
    },
    async handleSubmit() {
      this.isLoading = true
      this.errorMessage = null

      try {
        if (this.product.price < 0 || this.product.stock < 0) {
          throw new Error('Price and stock cannot be negative.')
        }
        if (this.product.averageRating < 0 || this.product.averageRating > 5) {
          throw new Error('Average rating must be between 0 and 5.')
        }
        if (
          !this.product.code ||
          !this.product.name ||
          this.product.price === null
        ) {
          throw new Error('Product Code, Name, and Price are required.')
        }

        const formData = new FormData()
        for (const key in this.product) {
          if (key === 'imageUrl' && this.selectedFile) {
            continue
          }
          if (this.product[key] !== null) {
            formData.append(key, this.product[key])
          }
        }
        if (this.selectedFile) {
          formData.append('image', this.selectedFile)
        } else if (this.isEditMode && this.product.imageUrl === '') {
          formData.append('imageUrl', '')
        }

        this.$emit('save-product', formData, this.isEditMode)
      } catch (error) {
        this.errorMessage =
          error.message || 'An unexpected error occurred. Please try again.'
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
/* Styles remain the same */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
  font-size: 1.8em;
  border-bottom: 2px solid #41b883;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.form-group input[type='text'],
.form-group input[type='number'],
.form-group textarea,
.form-group input[type='file'] {
  width: calc(100% - 20px);
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group input[type='file']:focus {
  border-color: #41b883;
  outline: none;
  box-shadow: 0 0 5px rgba(65, 184, 131, 0.3);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.hint-text {
  font-size: 0.85em;
  color: #888;
  margin-top: 5px;
  display: block;
}

.current-image-preview {
  margin-top: 15px;
  padding: 10px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  gap: 15px;
}

.current-image-preview label {
  font-weight: bold;
  color: #555;
}

.preview-thumb {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fff;
}

.remove-image-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
}

.remove-image-button:hover {
  background-color: #d32f2f;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 25px;
}

.save-button,
.cancel-button {
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.save-button {
  background-color: #41b883;
  color: white;
}

.save-button:hover:not(:disabled) {
  background-color: #36a36c;
  transform: translateY(-2px);
}

.cancel-button {
  background-color: #ccc;
  color: #333;
}

.cancel-button:hover:not(:disabled) {
  background-color: #bbb;
  transform: translateY(-2px);
}

.save-button:disabled,
.cancel-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #e63946;
  background-color: #ffe6e6;
  border: 1px solid #e63946;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}
</style>
