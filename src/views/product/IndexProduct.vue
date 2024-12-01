<template>
  <div>
    <div id="page-wrap">
      <div id="grid-wrap">
        <ProductItem
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
// Mengimpor Axios untuk melakukan HTTP request
import axios from 'axios'
// Mengimpor komponen ProductItem untuk menampilkan produk individual
import ProductItem from '../../components/ProductItem.vue'

export default {
  components: {
    ProductItem, // Mendaftarkan komponen ProductItem agar dapat digunakan dalam template
  },
  data() {
    return {
      products: [], // Menyimpan daftar produk yang diambil dari API
    }
  },
  async created() {
    // Lifecycle hook yang dipanggil ketika komponen dibuat
    try {
      // Mengirim permintaan GET ke API untuk mengambil daftar produk
      const result = await axios.get('http://localhost:8000/api/products')
      // Menyimpan data produk dari respons API ke dalam state lokal
      this.products = result.data
    } catch (error) {
      // Menangani kesalahan jika permintaan gagal
      console.error('Failed to fetch products:', error)
    }
  },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#page-wrap {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

#grid-wrap {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  margin-top: 16px;
}

@media (max-width: 768px) {
  #page-wrap {
    padding: 10px;
  }
}

@media (max-width: 600px) {
  #grid-wrap {
    grid-template-columns: 1fr;
  }
}
</style>
