import { Component, OnInit } from '@angular/core';
import { PromocionService } from 'src/app/services/configuracion/promocion/promocion.service';
import { TiposvuelosService } from 'src/app/services/configuracion/tiposvuelos/tiposvuelos.service';
import { CanalventaService } from 'src/app/services/configuracion/canalventa/canalventa.service';

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
  
  totalVuelos: number;
  totalPromociones: number;
  totalCanales: number;

  vuelosPorPagina: number = 5; // Cambiar el número de vuelos por página a 5
  promocionesPorPagina: number = 5; 
  canalesPorPagina: number = 5;

  paginaActual: number = 0; // Página actual, comenzando desde 0
  paginaActualPromo: number = 0;
  paginaActualCanal: number = 0;

  paginasTotales: number[] = []; // Arreglo para almacenar los números de página disponibles
  paginasTotalesPromo: number[] = []; 
  paginasTotalesCanal: number[] = []; 

  filtroEstado: string = 'todos'; // Estado seleccionado inicialmente
  filtroEstadoPromo: string = 'todos'; 
  filtroEstadoCanal: string = 'todos'; 

  vuelosFiltrados: any[] = []; // Arreglo para almacenar los vuelos filtrados
  promocionesFiltrados: any[] = []; 
  canalesFiltrados: any[] = []; 
  
  terminoBusqueda: string = '';
  terminoBusquedaPromo: string = '';
  terminoBusquedaCanal: string = '';

  sinResultados: boolean = false;
  sinResultadosPromo: boolean = false;
  sinResultadosCanal: boolean = false;

  sinVuelosConEstado: boolean = false;
  sinPromocionesConEstado: boolean = false;
  sinCanalesConEstado: boolean = false;

  cargandoDatos: boolean = true;

  constructor(
    private promoService: PromocionService, 
    private vuelosService: TiposvuelosService,
    private canalService: CanalventaService 
  ) { }

  ngOnInit() {
    this.listarVuelos();
    this.listarPromociones();
    this.listarCanal();
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
    this.cargandoDatos = true; // Iniciar animación de carga
    this.vuelosService.listarVuelos().subscribe(
      (data) => {
        this.vuelos = data.map((vuelo: any) => {
          vuelo.estadoTexto = vuelo.estado ? 'Activo' : 'Inactivo';
          vuelo.estadoClase = vuelo.estado ? 'text-success' : 'text-danger';
          vuelo.estadoIcono = vuelo.estado ? 'bg-success' : 'bg-danger';
          return vuelo;
        });
        this.totalVuelos = this.vuelos.length; // Actualizar el número total de vuelos
        this.paginasTotales = this.generarPaginas(); // Generar números de página disponibles
        this.cargandoDatos = false; // Finalizar animación de carga
      },
      error => {
        console.error('Error al obtener los vuelos:', error);
        this.cargandoDatos = false; // Finalizar animación de carga
      }
    );
  }

  eliminarVuelos(id: number) {
    this.vuelosService.eliminarVuelos(id).subscribe(
      () => {
        this.vuelos = this.vuelos.filter(vuelo => vuelo.id !== id);
        this.totalVuelos = this.vuelos.length; // Actualizar el número total de vuelos
        this.paginasTotales = this.generarPaginas(); // Generar números de página disponibles
        
        // Verificar si la página actual está fuera de rango después de eliminar un vuelo
        const totalPaginas = this.calcularTotalPaginas();
        if (this.paginaActual >= totalPaginas) {
          this.paginaActual = Math.max(0, totalPaginas - 1); // Retroceder una página si está fuera de rango
        }
      },
    );
  }
  
   obtenerVuelosPaginaActual() {
    const startIndex = this.paginaActual * this.vuelosPorPagina;
    const endIndex = startIndex + this.vuelosPorPagina;
  
    // Aplicar el filtro por estado
    const vuelosFiltrados = this.vuelos.filter(vuelo => {
      if (this.filtroEstado === 'todos') {
        return true; // Mostrar todos los vuelos si no hay filtro aplicado
      } else {
        return vuelo.estado === (this.filtroEstado === 'activo'); // Filtrar los vuelos por estado
      }
    });
  
    // Filtrar los vuelos por término de búsqueda si hay un término definido
    const vuelosFiltradosPorBusqueda = this.terminoBusqueda ?
      vuelosFiltrados.filter(vuelo => vuelo.tipo.toLowerCase().includes(this.terminoBusqueda.toLowerCase())) :
      vuelosFiltrados;
  
    // Verificar si no se encontraron resultados
    this.sinResultados = vuelosFiltrados.length > 0 && vuelosFiltradosPorBusqueda.length === 0;
  
    // Verificar si no hay vuelos con el estado seleccionado
    this.sinVuelosConEstado = vuelosFiltrados.length === 0;
  
    // Obtener los vuelos de la página actual desde el arreglo filtrado
    const vuelosPagina = vuelosFiltradosPorBusqueda.slice(startIndex, endIndex);
  
    // Ajustar el número de fila en función de los vuelos mostrados en la página actual
    vuelosPagina.forEach((vuelo, index) => {
      vuelo.numeroFila = index + 1 + startIndex;
    });
    return vuelosPagina;
  }
  
  // Método para calcular el número total de páginas
  calcularTotalPaginas() {
    return Math.ceil(this.totalVuelos / this.vuelosPorPagina);
  }

  // Método para generar un arreglo de números que representan las páginas disponibles
  generarPaginas(): number[] {
    return Array(this.calcularTotalPaginas()).fill(0).map((x, i) => i);
  }

  // Método para ir a la página anterior
  irPaginaAnterior() {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
  }

  // Método para ir a la página siguiente
  irPaginaSiguiente() {
    const totalPaginas = this.calcularTotalPaginas();
    if (this.paginaActual < totalPaginas - 1) {
      this.paginaActual++;
    }
  }

  // Método para ir a una página específica
  irAPagina(pagina: number) {
    this.paginaActual = pagina;
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
        this.totalCanales = this.canales.length; // Actualizar el número total de vuelos
        this.paginasTotalesCanal = this.generarPaginasCanal(); // Generar números de página disponibles
        
        // Verificar si la página actual está fuera de rango después de eliminar un vuelo
        const totalPaginas = this.calcularTotalPaginasCanal();
        if (this.paginaActualCanal >= totalPaginas) {
          this.paginaActualCanal = Math.max(0, totalPaginas - 1); // Retroceder una página si está fuera de rango
        }
      },
    );
  }

  obtenerCanalesPaginaActual() {
    const startIndex = this.paginaActualPromo * this.canalesPorPagina;
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
