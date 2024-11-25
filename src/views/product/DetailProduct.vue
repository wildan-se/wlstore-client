<template>
  <div class="container">
    <div id="page-wrap" v-if="product">
      <div id="img-wrap">
        <img
          :src="`http://localhost:8000${product.imageUrl}`"
          alt="Product Image"
        />
      </div>
      <div id="product-details">
        <h1>{{ product.name }}</h1>
        <h3 id="price">Rp{{ product.price }}</h3>
        <p class="rating">Average rating: {{ product.averageRating }}</p>
        <button id="add-to-cart">Add to Cart</button>
        <p class="description">
          {{ product.description }}
        </p>
      </div>
    </div>

    <NotFound v-else />
  </div>
</template>

<script>
import axios from 'axios'
import NotFound from '../error/404Page.vue'
export default {
  components: {
    NotFound,
  },
  data() {
    return {
      product: {},
    }
  },

  async created() {
    const code = this.$route.params.id
    const result = await axios.get(`http://localhost:8000/api/products/${code}`)
    this.product = result.data
  },
}
</script>

<style scoped>
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

img:hover {
  transform: scale(1.02);
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
</style>
