import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from "rxjs";
import { API_CONFIG } from "src/app/config/api.config";
import { Router, RouterOutlet } from "@angular/router";
import { Token } from "@angular/compiler";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: "root",
})

export class AuthService {
  private readonly tokenKey = "Token";
  private readonly roleKey = "userRole";
  private userDetailsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public userDetails$: Observable<any> = this.userDetailsSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private toastr: ToastrService 
  ) {}
  
  setUserDetails(userDetails: any): void {
    this.userDetailsSubject.next(userDetails);
  }

  login(email: string, password: string): Observable<any> {
    const userData = {
      email,
      password,
    };
    return this.http.post(`${API_CONFIG.baseUrl}login/`, userData).pipe(
      map((response: any) => {
        const userRole = response.user.rol.nombre;
        if (userRole === "Administrador" || userRole === "Community Manager") {
          this.setToken(response.token);
          this.setUserRole(userRole); 
          this.toastr.success('¡Bienvenido!', 'Inicio de sesión exitoso'); 
          return response;
        } else {
          this.toastr.warning('¡Rol no permitido!', 'Oops...'); 
          this.router.navigate(["/login"]);
        }
      }),
      catchError((error) => {
        this.toastr.error('¡Algo salió mal!', 'Oops...'); 
        throw error; 
      })
    );
  }

  // Método para almacenar el rol del usuario
  setUserRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }
  
  getUserData(): Observable<any> {
    const token = this.getToken();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http
      .get(`${API_CONFIG.baseUrl}user-details/`, { headers })
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        }),
        catchError((error) => {
          console.error("Error al obtener los datos del usuario", error);
          return error;
        })
      );
  }
  
  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `token ${token}`,
    });
    return this.http
      .post(`${API_CONFIG.baseUrl}logout/`, token, {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          this.removeToken();
          this.removeUserRole();
          console.log("Cierre de sesión exitoso");
          return response;
        }),
        catchError((error) => {
          console.error("Error al cerrar sesión", error);
          return error;
        }),
        finalize(() => {
          this.router.navigate(["/login"]);
        })
      );
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }
  
  removeUserRole() {
    localStorage.removeItem(this.roleKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }
  
  isUserAdmin(): boolean {
    const userRole = this.getUserRole();
    // Verificar si el rol del usuario es administrador
    return userRole === 'Administrador';
  }

}