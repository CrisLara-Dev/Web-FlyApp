import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'jwtToken';
  private readonly roleKey = 'userRole';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>('https://django-rest-starter-zyi6-production.up.railway.app/api/login/', credentials);
  }

  logout() {
    // Eliminar token y limpiar cookies u otros datos de sesión
    this.cookieService.delete(this.tokenKey);
    this.cookieService.delete(this.roleKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  getToken(): string | null {
    return this.cookieService.get(this.tokenKey);
  }

  setToken(token: string) {
    this.cookieService.set(this.tokenKey, token);
  }

  getUserRole(): string | null {
    return this.cookieService.get(this.roleKey);
  }

  setUserRole(role: string) {
    this.cookieService.set(this.roleKey, role);
  }
}
