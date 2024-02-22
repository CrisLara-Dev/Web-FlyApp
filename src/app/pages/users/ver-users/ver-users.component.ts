import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-users',
  templateUrl: './ver-users.component.html',
  styleUrls: ['./ver-users.component.scss']
})
export class VerUsersComponent implements OnInit {

  public focus;
  passwordType: string = 'password';
  
  constructor() { }

  ngOnInit() {
  }

  togglePasswordVisibility(): void {
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }
}
