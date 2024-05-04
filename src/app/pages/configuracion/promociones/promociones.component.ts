import { Component, OnInit } from '@angular/core';
import { PromocionService } from 'src/app/services/configuracion/promocion/promocion.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {

  public focus;

  promociones: any[] = [];
  totalPromociones: number;
  promocionesPorPagina: number = 5; 
  paginaActualPromo: number = 0;
  paginasTotalesPromo: number[] = []; 
  filtroEstadoPromo: string = 'todos'; 
  promocionesFiltrados: any[] = []; 
  terminoBusquedaPromo: string = '';
  sinResultadosPromo: boolean = false;
  sinPromocionesConEstado: boolean = false;
  cargandoDatos: boolean = true;

  constructor(
    private promoService: PromocionService, 
  ) { }

  ngOnInit() {
    this.listarPromociones();
  }

  // Método para cambiar el número de filas de la tabla
  cambiarFilas(event: Event) {
    const filas = (event.target as HTMLSelectElement).value;
    this.promocionesPorPagina = parseInt(filas, 10); // Convertir el valor a número
    this.paginasTotalesPromo = this.generarPaginasPromo(); // Actualizar números de página disponibles
    this.paginaActualPromo = 0; // Reiniciar la página actual a la primera página
  }

  //CRUD PROMOCIONES
  listarPromociones() {
    this.cargandoDatos = true; 
    this.promoService.listarPromocion().subscribe(
      (data) => {
        this.promociones = data.map((promocion: any) => {
          promocion.estadoTexto = promocion.estado ? 'Activo' : 'Inactivo';
          promocion.estadoClase = promocion.estado ? 'text-success' : 'text-danger';
          promocion.estadoIcono = promocion.estado ? 'bg-success' : 'bg-danger';
          return promocion;
        });
        this.totalPromociones = this.promociones.length; 
        this.paginasTotalesPromo = this.generarPaginasPromo(); 
        this.cargandoDatos = false; 
      },
      error => {
        console.error('Error al obtener los vuelos:', error);
        this.cargandoDatos = false; 
      }
    );
  }

  eliminarPromociones(id: number) {
    this.promoService.eliminarPromocion(id).subscribe(
      () => {
        this.promociones = this.promociones.filter(promocion => promocion.id !== id);
        this.totalPromociones = this.promociones.length;
        this.paginasTotalesPromo = this.generarPaginasPromo(); 
        
        const totalPaginas = this.calcularTotalPaginasPromo();
        if (this.paginaActualPromo >= totalPaginas) {
          this.paginaActualPromo = Math.max(0, totalPaginas - 1); 
        }
      },
    );
  }

  obtenerPromocionesPaginaActual() {
    const startIndex = this.paginaActualPromo * this.promocionesPorPagina;
    const endIndex = startIndex + this.promocionesPorPagina;
  
    // Aplicar el filtro por estado
    const promocionesFiltrados = this.promociones.filter(promocion => {
      if (this.filtroEstadoPromo === 'todos') {
        return true; 
      } else {
        return promocion.estado === (this.filtroEstadoPromo === 'activo');
      }
    });
  
    const promocionesFiltradosPorBusqueda = this.terminoBusquedaPromo ?
      promocionesFiltrados.filter(promocion => promocion.codigo.toLowerCase().includes(this.terminoBusquedaPromo.toLowerCase())) :
      promocionesFiltrados;
  
    this.sinResultadosPromo = promocionesFiltrados.length > 0 && promocionesFiltradosPorBusqueda.length === 0;
    this.sinPromocionesConEstado = promocionesFiltrados.length === 0;
  
    const promocionesPagina = promocionesFiltradosPorBusqueda.slice(startIndex, endIndex);
    promocionesPagina.forEach((promocion, index) => {
      promocion.numeroFila = index + 1 + startIndex;
    });
    return promocionesPagina;
  }

  calcularTotalPaginasPromo() {
    return Math.ceil(this.totalPromociones / this.promocionesPorPagina);
  }

  generarPaginasPromo(): number[] {
    return Array(this.calcularTotalPaginasPromo()).fill(0).map((x, i) => i);
  }

  irPaginaAnteriorPromo() {
    if (this.paginaActualPromo > 0) {
      this.paginaActualPromo--;
    }
  }

  irPaginaSiguientePromo() {
    const totalPaginas = this.calcularTotalPaginasPromo();
    if (this.paginaActualPromo < totalPaginas - 1) {
      this.paginaActualPromo++;
    }
  }

  irAPaginaPromo(pagina: number) {
    this.paginaActualPromo = pagina;
  }
}