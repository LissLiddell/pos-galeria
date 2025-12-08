// frontend/src/core/application/use-cases/RegistrarVentaCredito.ts
import { Venta } from '../../domain/Venta';
import { VentaRepository } from '../ports/VentaRepository';

export class RegistrarVentaCredito {
  constructor(private ventaRepo: VentaRepository) {}

  async execute(venta: Venta): Promise<void> {
    // Dominio decide
    venta.validarParaCredito();

    // Aplicación orquesta
    await this.ventaRepo.guardar(venta);
  }
}