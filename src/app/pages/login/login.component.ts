import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  email: string;
  password: string;
  passwordType: string = "password";
  errorMessage: string = "";

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
  }

  login(): void {
    this.errorMessage = ""; // Restablecer el mensaje de error

    this.authService
      .login(this.email, this.password)
      .subscribe(
        (response) => {
          this.router.navigate(["/dashboard"]);
        },
        (error) => {
          this.errorMessage = "Por favor, verifica tu correo electrónico y contraseña."; 
        }
      );
  }
}
