import { Component, OnInit } from '@angular/core';
import { ConfService } from 'src/app/services/conf/conf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-promociones',
  templateUrl: './crear-promociones.component.html',
  styleUrls: ['./crear-promociones.component.scss']
})
export class CrearPromocionesComponent implements OnInit {
  mostrarAviso: boolean = false;
  porcentaje1: string = '';
  codigo: string;
  fecha_inicio: string;
  fecha_fin: string;
  porcentaje: number;
  estado: boolean;

  constructor(private confService: ConfService, private router: Router) { }


  ngOnInit() {
    this.generarCodigo();
  }

  crearPromocion() {
    // Verifica si los campos obligatorios están llenos
    if (!this.codigo || !this.fecha_inicio || !this.fecha_fin || !this.porcentaje ) {
      console.error("Por favor, complete todos los campos obligatorios.");
      // Puedes mostrar un mensaje al usuario o realizar cualquier acción necesaria en caso de que los campos no estén llenos
      return; // Detiene la ejecución del método si los campos no están llenos
    }
    this.mostrarAviso = false;

    // Aquí puedes acceder a los valores de las propiedades y enviarlos al servicio para guardarlos en la base de datos
    const descuentoData = {
      codigo: this.codigo,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
      porcentaje: this.porcentaje,
      estado: this.estado,
    };

    // Llama al método en el servicio para crear la promoción
    this.confService.crearPromocion(descuentoData).subscribe(response => {
      // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito o navegar a otra página
      console.log("Promoción creado exitosamente:", response);
      this.router.navigate(['/config']);
    }, error => {
      // Manejo de errores
      console.error("Error al crear promoción:", error);
    });
  }

  generarCodigo() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codigoAleatorio = 'FLY-';
    for (let i = 0; i < 5; i++) {
      codigoAleatorio += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    this.codigo = codigoAleatorio;
  }
}
