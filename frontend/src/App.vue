<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <Header />
    
    <main class="flex flex-1 p-4 main-container overflow-hidden">
      <!-- Products Section -->
      <div class="w-1/2 pr-4 flex flex-col h-full md:w-7/12">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Productos</h2>
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Buscar productos..." 
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        
        <ProductList :products="filteredProducts" @add="cartStore.addItem"/>
      </div>
      
      <!-- Cart Section -->
       <Transition name="slide-fade">
          <div class="w-1/2 pl-4 flex flex-col h-full md:w-5/12" v-if="cartStore.items.length > 0">
            <Cart />
          </div>
       </Transition>      
    </main>
    
    <PaymentModal />
    <SuccessModal />
    
    <!-- Toast Notification -->
    <div 
      v-show="showToast" 
      style="margin-top: 60px;"
      class="toast fixed top-5 right-5 bg-success text-white p-4 rounded-lg shadow-lg z-50 transition-transform duration-300"
      :class="{ 'translate-x-0': showToast, 'translate-x-full': !showToast }"
    >
      <div class="flex items-center">
        <i class="fas fa-check-circle mr-2"></i>
        <span>¡Producto agregado al carrito!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCartStore } from './stores/cart'
import Header from './components/Header.vue'
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'
import PaymentModal from './components/PaymentModal.vue'
import SuccessModal from './components/SuccessModal.vue'
import { onMounted } from 'vue'

const cartStore = useCartStore()
const searchQuery = ref('')
const showToast = ref(false)

onMounted(() => {
  cartStore.cargarProductos()
})

const filteredProducts = computed(() => {
  if (!searchQuery.value) return cartStore.products
  
  return cartStore.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Watch for cart additions to show toast
watch(
  () => cartStore.items.length,
  (newCount, oldCount) => {
    if (newCount > oldCount) {
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    }
  }
)
</script>

<style scoped>
.main-container {
  height: calc(100vh - 80px);
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>