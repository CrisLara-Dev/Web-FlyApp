export interface Paquete {

  id?: number;
  codigo: string;
  estado: boolean;
  pago_inicial?: number;
  pago_faltante?: number;
  costo_total?: number;
  url_pago?: string;
  url_pago_reserva?: string;
  comision?: number;
  descuento?: number;
  Usuario: number;
  CanalVenta?: number;
  Reserva?: number[];
  TipoPago?: number[];
}
