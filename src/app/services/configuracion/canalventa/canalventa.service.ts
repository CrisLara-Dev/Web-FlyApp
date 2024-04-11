import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanalventaService {

  constructor(private http: HttpClient , private authService: AuthService) { }

  listarCanal(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<any>(`${API_CONFIG.baseUrl}${API_CONFIG.canal}` , { headers })
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


  eliminarCanal(id: number): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}CanalVenta/${id}/`);
  }  

  crearCanal(canalData: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}CanalVenta/`, canalData);
  }

  obtenerCanal(id: number): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}CanalVenta/${id}/`);
  }

  editarCanal(id: number, datos: any): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}CanalVenta/${id}/`, datos);
  }

}
