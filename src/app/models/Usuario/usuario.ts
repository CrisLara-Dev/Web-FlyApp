export interface Usuario {
    id?: number;
    email: string;
    is_active: boolean;
    rol?: number
    numeroFila?: number; // Agregar la propiedad numeroFila
}
