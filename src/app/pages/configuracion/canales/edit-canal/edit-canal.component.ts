import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanalventaService } from 'src/app/services/configuracion/canalventa/canalventa.service';

@Component({
  selector: 'app-edit-canal',
  templateUrl: './edit-canal.component.html',
  styleUrls: ['./edit-canal.component.scss']
})
export class EditCanalComponent implements OnInit {
  id: number; 
  
  nombreOriginal: string;
  estadoOriginal: string;

  nombre: string;
  estado: string;

  edicionActiva: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private canalService: CanalventaService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id'); 
      this.canalService.obtenerCanal(this.id).subscribe(data => {
        this.nombreOriginal = data.nombre;
        this.estadoOriginal = data.estado;

        this.nombre = this.nombreOriginal;
        this.estado = this.estadoOriginal;
      });
    });
  }

  verificarCambios(): void {
    if (
      this.nombre !== this.nombreOriginal ||
      this.estado !== this.estadoOriginal
    ) {
      this.edicionActiva = true;
    } else {
      this.edicionActiva = false;
    }
  }

  editarCanal(): void {
    const canalActualizado = {
      nombre: this.nombre,
      estado: this.estado
    };

    this.canalService.editarCanal(this.id, canalActualizado).subscribe(response => {
      this.router.navigate(['/config']);
    });
  }
}