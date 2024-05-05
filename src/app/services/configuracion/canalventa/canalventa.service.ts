import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Canales } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class CanalventaService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.canal}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  listarCanal(): Observable<Canales[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<Canales[]>(this.apiUrl , { headers })
    .pipe(
      catchError((error) => {
        console.error("Error al obtener los datos del canal", error);
        return throwError(error);
      })
    );
  }

  eliminarCanal(id: number): Observable<void> {
    return new Observable(observer => {
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
          return this.http.delete<void>(`${this.apiUrl}${id}/` , { headers })
          .pipe(
            catchError(error => {
              Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ocurrió un error al eliminar la canal",
                  showConfirmButton: false,
                  timer: 2500
                });
                return throwError(error);
              }),
            ).subscribe(() => {
              Swal.fire({
                  icon: "success",
                  title: "¡Muy bien!",
                  text: "Canal eliminado con éxito",
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

  crearCanal(canalData: Canales): Observable<Canales> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<Canales>(this.apiUrl , canalData,{ headers })
    .pipe(
      map((response: any) => {
        Swal.fire({
          icon: "success",
          title: "¡Muy bien!",
          text: "Canal añadido con éxito",
          showConfirmButton: false,
          timer: 2500
        });
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al añadir el canal",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }

  obtenerCanal(id: number): Observable<Canales> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<Canales>(`${this.apiUrl}${id}/` , { headers })
    .pipe(
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al obtener los datos del canal",
          showConfirmButton: false,
          timer: 2500
        });
        return throwError(error);
      })
    );
  }

  editarCanal(id: number, datos: Canales): Observable<Canales> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.put<Canales>(`${this.apiUrl}${id}/` , datos, { headers })
    .pipe(
      map((response: any) => {
        Swal.fire({
          icon: "success",
          title: "¡Muy bien!",
          text: "Canal editado con éxito",
          showConfirmButton: false,
          timer: 2500
        });
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al editar el canal",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }
}