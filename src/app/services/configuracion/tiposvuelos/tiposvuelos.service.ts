import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Tipovuelos } from '../../../models/index';

@Injectable({
  providedIn: 'root'
})
export class TiposvuelosService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.vuelo}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  listarVuelos(): Observable<Tipovuelos[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<Tipovuelos[]>(this.apiUrl , { headers })
    .pipe(
      catchError((error) => {
        console.error("Error al obtener los datos del tipo de vuelo", error);
        return throwError(error);
      })
    );
  }

  eliminarVuelos(id: number): Observable<void> {
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
                text: "Ocurrió un error al eliminar el tipo de vuelo",
                showConfirmButton: false,
                timer: 2500
              });
              return throwError(error);
            })
          ).subscribe(() => {
            Swal.fire({
              icon: "success",
              title: "¡Muy bien!",
              text: "Tipo de Vuelo eliminado con éxito",
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
  
  crearVuelo(vueloData: Tipovuelos): Observable<Tipovuelos> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<Tipovuelos>(this.apiUrl, vueloData, { headers })
    .pipe(
      map((response: any) => {
        Swal.fire({
          icon: "success",
          title: "¡Muy bien!",
          text: "Tipo de Vuelo añadido con éxito",
          showConfirmButton: false,
          timer: 2500
        });
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al añadir el tipo de vuelo",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }

  obtenerVuelo(id: number): Observable<Tipovuelos> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<Tipovuelos>(`${this.apiUrl}${id}/`, { headers })
    .pipe(
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al obtener los datos del tipo de vuelo",
          showConfirmButton: false,
          timer: 2500
        });
        return throwError(error);
      })
    );
  }

  editarVuelo(id: number, datos: Tipovuelos): Observable<Tipovuelos> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.put<Tipovuelos>(`${this.apiUrl}${id}/`,  datos, { headers })
    .pipe(
      map((response: any) => {
        Swal.fire({
          icon: "success",
          title: "¡Muy bien!",
          text: "Vuelo editado con éxito",
          showConfirmButton: false,
          timer: 2500
        });
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al editar el tipo de vuelo",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }
}