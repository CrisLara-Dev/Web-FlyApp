import { Component, OnInit } from '@angular/core';
import { ConfService } from 'src/app/services/conf/conf.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  public focus;
  modalOpen: boolean = false;

  vuelos: any[] = [];
  promociones: any[] = [];
  canales: any[] = [];
  
  constructor(private confService: ConfService, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    this.listarVuelos()
    this.listarPromociones()
    this.listarCanal()
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  //CRUD TIPO VUELO
  listarVuelos() {
    this.confService.listarVuelos().subscribe(
      (data) => {
        // Transformar el estado de los vuelos
        this.vuelos = data.map((vuelo: any) => {
          vuelo.estadoTexto = vuelo.estado ? 'Activo' : 'Inactivo';
          vuelo.estadoClase = vuelo.estado ? 'text-success' : 'text-danger';
          vuelo.estadoIcono = vuelo.estado ? 'bg-success' : 'bg-danger';
          return vuelo;
        });
      },
      error => {
        console.error('Error al obtener los vuelos:', error);
      }
    );
  }

  eliminarVuelos(id: number) {
    this.confService.eliminarVuelos(id).subscribe(
      () => {
        // Eliminar el vuelo del arreglo vuelos
        this.vuelos = this.vuelos.filter(vuelo => vuelo.id !== id);
      },
      error => {
        console.error('Error al eliminar el vuelo:', error);
      }
    );
  }

  //CRUD PROMOCIONES
  listarPromociones() {
    this.confService.listarPromocion().subscribe(
      (data) => {
        this.promociones = data.map((promocion: any) => {
          promocion.estadoTexto = promocion.estado ? 'Activo' : 'Inactivo';
          promocion.estadoClase = promocion.estado ? 'text-success' : 'text-danger';
          promocion.estadoIcono = promocion.estado ? 'bg-success' : 'bg-danger';
          return promocion;
        });
      },
      error => {
        console.error('Error al obtener las promociones:', error);
      }
    );
  }

  eliminarPromociones(id: number) {
    this.confService.eliminarPromocion(id).subscribe(
      () => {
        // Eliminar el vuelo del arreglo vuelos
        this.promociones = this.promociones.filter(promocion => promocion.id !== id);
      },
      error => {
        console.error('Error al eliminar la promoción:', error);
      }
    );
  }

  //CRUD CANALES VENTA
  listarCanal() {
    this.confService.listarCanal().subscribe(
      (data) => {
        this.canales = data.map((canal: any) => {
          canal.estadoTexto = canal.estado ? 'Activo' : 'Inactivo';
          canal.estadoClase = canal.estado ? 'text-success' : 'text-danger';
          canal.estadoIcono = canal.estado ? 'bg-success' : 'bg-danger';
          return canal;
        });
      },
      error => {
        console.error('Error al obtener las promociones:', error);
      }
    );
  }

  eliminarCanal(id: number) {
    this.confService.eliminarCanal(id).subscribe(
      () => {
        // Eliminar el vuelo del arreglo vuelos
        this.canales = this.canales.filter(canal => canal.id !== id);
      },
      error => {
        console.error('Error al eliminar el canal:', error);
      }
    );
  }
  
}
