import { Component, OnInit } from '@angular/core';
import { ConfService } from 'src/app/services/conf/conf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-t-vuelo',
  templateUrl: './crear-t-vuelo.component.html',
  styleUrls: ['./crear-t-vuelo.component.scss']
})
export class CrearTVueloComponent implements OnInit {
  public focus;
  mostrarAviso: boolean = false;

  tipo: string;
  precio: number;
  tiempo: string;
  estado: boolean;

  constructor(private confService: ConfService, private router: Router) { }

  ngOnInit() {
  }

  crearVuelo() {
    // Verifica si los campos obligatorios están llenos
    if (!this.tipo || !this.precio || !this.tiempo) {
      console.error("Por favor, complete todos los campos obligatorios.");
      // Puedes mostrar un mensaje al usuario o realizar cualquier acción necesaria en caso de que los campos no estén llenos
      return; // Detiene la ejecución del método si los campos no están llenos
    }
    this.mostrarAviso = false;

    // Aquí puedes acceder a los valores de las propiedades y enviarlos al servicio para guardarlos en la base de datos
    const vueloData = {
      tipo: this.tipo,
      precio: this.precio,
      tiempo: this.tiempo,
      estado: this.estado,
    };

    // Llama al método en el servicio para crear el vuelo
    this.confService.crearVuelo(vueloData).subscribe(response => {
      // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito o navegar a otra página
      console.log("Vuelo creado exitosamente:", response);
      this.router.navigate(['/config']);
    }, error => {
      // Manejo de errores
      console.error("Error al crear vuelo:", error);
    });
  }
}
