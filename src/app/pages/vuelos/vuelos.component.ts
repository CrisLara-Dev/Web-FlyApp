import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss']
})
export class VuelosComponent implements OnInit {
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
