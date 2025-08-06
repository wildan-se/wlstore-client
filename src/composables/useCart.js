import { ref, computed } from 'vue'

/**
 * Composable untuk mengelola keranjang belanja
 */
export function useCart() {
  // State keranjang disimpan di localStorage untuk persistensi
  const getCartFromStorage = () => {
    try {
      const cart = localStorage.getItem('cart')
      return cart ? JSON.parse(cart) : []
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error)
      return []
    }
  }

  const saveCartToStorage = cart => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }

  // Reactive state
  const cartItems = ref(getCartFromStorage())

  // Computed properties
  const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
  })

  const isCartEmpty = computed(() => cartItems.value.length === 0)

  // Methods
  const addToCart = (product, quantity = 1) => {
    const existingItemIndex = cartItems.value.findIndex(
      item => item.id === product.id,
    )

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      cartItems.value[existingItemIndex].quantity += quantity
    } else {
      // Add new item to cart
      cartItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      })
    }

    saveCartToStorage(cartItems.value)
  }

  const removeFromCart = productId => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId)
    saveCartToStorage(cartItems.value)
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    const itemIndex = cartItems.value.findIndex(item => item.id === productId)
    if (itemIndex > -1) {
      cartItems.value[itemIndex].quantity = newQuantity
      saveCartToStorage(cartItems.value)
    }
  }

  const clearCart = () => {
    cartItems.value = []
    saveCartToStorage(cartItems.value)
  }

  const getCartItem = productId => {
    return cartItems.value.find(item => item.id === productId)
  }

  const isInCart = productId => {
    return cartItems.value.some(item => item.id === productId)
  }

  // Load cart from storage on initialization
  const loadCart = () => {
    cartItems.value = getCartFromStorage()
  }

  return {
    cartItems,
    cartItemCount,
    cartTotal,
    isCartEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem,
    isInCart,
    loadCart,
  }
}
