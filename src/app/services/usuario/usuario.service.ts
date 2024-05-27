import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Usuario } from 'src/app/models';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.usuario}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  listarUsuarios(): Observable<Usuario[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<Usuario[]>(this.apiUrl , { headers })
    .pipe(
      catchError((error) => {
        console.error("Error al obtener los datos del usuario", error);
        return throwError(error);
      })
    );
  }

  eliminarUsuarios(id: number): Observable<void> {
    return new Observable<void>(observer => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar" 
      }).then((result) => {
        if (result.isConfirmed) {
          const token = this.authService.getToken();
          const headers = new HttpHeaders({
            Authorization: `token ${token}`,
          });
          this.http.delete<void>(`${this.apiUrl}${id}/`, { headers })
          .pipe(
            catchError(error => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrió un error al eliminar el usuario",
                showConfirmButton: false,
                timer: 2500
              });
              return throwError(error);
            })
          ).subscribe(() => {
            Swal.fire({
              icon: "success",
              title: "¡Muy bien!",
              text: "Usuario eliminado con éxito",
              showConfirmButton: false,
              timer: 2500
            });
            observer.next();
            observer.complete();
          });
        } else {
          observer.complete();
        }
      });
    });
  }
  
  crearUsuario(usuarioData: Usuario): Observable<Usuario> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<Usuario>(this.apiUrl, usuarioData, { headers })
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

  obtenerUsuario(id: number): Observable<Usuario> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<Usuario>(`${this.apiUrl}${id}/`, { headers })
    .pipe(
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al obtener los datos del usuario",
          showConfirmButton: false,
          timer: 2500
        });
        return throwError(error);
      })
    );
  }

  editarUsuario(id: number, datos: Usuario): Observable<Usuario> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.put<Usuario>(`${this.apiUrl}${id}/`,  datos, { headers })
    .pipe(
      map((response: any) => {
        Swal.fire({
          icon: "success",
          title: "¡Muy bien!",
          text: "Usuario editado con éxito",
          showConfirmButton: false,
          timer: 2500
        });
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al editar el usuario",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }
}