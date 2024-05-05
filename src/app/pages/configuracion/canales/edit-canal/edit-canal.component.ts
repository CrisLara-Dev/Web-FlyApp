import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanalventaService } from 'src/app/services/configuracion/canalventa/canalventa.service';
import { Canales } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-canal',
  templateUrl: './edit-canal.component.html',
  styleUrls: ['./edit-canal.component.scss']
})
export class EditCanalComponent implements OnInit {
  id: number; 
  
  canalOriginal: Canales;
  canalEditado: Canales;

  edicionActiva: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private canalService: CanalventaService,
    private toastr: ToastrService 
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id'); 
      this.canalService.obtenerCanal(this.id).subscribe(data => {
        this.canalOriginal = data;
        this.canalEditado = { ...this.canalOriginal };
        this.verificarCambios();
      });
    });
  }

  verificarCambios(): void {
      // Verificar si hay cambios en los campos
      const cambiosNombre = this.canalEditado.nombre !== this.canalOriginal.nombre;
      const cambiosEstado = this.canalEditado.estado !== this.canalOriginal.estado;
  
      // Activar la edición si hay algún cambio y todos los campos están llenos
      this.edicionActiva = (cambiosNombre ||  cambiosEstado) && 
                      !!(this.canalEditado.nombre);
    }

  editarCanal(): void {
  // Verificar si el código promocional ya existe
  this.canalService.listarCanal().subscribe(canal => {
    const canalConMismoNombre = canal.find(canal => canal.nombre === this.canalEditado.nombre && canal.id !== this.id);
    if (canalConMismoNombre) {
        this.toastr.error(`El código canal '${canalConMismoNombre.nombre}' ya está en uso.`, '¡Error!', { positionClass: 'toast-bottom-right' });
    } else {
        // Si el código no existe, realizar la edición
        this.canalService.editarCanal(this.id, this.canalEditado).subscribe(response => {
          this.router.navigate(['/config']);
        });
      }
    });
  }
}
