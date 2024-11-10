<template>
  <div>
    <div id="page-wrap">
      <h1>Shopping Cart</h1>
      <ItemCart v-for="item in cartItems" :key="item.id" :item="item" />
      <h3 id="total-price">Total: Rp.{{ totalPrice }}</h3>
      <button id="checkout-button">Checkout</button>
    </div>
  </div>
</template>

<script>
import { cartItems } from '@/data-seed'
import ItemCart from '@/components/ItemCart.vue'
export default {
  components: {
    ItemCart,
  },
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
