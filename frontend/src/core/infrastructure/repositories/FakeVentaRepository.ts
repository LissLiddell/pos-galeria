// frontend/src/core/infrastructure/repositories/FakeVentaRepository.ts
import { VentaRepository } from '../../Application/ports/VentaRepository';
import { Venta } from '../../domain/Venta';

export class FakeVentaRepository implements VentaRepository {
  async guardar(venta: Venta): Promise<void> {
    console.log('✅ Venta guardada (FAKE):', venta);
  }
}