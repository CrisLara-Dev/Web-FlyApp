import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromocionService } from 'src/app/services/configuracion/promocion/promocion.service';

@Component({
  selector: 'app-crear-promociones',
  templateUrl: './crear-promociones.component.html',
  styleUrls: ['./crear-promociones.component.scss']
})
export class CrearPromocionesComponent implements OnInit {
  
  codigo: string;
  fecha_inicio: string;
  fecha_fin: string;
  porcentaje: number;
  estado: boolean;

  camposLlenos: boolean = false;

  constructor(
    private router: Router,
    private promoService: PromocionService,
  ) { }


  ngOnInit() {
    this.generarCodigo();
  }

  verificarCamposLlenos() {
    this.camposLlenos = !!(this.codigo && this.fecha_inicio && this.fecha_fin && this.porcentaje);
  }

  crearPromocion() {
    if (!this.codigo || !this.fecha_inicio || !this.fecha_fin || !this.porcentaje) {
      console.error("Por favor, complete todos los campos obligatorios.");
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
