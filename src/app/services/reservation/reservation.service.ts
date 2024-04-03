import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Agrega esta línea para importar Observable
import { API_CONFIG } from '../..//config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  // Método para crear una nueva reserva
  crearReserva(nuevaReserva: any) {
    return this.http.post(`${API_CONFIG.baseUrl}Reserva/`, nuevaReserva);
  }

  // Método para crear una nueva persona
  createPerson(personData: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}Persona/`, personData);
  }
}
