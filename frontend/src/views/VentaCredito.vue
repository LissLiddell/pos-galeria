<script setup lang="ts">
import { ref } from 'vue'
import { Venta } from '../core/domain/Venta'
import { RegistrarVentaCredito } from '../core/Application/use-cases/RegistrarVentaCredito'
import { FakeVentaRepository } from '../core/infrastructure/repositories/FakeVentaRepository'
import { VentaApiRepository } from '../core/infrastructure/repositories/VentaApiRepository'

const total = ref<number>(0)
const mensaje = ref<string>('')

const registrarVentaCredito = new RegistrarVentaCredito(
  new VentaApiRepository()
)

const ejecutarVenta = async () => {
  try {
    const venta = new Venta(total.value, true)
    await registrarVentaCredito.execute(venta)
    mensaje.value = '✅ Venta registrada'
  } catch (e: any) {
    mensaje.value = e.message
  }
}
</script>

<template>
  <div class="p-4 bg-slate-900 text-white rounded-lg max-w-sm">
    <input
      type="number"
      class="p-2 mb-3 w-full text-black rounded"
      placeholder="Total"
      @input="total = Number($event.target.value)"
    />

    <button
      class="w-full bg-purple-600 py-2 rounded hover:bg-purple-700"
      @click="ejecutarVenta"
    >
      Ejecutar Venta Crédito
    </button>

    <p v-if="mensaje" class="mt-3 text-center">
      {{ mensaje }}
    </p>
  </div>
</template>
