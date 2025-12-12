// frontend/src/core/application/ports/VentaRepository.ts
export interface VentaRepository {
  guardarVenta(data: any): Promise<{ folio: string }>;
}