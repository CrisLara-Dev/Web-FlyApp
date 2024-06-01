import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona/persona.service';

@Component({
  selector: 'app-workpeople',
  templateUrl: './workpeople.component.html',
  styleUrls: ['./workpeople.component.scss']
})
export class WorkpeopleComponent implements OnInit {
  public focus;

  personas: Persona[] = [];
  totalPersonas: number;
  personasPorPagina: number = 8; 
  paginaActual: number = 0; 
  paginasTotales: number[] = []; 
  filtroEstado: string = 'todos'; 
  PersonasFiltrados: Persona[] = [];
  terminoBusqueda: string = '';
  sinResultados: boolean = false;
  sinPersonasConEstado: boolean = false;
  cargandoDatos: boolean = true;

  constructor(
    private personasService: PersonaService,
  ) { }

  ngOnInit() {
    this.listarTrabajador();
  }
  // Método para cambiar el número de filas de la tabla
  cambiarFilas(event: Event) {
    const filas = (event.target as HTMLSelectElement).value;
    this.personasPorPagina = parseInt(filas, 10); // Convertir el valor a número
    this.paginasTotales = this.generarPaginas(); // Actualizar números de página disponibles
    this.paginaActual = 0; // Reiniciar la página actual a la primera página
  }
  
  
  listarTrabajador() {
    this.cargandoDatos = true; // Iniciar animación de carga
    this.personasService.listarPersonas().subscribe(
      (data) => {
        this.personas = data.map((persona: any) => {
          persona.estadoTexto = persona.estado ? 'Activo' : 'Inactivo';
          persona.estadoClase = persona.estado ? 'text-success' : 'text-danger';
          persona.estadoIcono = persona.estado ? 'bg-success' : 'bg-danger';
          return persona;
        });
        this.personas = data.filter(persona => persona.estado);
        this.totalPersonas = this.personas.length; // Actualizar el número total de personas
        this.paginasTotales = this.generarPaginas(); // Generar números de página disponibles
        this.cargandoDatos = false; // Finalizar animación de carga
      },
      error => {
        console.error('Error al obtener los trabajadores:', error);
        this.cargandoDatos = false; // Finalizar animación de carga
      }
    );
  }

  eliminarTrabajador(id: number) {
    this.personasService.eliminarPersonas(id).subscribe(
      () => {
        this.personas = this.personas.filter(persona => persona.id !== id);
        this.totalPersonas = this.personas.length; // Actualizar el número total de vuelos
        this.paginasTotales = this.generarPaginas(); // Generar números de página disponibles
        
        // Verificar si la página actual está fuera de rango después de eliminar un vuelo
        const totalPaginas = this.calcularTotalPaginas();
        if (this.paginaActual >= totalPaginas) {
          this.paginaActual = Math.max(0, totalPaginas - 1); // Retroceder una página si está fuera de rango
        }
      },
    );
  }
  
  obtenerPersonasPaginaActual() {
    const startIndex = this.paginaActual * this.personasPorPagina;
    const endIndex = startIndex + this.personasPorPagina;
  
    // Aplicar el filtro por estado
    const personasFiltradas = this.personas.filter(persona => {
      if (this.filtroEstado === 'todos') {
        return true; // Mostrar todos los trabajadores si no hay filtro aplicado
      } else {
        return persona.trabajador === (this.filtroEstado === 'activo'); // Filtrar los trabajadores por estado
      }
    });
  
    // Filtrar los trabajadores por término de búsqueda si hay un término definido
    const personasFiltradasPorBusqueda = this.terminoBusqueda ?
      personasFiltradas.filter(persona => {
        const nombreCompleto = `${persona.nombre.toLowerCase()} ${persona.apellido.toLowerCase()}`;
        return nombreCompleto.includes(this.terminoBusqueda.toLowerCase()) ||
               persona.documento_identidad.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
      }) :
      personasFiltradas;
  
    // Verificar si no se encontraron resultados
    this.sinResultados = personasFiltradas.length > 0 && personasFiltradasPorBusqueda.length === 0;
  
    // Verificar si no hay trabajadores con el estado seleccionado
    this.sinPersonasConEstado = personasFiltradas.length === 0;
  
    // Obtener los trabajadores de la página actual desde el arreglo filtrado
    const personasPagina = personasFiltradasPorBusqueda.slice(startIndex, endIndex);
  
    // Ajustar el número de fila en función de los trabajadores mostrados en la página actual
    personasPagina.forEach((persona, index) => {
      persona.numeroFila = index + 1 + startIndex;
    });
    return personasPagina;
  }
  
  
  // Método para calcular el número total de páginas
  calcularTotalPaginas() {
    return Math.ceil(this.totalPersonas / this.personasPorPagina);
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