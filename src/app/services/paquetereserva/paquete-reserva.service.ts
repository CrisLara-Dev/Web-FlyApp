import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Paquete } from 'src/app/models/paquetereserva/Paquete';

@Injectable({
  providedIn: 'root'
})
export class PaqueteReservaService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.paquete}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  getAllPaquetes(): Observable<Paquete[]> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `token ${token}`,
    };
    return this.http.get<Paquete[]>(this.apiUrl , { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos Paquete", error);
        return error;
      })
    );
  }

  getPaqueteById(id: number): Observable<Paquete> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `token ${token}`,
    };
    return this.http.get<Paquete>(`${this.apiUrl}${id}/` , { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del Paquete", error);
        return error;
      })
    );
  }

  createPaquete(paquete: Paquete): Observable<Paquete> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `token ${token}`,
    };
    return this.http.post<Paquete>(this.apiUrl, paquete , { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al crear el Paquete", error);
        return error;
      })
    );
  }

  updatePaquete(paquete: Paquete): Observable<Paquete> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `token ${token}`,
    };
    return this.http.put<Paquete>(`${this.apiUrl}${paquete.id}/`, paquete , { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al actualizar el Paquete", error);
        return error;
      })
    );
  }

  deletePaquete(id: number): Observable<void> {
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
        console.error("Error al eliminar el Paquete", error);
        return error;
      })
    );
  }
}