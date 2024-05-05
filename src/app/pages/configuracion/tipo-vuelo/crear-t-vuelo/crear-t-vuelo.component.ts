import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TiposvuelosService } from 'src/app/services/configuracion/tiposvuelos/tiposvuelos.service';
import { Tipovuelos } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-t-vuelo',
  templateUrl: './crear-t-vuelo.component.html',
  styleUrls: ['./crear-t-vuelo.component.scss']
})
export class CrearTVueloComponent {

  nuevoVuelo: Tipovuelos = {
    tipo: '',
    precio: null,
    tiempo: '',
    estado: true,
  };

  camposLlenos: boolean = false;

  constructor(
    private router: Router,
    private vuelosService: TiposvuelosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  verificarCamposLlenos() {
    this.camposLlenos = !!(this.nuevoVuelo.tipo && this.nuevoVuelo.precio && this.nuevoVuelo.tiempo);
  }

  crearVuelo() {
    if (!this.nuevoVuelo.tipo || !this.nuevoVuelo.precio || !this.nuevoVuelo.tiempo) {
      console.error("Por favor, complete todos los campos obligatorios.");
      return; 
    }
    
    // Verificar si el tipo de vuelo ya existe
    this.vuelosService.listarVuelos().subscribe((tiposVuelos: Tipovuelos[]) => {
      const tipoExistente = tiposVuelos.find(tipo => tipo.tipo === this.nuevoVuelo.tipo);
      if (tipoExistente) {
        this.toastr.error(`El tipo de vuelo '${tipoExistente.tipo}' ya está en uso.`, '¡Error!',{ positionClass: 'toast-bottom-right' });
      } else {
        this.vuelosService.crearVuelo(this.nuevoVuelo).subscribe(response => {
          this.router.navigate(['/config']);
        });
      }
    });
  }
}
