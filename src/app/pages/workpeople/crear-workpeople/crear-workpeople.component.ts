import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { ApiReniecService } from 'src/app/services/reniec/api-reniec.service';

@Component({
  selector: 'app-crear-workpeople',
  templateUrl: './crear-workpeople.component.html',
  styleUrls: ['./crear-workpeople.component.scss']
})
export class CrearWorkpeopleComponent implements OnInit {
  imagePath: string = 'https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg';
  isDniDisabled: boolean = false;

  nuevaPersona: Persona = {
    nombre: '',
    apellido: '',
    foto_url: '',
    telefono: '',
    email: '',
    direccion: '',
    documento_identidad: '',
    trabajador: false,
    estado: true,
  };

  constructor(
    private router: Router,
    private personasService: PersonaService,
    private toastr: ToastrService,
    private apiReniecService: ApiReniecService
  ) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList): void {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.imagePath = event.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  getDni(): void {
    if (this.nuevaPersona.documento_identidad) {
      this.apiReniecService.getDni(this.nuevaPersona.documento_identidad).subscribe(
        (response: any) => {
          if (response) {
            // Supongamos que la respuesta tiene las propiedades nombre y apellido
            this.nuevaPersona.nombre = response.nombres;
            this.nuevaPersona.apellido = `${response.apellidoPaterno} ${response.apellidoMaterno}`;
            this.isDniDisabled = true; // Deshabilitar el campo después de la búsqueda
          }
        },
        (error) => {
          console.error("Error al buscar el DNI", error);
          this.toastr.error('Error al buscar el DNI', '¡Error!', { positionClass: 'toast-bottom-right' });
        }
      );
    }
  }

  limpiarDNI() {
    this.nuevaPersona.documento_identidad = '';
    this.isDniDisabled = false; // Habilitar el campo al limpiar
  }

  limitarLongitud(event: KeyboardEvent, maxLength: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= maxLength && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }

  crearPersona() {
    if (!this.nuevaPersona.documento_identidad || !this.nuevaPersona.nombre || !this.nuevaPersona.apellido || !this.nuevaPersona.direccion || !this.nuevaPersona.telefono || !this.nuevaPersona.email) {
      console.error("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Validación del correo electrónico
    if (!this.nuevaPersona.email.match('^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$')) {
      this.toastr.error('Por favor, ingrese un correo electrónico válido de Gmail o Outlook.', 'Error', { positionClass: 'toast-bottom-right' });
      return; // Evitar que la función continúe si el correo electrónico no es válido
    }

    // Verificar si el correo electrónico ya existe en la base de datos
    this.personasService.listarPersonas().subscribe((personas: Persona[]) => {
      const emailExistente = personas.find(nuevaPersona => nuevaPersona.email === this.nuevaPersona.email);
      if (emailExistente) {
        this.toastr.error(`El correo '${emailExistente.email}' ya ha sido registrado.`, 'Error', { positionClass: 'toast-bottom-right' });
        return; // Evitar que la función continúe si se encuentra un email existente
      }

      // Verificar si la persona ya existe por nombre, apellido y DNI
      const personaExistente = personas.find(nuevaPersona => nuevaPersona.nombre === this.nuevaPersona.nombre && nuevaPersona.apellido === this.nuevaPersona.apellido && nuevaPersona.documento_identidad === this.nuevaPersona.documento_identidad);
      if (personaExistente) {
        this.toastr.error(`La persona '${personaExistente.nombre} ${personaExistente.apellido}' con DNI ${personaExistente.documento_identidad} ya está registrada.`, '¡Error!', { positionClass: 'toast-bottom-right' });
      } else {
        this.personasService.crearPersona(this.nuevaPersona).subscribe(response => {
          this.router.navigate(['/workpeople']);
        });
      }
    });
  }
}
