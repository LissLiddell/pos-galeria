import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  // 👉 Agregar producto al carrito
  const addItem = (product) => {
    const existing = items.value.find(i => i.id === product.id)

    if (existing) {
      existing.quantity++
    } else {
      items.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  // 👉 Quitar 1 unidad
  const decrementItem = (id) => {
    const item = items.value.find(i => i.id === id)
    if (!item) return

    if (item.quantity > 1) item.quantity--
    else items.value = items.value.filter(i => i.id !== id)
  }

  // 👉 Remover producto completamente
  const removeItem = (id) => {
    items.value = items.value.filter(i => i.id !== id)
  }

  // 👉 Vaciar carrito (importante para flujo de venta)
  const clearCart = () => {
    items.value = []
  }

  // 👉 Total calculado
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  return {
    items,
    addItem,
    decrementItem,
    removeItem,
    clearCart,
    total
  }
})
