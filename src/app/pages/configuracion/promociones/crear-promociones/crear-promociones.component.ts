import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromocionService } from 'src/app/services/configuracion/promocion/promocion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-promociones',
  templateUrl: './crear-promociones.component.html',
  styleUrls: ['./crear-promociones.component.scss']
})
export class CrearPromocionesComponent implements OnInit {
  
  codigo: string;
  fecha_inicio: string = new Date().toISOString().substring(0, 10); // Establecer la fecha actual como valor predeterminado
  fecha_fin: string;
  porcentaje: number;
  estado: boolean;

  fechaMinima: string;
  camposLlenos: boolean = false;

  constructor(
    private router: Router,
    private promoService: PromocionService,
    private toastr: ToastrService 
  ) { }


  ngOnInit() {
    this.generarCodigo();
    this.fechaMinima = this.fecha_inicio; // Establecer la fecha mínima como la fecha actual
  }

  verificarCamposLlenos() {
    this.camposLlenos = !!(this.codigo && this.fecha_inicio && this.fecha_fin && this.porcentaje);
  }

  crearPromocion() {
    if (!this.codigo || !this.fecha_inicio || !this.fecha_fin || !this.porcentaje) {
      console.error("Por favor, complete todos los campos obligatorios.");
      return; 
    }

    const fechaActual = new Date().toISOString().substring(0, 10);
    if (this.fecha_inicio < fechaActual) {
      this.toastr.error('¡Algo salió mal!', 'Oops...'); 
      return;
    }
  
    const descuentoData = {
      codigo: this.codigo,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
      porcentaje: this.porcentaje,
      estado: this.estado,
    };
  
    this.promoService.crearPromocion(descuentoData).subscribe(response => {
      this.router.navigate(['/config']);
    });
  }

  generarCodigo() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codigoAleatorio = 'FLY-';
    for (let i = 0; i < 5; i++) {
      codigoAleatorio += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    this.codigo = codigoAleatorio;
  }
}
