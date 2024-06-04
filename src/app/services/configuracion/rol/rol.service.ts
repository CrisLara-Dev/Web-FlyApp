import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthService } from '../../auth/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Roles } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.rol}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  listarVuelos(): Observable<Roles[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<Roles[]>(this.apiUrl , { headers })
    .pipe(
      catchError((error) => {
        console.error("Error al obtener los datos del tipo de vuelo", error);
        return throwError(error);
      })
    );
  }

}
