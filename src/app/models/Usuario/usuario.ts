export interface Usuario {
    id?: number;
    email: string;
    is_active: boolean;
    persona?:{
        id: number;
        nombre: string; 
        apellido: string; 
        };
    rol?: {
        id: number;
        nombre: string;
        estado: boolean;
    };
    numeroFila?: number; // Agregar la propiedad numeroFila
}
