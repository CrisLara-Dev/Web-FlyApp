import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { Registrarse } from 'src/app/models';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.registrar}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  signup(registrarData: Registrarse): Observable<Registrarse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<Registrarse>(this.apiUrl, registrarData, { headers })
    .pipe(
      map((response: any) => {
        Swal.fire({
          icon: "success",
          title: "¡Muy bien!",
          text: "Usuario añadido con éxito",
          showConfirmButton: false,
          timer: 2500
        });
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al añadir el usuario",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }
}
