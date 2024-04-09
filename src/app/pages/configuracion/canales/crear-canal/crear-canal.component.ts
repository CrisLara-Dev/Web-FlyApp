import { Component, OnInit } from '@angular/core';
import { ConfService } from 'src/app/services/conf/conf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-canal',
  templateUrl: './crear-canal.component.html',
  styleUrls: ['./crear-canal.component.scss']
})
export class CrearCanalComponent implements OnInit {
  mostrarAviso: boolean = false;

  nombre: string;
  estado: boolean;
  camposLlenos: boolean = false;

  constructor(private confService: ConfService, private router: Router) { }

  ngOnInit() {
  }

  verificarCamposLlenos() {
    this.camposLlenos = !!(this.nombre);
  }

  crearCanal() {
    // Verifica si los campos obligatorios están llenos
    if (!this.nombre) {
      console.error("Por favor, complete todos los campos obligatorios.");
      // Puedes mostrar un mensaje al usuario o realizar cualquier acción necesaria en caso de que los campos no estén llenos
      return; // Detiene la ejecución del método si los campos no están llenos
    }
    this.mostrarAviso = false;

    // Aquí puedes acceder a los valores de las propiedades y enviarlos al servicio para guardarlos en la base de datos
    const canalData = {
      nombre: this.nombre,
      estado: this.estado,
    };

    // Llama al método en el servicio para crear el canal
    this.confService.crearCanal(canalData).subscribe(response => {
      // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito o navegar a otra página
      console.log("Canal creado exitosamente:", response);
      this.router.navigate(['/config']);
    }, error => {
      // Manejo de errores
      console.error("Error al crear canal:", error);
    });
  }  
}
