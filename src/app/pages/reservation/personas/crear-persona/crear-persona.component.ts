import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { ConfService } from 'src/app/services/conf/conf.service';
import { Router } from '@angular/router';
import { TiposdocumentoService } from 'src/app/services/configuracion/tiposdocumento/tiposdocumento.service';
import { TiposvuelosService } from 'src/app/services/configuracion/tiposvuelos/tiposvuelos.service';
import { Persona } from 'src/app/models/persona/persona.model';
import { Reserva } from 'src/app/models/reserva/reserva.model';


@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent implements OnInit {
  public focus;
  passwordType: string = 'password';
  mostrarDatosApoderado: boolean = false;
  fechaActual: string;
  tiposDocumento: string[] = [];
  vuelos: string[] = [];
  mostrarAviso: boolean = false;

  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion: string;
  documento_identidad: string;
  dni_nino: string;
  nombre_nino: string;
  tipo_documento: number;

  constructor(
    private reservationService: ReservationService, 
    private confService: ConfService, 
    private router: Router, 
    private documentService: TiposdocumentoService, 
    private vuelosService: TiposvuelosService) { }

  ngOnInit() {
    // Obtener la fecha actual y formatearla como 'yyyy-MM-dd' (formato requerido por el input date)
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Agregar cero adelante si es necesario
    const day = ('0' + fecha.getDate()).slice(-2); // Agregar cero adelante si es necesario
    this.fechaActual = `${year}-${month}-${day}`;

    this.listarTiposDocumento();
    this.listarVuelos();
  }

  togglePasswordVisibility(): void {
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }

  mostrarDNI: boolean = false;
  mostrarPasaporte: boolean = false;
  mostrarDNI2: boolean = false;
  mostrarPasaporte2: boolean = false;

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
  
  crearReserva() {
    // Verifica si los campos obligatorios están llenos
    if (!this.nombre || !this.apellido ) {
      console.error("Por favor, complete todos los campos obligatorios.");
      // Puedes mostrar un mensaje al usuario o realizar cualquier acción necesaria en caso de que los campos no estén llenos
      return; // Detiene la ejecución del método si los campos no están llenos
    }
    this.mostrarAviso = false;

    // Aquí puedes acceder a los valores de las propiedades y enviarlos al servicio para guardarlos en la base de datos
    const personaData = {
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      email: this.email,
      direccion: this.direccion,
      documento_identidad: this.documento_identidad,
      dni_nino: this.dni_nino,
      nombre_nino: this.nombre_nino,
      tipo_documento: this.tipo_documento,
    };

    // Llama al método en el servicio para crear la persona
    this.reservationService.createPerson(personaData).subscribe(response => {
      // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito o navegar a otra página
      console.log("Persona creada exitosamente:", response);
      this.router.navigate(['/crear-reservation']);
    }, error => {
      // Manejo de errores
      console.error("Error al crear persona:", error);
    });
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
}