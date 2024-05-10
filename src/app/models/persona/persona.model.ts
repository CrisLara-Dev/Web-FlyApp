export interface Persona {
    id?: number;
    nombre: string;
    apellido: string;
    foto_url?: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    documento_identidad: string;
    trabajador: boolean;
    estado: boolean;
    dni_nino?: string;
    nombre_nino?: string;
    tipo_documento: number;
    numeroFila?: number; // Agregar la propiedad numeroFila
}
