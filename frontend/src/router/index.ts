import { createRouter, createWebHistory } from 'vue-router'
import VentaCreditoView from '../views/VentaCredito.vue'

const routes = [
  {
    path: '/venta-credito-test',
    name: 'VentaCredito',
    component: VentaCreditoView
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
