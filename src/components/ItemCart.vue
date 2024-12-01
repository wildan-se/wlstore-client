<template>
  <div class="cart-item">
    <img
      :src="`http://localhost:8000${item.imageUrl}`"
      alt="Product Image"
      loading="lazy"
      class="product-image"
    />
    <div class="product-details">
      <h4>{{ item.name }}</h4>
      <p>Rp. {{ parseFloat(item.price).toLocaleString('id-ID') }}</p>
    </div>
    <button @click="$emit('remove-item', item.code)" class="remove-button">
      Remove
    </button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
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
