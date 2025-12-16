<template>
  <div class="bg-white rounded-lg shadow-md p-4 flex-1 flex flex-col">
    <h2 class="text-xl font-semibold mb-4 flex items-center">
      <i class="fas fa-shopping-cart mr-2 text-primary"></i>
      Carrito de Compra
      <span v-if="cartStore.cartItemsCount > 0" class="ml-2 bg-primary text-white text-sm px-2 py-1 rounded-full">
        {{ cartStore.cartItemsCount }}
      </span>
    </h2>
    
    <div class="cart-list flex-1 overflow-y-auto">
      <CartItem 
        v-for="item in cartStore.items"
        :key="item.id"
        :item="item"
        @update-quantity="onUpdateQuantity"
        @remove-item="cartStore.removeItem"
      />
      
      <!-- Empty cart message -->
      <div 
        v-if="cartStore.items.length === 0"
        class="flex flex-col items-center justify-center text-center p-6"
      >
        <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-3"></i>
        <p class="text-gray-500">El carrito está vacío</p>
        <p class="text-sm text-gray-400 mt-1">Agregue productos desde la lista para comenzar</p>
      </div>
    </div>
    
    <!-- Cart Summary -->
    <div v-if="cartStore.items.length > 0" class="mt-4 pt-4 border-t">
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Subtotal:</span>
        <span class="font-medium">${{ cartStore.subtotal.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between mb-4">
        <span class="text-gray-600">IVA (16%):</span>
        <span class="font-medium">${{ cartStore.tax.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-lg font-bold mb-6">
        <span>Total:</span>
        <span>${{ cartStore.total.toFixed(2) }}</span>
      </div>
      
      <div class="flex space-x-4">
        <button 
          @click="cartStore.clearCart"
          class="flex-1 btn-danger py-2 rounded-md flex justify-center items-center"
        >
          <i class="fas fa-times mr-2"></i>
          Cancelar
        </button>
        <button 
          type="button"
          @click="cobrarContado"
          :disabled="loading"
          class="flex-1 btn-success py-2 rounded-md flex justify-center items-center disabled:opacity-50"
        >
          <i class="fas fa-cash-register mr-2"></i>
          {{ loading ? 'Procesando...' : 'Cobrar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import CartItem from './CartItem.vue'
import { ref } from 'vue'

import { ProcesarVentaContado } from '../core/Application/use-cases/ProcesarVentaContado'
import { FakeVentaRepository } from '../core/infrastructure/repositories/FakeVentaRepository'
import { FakeInventarioRepository } from '../core/infrastructure/repositories/FakeInventarioRepository'
import { FakeSucursalRepository } from '../core/infrastructure/repositories/FakeSucursalRepository'

const cartStore = useCartStore()
const loading = ref(false)
const errorMessage = ref('')

const onUpdateQuantity = (id, newQuantity) => {
  const item = cartStore.items.find(i => i.id === id)
  if (!item) return

  if (newQuantity <= 0) {
    cartStore.removeItem(id)
    return
  }

  while (item.quantity < newQuantity) {
    cartStore.addItem(item)
  }

  while (item.quantity > newQuantity) {
    cartStore.decrementItem(id)
  }
}
const procesarVenta = new ProcesarVentaContado(
  new FakeVentaRepository(),
  new FakeInventarioRepository(),
  new FakeSucursalRepository()
)

const cobrarContado = async () => {
  console.log('cartStore.items.length', cartStore.items.length);
  
  if (cartStore.items.length === 0) return

  console.log('cartStore.items.length despues de length', cartStore.items.length);
  loading.value = true
  errorMessage.value = ''

  try {
    const result = await procesarVenta.ejecutar({
      productos: cartStore.items.map(item => ({
        id: item.id,
        cantidad: item.quantity
      })),
      precioTotal: cartStore.total,
      sucursalId: 'SUC-01',
      usuarioId: 'USER-01',
      formaPago: 'EFECTIVO'
    })

    console.log('result', result);
    

    alert(`✅ Venta realizada\nFolio: ${result.folio}`)
    cartStore.clearCart()
  } catch (err) {
    console.error('❌ ERROR EN VENTA:', err)
    errorMessage.value = err.message || 'Error al procesar la venta'
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
.cart-list {
  height: calc(100vh - 310px);
}
</style>