import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TiposvuelosService } from 'src/app/services/configuracion/tiposvuelos/tiposvuelos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-t-vuelo',
  templateUrl: './crear-t-vuelo.component.html',
  styleUrls: ['./crear-t-vuelo.component.scss']
})
export class CrearTVueloComponent {

  tipo: string;
  precio: number;
  tiempo: string;
  estado: boolean;

  camposLlenos: boolean = false;

  constructor(
    private router: Router,
    private vuelosService: TiposvuelosService
    ) { }

  ngOnInit() {
  }

  verificarCamposLlenos() {
    this.camposLlenos = !!(this.tipo && this.precio && this.tiempo);
  }

  crearVuelo() {
    if (!this.tipo || !this.precio || !this.tiempo) {
      console.error("Por favor, complete todos los campos obligatorios.");
      return; 
    }
  
    const vueloData = {
      tipo: this.tipo,
      precio: this.precio,
      tiempo: this.tiempo,
      estado: this.estado,
    };
  
    this.vuelosService.crearVuelo(vueloData).subscribe(response => {
      this.router.navigate(['/config']);
    });
  }
}
