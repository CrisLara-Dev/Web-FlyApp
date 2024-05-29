import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getUserRole(); // Obtener el rol del usuario
      if (userRole === "Administrador" || userRole === "Community Manager") {
        const allowedRoles = route.data.allowedRoles as string[]; // Obtener los roles permitidos para esta ruta
        if (!allowedRoles || allowedRoles.includes(userRole)) {
          return true; // Permitir acceso si el usuario tiene el rol adecuado para esta ruta
        } else {
          return false;
        }
      } else {
        this.router.navigate(["/login"]);
        return false; // Denegar acceso si el usuario no es ni Administrador ni Community Manager
      }
    } else {
      this.router.navigate(["/login"]);
      return false; // Denegar acceso si no está autenticado
    }
  }
}
