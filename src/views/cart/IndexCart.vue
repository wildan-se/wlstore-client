<template>
  <div>
    <div id="page-wrap">
      <h1>Shopping Cart</h1>
      <div class="product-container" v-for="item in cartItems" :key="item.id">
        <img :src="item.imageUrl" alt="Product Image" class="product-image" />
        <div class="details-wrap">
          <h3>{{ item.name }}</h3>
          <p>Rp.{{ item.price }}</p>
        </div>
        <button class="remove-button">Remove</button>
      </div>
      <h3 id="total-price">Total: Rp.{{ totalPrice }}</h3>
      <button id="checkout-button">Checkout</button>
    </div>
  </div>
</template>

<script>
import { cartItems } from '../../data-seed'

export default {
  data() {
    return {
      cartItems,
    }
  },
  computed: {
    // Menghitung total harga dari semua item di keranjang
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + Number(item.price), 0)
    },
  },
}
</script>

<style scoped>
#page-wrap {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 1.8em;
  color: #333;
  border-bottom: 2px solid #41b883;
  padding-bottom: 10px;
  margin-bottom: 20px;
  text-align: center;
}

.product-container {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #ddd;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: #f0f0f0;
  object-fit: cover;
  margin-right: 16px;
}

.details-wrap {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.details-wrap h3 {
  font-size: 1.2em;
  color: #333;
  margin: 0;
}

.details-wrap p {
  color: #41b883;
  font-size: 1em;
  margin: 0;
}

.remove-button {
  background-color: transparent;
  color: #e63946;
  border: none;
  cursor: pointer;
  font-size: 0.9em;
  transition: color 0.3s ease;
}

.remove-button:hover {
  color: #c92a2a;
}

#total-price {
  padding: 16px 0;
  font-size: 1.3em;
  color: #333;
  text-align: right;
  border-top: 1px solid #ddd;
  margin-top: 10px;
}

#checkout-button {
  background-color: #41b883;
  color: white;
  border: none;
  padding: 12px;
  font-size: 1.1em;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

#checkout-button:hover {
  background-color: #36a36c;
}
</style>
