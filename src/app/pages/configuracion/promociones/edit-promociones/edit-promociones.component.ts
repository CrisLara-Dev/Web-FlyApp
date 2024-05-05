import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromocionService } from 'src/app/services/configuracion/promocion/promocion.service';
import { ToastrService } from 'ngx-toastr';
import { Promociones } from '../../../../models/index';

@Component({
  selector: 'app-edit-promociones',
  templateUrl: './edit-promociones.component.html',
  styleUrls: ['./edit-promociones.component.scss']
})
export class EditPromocionesComponent implements OnInit {
  id: number; 
  
  promocionOriginal: Promociones;
  promocionEditada: Promociones;

  fechaMinima: string; // Fecha mínima permitida
  edicionActiva: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private promoService: PromocionService,
    private toastr: ToastrService 
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id'); 
      this.promoService.obtenerPromocion(this.id).subscribe(data => {
        this.promocionOriginal = data;
        this.promocionEditada = { ...this.promocionOriginal };

        this.fechaMinima = new Date().toISOString().substring(0, 10); // Establecer la fecha actual como fecha mínima
        this.verificarCambios();
      });
    });
  }

  verificarCambios(): void {
    // Verificar si hay cambios en los campos
    const cambiosCodigo = this.promocionEditada.codigo !== this.promocionOriginal.codigo;
    const cambiosFechaFin = this.promocionEditada.fecha_fin !== this.promocionOriginal.fecha_fin;
    const cambiosFechaInicio = this.promocionEditada.fecha_inicio !== this.promocionOriginal.fecha_inicio;
    const cambiosPorcentaje = this.promocionEditada.porcentaje !== this.promocionOriginal.porcentaje;
    const cambiosEstado = this.promocionEditada.estado !== this.promocionOriginal.estado;

    // Activar la edición si hay algún cambio y todos los campos están llenos
    this.edicionActiva = (cambiosCodigo || cambiosFechaFin || cambiosFechaInicio || cambiosPorcentaje || cambiosEstado) && 
                    !!(this.promocionEditada.codigo && this.promocionEditada.fecha_fin && this.promocionEditada.fecha_inicio && this.promocionEditada.porcentaje );
  }
  
  editarPromocion(): void {
    const fechaActual = new Date().toISOString().substring(0, 10);

    if (this.promocionEditada.fecha_inicio < fechaActual) {
        this.toastr.error('La fecha de inicio no puede ser anterior a la fecha actual.', '¡Algo salió mal!',{ positionClass: 'toast-bottom-right' }); 
        return;
    }

    if (this.promocionEditada.fecha_fin < this.promocionEditada.fecha_inicio) {
        this.toastr.error('La fecha de fin no puede ser anterior a la fecha de inicio.', '¡Algo salió mal!',{ positionClass: 'toast-bottom-right' }); 
        return;
    }

    // Verificar si el código promocional ya existe
    this.promoService.listarPromocion().subscribe(promociones => {
        const promocionConMismoCodigo = promociones.find(promo => promo.codigo === this.promocionEditada.codigo && promo.id !== this.id);
        if (promocionConMismoCodigo) {
            this.toastr.error(`El código promocional '${promocionConMismoCodigo.codigo}' ya está en uso.`, '¡Error!', { positionClass: 'toast-bottom-right' });
        } else {
            // Si el código no existe, realizar la edición
            this.promoService.editarPromocion(this.id, this.promocionEditada).subscribe(response => {
                console.log("Promoción editada exitosamente:", response);
                this.router.navigate(['/config']);
            });
        }
    });
  }
}
