import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona/persona.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {

  imagePath: string = 'assets/img/theme/team-4-800x800.jpg';
  // modalOpen: boolean = false;

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
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id'); 
      this.personasService.obtenerPersona(this.id).subscribe(data => {
        this.personaOriginal = data;
        this.personaEditado = { ...this.personaOriginal };
        this.verificarCambios();
      });
    });
  }

  verificarCambios(): void {
    const cambiosNombre = this.personaEditado.nombre !== this.personaOriginal.nombre;
    const cambiosApellido = this.personaEditado.apellido !== this.personaOriginal.apellido;
    const cambiosEmail = this.personaEditado.email !== this.personaOriginal.email;
    const cambiosDireccion = this.personaEditado.direccion !== this.personaOriginal.direccion;
    const cambiosDNI = this.personaEditado.documento_identidad !== this.personaOriginal.documento_identidad;
    const cambiosTelefono = this.personaEditado.telefono !== this.personaOriginal.telefono;
    const cambiosFoto = this.personaEditado.foto_url !== this.personaOriginal.foto_url;
    
    this.edicionActiva = (cambiosNombre || cambiosApellido || cambiosEmail || cambiosDireccion || cambiosDNI || cambiosTelefono || cambiosFoto) && 
                         !!(this.personaEditado.nombre && this.personaEditado.apellido && this.personaEditado.email && this.personaEditado.direccion 
                          && this.personaEditado.documento_identidad && this.personaEditado.telefono && this.personaEditado.foto_url  );
  }

  editarPersona(): void {
    this.personasService.listarPersonas().subscribe((personas: Persona[]) => {
      const emailExistente = personas.find(persona => 
        persona.email.toLowerCase() === this.personaEditado.email.toLowerCase() &&
        persona.id !== this.id
      );
  
      if (emailExistente) {
        this.toastr.error(`El correo '${emailExistente.email}' ya ha sido registrado.`, 'Error', { positionClass: 'toast-bottom-right' });
        return; // Evitar que la función continúe si se encuentra un email existente
      }  
  
      // Validación del correo electrónico usando una expresión regular
      if (!this.personaEditado.email.match('^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$')) {
        this.toastr.error('Por favor ingrese un correo electrónico válido de Gmail o Outlook.', 'Error', { positionClass: 'toast-bottom-right' });
        return; // Evitar que la función continúe si el correo electrónico no es válido
      }  
  
      // Si no se encontraron problemas, proceder con la edición del perfil
      this.personasService.editarPersona(this.id, this.personaEditado).subscribe(response => {
        console.log("Perfil editado exitosamente:", response);
        this.router.navigate(['/user-profile']);
      });
    });
  }
  

  // openModal() {
  //   this.modalOpen = true;
  // }

  // closeModal() {
  //   this.modalOpen = false;
  // }

  stopPropagation(event: Event) {
    event.stopPropagation();
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



  limitarLongitud(event: any, max_length: number) {
    const input = event.target;
    if (input.value.length >= max_length) {
      event.preventDefault();
    }
  }
}
