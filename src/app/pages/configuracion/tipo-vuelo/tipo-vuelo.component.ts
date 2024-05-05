import { Component, OnInit } from '@angular/core';
import { Tipovuelos } from 'src/app/models';
import { TiposvuelosService } from 'src/app/services/configuracion/tiposvuelos/tiposvuelos.service';

@Component({
  selector: 'app-tipo-vuelo',
  templateUrl: './tipo-vuelo.component.html',
  styleUrls: ['./tipo-vuelo.component.scss']
})
export class TipoVueloComponent implements OnInit {

  public focus;

  vuelos: Tipovuelos[] = []; // Cambiar el tipo de datos a TipoVuelo[]
  totalVuelos: number;
  vuelosPorPagina: number = 5; // Cambiar el número de vuelos por página a 5
  paginaActual: number = 0; // Página actual, comenzando desde 0
  paginasTotales: number[] = []; // Arreglo para almacenar los números de página disponibles
  filtroEstado: string = 'todos'; // Estado seleccionado inicialmente
  vuelosFiltrados: Tipovuelos[] = []; // Cambiar el tipo de datos a TipoVuelo[]
  terminoBusqueda: string = '';
  sinResultados: boolean = false;
  sinVuelosConEstado: boolean = false;
  cargandoDatos: boolean = true;

  constructor(
    private vuelosService: TiposvuelosService,
  ) { }

  ngOnInit() {
    this.listarVuelos();
  }

  // Método para cambiar el número de filas de la tabla
  cambiarFilas(event: Event) {
    const filas = (event.target as HTMLSelectElement).value;
    this.vuelosPorPagina = parseInt(filas, 10); // Convertir el valor a número
    this.paginasTotales = this.generarPaginas(); // Actualizar números de página disponibles
    this.paginaActual = 0; // Reiniciar la página actual a la primera página
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

  
}