import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { Router } from '@angular/router';
import { PromocionService } from 'src/app/services/configuracion/promocion/promocion.service';
import { TipospagoService } from 'src/app/services/configuracion/tipospago/tipospago.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Reserva } from 'src/app/models/reserva/reserva.model';
import { TipobancoService } from 'src/app/services/configuracion/tipobanco/tipobanco.service';
import { Paquete } from 'src/app/models/paquetereserva/Paquete';
import { PaqueteReservaService } from 'src/app/services/paquetereserva/paquete-reserva.service';
import { TiposvuelosService } from 'src/app/services/configuracion/tiposvuelos/tiposvuelos.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-crear-reservation',
  templateUrl: './crear-reservation.component.html',
  styleUrls: ['./crear-reservation.component.scss']
})
export class CrearReservationComponent implements OnInit {
  imagePath: string = 'https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg';
  public focus;
  inputFiles: File[] = [];
  fileNames: string[] = [];
  tiposPago: string[] = [];
  tiposBanco: string[] = [];
  descuento: string[] = [];
  reservas: Reserva[] = [];
  cargandoDatos: boolean = true;
  tipos_pago: string;
  tipos_banco: string;
  promocion: string;
  userId: any;
  selectedTipoPago: string
  vuelos: any = {};
  totalPrecio: number = 0;
  selectedDescuento: any;

  nuevoPaquete: Paquete = {
    codigo: '',
    estado: false,
    pago_inicial: 0,
    pago_faltante: 0,
    costo_total: 0,
    url_pago: '',
    url_pago_reserva: '',
    comision: 0,
    descuento: 0,
    Usuario: 0,
    CanalVenta: 0,
    Reserva: [],
    TipoPago: []
  };


  constructor(
    private reservationService: ReservationService,  
    private router: Router, 
    private promocionService: PromocionService,
    private tipobancoService: TipobancoService,
    private tiposVuelosService: TiposvuelosService,
    private tipopagosService: TipospagoService,
    private paqueteReservaService: PaqueteReservaService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listarTiposPago();
    this.listarDescuentos();
    this.listarTipoBancos();
    this.authService.getUserData().subscribe(
      (data: any) => {
        this.userId = data.id;
        this.listarReservas();
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );

    this.tiposVuelosService.listarVuelos().subscribe(vuelos => {
      vuelos.forEach(vuelo => {
        this.vuelos[vuelo.id] = vuelo;
      });
    
    });

  }

  handleDescuentoChange(id: string) {
    console.log('handleDescuentoChange called with id:', id);
    const idAsNumber = Number(id);
    if (isNaN(idAsNumber)) {
      console.error('Error: id is not a number');
      return;
    }
    this.promocionService.listarPromocion().pipe(
      tap(descuentos => {
        console.log('descuentos:', descuentos);
        const descuentoSeleccionado = descuentos.find(descuento => descuento.id === idAsNumber);
        console.log('descuentoSeleccionado:', descuentoSeleccionado);
        if (descuentoSeleccionado) {
          this.selectedDescuento = descuentoSeleccionado;
          console.log('selectedDescuento updated:', this.selectedDescuento);
          console.log('selectedDescuento.porcentaje:', this.selectedDescuento.porcentaje);
          this.cdr.detectChanges();
        }
      })
    ).subscribe();
  }

  get precioFinal() {
    console.log('totalPrecio:', this.totalPrecio);
    let precio = this.totalPrecio;
    if (this.selectedDescuento) {
      precio = this.totalPrecio * (1 - this.selectedDescuento.porcentaje / 100);
    }
    console.log('precioFinal calculated:', precio);
    return precio;
  }

  handleFileInput(files: FileList): void {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.imagePath = event.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  agregarInput() {
    this.inputFiles.push(null);
    this.fileNames.push(''); // Inicializa el nombre del archivo como una cadena vacía
  }

  onFileSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    this.inputFiles[index] = file;
    this.fileNames[index] = this.truncarNombreArchivo(file.name); // Actualiza el nombre del archivo
  }

  eliminarInput(index: number) {
    this.inputFiles.splice(index, 1);
    this.fileNames.splice(index, 1);
  }

  descargarArchivo(file: File) {
    const blob = new Blob([file], { type: file.type });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = file.name;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

  // Método para truncar el nombre del archivo
  truncarNombreArchivo(nombre: string): string {
    const MAX_CARACTERES = 20;
    if (nombre.length > MAX_CARACTERES) {
      return nombre.substr(0, MAX_CARACTERES) + '...';
    }
    return nombre;
  }


  listarTiposPago() {
    this.tipopagosService.listarTiposPago().subscribe(
      (data: any[]) => {
        // Filtrar los tipos de pago que tengan estado true
        this.tiposPago = data.filter(tipoPago => tipoPago.estado === true);
        this.nuevoPaquete.TipoPago = data.filter(tipoPago => tipoPago.estado === true).map(tipoPago => tipoPago.id);

      },
      error => {
        console.error('Error al obtener los tipos de pago:', error);
      }
    );
  }

  listarDescuentos() {
    this.promocionService.listarPromocion().subscribe(
      (data: any[]) => {
        // Filtrar los descuentos que tengan estado true
        this.descuento = data.filter(descuento => descuento.estado === true);
      },
      error => {
        console.error('Error al obtener los descuentos:', error);
      }
    );
  }

  listarTipoBancos(){
    this.tipobancoService.listarTiposDocumento().subscribe(
      (data: any[]) => {
        // Filtrar los tipos de pago que tengan estado true
        this.tiposBanco = data.filter(tipoBancos => tipoBancos.estado === true);
      },
      error => {
        console.error('Error al obtener los tipos de pago:', error);
      }
    );

  }

  listarReservas() {
    this.reservationService.getFilteredReservas(this.userId).subscribe(
      (data: Reserva[]) => {
        this.reservas = data;
        this.totalPrecio = this.reservas.reduce((total, reserva) => total + this.vuelos[reserva.Vuelo].precio, 0);
        this.nuevoPaquete.Reserva = data.map(reserva => reserva.id);
        data.forEach(reserva => {
          reserva.estado = true;
          this.reservationService.updateEstadoReserva(reserva).subscribe();
        });

      },
      error => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }


  // create Paquete
  createPaquete(): void {
    this.paqueteReservaService.createPaquete(this.nuevoPaquete)
      .subscribe((paquete: Paquete) => {
        console.log('Paquete creado:', paquete);
        this.router.navigate(["/reservation"]);
        // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
      }, error => {
        console.error('Error al crear paquete:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      });
  }


}
