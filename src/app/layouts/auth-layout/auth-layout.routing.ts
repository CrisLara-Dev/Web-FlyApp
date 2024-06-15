import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';
import { FormSatisfactionComponent } from 'src/app/pages/form-satisfaction/form-satisfaction.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'reset-password',       component: ResetPasswordComponent },
    { path: 'form-satisfaction',       component: FormSatisfactionComponent }
];
