import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  email: string;
  password: string;
  passwordType: string = "password";
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
  }

  login(): void {
    this.authService
      .login(this.email, this.password)
      .subscribe(
        (response) => {
          // Éxito de inicio de sesión
          this.router.navigate(["/dashboard"]); // Redirigir al dashboard
          Swal.fire({
            icon: "success",
            title: "¡Bienvenido!",
            text: "Vuelo añadido con éxito",
            showConfirmButton: false,
            timer: 2500
          });
        },
        (error) => {
          this.errorMessage = error; // Mostrar mensaje de error al usuario
          
        }
      );
  }
}
