import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PersonaService } from 'src/app/services/persona/persona.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public userDetails: any;
  persona: Persona | null = null; // Cambiar el tipo de datos a Persona | null
  modalOpen: boolean = false;
  passwordType: string = 'password';

  constructor(
    private authService: AuthService,
    private personasService: PersonaService
  ) { }

  ngOnInit() {
    this.getUserDetails();
  }

  togglePasswordVisibility(): void {
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }

  getUserDetails() {
    this.authService.getUserData().subscribe(
      (response: any) => {
        this.userDetails = response; // Asignar los detalles del usuario a la variable userDetails
        const personaId = response.persona.id; // Obtener el ID de la persona asociada al usuario
        if (personaId) {
          this.obtenerDetallesPersona(personaId); // Llamar al método para obtener los detalles de la persona
        }
      },
      (error) => {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    );
  }

  obtenerDetallesPersona(personaId: number) {
    this.personasService.obtenerPersona(personaId).subscribe(
      (response: Persona) => {
        this.persona = response; // Asignar los detalles de la persona a la variable persona
      },
      (error) => {
        console.error('Error al obtener los detalles de la persona:', error);
      }
    );
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

}
