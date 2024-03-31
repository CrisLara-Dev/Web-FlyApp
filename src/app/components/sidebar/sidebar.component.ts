import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'; // Importa el servicio de autenticación

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    allowedRoles?: string[]; // Agrega la propiedad allowedRoles opcional
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Inicio',  icon: 'ni-tv-2 text-black', class: '', allowedRoles: ['Administrador'] },
    { path: '/reservation', title: 'Reservas',  icon:'fa-solid fa-bars-staggered text-black', class: '', allowedRoles: ['Administrador', 'Community Manager'] },
    { path: '/vuelos', title: 'Vuelos',  icon:'fa-solid fa-paper-plane text-black', class: '', allowedRoles: ['Administrador', 'Community Manager'] },
    { path: '/config', title: 'Configuración',  icon:'fa-solid fa-gear text-black', class: '', allowedRoles: ['Administrador'] },
    { path: '/workpeople', title: 'Trabajadores',  icon:'fa-solid fa-users text-black', class: '', allowedRoles: ['Administrador'] },
    { path: '/users', title: 'Usuarios',  icon:'fa-solid fa-user-gear text-black', class: '', allowedRoles: ['Administrador'] },
    { path: '/user-profile', title: 'Mi Perfil',  icon:'fa-solid fa-circle-user text-black', class: '' , allowedRoles: ['Administrador', 'Community Manager']},   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  modalOpen: boolean = false;
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private authService: AuthService) { } // Inyecta el servicio de autenticación

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => {
      if (menuItem.allowedRoles) {
        // Verifica si la ruta tiene roles permitidos y si el usuario tiene alguno de esos roles
        return menuItem.allowedRoles.some(role => this.authService.getUserRole() === role);
      } else {
        return true; // Si no hay roles permitidos, muestra la ruta
      }
    });
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }  
}
