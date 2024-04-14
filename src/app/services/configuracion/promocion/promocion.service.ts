import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.promocion}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  listarPromocion(): Observable<any> {
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
        console.error("Error al obtener los datos de la promocion", error);
        return error;
      })
    );
  }

  eliminarPromocion(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.delete<any>(`${this.apiUrl}${id}/` , { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos de la promocion", error);
        return error;
      })
    );
  }

  crearPromocion(descuentoData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<any>(this.apiUrl, descuentoData, { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos de la promocion", error);
        return error;
      })
    );
  }

  obtenerPromocion(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}${id}/` , { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos de la promocion", error);
        return error;
      })
    );
  }

  editarPromocion(id: number, datos: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.put<any>(`${this.apiUrl}${id}/` , datos, { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos de la promocion", error);
        return error;
      })
    );
  }

}
