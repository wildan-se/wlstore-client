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
import { products } from '../../data-seed'
import ProductItem from '../../components/ProductItem.vue'
export default {
  components: {
    ProductItem,
  },
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
