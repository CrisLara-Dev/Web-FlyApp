import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-users',
  templateUrl: './crear-users.component.html',
  styleUrls: ['./crear-users.component.scss']
})
export class CrearUsersComponent implements OnInit {
  public focus;
  passwordType: string = 'password';
  
  constructor() { }

  ngOnInit() {
  }

  togglePasswordVisibility(): void {
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }
}
