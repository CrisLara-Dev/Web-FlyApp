import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable, catchError, map } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TipospagoService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.pago}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  listarTiposPago(): Observable<any> {
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
        console.error("Error al obtener los datos del tipo de pago", error);
        return error;
      })
    );

  }
}
