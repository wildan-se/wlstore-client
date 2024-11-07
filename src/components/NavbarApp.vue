<template>
  <header id="app">
    <div class="nav">
      <h1>WLstore</h1>
      <nav>
        <RouterLink :to="{ name: 'index-product' }" id="products-link"
          >Product</RouterLink
        >
        <RouterLink :to="{ name: 'index-cart' }" id="cart-link">
          <button>Cart</button>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #41b883;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

a {
  color: white;
  font-size: 1.1em;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 15px;
  transition:
    color 0.3s ease,
    background-color 0.3s ease;
  border-radius: 6px;
}

#products-link:hover {
  background-color: #36a36c;
  color: #fff;
}

button {
  background-color: #36a36c;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  padding: 10px 20px;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

button:hover {
  background-color: #2f8f5d;
}

button:active {
  transform: scale(0.95);
}
</style>
