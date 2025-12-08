import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isPaymentModalOpen = ref(false)
  const isSuccessModalOpen = ref(false)
  const selectedPaymentMethod = ref('')

  // Productos de ejemplo
  const products = ref([
    {
      id: 1,
      name: 'Camiseta Básica',
      category: 'Ropa',
      description: 'Camiseta de algodón, varios colores',
      price: 19.99,
      categoryColor: 'blue'
    },
    {
      id: 2,
      name: 'Jeans Clásicos',
      category: 'Ropa',
      description: 'Jeans de mezclilla, corte recto',
      price: 39.99,
      categoryColor: 'blue'
    },
    {
      id: 3,
      name: 'Zapatillas Deportivas',
      category: 'Calzado',
      description: 'Zapatillas para running',
      price: 59.99,
      categoryColor: 'green'
    },
    {
      id: 4,
      name: 'Reloj Digital',
      category: 'Accesorios',
      description: 'Reloj resistente al agua',
      price: 29.99,
      categoryColor: 'purple'
    },
    {
      id: 5,
      name: 'Mochila',
      category: 'Accesorios',
      description: 'Mochila con compartimentos',
      price: 49.99,
      categoryColor: 'purple'
    },
    {
      id: 6,
      name: 'Sudadera con Capucha',
      category: 'Ropa',
      description: 'Sudadera de algodón',
      price: 45.99,
      categoryColor: 'blue'
    }
  ])

  // Computed
  const subtotal = computed(() => 
    items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  )
  
  const tax = computed(() => subtotal.value * 0.16)
  
  const total = computed(() => subtotal.value + tax.value)
  
  const cartItemsCount = computed(() => 
    items.value.reduce((count, item) => count + item.quantity, 0)
  )

  // Actions
  const addToCart = (product) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  const removeFromCart = (productId) => {
    items.value = items.value.filter(item => item.id !== productId)
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = newQuantity
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const processPayment = () => {
    // Simular procesamiento de pago
    setTimeout(() => {
      clearCart()
      isPaymentModalOpen.value = false
      isSuccessModalOpen.value = true
    }, 1000)
  }

  return {
    items,
    products,
    isPaymentModalOpen,
    isSuccessModalOpen,
    selectedPaymentMethod,
    subtotal,
    tax,
    total,
    cartItemsCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    processPayment
  }
})