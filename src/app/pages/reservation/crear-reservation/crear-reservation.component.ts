import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { Router } from '@angular/router';
import { PromocionService } from 'src/app/services/configuracion/promocion/promocion.service';
import { TipospagoService } from 'src/app/services/configuracion/tipospago/tipospago.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Reserva } from 'src/app/models/reserva/reserva.model';
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
  descuento: string[] = [];
  reservas: Reserva[] = [];
  cargandoDatos: boolean = true;
  tipos_pago: string;
  promocion: string;
  userId: any;


  constructor(private reservationService: ReservationService,  
    private router: Router, 
    private promocionService: PromocionService,
    private tipopagosService: TipospagoService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.listarTiposPago();
    this.listarDescuentos();

    this.authService.getUserData().subscribe(
      (data: any) => {
        this.userId = data.id;
        this.listarReservas();
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
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


  listarReservas() {
    this.reservationService.getFilteredReservas(this.userId).subscribe(
      (data: Reserva[]) => {
        this.reservas = data;
      },
      error => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }



}
