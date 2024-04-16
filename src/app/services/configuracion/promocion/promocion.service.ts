import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { API_CONFIG } from 'src/app/config/api.config';
import Swal from 'sweetalert2';

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
  
          return this.http.delete<any>(`${this.apiUrl}${id}/` , { headers })
          .pipe(
              map((response: any) => {
                Swal.fire({
                  icon: "success",
                  title: "¡Muy bien!",
                  text: "Promoción eliminado con éxito",
                  showConfirmButton: false,
                  timer: 2500
                });
                return response;
              }),
              catchError((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ocurrió un error al eliminar la promoción.",
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

  crearPromocion(descuentoData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<any>(this.apiUrl, descuentoData, { headers })
    .pipe(
      map((response: any) => {
        Swal.fire({
          icon: "success",
          title: "¡Muy bien!",
          text: "Promoción añadido con éxito",
          showConfirmButton: false,
          timer: 2500
        });
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al añadir la promoción.",
          showConfirmButton: false,
          timer: 2500
        });
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
        Swal.fire({
          icon: "success",
          title: "¡Muy bien!",
          text: "Promoción editado con éxito",
          showConfirmButton: false,
          timer: 2500
        });
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al editar la promoción.",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }
}