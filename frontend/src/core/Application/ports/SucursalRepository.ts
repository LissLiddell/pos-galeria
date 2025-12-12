export interface SucursalRepository {
  sucursalPermiteVentas(sucursalId: string): Promise<boolean>;
}