// frontend/src/core/domain/Venta.ts
export class Venta {
  constructor(
    public total: number,
    public clienteElegible: boolean
  ) {}

  validarParaCredito() {
    if (!this.clienteElegible) {
      throw new Error('Cliente no elegible para crédito');
    }
    if (this.total <= 0) {
      throw new Error('Total inválido');
    }
  }
}