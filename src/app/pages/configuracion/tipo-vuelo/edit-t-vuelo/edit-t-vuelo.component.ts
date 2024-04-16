import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiposvuelosService } from 'src/app/services/configuracion/tiposvuelos/tiposvuelos.service';

@Component({
  selector: 'app-edit-t-vuelo',
  templateUrl: './edit-t-vuelo.component.html',
  styleUrls: ['./edit-t-vuelo.component.scss']
})
export class EditTVueloComponent implements OnInit {
  id: number; 

  tipoOriginal: string;
  precioOriginal: number;
  tiempoOriginal: string;
  estadoOriginal: string;

  tipo: string;
  precio: number;
  tiempo: string;
  estado: string;

  edicionActiva: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private vuelosService: TiposvuelosService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del vuelo de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id'); // Convertir a number
      // Llamar al servicio para obtener los datos del vuelo
      this.vuelosService.obtenerVuelo(this.id).subscribe(data => {
        // Almacenar los datos originales
        this.tipoOriginal = data.tipo;
        this.precioOriginal = data.precio;
        this.tiempoOriginal = data.tiempo;
        this.estadoOriginal = data.estado;

        // Asignar los datos del vuelo a las variables
        this.tipo = this.tipoOriginal;
        this.precio = this.precioOriginal;
        this.tiempo = this.tiempoOriginal;
        this.estado = this.estadoOriginal;
      });
    });
  }

  verificarCambios(): void {
    if (
      this.tipo !== this.tipoOriginal ||
      this.precio !== this.precioOriginal ||
      this.tiempo !== this.tiempoOriginal ||
      this.estado !== this.estadoOriginal
    ) {
      this.edicionActiva = true;
    } else {
      this.edicionActiva = false;
    }
  }

  editarVuelo(): void {
    // Crea un objeto con los datos actualizados
    const vueloActualizado = {
      tipo: this.tipo,
      precio: this.precio,
      tiempo: this.tiempo,
      estado: this.estado
    };

    this.vuelosService.editarVuelo(this.id, vueloActualizado).subscribe(response => {
      console.log("Vuelo editado exitosamente:", response);
      this.router.navigate(['/config']);
    });
  }
}
