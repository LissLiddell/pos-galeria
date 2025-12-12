import { SucursalRepository } from "../../Application/ports/SucursalRepository";

export class FakeSucursalRepository implements SucursalRepository {
  async sucursalPermiteVentas() {
    return true; // siempre permite ventas
  }
}