<template>
  <div class="border-b pb-3 mb-3">
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <h3 class="font-medium">{{ item.name }}</h3>
        <p class="text-sm text-gray-500">Precio unitario: ${{ item.price.toFixed(2) }}</p>
      </div>
      <button 
        @click="$emit('remove-item', item.id)"
        class="text-danger hover:text-red-700"
      >
        <i class="fas fa-trash"></i>
      </button>
    </div>
    <div class="flex justify-between items-center mt-2">
      <div class="flex items-center border rounded-md">
        <button 
          @click="decreaseQuantity"
          class="px-3 py-1 border-r hover:bg-gray-100"
        >-</button>
        <input 
          type="text" 
          :value="item.quantity" 
          @input="updateQuantityInput"
          class="w-12 text-center py-1 focus:outline-none"
        >
        <button 
          @click="increaseQuantity"
          class="px-3 py-1 border-l hover:bg-gray-100"
        >+</button>
      </div>
      <p class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-quantity', 'remove-item'])

const decreaseQuantity = () => {
  emit('update-quantity', props.item.id, props.item.quantity - 1)
}

const increaseQuantity = () => {
  emit('update-quantity', props.item.id, props.item.quantity + 1)
}

const updateQuantityInput = (event) => {
  const newQuantity = parseInt(event.target.value) || 1
  emit('update-quantity', props.item.id, newQuantity)
}
</script>