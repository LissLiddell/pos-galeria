import { InventarioRepository } from "../../Application/ports/InventarioRepository";

export class FakeInventarioRepository implements InventarioRepository {
  async verificarExistencias() {
    return true; // inventario siempre válido
  }
}