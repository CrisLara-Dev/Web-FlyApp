import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona/persona.service';

@Component({
  selector: 'app-edit-workpeople',
  templateUrl: './edit-workpeople.component.html',
  styleUrls: ['./edit-workpeople.component.scss']
})
export class EditWorkpeopleComponent implements OnInit {

  imagePath: string = 'assets/img/theme/team-4-800x800.jpg';
  modalOpen: boolean = false;

  id: number; 
  personaOriginal: Persona;
  personaEditado: Persona;

  edicionActiva: boolean = false;


  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private personasService: PersonaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del persona de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id'); // Convertir a number
      // Llamar al servicio para obtener los datos del persona
      this.personasService.obtenerPersona(this.id).subscribe(data => {
        // Almacenar los datos originales
        this.personaOriginal = data;
        // Clonar el persona original para editar
        this.personaEditado = { ...this.personaOriginal };
        // Verificar si la edición está activa
        this.verificarCambios();
      });
    });
  }

  verificarCambios(): void {
    // Verificar si hay cambios en los campos
    const cambiosNombre = this.personaEditado.nombre !== this.personaOriginal.nombre;
    const cambiosApellido = this.personaEditado.apellido !== this.personaOriginal.apellido;
    const cambiosDNI = this.personaEditado.documento_identidad !== this.personaOriginal.documento_identidad;
    const cambiosDireccion = this.personaEditado.direccion !== this.personaOriginal.direccion;
    const cambiosTelefono = this.personaEditado.telefono !== this.personaOriginal.telefono;
    const cambiosCorreo = this.personaEditado.email !== this.personaOriginal.email;


    // Activar la edición si hay algún cambio y todos los campos están llenos
    this.edicionActiva = (cambiosNombre || cambiosApellido || cambiosDNI || cambiosDireccion || cambiosTelefono || cambiosCorreo) && 
                         !!(this.personaEditado.nombre && this.personaEditado.apellido && this.personaEditado.documento_identidad 
                          && this.personaEditado.direccion && this.personaEditado.telefono && this.personaEditado.email);
  }

  editarPersona(): void {
     // Validación del correo electrónico
     if (!this.personaEditado.email.match('^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$')) {
      this.toastr.error('Por favor, ingrese un correo electrónico válido de Gmail o Outlook.', 'Error', { positionClass: 'toast-bottom-right' });
      return;
    }

    // Verificar si el correo electrónico ya existe en la base de datos
    this.personasService.listarPersonas().subscribe((personas: Persona[]) => {
      const emailExistente = personas.find(personaEditado => personaEditado.email === this.personaEditado.email);
      if (emailExistente && emailExistente.email !== this.personaOriginal.email) {
        this.toastr.error(`El correo '${emailExistente.email}' ya ha sido registrado.`, 'Error', { positionClass: 'toast-bottom-right' });
        return; // Evitar que la función continúe si se encuentra un email existente diferente al original
      }

    // Verificar si el tipo de vuelo editado ya existe
    this.personasService.listarPersonas().subscribe((personas: Persona[]) => {
      const personaExistente = personas.find(personaEditado => personaEditado.nombre === this.personaEditado.nombre  && personaEditado.apellido === this.personaEditado.apellido && personaEditado.documento_identidad === this.personaEditado.documento_identidad  && personaEditado.id !== this.id);
      if (personaExistente) {
        this.toastr.error(`La persona '${personaExistente.nombre} ${personaExistente.apellido}' con DNI ${personaExistente.documento_identidad} ya está registrada.`, '¡Error!', { positionClass: 'toast-bottom-right' });
      } else {
        this.personasService.editarPersona(this.id, this.personaEditado).subscribe(response => {
          this.router.navigate(['/workpeople']);
        });
      }
    });
    }
  )}


  limitarLongitud(event: KeyboardEvent, maxLength: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= maxLength && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }
  
  handleFileInput(files: FileList): void {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.personaEditado.foto_url = event.target.result; // Asigna la URL de la imagen al objeto personaEditado
        this.imagePath = event.target.result; // Actualiza la vista previa de la imagen si es necesario
        console.log("URL de la imagen:", this.personaEditado.foto_url); // Muestra la URL de la imagen en la consola
        this.verificarCambios();
      };

      reader.readAsDataURL(file);
    }
  }

}
