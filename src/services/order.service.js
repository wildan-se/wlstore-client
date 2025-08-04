// src/services/order.service.js
import api from './api'

class OrderService {
  async getUserCart() {
    return api.get('/orders/cart')
  }

  async addToCart(productCode, quantity = 1) {
    try {
      return await api.post('/orders/cart/add', { productCode, quantity })
    } catch (err) {
      console.error('OrderService addToCart error:', err)
      throw err
    }
  }

  async updateCartItemQuantity(productCode, newQuantity) {
    return api.put('/orders/cart/update-quantity', { productCode, newQuantity })
  }

  async removeFromCart(productCode) {
    return api.post('/orders/cart/remove', { productCode })
  }
}

export default new OrderService()
