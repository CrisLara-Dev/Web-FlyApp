import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { ConfService } from 'src/app/services/conf/conf.service';
import { Router } from '@angular/router';

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

  tipos_pago: string;

  constructor(private reservationService: ReservationService,  private confService: ConfService, private router: Router) { }

  ngOnInit(): void {
    this.listarTiposPago();
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
    this.confService.listarTiposPago().subscribe(
      (data: any[]) => {
        // Filtrar los tipos de pago que tengan estado true
        this.tiposPago = data.filter(tipoPago => tipoPago.estado === true);
      },
      error => {
        console.error('Error al obtener los tipos de pago:', error);
      }
    );
  }

  crearReserva() {
    const nuevaReserva = {
      tipos_pago: this.tipos_pago
    };

    this.reservationService.crearReserva(nuevaReserva)
      .subscribe(
        (response) => {
          console.log('Reserva creada:', response);
          // Redirigir al usuario a la página de reservas
          this.router.navigate(['/reservation']);
        },
        (error) => {
          console.error('Error al crear reserva:', error);
        }
      );
  }

}
