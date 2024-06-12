import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {

  fechaReserva: string;

  constructor() {
    this.fechaReserva = this.getFormattedDateTime(new Date());
  }

  ngOnInit() {
  }

   onFechaReservaChange() {
    // Aquí puedes agregar la lógica que desees para manejar el cambio de fecha
    console.log('Nueva fecha de reserva:', this.fechaReserva);
  }

  getFormattedDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZeroes(date.getMonth() + 1);
    const day = this.padZeroes(date.getDate());
    const hours = this.padZeroes(date.getHours());
    const minutes = this.padZeroes(date.getMinutes());

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }

  padZeroes(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
