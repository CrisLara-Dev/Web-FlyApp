import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TiposvuelosService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.vuelo}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  listarVuelos(): Observable<any> {
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
        console.error("Error al obtener los datos del vuelo", error);
        return error;
      })
    );

  }

  eliminarVuelos(id: number): Observable<any> {
    return new Observable(observer => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo"
      }).then((result) => {
        if (result.isConfirmed) {
          const token = this.authService.getToken();
          const headers = new HttpHeaders({
            Authorization: `token ${token}`,
          });
  
          this.http.delete<any>(`${this.apiUrl}${id}/`, { headers })
            .pipe(
              map((response: any) => {
                Swal.fire({
                  icon: "success",
                  title: "¡Muy bien!",
                  text: "Vuelo eliminado con éxito",
                  showConfirmButton: false,
                  timer: 2500
                });
                return response;
              }),
              catchError((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ocurrió un error al eliminar el vuelo.",
                  showConfirmButton: false,
                  timer: 2500
                });
                return throwError(error);
              })
            )
            .subscribe(() => {
              observer.next();
              observer.complete();
            });
        } else {
          observer.complete();
        }
      });
    });
  }
  

  crearVuelo(vueloData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<any>(this.apiUrl, vueloData, { headers })
    .pipe(
      map((response: any) => {
        Swal.fire({
          icon: "success",
          title: "¡Muy bien!",
          text: "Vuelo añadido con éxito",
          showConfirmButton: false,
          timer: 2500
        });
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al añadir el vuelo.",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }


  obtenerVuelo(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}${id}/`, { headers })
    .pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error("Error al obtener los datos del vuelo", error);
        return error;
      })
    );
  }

  editarVuelo(id: number, datos: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.put<any>(`${this.apiUrl}${id}/`,  datos, { headers })
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
          text: "Ocurrió un error al editar el vuelo.",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }
}
