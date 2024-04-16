import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromocionService } from 'src/app/services/configuracion/promocion/promocion.service';

@Component({
  selector: 'app-edit-promociones',
  templateUrl: './edit-promociones.component.html',
  styleUrls: ['./edit-promociones.component.scss']
})
export class EditPromocionesComponent implements OnInit {
  id: number; 
  
  codigoOriginal: string;
  fecha_inicioOriginal: string;
  fecha_finOriginal: string;
  porcentajeOriginal: number;
  estadoOriginal: string;

  codigo: string;
  fecha_inicio: string;
  fecha_fin: string;
  porcentaje: number;
  estado: string;

  edicionActiva: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private promoService: PromocionService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id'); 
      this.promoService.obtenerPromocion(this.id).subscribe(data => {
        this.codigoOriginal = data.codigo;
        this.fecha_inicioOriginal = data.fecha_inicio;
        this.fecha_finOriginal = data.fecha_fin;
        this.porcentajeOriginal = data.porcentaje;
        this.estadoOriginal = data.estado;

        this.codigo = this.codigoOriginal;
        this.fecha_inicio = this.fecha_inicioOriginal;
        this.fecha_fin = this.fecha_finOriginal;
        this.porcentaje = this.porcentajeOriginal;
        this.estado = this.estadoOriginal;
      });
    });
  }

  verificarCambios(): void {
    if (
      this.codigo !== this.codigoOriginal ||
      this.fecha_inicio !== this.fecha_inicioOriginal ||
      this.fecha_fin !== this.fecha_finOriginal ||
      this.porcentaje !== this.porcentajeOriginal ||
      this.estado !== this.estadoOriginal
    ) {
      this.edicionActiva = true;
    } else {
      this.edicionActiva = false;
    }
  }

  editarPromocion(): void {
    const promoActualizado = {
      codigo: this.codigo,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
      porcentaje: this.porcentaje,
      estado: this.estado
    };

    this.promoService.editarPromocion(this.id, promoActualizado).subscribe(response => {
      this.router.navigate(['/config']);
    });
  }
}