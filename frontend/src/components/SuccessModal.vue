<template>
  <div 
    v-if="isSuccessModalOpen"
    class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="closeSuccessModal"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
      <div class="p-5 flex flex-col items-center">
        <div class="bg-green-100 p-3 rounded-full mb-4">
          <i class="fas fa-check-circle text-green-500 text-4xl"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2">¡Pago realizado con éxito!</h3>
        <p class="text-gray-600 text-center mb-6">La venta ha sido procesada correctamente</p>
        
        <div class="flex flex-col w-full space-y-3">
          <button class="btn-primary py-2 rounded-md flex justify-center items-center">
            <i class="fas fa-print mr-2"></i>
            Ver recibo imprimible
          </button>
          <button class="btn-secondary py-2 rounded-md flex justify-center items-center">
            <i class="fas fa-file-pdf mr-2"></i>
            Descargar factura (PDF)
          </button>
          <button 
            @click="closeSuccessModal"
            class="mt-4 text-gray-600 hover:text-gray-800"
          >
            Cerrar y volver a la venta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { isSuccessModalOpen } = storeToRefs(cartStore)

const closeSuccessModal = () => {
  cartStore.isSuccessModalOpen = false
}
</script>