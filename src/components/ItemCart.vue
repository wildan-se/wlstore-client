<template>
  <!-- Komponen utama untuk item di keranjang belanja -->
  <div class="cart-item">
    <!-- Gambar produk -->
    <!-- Sumber gambar, diambil dari properti item.imageUrl -->

    <img
      :src="`http://localhost:8000${item.imageUrl}`"
      alt="Product Image"
      loading="lazy"
      class="product-image"
    />
    <!-- Detail produk -->
    <div class="product-details">
      <!-- Nama produk, ditampilkan menggunakan properti item.name -->
      <h4>{{ item.name }}</h4>
      <!-- Harga produk, diformat ke dalam format rupiah Indonesia -->
      <p>Rp. {{ parseFloat(item.price).toLocaleString('id-ID') }}</p>
    </div>
    <!-- Tombol untuk menghapus item dari keranjang -->
    <button @click="$emit('remove-item', item.code)" class="remove-button">
      Remove
    </button>
  </div>
</template>

<script>
export default {
  // Mendeklarasikan properti yang diterima oleh komponen
  props: {
    // Properti 'item' adalah sebuah objek dan wajib disediakan
    item: {
      type: Object, // Tipe data properti
      required: true, // Wajib diisi
    },
  },
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.product-details {
  flex-grow: 1;
}

.remove-button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
