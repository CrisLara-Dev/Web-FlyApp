import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona, Registrarse, Roles, Usuario } from 'src/app/models';
import { RolService } from 'src/app/services/configuracion/rol/rol.service';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { RegistrarService } from 'src/app/services/registrar/registrar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  imagePath: string = 'assets/img/theme/team-4-800x800.jpg';
  modalOpen: boolean = false;
  roles: Roles[] = [];
  personas: Persona[] = [];

  id: number; 
  usuarioOriginal: Usuario;
  usuarioEditado: Usuario;

  edicionActiva: boolean = false;
  nombreCompleto: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private rolesService: RolService,
    private personaService: PersonaService,
    private registrarService: RegistrarService,
    private toastr: ToastrService,
    private usuariosService: UsuarioService,

  ) {}

  ngOnInit() {
     // Obtener el ID del vuelo de los parámetros de la ruta
     this.route.paramMap.subscribe(params => {
      this.id = +params.get('id'); // Convertir a number
      // Llamar al servicio para obtener los datos del vuelo
      this.usuariosService.obtenerUsuario(this.id).subscribe(data => {
        // Almacenar los datos originales
        this.usuarioOriginal = data;
        // Clonar el vuelo original para editar
        this.usuarioEditado = { ...this.usuarioOriginal };
        // Obtener datos del usuario y otros procesamientos...
        this.nombreCompleto = this.usuarioEditado.persona.nombre + ' ' + this.usuarioEditado.persona.apellido;
        // Verificar si la edición está activa
        this.verificarCambios();
      });
    });
    this.listarRol();
  }

  verificarCambios(): void {
    // Verificar si hay cambios en los campos
    const cambiosRolNombre = this.usuarioEditado.rol.nombre !== this.usuarioOriginal.rol.nombre;
    const cambiosEmail = this.usuarioEditado.email !== this.usuarioOriginal.email;
    const cambiosEstado = this.usuarioEditado.is_active !== this.usuarioOriginal.is_active;

    // Activar la edición si hay algún cambio y todos los campos están llenos
    this.edicionActiva = (cambiosRolNombre || cambiosEmail || cambiosEstado) && 
                         !!(this.usuarioEditado.rol.nombre && this.usuarioEditado.email && this.usuarioEditado.is_active);
  }

  editarUsuario(): void {
    // Verificar si el tipo de vuelo editado ya existe
    this.usuariosService.listarUsuarios().subscribe((usuarios: Usuario[]) => {
      const usuarioExistente = usuarios.find(usuario => usuario.email === this.usuarioEditado.email && usuario.id !== this.id);
      if (usuarioExistente) {
        this.toastr.error(`El usuario '${usuarioExistente.email}' ya está en uso.`, '¡Error!', { positionClass: 'toast-bottom-right' });
      } else {
        this.usuariosService.editarUsuario(this.id, this.usuarioEditado).subscribe(response => {
          console.log("Usuario editado exitosamente:", response);
          this.router.navigate(['/users']);
        });
      }
    });
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
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

}
