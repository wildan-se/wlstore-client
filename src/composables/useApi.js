// composables/useApi.js
import { ref } from 'vue'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const request = async (apiCall, options = {}) => {
    const { showLoading = true, errorMessage = 'Something went wrong' } =
      options

    if (showLoading) loading.value = true
    error.value = null

    try {
      const response = await apiCall()
      return response
    } catch (err) {
      console.error('API Error:', err)
      error.value = err.response?.data?.message || errorMessage
      throw err
    } finally {
      if (showLoading) loading.value = false
    }
  }

  return {
    loading,
    error,
    request,
  }
}
