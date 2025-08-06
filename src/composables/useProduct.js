import { ref } from 'vue'
import api from '../services/api.js'

/**
 * Composable untuk mengelola produk
 */
export function useProduct() {
  const products = ref([])
  const product = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // Fetch all products
  const fetchProducts = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.get('/products')
      products.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal memuat produk'
      console.error('Error fetching products:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Fetch single product by ID
  const fetchProduct = async id => {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.get(`/products/${id}`)
      product.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal memuat detail produk'
      console.error('Error fetching product:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Create new product (admin only)
  const createProduct = async productData => {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.post('/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Add to products list if successful
      if (response.data) {
        products.value.push(response.data)
      }

      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal membuat produk'
      console.error('Error creating product:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update product (admin only)
  const updateProduct = async (id, productData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.put(`/products/${id}`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Update in products list if successful
      if (response.data) {
        const index = products.value.findIndex(p => p.id === id)
        if (index > -1) {
          products.value[index] = response.data
        }
      }

      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal mengupdate produk'
      console.error('Error updating product:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete product (admin only)
  const deleteProduct = async id => {
    isLoading.value = true
    error.value = null

    try {
      await api.delete(`/products/${id}`)

      // Remove from products list if successful
      products.value = products.value.filter(p => p.id !== id)

      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal menghapus produk'
      console.error('Error deleting product:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Search products
  const searchProducts = async query => {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.get(`/products/search`, {
        params: { q: query },
      })
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal mencari produk'
      console.error('Error searching products:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Filter products by category
  const filterProductsByCategory = categoryId => {
    if (!categoryId) return products.value
    return products.value.filter(product => product.categoryId === categoryId)
  }

  // Sort products
  const sortProducts = (products, sortBy = 'name', order = 'asc') => {
    return [...products].sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      // Handle string comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (order === 'desc') {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      }
    })
  }

  // Reset state
  const reset = () => {
    products.value = []
    product.value = null
    isLoading.value = false
    error.value = null
  }

  return {
    products,
    product,
    isLoading,
    error,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterProductsByCategory,
    sortProducts,
    reset,
  }
}
