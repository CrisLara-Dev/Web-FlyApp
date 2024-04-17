import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { ConfService } from 'src/app/services/conf/conf.service';
import { Router } from '@angular/router';
import { TiposdocumentoService } from 'src/app/services/configuracion/tiposdocumento/tiposdocumento.service';
import { TiposvuelosService } from 'src/app/services/configuracion/tiposvuelos/tiposvuelos.service';
import { Persona } from 'src/app/models/persona/persona.model';
import { Reserva } from 'src/app/models/reserva/reserva.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { ApiReniecService } from 'src/app/services/reniec/api-reniec.service';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent implements OnInit {
  public focus;

  nuevaReserva: Reserva = {
    Vuelo: 0,
    fecha_reserva: '',
    persona: {
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      documento_identidad: '',
      trabajador: false,
      estado: false,
      dni_nino: '',
      nombre_nino: '',
      tipo_documento: 0
    },
    estado: false,
    Usuario: 0,
  };

  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }


  passwordType: string = 'password';
  mostrarDatosApoderado: boolean = false;
  fechaActual: string;
  tiposDocumento: string[] = [];
  vuelos: string[] = [];
  mostrarAviso: boolean = false;
  mostrarDNI: boolean = false;
  mostrarPasaporte: boolean = false;
  mostrarDNI2: boolean = false;
  mostrarPasaporte2: boolean = false;
  
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string;
  direccion?: string;
  documento_identidad: string;
  dni_nino?: string;
  nombre_nino?: string;
  tipo_documento: number;


  formatDateTime(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }


  constructor(
    private reservationService: ReservationService, 
    private authService: AuthService,
    private confService: ConfService, 
    private router: Router, 
    private documentService: TiposdocumentoService, 
    private vuelosService: TiposvuelosService,
    private reniecService: ApiReniecService
  ) { }

  ngOnInit() {
    // Obtener la fecha actual y formatearla como 'yyyy-MM-dd' (formato requerido por el input date)
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Agregar cero adelante si es necesario
    const day = ('0' + fecha.getDate()).slice(-2); // Agregar cero adelante si es necesario
    this.fechaActual = `${year}-${month}-${day}`;

    this.listarTiposDocumento();
    this.listarVuelos();
    this.authService.getUserData().subscribe(
      (userData) => {
        console.log('Datos del usuario:', userData);
        this.nuevaReserva.Usuario = userData.id;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    )
  }

  togglePasswordVisibility(): void {
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }

  

  limitarLongitud(event: any, max_length: number) {
    const input = event.target;
    if (input.value.length >= max_length) {
      event.preventDefault();
    }
  }

  onTipoDocumentoSeleccionado(event: any) {
    const valorSeleccionado = event.target.value;

    // Actualiza las variables de visibilidad
    this.mostrarDNI = valorSeleccionado === '1';
    this.mostrarPasaporte = valorSeleccionado === '2';
  }

  onTipoDocumentoSeleccionado2(event: any) {
    const valorSeleccionado = event.target.value;

    // Actualiza las variables de visibilidad
    this.mostrarDNI2 = valorSeleccionado === '1';
    this.mostrarPasaporte2 = valorSeleccionado === '2';
  }

  onEsNinoClick() {
    this.mostrarDatosApoderado = !this.mostrarDatosApoderado;
  }


  crearReservas(): void {
    console.log('Datos de reserva:', this.nuevaReserva);
    // Verifica si los campos obligatorios están llenos
    if (!this.nuevaReserva.persona.nombre || !this.nuevaReserva.persona.apellido) {
      console.error("Por favor, complete todos los campos obligatorios.");
      // Puedes mostrar un mensaje al usuario o realizar cualquier acción necesaria en caso de que los campos no estén llenos
      return; // Detiene la ejecución del método si los campos no están llenos
    }
    this.mostrarAviso = false;
    console.log('Fecha de reserva antes de la verificación:', this.nuevaReserva.fecha_reserva);
    this.reservationService.createReserva({ ...this.nuevaReserva }).subscribe(
      (reservaCreada) => {
        this.router.navigate(["/crear-reservation"]);
        console.log('Reserva creada:', reservaCreada);
      },
      (error) => {
        console.error('Error al crear la reserva:', error);
        // Aquí podrías mostrar un mensaje de error al usuario o realizar alguna otra acción de manejo de errores
      }
    );
  }


  listarTiposDocumento() {
    this.documentService.listarTiposDocumento().subscribe(
      (data: any[]) => {
        this.tiposDocumento = data.filter(tipoDocumento => tipoDocumento.estado === true);
      },
      error => {
        console.error('Error al obtener los tipos de documento:', error);
      }
    );
  }

  listarVuelos() {
    this.vuelosService.listarVuelos().subscribe(
      (data: any[]) => {
        this.vuelos = data.filter(vuelo => vuelo.estado === true);
      },
      error => {
        console.error('Error al obtener los vuelos:', error);
      }
    );
  }

  getDni() {
    this.reniecService.getDni(this.nuevaReserva.persona.documento_identidad).subscribe(
      (data: any) => {
        console.log('Datos de la persona:', data);
        this.nuevaReserva.persona.nombre = data.nombres;
        this.nuevaReserva.persona.apellido = data.apellidoPaterno + ' ' + data.apellidoMaterno;
      },
      (error) => {
        console.error('Error al obtener los datos de la persona:', error);
      }
    );
  }
}