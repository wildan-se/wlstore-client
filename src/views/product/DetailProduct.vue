<template>
  <div class="container">
    <!-- Jika produk ditemukan -->
    <div id="page-wrap" v-if="product">
      <!-- Notifikasi pop-up -->

      <div class="container-popup">
        <transition name="fade">
          <h4 v-if="notif" class="notif">{{ notif }}</h4></transition
        >
      </div>

      <div id="img-wrap">
        <img
          :src="`http://localhost:8000${product.imageUrl}`"
          alt="Product Image"
          loading="lazy"
        />
      </div>
      <div id="product-details">
        <h1>{{ product.name }}</h1>
        <h3 id="price">Rp{{ product.price }}</h3>
        <p class="rating">Average rating: {{ product.averageRating }}</p>
        <!-- ketika tombol di klik, maka memanggil fungsi addToCart dan mengirimkan product.code dari API -->
        <button id="add-to-cart" @click="addToCart(product.code)">
          Add to Cart
        </button>
        <p class="description">
          {{ product.description }}
        </p>
      </div>
    </div>

    <!-- Jika produk tidak ditemukan -->
    <NotFound v-else />
  </div>
</template>

<script>
// Mengimpor library Axios untuk HTTP request
import axios from 'axios'
// Mengimpor komponen NotFound untuk halaman produk yang tidak ditemukan
import NotFound from '../error/404Page.vue'

export default {
  components: {
    NotFound, // Menambahkan komponen NotFound sebagai bagian dari komponen ini
  },
  data() {
    return {
      product: null, // Menyimpan data produk yang diambil dari API
      notif: null, // Menyimpan pesan notifikasi (sukses atau error)
    }
  },
  methods: {
    // Metode untuk menambahkan produk ke keranjang
    async addToCart(productCode) {
      try {
        // Mengirim permintaan POST ke API untuk menambahkan produk ke keranjang
        const response = await axios.post(
          'http://localhost:8000/api/orders/user/1/add',
          {
            product: productCode, // Mengirimkan kode produk sebagai data payload
          },
        )

        // Jika berhasil, tampilkan notifikasi sukses
        this.notif = 'Item added successfully!'
        setTimeout(() => {
          this.notif = null // Menghapus notifikasi setelah 3 detik
        }, 3000)

        console.log('Product added:', response.data)
      } catch (error) {
        // Jika gagal, tampilkan notifikasi error
        console.error('Failed to add product to cart:', error)
        this.notif = 'Failed to add item. Please try again.'
        setTimeout(() => {
          this.notif = null // Menghapus notifikasi setelah 3 detik
        }, 3000)
      }
    },
  },
  async created() {
    // Mengambil parameter ID produk dari URL
    const code = this.$route.params.id
    try {
      // Mengirim permintaan GET ke API untuk mendapatkan data produk berdasarkan ID
      const result = await axios.get(
        `http://localhost:8000/api/products/${code}`,
      )
      // Menyimpan data produk ke dalam variabel state `product`
      this.product = result.data
    } catch (error) {
      // Jika gagal mengambil data, tampilkan log error dan set product ke null
      console.error('Failed to fetch product data:', error)
      this.product = null
    }
  },
}
</script>

<style scoped>
/* Transisi untuk notifikasi */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Gaya kontainer dan elemen lainnya */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#page-wrap {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 30px;
  padding: 24px;
  max-width: 900px;
  background-color: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

#page-wrap:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

#img-wrap {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-right: 20px;
}

img {
  width: 100%;
  max-width: 400px;
  border-radius: 6px;
  transition: transform 0.3s ease;
}

#product-details {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-size: 1.8em;
  margin: 0 0 10px;
  color: #333;
}

#price {
  font-size: 1.4em;
  color: #e63946;
  margin: 8px 0;
}

.rating {
  color: #555;
  margin: 8px 0;
}

.description {
  color: #666;
  line-height: 1.6;
  margin-top: 20px;
}

#add-to-cart {
  background-color: #e63946;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  width: 100%;
}

#add-to-cart:hover {
  background-color: #d62828;
}

#add-to-cart:active {
  background-color: #c92a2a;
}

/* Gaya notifikasi */
.notif {
  position: fixed; /* Letakkan di tengah layar */
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999; /* Pastikan muncul di atas elemen lainnya */
  text-align: center;
  color: white;
  background-color: #41b883;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation:
    fadeIn 0.3s ease,
    fadeOut 0.3s ease 2.7s; /* Tambahkan efek animasi keluar */
}

/* Efek transisi */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animasi untuk notifikasi */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
