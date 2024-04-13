import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs'; // Agrega esta línea para importar Observable
import { API_CONFIG } from '../..//config/api.config';
import { Reserva } from 'src/app/models/reserva/reserva.model';
import { Persona } from 'src/app/models/persona/persona.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.reserva}`;

  constructor(private http: HttpClient , private authService: AuthService) { }

  // Método para crear una nueva reserva

  getAllReservas(): Observable<Reserva[]> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `token ${token}`,
    };
    return this.http.get<Reserva[]>(this.apiUrl , { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos Reserva", error);
        return error;
      })
    
    );
  }

  getReservaById(id: number): Observable<Reserva> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `token ${token}`,
    };
    return this.http.get<Reserva>(`${this.apiUrl}${id}/` , { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos Reserva", error);
        return error;
      })
    );
  }

  createReserva(reserva: Reserva): Observable<Reserva> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `token ${token}`,
    };
    return this.http.post<Reserva>(this.apiUrl, reserva , { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos Reserva", error);
        return error;
      })
    );
  }

  updateReserva(reserva: Reserva): Observable<Reserva> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `token ${token}`,
    };
    return this.http.put<Reserva>(`${this.apiUrl}${reserva.id}/`, reserva , { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos Reserva", error);
        return error;
      })
    );
  }

  deleteReserva(id: number): Observable<void> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `token ${token}`,
    };
    return this.http.delete<void>(`${this.apiUrl}${id}/` , { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos Reserva", error);
        return error;
      })
    );
  }



  // Método para crear una nueva persona
  createPerson(personData: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}Persona/`, personData);
  }
}
