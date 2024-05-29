import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiposvuelosService } from 'src/app/services/configuracion/tiposvuelos/tiposvuelos.service';
import { Tipovuelos } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-t-vuelo',
  templateUrl: './edit-t-vuelo.component.html',
  styleUrls: ['./edit-t-vuelo.component.scss']
})
export class EditTVueloComponent implements OnInit {
  
  id: number; 
  vueloOriginal: Tipovuelos;
  vueloEditado: Tipovuelos;

  edicionActiva: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private vuelosService: TiposvuelosService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del vuelo de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id'); // Convertir a number
      // Llamar al servicio para obtener los datos del vuelo
      this.vuelosService.obtenerVuelo(this.id).subscribe(data => {
        // Almacenar los datos originales
        this.vueloOriginal = data;
        // Clonar el vuelo original para editar
        this.vueloEditado = { ...this.vueloOriginal };
        // Verificar si la edición está activa
        this.verificarCambios();
      });
    });
  }

  verificarCambios(): void {
    // Verificar si hay cambios en los campos
    const cambiosNombre = this.vueloEditado.tipo !== this.vueloOriginal.tipo;
    const cambiosPrecio = this.vueloEditado.precio !== this.vueloOriginal.precio;
    const cambiosTiempo = this.vueloEditado.tiempo !== this.vueloOriginal.tiempo;
    const cambiosEstado = this.vueloEditado.estado !== this.vueloOriginal.estado;

    // Activar la edición si hay algún cambio y todos los campos están llenos
    this.edicionActiva = (cambiosNombre || cambiosPrecio || cambiosTiempo || cambiosEstado) && 
                         !!(this.vueloEditado.tipo && this.vueloEditado.precio && this.vueloEditado.tiempo);
  }

  editarVuelo(): void {
    // Verificar si el tipo de vuelo editado ya existe
    this.vuelosService.listarVuelos().subscribe((tiposVuelos: Tipovuelos[]) => {
      const tipoExistente = tiposVuelos.find(tipo => tipo.tipo === this.vueloEditado.tipo && tipo.id !== this.id);
      if (tipoExistente) {
        this.toastr.error(`El tipo de vuelo '${tipoExistente.tipo}' ya está en uso.`, '¡Error!', { positionClass: 'toast-bottom-right' });
      } else {
        this.vuelosService.editarVuelo(this.id, this.vueloEditado).subscribe(response => {
          console.log("Vuelo editado exitosamente:", response);
          this.router.navigate(['/config']);
        });
      }
    });
  }
}
