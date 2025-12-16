// frontend/src/core/application/ports/VentaRepository.ts
export interface VentaRepository {
  guardarVenta(data: Venta): Promise<{ folio: string }>;
}