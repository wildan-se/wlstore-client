<template>
  <header>
    <div>
      <div id="page-wrap">
        <div id="grid-wrap">
          <div
            class="product-item"
            v-for="product in products"
            :key="product.id"
          >
            <img :src="product.imageUrl" alt="" class="product-image" />
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">Rp.{{ product.price }}</p>
            <RouterLink
              :to="{ name: 'detail-product', params: { id: product.id } }"
            >
              <button>Detail</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { products } from '../../data-seed'
export default {
  data() {
    return {
      products,
    }
  },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
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

.product-item {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 250px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-item:hover {
  transform: translateY(-10px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-name {
  margin: 10px 0 5px;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.product-price {
  margin: 5px 0 15px;
  font-size: 1em;
  color: #ff5722;
  font-weight: 600;
}

a {
  width: 100%;
  text-align: center;
  text-decoration: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #41b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #36a36c;
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
