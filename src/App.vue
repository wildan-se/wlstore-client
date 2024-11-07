<script setup></script>

<template>
  <Navbar />
  <RouterView />
</template>

<script>
import Navbar from './components/NavbarApp.vue'
export default {
  components: {
    Navbar,
  },
}
</script>

<style></style>
