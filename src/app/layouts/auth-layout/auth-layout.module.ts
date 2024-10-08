import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 

import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';
import { FormSatisfactionComponent } from 'src/app/pages/form-satisfaction/form-satisfaction.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    FormSatisfactionComponent
  ]
})
export class AuthLayoutModule { }
