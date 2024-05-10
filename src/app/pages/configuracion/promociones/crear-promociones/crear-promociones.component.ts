import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromocionService } from 'src/app/services/configuracion/promocion/promocion.service';
import { Promociones } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-promociones',
  templateUrl: './crear-promociones.component.html',
  styleUrls: ['./crear-promociones.component.scss']
})
export class CrearPromocionesComponent implements OnInit {
  
  promocion: Promociones = {
    codigo: '',
    fecha_inicio: new Date().toISOString().substring(0, 10),
    fecha_fin: '',
    porcentaje: null,
    estado: true,
  };

  fechaMinima: string;
  camposLlenos: boolean = false;

  constructor(
    private router: Router,
    private promoService: PromocionService,
    private toastr: ToastrService 
  ) { }

  ngOnInit() {
    // this.generarCodigo();
    this.fechaMinima = this.promocion.fecha_inicio;
  }

  verificarCamposLlenos() {
    this.camposLlenos = !!(this.promocion.codigo && this.promocion.fecha_inicio && this.promocion.fecha_fin && this.promocion.porcentaje);
  }

  crearPromocion() {
    if (!this.promocion.codigo || !this.promocion.fecha_inicio || !this.promocion.fecha_fin || !this.promocion.porcentaje) {
      console.error("Por favor, complete todos los campos obligatorios.");
      return; 
    }

    const fechaActual = new Date().toISOString().substring(0, 10);
    if (this.promocion.fecha_inicio < fechaActual) {
      this.toastr.error('¡Algo salió mal!', 'Oops...'); 
      return;
    }

    if (this.promocion.fecha_fin < this.promocion.fecha_inicio) {
      this.toastr.error('¡Algo salió mal!', 'Oops...'); 
      return;
    }

    // Verificar si el código promocional ya existe
    this.promoService.listarPromocion().subscribe((promociones: Promociones[]) => {
      const codigoExistente = promociones.find(promo => promo.codigo === this.promocion.codigo);
      if (codigoExistente) {
        this.toastr.error(`El código promocional '${codigoExistente.codigo}' ya está en uso.`, '¡Error!', { positionClass: 'toast-bottom-right' });
      } else {
        this.promoService.crearPromocion(this.promocion).subscribe(response => {
          this.router.navigate(['/config']);
        });
      }
    });
  }


  // generarCodigo() {
  //   const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //   let codigoAleatorio = 'FLY-';
  //   for (let i = 0; i < 5; i++) {
  //     codigoAleatorio += letras.charAt(Math.floor(Math.random() * letras.length));
  //   }
  //   this.promocion.codigo = codigoAleatorio;
  // }
}
