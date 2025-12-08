<template>
  <div 
    v-if="isPaymentModalOpen"
    class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="closePaymentModal"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
      <div class="p-5 border-b">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold">Seleccionar método de pago</h3>
          <button 
            @click="closePaymentModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>
      <div class="p-5">
        <p class="text-gray-600 mb-2">Total a pagar: <span class="font-bold">${{ cartStore.total.toFixed(2) }}</span></p>
        
        <div class="grid grid-cols-2 gap-3 mt-4">
          <div 
            v-for="method in paymentMethods"
            :key="method.id"
            class="payment-option flex flex-col items-center p-4"
            :class="{ 'selected': selectedPaymentMethod === method.id }"
            @click="selectPaymentMethod(method.id)"
          >
            <i :class="method.icon, method.color" class="text-2xl mb-2"></i>
            <span>{{ method.name }}</span>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t">
          <button 
            @click="processPayment"
            :disabled="!selectedPaymentMethod"
            class="btn-success w-full py-3 rounded-md flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-check-circle mr-2"></i>
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { isPaymentModalOpen, total } = storeToRefs(cartStore)

const selectedPaymentMethod = ref('')
const paymentMethods = [
  { id: 'cash', name: 'Efectivo', icon: 'fas fa-money-bill-wave', color: 'text-green-600' },
  { id: 'card', name: 'Tarjeta', icon: 'fas fa-credit-card', color: 'text-blue-600' },
  { id: 'mobile', name: 'Pagos móviles', icon: 'fas fa-mobile-alt', color: 'text-purple-600' },
  { id: 'gift', name: 'Tarjeta regalo', icon: 'fas fa-gift', color: 'text-red-600' }
]

const selectPaymentMethod = (methodId) => {
  selectedPaymentMethod.value = methodId
}

const processPayment = () => {
  if (selectedPaymentMethod.value) {
    cartStore.processPayment()
    selectedPaymentMethod.value = ''
  }
}

const closePaymentModal = () => {
  cartStore.isPaymentModalOpen = false
  selectedPaymentMethod.value = ''
}
</script>