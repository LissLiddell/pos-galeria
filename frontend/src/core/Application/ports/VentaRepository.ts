// frontend/src/core/application/ports/VentaRepository.ts
import { Venta } from '../../domain/Venta';

export interface VentaRepository {
  guardar(venta: Venta): Promise<void>;
}