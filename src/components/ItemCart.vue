<template>
  <div class="product-container">
    <img
      :src="`http://localhost:8000${item.imageUrl}`"
      alt="Product Image"
      class="product-image"
      loading="lazy"
    />
    <div class="details-wrap">
      <h3>{{ item.name }}</h3>
      <p>Rp.{{ item.price }}</p>
    </div>
    <button class="remove-button" @click="$emit('remove-item', item.code)">
      Remove
    </button>
  </div>
</template>
<script>
export default {
  props: ['item'],
}
</script>
<style scoped>
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
</style>
