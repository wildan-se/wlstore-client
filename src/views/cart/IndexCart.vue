<template>
  <div>
    <!-- Wrapper utama halaman -->
    <div id="page-wrap">
      <!-- Judul halaman -->
      <h1>Shopping Cart</h1>

      <!-- Komponen untuk menampilkan setiap item dalam keranjang -->
      <ItemCart
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
        v-on:remove-item="removeFromCart($event)"
      />

      <!-- Total harga semua item di keranjang -->
      <h3 id="total-price">
        Total: Rp.{{ totalPrice }}
        <!-- Menampilkan total harga, dihitung melalui properti terhitung -->
      </h3>

      <!-- Tombol untuk melanjutkan ke proses checkout -->
      <button id="checkout-button">Checkout</button>
    </div>
  </div>
</template>

<script>
// Mengimpor library Axios untuk melakukan HTTP request
import axios from 'axios'
// Mengimpor komponen ItemCart untuk digunakan dalam template
import ItemCart from '@/components/ItemCart.vue'

export default {
  // Daftar komponen yang digunakan dalam template
  components: {
    ItemCart,
  },
  // Data lokal untuk komponen
  data() {
    return {
      cartItems: [], // Menyimpan daftar item yang ada di keranjang
    }
  },

  methods: {
    // Metode untuk menghapus item dari keranjang
    async removeFromCart(product) {
      // Mengirim permintaan DELETE ke API untuk menghapus item berdasarkan ID produk
      await axios.delete(
        `http://localhost:8000/api/orders/user/1/product/${product}`,
      )
      // Mencari indeks item yang akan dihapus dari array cartItems
      let indexCart = this.cartItems
        .map(function (item) {
          return item.code // Mengambil kode unik dari setiap item
        })
        .indexOf(product) // Menemukan indeks item dengan kode produk yang cocok
      // Menghapus item dari array cartItems menggunakan splice
      this.cartItems.splice(indexCart, 1)
    },
  },
  computed: {
    // Properti terhitung untuk menghitung total harga semua item di keranjang
    totalPrice() {
      // Menggunakan reduce untuk menjumlahkan harga semua item
      return this.cartItems.reduce((sum, item) => sum + Number(item.price), 0)
    },
  },
  async created() {
    // Lifecycle hook untuk mengambil data keranjang saat komponen dibuat
    const result = await axios.get('http://localhost:8000/api/orders/user/1')
    // Memproses data dari API untuk menyusun daftar item keranjang
    let data = Object.assign(
      {},
      ...result.data.map(result => ({
        cart_items: result.products, // Menyimpan daftar produk dalam key 'cart_items'
      })),
    )
    // Menyimpan data keranjang ke dalam state lokal cartItems
    this.cartItems = data.cart_items
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
