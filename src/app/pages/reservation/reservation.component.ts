import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  public focus;
  public isAdmin: boolean = false; // Variable para verificar si el usuario es administrador

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Obtener información del usuario al inicializar el componente
    this.isAdmin = this.authService.isUserAdmin(); // Método para verificar si el usuario es administrador
  }
}
