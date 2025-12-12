import { VentaRepository } from "../ports/VentaRepository";
import { InventarioRepository } from "../ports/InventarioRepository";
import { SucursalRepository } from "../ports/SucursalRepository";

export class ProcesarVentaContado {
  constructor(
    private ventaRepo: VentaRepository,
    private inventarioRepo: InventarioRepository,
    private sucursalRepo: SucursalRepository
  ) {}

  async ejecutar(datos: {
    productos: Array<{ id: string; cantidad: number }>;
    precioTotal: number;
    sucursalId: string;
    usuarioId: string;
    formaPago: string;
  }) {
    // 1️⃣ Validar productos
    if (!datos.productos || datos.productos.length === 0) {
      throw new Error("No hay productos en el carrito");
    }

    // 2️⃣ Validar sucursal
    const sucursalOk = await this.sucursalRepo.sucursalPermiteVentas(datos.sucursalId);
    if (!sucursalOk) throw new Error("La sucursal no permite ventas");

    // 3️⃣ Validar inventario
    const inventarioOk = await this.inventarioRepo.verificarExistencias(datos.productos);
    if (!inventarioOk) throw new Error("No hay existencias suficientes");

    // 4️⃣ Validar forma de pago
    if (!["EFECTIVO", "TARJETA", "TRANSFERENCIA"].includes(datos.formaPago)) {
      throw new Error("Tipo de pago inválido");
    }

    // 5️⃣ Guardar venta
    const respuesta = await this.ventaRepo.guardarVenta(datos);

    return {
      ok: true,
      folio: respuesta.folio,
      mensaje: "Venta realizada correctamente",
    };
  }
}
