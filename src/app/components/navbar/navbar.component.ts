import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location, LocationStrategy, PathLocationStrategy } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  
  public userDetails: any;
  public focus;
  public listTitles: any[];
  public location: Location;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private authService: AuthService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService.getUserData().subscribe(
      (response: any) => {
        this.userDetails = response; // Asignar los detalles del usuario a la variable userDetails
      },
      (error) => {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    );
  }
  
  
  getTitle() {
  var titlee = this.location.prepareExternalUrl(this.location.path());
  if (titlee.charAt(0) === "#") {
    titlee = titlee.slice(1);
  }

  for (var item = 0; item < this.listTitles.length; item++) {
    if (this.listTitles[item].path === titlee) {
      return this.listTitles[item].title;
    }
  }
    return "Inicio";
  }

  
  logout() {
    this.authService.logout().subscribe((response) => {
      console.log(response);
    });
  }
}
