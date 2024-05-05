import { Component, OnInit } from '@angular/core';
import { CanalventaService } from 'src/app/services/configuracion/canalventa/canalventa.service';
import { Canales } from 'src/app/models';

@Component({
  selector: 'app-canales',
  templateUrl: './canales.component.html',
  styleUrls: ['./canales.component.scss']
})
export class CanalesComponent implements OnInit {

  public focus;

  canales: Canales[] = [];
  totalCanales: number;
  canalesPorPagina: number = 5;
  paginaActualCanal: number = 0;
  paginasTotalesCanal: number[] = []; 
  filtroEstadoCanal: string = 'todos'; 
  canalesFiltrados: Canales[] = []; 
  terminoBusquedaCanal: string = '';
  sinResultadosCanal: boolean = false;
  sinCanalesConEstado: boolean = false;
  cargandoDatos: boolean = true;

  constructor(
    private canalService: CanalventaService 
  ) { }

  ngOnInit() {
    this.listarCanal();
  }

  // Método para cambiar el número de filas de la tabla
  cambiarFilas(event: Event) {
    const filas = (event.target as HTMLSelectElement).value;
    this.canalesPorPagina = parseInt(filas, 10); // Convertir el valor a número
    this.paginasTotalesCanal = this.generarPaginasCanal(); // Actualizar números de página disponibles
    this.paginaActualCanal = 0; // Reiniciar la página actual a la primera página
  }

  //CRUD CANALES VENTA
  listarCanal() {
    this.cargandoDatos = true; 
    this.canalService.listarCanal().subscribe(
      (data) => {
        this.canales = data.map((canal: any) => {
          canal.estadoTexto = canal.estado ? 'Activo' : 'Inactivo';
          canal.estadoClase = canal.estado ? 'text-success' : 'text-danger';
          canal.estadoIcono = canal.estado ? 'bg-success' : 'bg-danger';
          return canal;
        });
        this.totalCanales = this.canales.length; 
        this.paginasTotalesCanal = this.generarPaginasCanal(); 
        this.cargandoDatos = false; 
      },
      error => {
        console.error('Error al obtener los canales:', error);
        this.cargandoDatos = false; 
      }
    );
  }

  eliminarCanal(id: number) {
    this.canalService.eliminarCanal(id).subscribe(
      () => {
        this.canales = this.canales.filter(canal => canal.id !== id);
        this.totalCanales = this.canales.length; 
        this.paginasTotalesCanal = this.generarPaginasCanal(); 
        
        const totalPaginas = this.calcularTotalPaginasCanal();
        if (this.paginaActualCanal >= totalPaginas) {
          this.paginaActualCanal = Math.max(0, totalPaginas - 1); 
        }
      },
    );
  }

  obtenerCanalesPaginaActual() {
    const startIndex = this.paginaActualCanal * this.canalesPorPagina;
    const endIndex = startIndex + this.canalesPorPagina;
  
    // Aplicar el filtro por estado
    const canalesFiltrados = this.canales.filter(canal => {
      if (this.filtroEstadoCanal === 'todos') {
        return true; 
      } else {
        return canal.estado === (this.filtroEstadoCanal === 'activo');
      }
    });
  
    const canalesFiltradosPorBusqueda = this.terminoBusquedaCanal ?
      canalesFiltrados.filter(canal => canal.nombre.toLowerCase().includes(this.terminoBusquedaCanal.toLowerCase())) :
      canalesFiltrados;
  
    this.sinResultadosCanal = canalesFiltrados.length > 0 && canalesFiltradosPorBusqueda.length === 0;
    this.sinCanalesConEstado = canalesFiltrados.length === 0;
  
    const canalesPagina = canalesFiltradosPorBusqueda.slice(startIndex, endIndex);
    canalesPagina.forEach((canal, index) => {
      canal.numeroFila = index + 1 + startIndex;
    });
    return canalesPagina;
  }

  calcularTotalPaginasCanal() {
    return Math.ceil(this.totalCanales / this.canalesPorPagina);
  }

  generarPaginasCanal(): number[] {
    return Array(this.calcularTotalPaginasCanal()).fill(0).map((x, i) => i);
  }

  irPaginaAnteriorCanal() {
    if (this.paginaActualCanal > 0) {
      this.paginaActualCanal--;
    }
  }

  irPaginaSiguienteCanal() {
    const totalPaginas = this.calcularTotalPaginasCanal();
    if (this.paginaActualCanal < totalPaginas - 1) {
      this.paginaActualCanal++;
    }
  }

  irAPaginaCanal(pagina: number) {
    this.paginaActualCanal = pagina;
  }
}