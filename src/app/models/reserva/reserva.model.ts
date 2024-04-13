import { Persona } from '../persona/persona.model';

export interface Reserva {
    id?: number;
    Vuelo: number;
    fecha_reserva: string;
    persona: Persona;
    foto_terminos: string;
    estado: boolean;
    enlace_video: string;
    Usuario: number;
    Piloto: number;
    fecha_vuelo: string;
    precio: string;
}