import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.scss']
})
export class EditPersonaComponent implements OnInit {
  public focus;
  passwordType: string = 'password';
  mostrarDatosApoderado: boolean = false;

  constructor() { }

  ngOnInit() {
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

  onEsNinoJovenClick() {
    this.mostrarDatosApoderado = !this.mostrarDatosApoderado;
  }

}
