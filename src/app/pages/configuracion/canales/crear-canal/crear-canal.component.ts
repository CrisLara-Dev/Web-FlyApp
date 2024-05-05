import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Canales } from 'src/app/models';
import { CanalventaService } from 'src/app/services/configuracion/canalventa/canalventa.service';

@Component({
  selector: 'app-crear-canal',
  templateUrl: './crear-canal.component.html',
  styleUrls: ['./crear-canal.component.scss']
})
export class CrearCanalComponent implements OnInit {
 
  canal: Canales = {
    nombre: '',
    estado: true,
  };

  camposLlenos: boolean = false;

  constructor(
    private router: Router,
    private canalService: CanalventaService,
    private toastr: ToastrService 
  ) { }


  ngOnInit() {
  }

  verificarCamposLlenos() {
    this.camposLlenos = !!(this.canal.nombre);
  }

  crearCanal() {
    if (!this.canal.nombre) {
      console.error("Por favor, complete todos los campos obligatorios.");
      return; 
    }
  
  this.canalService.listarCanal().subscribe((canales: Canales[]) => {
    const nombreExistente = canales.find(canal => canal.nombre === this.canal.nombre);
    if (nombreExistente) {
      this.toastr.error(`El nombre '${nombreExistente.nombre}' ya está en uso.`, '¡Error!', { positionClass: 'toast-bottom-right' });
    } else {
    this.canalService.crearCanal(this.canal).subscribe(response => {
      this.router.navigate(['/config']);
      });
      }
    });
  }
}
