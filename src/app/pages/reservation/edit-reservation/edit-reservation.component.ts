import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {
  imagePath: string = 'https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg';
  public focus;
  inputFiles: File[] = [];
  fileNames: string[] = [];
  modalOpen: boolean = false;

  tiposDePago: any[] = [];
  canalVenta: any[] = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerTiposDePago();
    this.obtenerCanalVenta();
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

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  obtenerTiposDePago() {
    // realiza la solicitud HTTP a la API
    this.http.get<any[]>('https://django-rest-starter-zyi6-production.up.railway.app/api/TipoPago/')
      .subscribe(data => {
        // asigna los datos obtenidos al arreglo de tiposDePago
        this.tiposDePago = data;
      });
  }

  obtenerCanalVenta() {
    // realiza la solicitud HTTP a la API
    this.http.get<any[]>('https://django-rest-starter-zyi6-production.up.railway.app/api/CanalVenta/')
      .subscribe(data => {
        // asigna los datos obtenidos al arreglo de canalVenta
        this.canalVenta = data;
      });
  }
}
