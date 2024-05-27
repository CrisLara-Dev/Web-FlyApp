import { Component, OnInit } from '@angular/core';
import { Persona, Usuario } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public focus;

  usuarios: Usuario[] = [];
  totalUsuarios: number;
  usuariosPorPagina: number = 8; 
  paginaActual: number = 0; 
  paginasTotales: number[] = []; 
  filtroEstado: string = 'todos'; 
  UsuariosFiltrados: Persona[] = [];
  terminoBusqueda: string = '';
  sinResultados: boolean = false;
  sinUsuariosConEstado: boolean = false;
  cargandoDatos: boolean = true;

  constructor(
    private personasService: PersonaService,
    private usuariosService: UsuarioService,
  ) { }

  ngOnInit() {
    this.listarUsuario();
  }
  // Método para cambiar el número de filas de la tabla
  cambiarFilas(event: Event) {
    const filas = (event.target as HTMLSelectElement).value;
    this.usuariosPorPagina = parseInt(filas, 10); // Convertir el valor a número
    this.paginasTotales = this.generarPaginas(); // Actualizar números de página disponibles
    this.paginaActual = 0; // Reiniciar la página actual a la primera página
  }
  
  
  listarUsuario() {
    this.cargandoDatos = true; // Iniciar animación de carga
    this.usuariosService.listarUsuarios().subscribe(
      (data) => {
        this.usuarios = data.map((usuario: any) => {
          usuario.estadoTexto = usuario.is_active ? 'Activo' : 'Inactivo';
          usuario.estadoClase = usuario.is_active ? 'text-success' : 'text-danger';
          usuario.estadoIcono = usuario.is_active ? 'bg-success' : 'bg-danger';
          return usuario;
        });
        // this.usuarios = data.filter(usuario => usuario.trabajador);
        // this.usuarios = data.filter(usuario => usuario.estado);
        this.totalUsuarios = this.usuarios.length; // Actualizar el número total de usuarios
        this.paginasTotales = this.generarPaginas(); // Generar números de página disponibles
        this.cargandoDatos = false; // Finalizar animación de carga
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
        this.cargandoDatos = false; // Finalizar animación de carga
      }
    );
  }

  eliminarUsuario(id: number) {
    this.usuariosService.eliminarUsuarios(id).subscribe(
      () => {
        this.usuarios = this.usuarios.filter(persona => persona.id !== id);
        this.totalUsuarios = this.usuarios.length; // Actualizar el número total de vuelos
        this.paginasTotales = this.generarPaginas(); // Generar números de página disponibles
        
        // Verificar si la página actual está fuera de rango después de eliminar un vuelo
        const totalPaginas = this.calcularTotalPaginas();
        if (this.paginaActual >= totalPaginas) {
          this.paginaActual = Math.max(0, totalPaginas - 1); // Retroceder una página si está fuera de rango
        }
      },
    );
  }
  
  obtenerUsuariosPaginaActual() {
    const startIndex = this.paginaActual * this.usuariosPorPagina;
    const endIndex = startIndex + this.usuariosPorPagina;
  
    // Aplicar el filtro por estado
    const usuariosFiltrados = this.usuarios.filter(usuario => {
      if (this.filtroEstado === 'todos') {
        return true; // Mostrar todos los trabajadores si no hay filtro aplicado
      } else {
        return usuario.is_active === (this.filtroEstado === 'activo'); // Filtrar los vuelos por estado
      }
    });
  
    // Filtrar los vuelos por término de búsqueda si hay un término definido
    const usuariosFiltradosPorBusqueda = this.terminoBusqueda ?
      usuariosFiltrados.filter(usuario => usuario.email.toLowerCase().includes(this.terminoBusqueda.toLowerCase())) :
      usuariosFiltrados;
  
    // Verificar si no se encontraron resultados
    this.sinResultados = usuariosFiltrados.length > 0 && usuariosFiltradosPorBusqueda.length === 0;
  
    // Verificar si no hay vuelos con el estado seleccionado
    this.sinUsuariosConEstado = usuariosFiltrados.length === 0;
  
    // Obtener los vuelos de la página actual desde el arreglo filtrado
    const usuariosPagina = usuariosFiltradosPorBusqueda.slice(startIndex, endIndex);
  
    // Ajustar el número de fila en función de los vuelos mostrados en la página actual
    usuariosPagina.forEach((persona, index) => {
      persona.numeroFila = index + 1 + startIndex;
    });
    return usuariosPagina;
  }
  
  // Método para calcular el número total de páginas
  calcularTotalPaginas() {
    return Math.ceil(this.totalUsuarios / this.usuariosPorPagina);
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

