import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona/persona.service';

@Component({
  selector: 'app-crear-workpeople',
  templateUrl: './crear-workpeople.component.html',
  styleUrls: ['./crear-workpeople.component.scss']
})
export class CrearWorkpeopleComponent implements OnInit {
  imagePath:  string = 'https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg';

  nuevaPersona: Persona = {
    nombre:  '',
    apellido:  '',
    foto_url:  '',
    telefono:  '',
    email:  '',
    direccion:  '',
    documento_identidad:  '',
    trabajador: false,
    estado: true,
    dni_nino:  '',
  };

  camposLlenos: boolean = false;

  constructor(
    private router: Router,
    private personasService: PersonaService,
    private toastr: ToastrService
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

  verificarCamposLlenos() {
    this.camposLlenos = !!(this.nuevaPersona.documento_identidad && this.nuevaPersona.nombre && this.nuevaPersona.apellido && this.nuevaPersona.direccion && this.nuevaPersona.telefono);
  }

  crearPersona() {
    if (!this.nuevaPersona.documento_identidad || !this.nuevaPersona.nombre || !this.nuevaPersona.apellido || !this.nuevaPersona.direccion || !this.nuevaPersona.telefono) {
      console.error("Por favor, complete todos los campos obligatorios.");
      return; 
    }
  
    // Verificar si la persona ya existe por nombre, apellido y DNI
    this.personasService.listarPersonas().subscribe((personas: Persona[]) => {
      const personaExistente = personas.find(persona => persona.nombre === this.nuevaPersona.nombre && persona.apellido === this.nuevaPersona.apellido && persona.documento_identidad === this.nuevaPersona.documento_identidad);
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
