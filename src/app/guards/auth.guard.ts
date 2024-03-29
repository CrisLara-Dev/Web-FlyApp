import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getUserRole(); // Obtener el rol del usuario
      if (userRole === "Administrador" || userRole === "Community Manager") {
        return true; // Permitir acceso para roles Administrador y Community Manager
      } else {
        this.router.navigate(["/login"]);
        return false; // Denegar acceso para otros roles
      }
    } else {
      this.router.navigate(["/login"]);
      return false; // Denegar acceso si no está autenticado
    }
  }
}
