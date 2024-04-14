import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiposvuelosService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.vuelo}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  listarVuelos(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<any>(this.apiUrl , { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del vuelo", error);
        return error;
      })
    );

  }

  eliminarVuelos(id: number): Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.delete<any>(`${this.apiUrl}${id}/`, { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del vuelo", error);
        return error;
      })
    );

  }

  crearVuelo(vueloData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<any>(this.apiUrl, vueloData, { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del vuelo", error);
        return error;
      })
    );
  }


  obtenerVuelo(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}${id}/`, { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del vuelo", error);
        return error;
      })
    );
  }

  editarVuelo(id: number, datos: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.put<any>(`${this.apiUrl}${id}/`,  datos, { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del vuelo", error);
        return error;
      })
    );
  }
}
