<template>
  <div class="bg-white rounded-lg shadow-md p-4 flex-1 flex flex-col">
    <h2 class="text-xl font-semibold mb-4 flex items-center">
      <i class="fas fa-shopping-cart mr-2 text-primary"></i>
      Carrito de Compra
      <span v-if="cartItemsCount > 0" class="ml-2 bg-primary text-white text-sm px-2 py-1 rounded-full">
        {{ cartItemsCount }}
      </span>
    </h2>
    
    <div class="cart-list flex-1 overflow-y-auto">
      <CartItem 
        v-for="item in items"
        :key="item.id"
        :item="item"
        @update-quantity="updateQuantity"
        @remove-item="removeFromCart"
      />
      
      <!-- Empty cart message -->
      <div 
        v-if="items.length === 0"
        class="flex flex-col items-center justify-center text-center p-6"
      >
        <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-3"></i>
        <p class="text-gray-500">El carrito está vacío</p>
        <p class="text-sm text-gray-400 mt-1">Agregue productos desde la lista para comenzar</p>
      </div>
    </div>
    
    <!-- Cart Summary -->
    <div v-if="items.length > 0" class="mt-4 pt-4 border-t">
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Subtotal:</span>
        <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between mb-4">
        <span class="text-gray-600">IVA (16%):</span>
        <span class="font-medium">${{ tax.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-lg font-bold mb-6">
        <span>Total:</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
      
      <div class="flex space-x-4">
        <button 
          @click="clearCart"
          class="flex-1 btn-danger py-2 rounded-md flex justify-center items-center"
        >
          <i class="fas fa-times mr-2"></i>
          Cancelar
        </button>
        <button 
          @click="openPaymentModal"
          class="flex-1 btn-success py-2 rounded-md flex justify-center items-center"
        >
          <i class="fas fa-cash-register mr-2"></i>
          Cobrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import CartItem from './CartItem.vue'

const cartStore = useCartStore()
const { 
  items, 
  subtotal, 
  tax, 
  total, 
  cartItemsCount,
  clearCart,
  removeFromCart,
  updateQuantity 
} = cartStore

const openPaymentModal = () => {
  cartStore.isPaymentModalOpen = true
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 310px);
}
</style>