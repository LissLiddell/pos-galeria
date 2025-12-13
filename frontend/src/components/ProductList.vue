<template>
  <div v-for="product in products" :key="product.id">
    <p>{{ product.name }} - ${{ product.price }}</p>
    <button @click="$emit('add', product)">Agregar</button>
  </div>
</template>

<script setup>
defineProps({
  products: Array
})
</script>

<style scoped>
.product-list {
  height: calc(100vh - 210px);
}
</style>