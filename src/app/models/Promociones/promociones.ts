export interface Promociones {
    id?: number;
    codigo: string;
    fecha_fin: string;
    fecha_inicio: string;
    porcentaje: number;
    estado: boolean;
    numeroFila?: number; // Agregar la propiedad numeroFila
}
