import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Inicio',  icon: 'ni-tv-2 text-black', class: '' },
    { path: '/reservation', title: 'Reservas',  icon:'fa-solid fa-bars-staggered text-black', class: '' },
    { path: '/vuelos', title: 'Vuelos',  icon:'fa-solid fa-paper-plane text-black', class: '' },
    { path: '/workpeople', title: 'Trabajadores',  icon:'fa-solid fa-users text-black', class: '' },
    { path: '/users', title: 'Usuarios',  icon:'fa-solid fa-user-gear text-black', class: '' },
    { path: '/user-profile', title: 'Mi Perfil',  icon:'fa-solid fa-circle-user text-black', class: '' },   
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

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  
}
