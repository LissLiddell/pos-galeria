// frontend/src/core/infrastructure/repositories/FakeVentaRepository.ts
import { VentaRepository } from '../../Application/ports/VentaRepository';
import { Venta } from '../../domain/Venta';

export class FakeVentaRepository implements VentaRepository {
  async guardarVenta(data) {
      console.log('🧪 Guardando venta FAKE:', data)

      return {
        folio: 'FAKE-VENTA-001'
      }
    }
}