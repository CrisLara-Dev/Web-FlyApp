import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanalventaService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.canal}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  listarCanal(): Observable<any> {
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
        console.error("Error al obtener los datos del canal", error);
        return error;
      })
    );
  }

  eliminarCanal(id: number): Observable<any> {
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
        console.error("Error al obtener los datos del canal", error);
        return error;
      })
    );
  }

  
  crearCanal(canalData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<any>(this.apiUrl , canalData,{ headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del canal", error);
        return error;
      })
    );
  }

  obtenerCanal(id: number): Observable<any> {
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
        console.error("Error al obtener los datos del canal", error);
        return error;
      })
    );
  }

  editarCanal(id: number, datos: any): Observable<any> {
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
        console.error("Error al obtener los datos del canal", error);
        return error;
      })
    );
  }


}
