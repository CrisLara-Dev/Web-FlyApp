import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona, Registrarse, Roles } from 'src/app/models';
import { RolService } from 'src/app/services/configuracion/rol/rol.service';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { RegistrarService } from 'src/app/services/registrar/registrar.service';

@Component({
  selector: 'app-crear-users',
  templateUrl: './crear-users.component.html',
  styleUrls: ['./crear-users.component.scss']
})
export class CrearUsersComponent implements OnInit {
  public focus;

  passwordType: string = 'password';
  roles: Roles[] = [];
  personas: Persona[] = [];
  selectedTrabajador: Persona | null = null;
  selectedEmail: string = '';

  nuevoRegistrar: Registrarse = {
    email :  '',
    password : '',
    persona : null,
    rol : null,
  };

  camposLlenos: boolean = false;

  constructor(
    private router: Router,
    private rolesService: RolService,
    private personaService: PersonaService,
    private registrarService: RegistrarService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.listarRol();
    this.listarPersonas();
  }

  togglePasswordVisibility(): void {
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }

  updateEmail() {
    if (this.selectedTrabajador) {
      this.selectedEmail = this.selectedTrabajador.email;
      // Llama a la función para verificar los campos llenos cuando se actualiza el trabajador seleccionado
      this.verificarCamposLlenos();
    } else {
      this.selectedEmail = '';
    }
  }

  listarRol() {
    this.rolesService.listarVuelos().subscribe(
      (data: Roles[]) => {
        this.roles = data;
      },
      error => {
        console.error('Error al obtener los roles:', error);
      }
    );
  }

  listarPersonas() {
    this.personaService.listarPersonas().subscribe(
      (data: Persona[]) => {
        this.personas = data.filter(persona => persona.estado);
      },
      error => {
        console.error('Error al obtener las personas:', error);
      }
    );
  }

  verificarCamposLlenos() {
    // Verifica si todos los campos requeridos están llenos
    this.camposLlenos = !!(this.nuevoRegistrar.email && this.nuevoRegistrar.password && this.nuevoRegistrar.persona && this.nuevoRegistrar.rol);
  }

  crearUsuario() {
    // Verifica si todos los campos requeridos están llenos antes de intentar crear un usuario
    if (!this.camposLlenos) {
      console.error("Por favor, complete todos los campos obligatorios.");
      return; 
    }
    
    // Llama al servicio para crear un nuevo usuario
    this.registrarService.signup(this.nuevoRegistrar).subscribe(
      response => {
        // Si se crea el usuario correctamente, navega a la página de usuarios
        this.router.navigate(['/users']);
      },
      error => {
        console.error("Error al crear el usuario:", error);
        // Muestra una notificación de error utilizando Toastr u otro método que prefieras
        this.toastr.error("Error al crear el usuario. Por favor, inténtelo de nuevo.", "Error");
      }
    );
  }
}
