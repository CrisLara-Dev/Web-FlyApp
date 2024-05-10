import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs'; // Agrega esta línea para importar Observable
import { API_CONFIG } from '../..//config/api.config';
import { Reserva } from 'src/app/models/reserva/reserva.model';
import { Persona } from 'src/app/models/Persona/persona.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.reserva}`;

  constructor(
    private http: HttpClient , 
    private authService: AuthService
  ) { }

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

    // Formatea la fecha de reserva antes de enviarla
    const fechaReserva = new Date(reserva.fecha_reserva);
    const formattedDate = fechaReserva.toISOString().split('.')[0].slice(0, -3); // Elimina los milisegundos, la zona horaria y los segundos
    reserva.fecha_reserva = formattedDate;

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
  
  getFilteredReservas(userId: number): Observable<Reserva[]> {
    const token = this.authService.getToken();
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `token ${token}`
    };
    return this.http.get<Reserva[]>(`${this.apiUrl}`, { headers }).pipe(
      map((reservas: Reserva[]) => {
        return reservas.filter(reserva =>
          !reserva.persona.estado &&
          !reserva.persona.trabajador &&
          !reserva.estado &&
          reserva.Usuario == userId
        );
      }),
      catchError((error) => {
        console.error('Error al obtener las reservas', error);
        return throwError(error);
      })
    );
  }

  // PATCH para cambiar el estado de la reserva a true
  updateEstadoReserva(reserva: Reserva): Observable<Reserva> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `token ${token}`,
    };
    return this.http.patch<Reserva>(`${this.apiUrl}${reserva.id}/`, reserva , { headers }).pipe(
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
}