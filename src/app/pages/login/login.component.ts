import { Component, OnInit, OnDestroy } from "@angular/core";
import { Validators } from "@angular/forms";
import { error } from "console";
import { verify } from "crypto";
import { AuthService } from "src/app/services/auth/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  passwordType: string = "password";
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  ngOnDestroy() {}

  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
  }
  login(): void {
    // Lógica de inicio de sesión
    this.authService
      .login(this.email, this.password)
      .subscribe((Response) => {});
  }
}
