export interface Tipovuelos {
    id?: number;
    tipo : string;
    precio : number;
    tiempo: string;
    estado : boolean;
    numeroFila?: number; // Agregar la propiedad numeroFila
}