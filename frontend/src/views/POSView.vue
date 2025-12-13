<template>
  <div v-for="product in cart.products" :key="product.id">
  <p>{{ product.name }} - ${{ product.price }}</p>
  <button @click="cart.addItem(product)">
    Agregar
  </button>
</div>
      <button 
      @click="comprar"
      class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mt-4"
    >
      Comprar
    </button>
</template>

<script setup>
import { ProcesarVentaContado } from "@/core/Application/use-cases/ProcesarVentaContado";
import { FakeVentaRepository } from "@/core/infrastructure/repositories/FakeVentaRepository";
import { FakeInventarioRepository } from "@/core/infrastructure/repositories/FakeInventarioRepository";
import { FakeSucursalRepository } from "@/core/infrastructure/repositories/FakeSucursalRepository";
import { useCartStore } from "@/stores/cart";
import { onMounted } from "vue";

const cart = useCartStore();

onMounted(() => {
  cart.cargarProductos();
});

const useCase = new ProcesarVentaContado(
  new FakeVentaRepository(),
  new FakeInventarioRepository(),
  new FakeSucursalRepository()
);

async function comprar() {
  try {
    const resultado = await useCase.ejecutar({
      productos: cart.items,
      precioTotal: cart.total,
      sucursalId: "SUC-01",    // valor fijo para demo
      usuarioId: "USER-99",     // valor fijo para demo
      formaPago: "EFECTIVO",    // luego esto será configurable
    });

    alert(resultado.mensaje + "\nFolio: " + resultado.folio);
    cart.clear();
  } catch (err: any) {
    alert("Error: " + err.message);
  }
}

</script>

<style scoped>

</style>