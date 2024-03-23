import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.scss']
})
export class AsistenciasComponent implements OnInit {
  public focus;
  imagePath: string = 'assets/img/theme/team-4-800x800.jpg';
  modalOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
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

  colores: string[] = ['success', 'danger', 'yellow'];
  mensajes: string[] = ['Puntual', 'Tarde', 'Falta'];
  coloresText: string[] = ['white', 'black', 'white'];

  indiceActual: number = 0;

  onClick() {
    this.indiceActual = (this.indiceActual + 1) % this.colores.length;
  }

}
