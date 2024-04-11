import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; // Agrega esta línea para importar HttpHeaders
import { Observable } from 'rxjs'; // Agrega esta línea para importar Observable
import { AuthService } from '../../auth/auth.service';
import { map, catchError } from 'rxjs/operators'; // Agrega estas líneas para importar map y catchError


@Injectable({
  providedIn: 'root'
})
export class TiposvuelosService {

  constructor(private http: HttpClient , private authService: AuthService) { }

  listarVuelos(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<any>(`${API_CONFIG.baseUrl}${API_CONFIG.vuelo}` , { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del usuario", error);
        return error;
      })
    );

  }

  eliminarVuelos(id: number): Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.delete<any>(`${API_CONFIG.baseUrl}${API_CONFIG.vuelo}${id}/`, { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del usuario", error);
        return error;
      })
    );

  }

  crearVuelo(vueloData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<any>(`${API_CONFIG.baseUrl}${API_CONFIG.vuelo}`, vueloData, { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del usuario", error);
        return error;
      })
    );
  }

  obtenerVuelo(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<any>(`${API_CONFIG.baseUrl}${API_CONFIG.vuelo}${id}/`, { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del usuario", error);
        return error;
      })
    );
  }

  editarVuelo(id: number, datos: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.put<any>(`${API_CONFIG.baseUrl}${API_CONFIG.vuelo}${id}/`,  datos, { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del usuario", error);
        return error;
      })
    );
  }
}
