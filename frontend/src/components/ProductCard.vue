<template>
  <div class="card p-4">
    <div class="flex justify-between items-start mb-3">
      <h3 class="font-medium">{{ product.name }}</h3>
      <span 
        class="text-xs font-semibold px-2 py-1 rounded"
        :class="categoryColor"
      >
        {{ product.category }}
      </span>
    </div>
    <p class="text-gray-500 text-sm mb-2">{{ product.description }}</p>
    <div class="flex justify-between items-center mt-3">
      <p class="text-lg font-semibold">${{ product.price.toFixed(2) }}</p>
      <button 
        @click="$emit('add-to-cart', product)"
        class="btn-primary rounded-md px-3 py-1 flex items-center"
      >
        <i class="fas fa-cart-plus mr-1"></i> Agregar
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['add-to-cart'])

const categoryColor = computed(() => {
  const colors = {
    'Ropa': 'bg-blue-100 text-blue-800',
    'Calzado': 'bg-green-100 text-green-800',
    'Accesorios': 'bg-purple-100 text-purple-800'
  }
  return colors[props.product.category] || 'bg-gray-100 text-gray-800'
})
</script>