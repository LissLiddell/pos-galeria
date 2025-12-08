import { VentaRepository } from '../../Application/ports/VentaRepository'
import { Venta } from '../../../core/domain/Venta'

export class VentaApiRepository implements VentaRepository {
  async guardar(venta: Venta): Promise<void> {
    // Simulación de API real
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('🌐 Venta enviada a API (SIMULADA)', venta)

        // puedes simular error aquí:
        // reject(new Error('API no disponible'))

        resolve()
      }, 800)
    })
  }
}
