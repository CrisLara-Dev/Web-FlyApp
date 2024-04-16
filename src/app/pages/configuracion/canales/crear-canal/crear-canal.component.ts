import { Component, OnInit } from '@angular/core';
import { ConfService } from 'src/app/services/conf/conf.service';
import { Router } from '@angular/router';
import { CanalventaService } from 'src/app/services/configuracion/canalventa/canalventa.service';

@Component({
  selector: 'app-crear-canal',
  templateUrl: './crear-canal.component.html',
  styleUrls: ['./crear-canal.component.scss']
})
export class CrearCanalComponent implements OnInit {
 
  nombre: string;
  estado: boolean;

  camposLlenos: boolean = false;

  constructor(
    private router: Router,
    private canalService: CanalventaService,
  ) { }


  ngOnInit() {
  }

  verificarCamposLlenos() {
    this.camposLlenos = !!(this.nombre);
  }

  crearCanal() {
    if (!this.nombre) {
      console.error("Por favor, complete todos los campos obligatorios.");
      return; 
    }
  
    const canalData = {
      nombre: this.nombre,
      estado: this.estado,
    };
  
    this.canalService.crearCanal(canalData).subscribe(response => {
      this.router.navigate(['/config']);
    });
  }

}
