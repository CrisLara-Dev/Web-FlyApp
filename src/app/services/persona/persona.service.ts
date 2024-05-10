import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthService } from '../auth/auth.service';
import { Persona } from 'src/app/models/Persona/persona.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.persona}`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  listarPersonas(): Observable<Persona[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<Persona[]>(this.apiUrl , { headers })
    .pipe(
      catchError((error) => {
        console.error("Error al obtener los datos de la persona", error);
        return throwError(error);
      })
    );
  }

  eliminarPersonas(id: number): Observable<void> {
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
                text: "Ocurrió un error al eliminar a la persona",
                showConfirmButton: false,
                timer: 2500
              });
              return throwError(error);
            })
          ).subscribe(() => {
            Swal.fire({
              icon: "success",
              title: "¡Muy bien!",
              text: "Persona eliminada con éxito",
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
  
  crearPersona(personaData: Persona): Observable<Persona> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.post<Persona>(this.apiUrl, personaData, { headers })
    .pipe(
      map((response: any) => {
        Swal.fire({
          icon: "success",
          title: "¡Muy bien!",
          text: "Persona añadida con éxito",
          showConfirmButton: false,
          timer: 2500
        });
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al añadir a la persona",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }

  obtenerPersona(id: number): Observable<Persona> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.get<Persona>(`${this.apiUrl}${id}/`, { headers })
    .pipe(
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al obtener los datos de la persona",
          showConfirmButton: false,
          timer: 2500
        });
        return throwError(error);
      })
    );
  }

  editarPersona(id: number, datos: Persona): Observable<Persona> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http.put<Persona>(`${this.apiUrl}${id}/`,  datos, { headers })
    .pipe(
      map((response: any) => {
        Swal.fire({
          icon: "success",
          title: "¡Muy bien!",
          text: "Persona editado con éxito",
          showConfirmButton: false,
          timer: 2500
        });
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al editar a la persona",
          showConfirmButton: false,
          timer: 2500
        });
        return error;
      })
    );
  }
}