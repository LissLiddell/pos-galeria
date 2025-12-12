export interface InventarioRepository {
  verificarExistencias(productos: Array<{id: string, cantidad: number}>): Promise<boolean>;
}