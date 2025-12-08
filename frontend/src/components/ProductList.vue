<template>
  <div class="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
    <ProductCard 
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const { addToCart } = cartStore

defineProps({
  products: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.product-list {
  height: calc(100vh - 210px);
}
</style>