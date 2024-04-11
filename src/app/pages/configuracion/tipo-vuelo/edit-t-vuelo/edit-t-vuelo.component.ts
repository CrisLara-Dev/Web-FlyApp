import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfService } from 'src/app/services/conf/conf.service';
import { TiposvuelosService } from 'src/app/services/configuracion/tiposvuelos/tiposvuelos.service';

@Component({
  selector: 'app-edit-t-vuelo',
  templateUrl: './edit-t-vuelo.component.html',
  styleUrls: ['./edit-t-vuelo.component.scss']
})
export class EditTVueloComponent implements OnInit {
  id: number; // ID del vuelo a editar
  tipo: string;
  precio: number;
  tiempo: string;
  estado: string;
  
  constructor(private confService: ConfService, private router: Router, private route: ActivatedRoute, private vuelosService: TiposvuelosService) { }

  ngOnInit(): void {
    // Obtener el ID del vuelo de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id'); // Convertir a number
      // Llamar al servicio para obtener los datos del vuelo
      this.vuelosService.obtenerVuelo(this.id).subscribe(data => {
        // Asignar los datos del vuelo a las variables
        this.tipo = data.tipo;
        this.precio = data.precio;
        this.tiempo = data.tiempo;
        this.estado = data.estado;

        console.log("Datos del vuelo:", data);
      });
    });
  }

  editarVuelo(): void {
    // Crea un objeto con los datos actualizados
    const vueloActualizado = {
      tipo: this.tipo,
      precio: this.precio,
      tiempo: this.tiempo,
      estado: this.estado
    };

    // Llama al servicio para actualizar los datos del vuelo
    this.vuelosService.editarVuelo(this.id, vueloActualizado).subscribe(response => {
      // Redirige al usuario a la página de detalles del vuelo actualizado
      console.log("Vuelo editado exitosamente:", response);
      this.router.navigate(['/config']);
    }, error => {
      // Manejo de errores
      console.error("Error al editar el vuelo:", error);
    });
  }
}
