import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { API_CONFIG } from 'src/app/config/api.config';
import Swal from 'sweetalert2';
import { Promociones } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.promocion}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  listarPromocion(): Observable<Promociones[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<Promociones[]>(this.apiUrl , { headers })
    .pipe(
      catchError((error) => { 
        console.error("Error al obtener los datos de la promocion", error);
        return throwError(error);
      })
    );
  }

  eliminarPromocion(id: number): Observable<void> {
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
          return this.http.delete<void>(`${this.apiUrl}${id}/` , { headers })
          .pipe(
            catchError(error => {
              Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ocurrió un error al eliminar la promoción",
                  showConfirmButton: false,
                  timer: 2500
                });
                return throwError(error);
              }),
            ).subscribe(() => {
                Swal.fire({
                  icon: "success",
                  title: "¡Muy bien!",
                  text: "Promoción eliminado con éxito",
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

  crearPromocion(descuentoData: Promociones): Observable<Promociones> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<Promociones>(this.apiUrl, descuentoData, { headers })
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
          text: "Ocurrió un error al añadir la promoción",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }

  
  obtenerPromocion(id: number): Observable<Promociones> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<Promociones>(`${this.apiUrl}${id}/` , { headers })
    .pipe(
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al obtener los datos de la promoción",
          showConfirmButton: false,
          timer: 2500
        });
        return throwError(error);
      })
    );
  }

  editarPromocion(id: number, datos: Promociones): Observable<Promociones> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.put<Promociones>(`${this.apiUrl}${id}/` , datos, { headers })
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
          text: "Ocurrió un error al editar la promoción",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }
}