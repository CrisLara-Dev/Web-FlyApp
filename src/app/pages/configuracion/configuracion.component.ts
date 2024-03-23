import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  public focus;
  modalOpen: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }
  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
