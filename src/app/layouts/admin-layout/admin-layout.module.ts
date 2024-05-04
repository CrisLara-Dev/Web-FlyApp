import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservationComponent } from 'src/app/pages/reservation/reservation.component';
import { VuelosComponent } from 'src/app/pages/vuelos/vuelos.component';
import { WorkpeopleComponent } from 'src/app/pages/workpeople/workpeople.component';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { EditUserProfileComponent } from 'src/app/pages/user-profile/edit-user-profile/edit-user-profile.component';
import { CrearTVueloComponent } from 'src/app/pages/configuracion/tipo-vuelo/crear-t-vuelo/crear-t-vuelo.component';
import { EditTVueloComponent } from 'src/app/pages/configuracion/tipo-vuelo/edit-t-vuelo/edit-t-vuelo.component';
import { CrearPromocionesComponent } from 'src/app/pages/configuracion/promociones/crear-promociones/crear-promociones.component';
import { EditPromocionesComponent } from 'src/app/pages/configuracion/promociones/edit-promociones/edit-promociones.component';
import { CrearWorkpeopleComponent } from 'src/app/pages/workpeople/crear-workpeople/crear-workpeople.component';
import { EditWorkpeopleComponent } from 'src/app/pages/workpeople/edit-workpeople/edit-workpeople.component';
import { EditUsersComponent } from 'src/app/pages/users/edit-users/edit-users.component';
import { CrearUsersComponent } from 'src/app/pages/users/crear-users/crear-users.component';
import { CrearReservationComponent } from 'src/app/pages/reservation/crear-reservation/crear-reservation.component';
import { CrearPersonaComponent } from 'src/app/pages/reservation/personas/crear-persona/crear-persona.component';
import { EditPersonaComponent } from 'src/app/pages/reservation/personas/edit-persona/edit-persona.component';
import { CrearCanalComponent } from 'src/app/pages/configuracion/canales/crear-canal/crear-canal.component';
import { EditCanalComponent } from 'src/app/pages/configuracion/canales/edit-canal/edit-canal.component';
import { ConfiguracionComponent } from 'src/app/pages/configuracion/configuracion.component';
import { CrearRedComponent } from 'src/app/pages/configuracion/redes/crear-red/crear-red.component';
import { EditRedComponent } from 'src/app/pages/configuracion/redes/edit-red/edit-red.component';
import { EditReservationComponent } from 'src/app/pages/reservation/edit-reservation/edit-reservation.component';
import { AsistenciasComponent } from 'src/app/pages/users/asistencias/asistencias.component';
import { PromocionesComponent } from 'src/app/pages/configuracion/promociones/promociones.component';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ReservationComponent,
    VuelosComponent,
    WorkpeopleComponent,
    UsersComponent,
    EditUserProfileComponent,
    CrearTVueloComponent,
    EditTVueloComponent,
    CrearPromocionesComponent,
    EditPromocionesComponent,
    CrearWorkpeopleComponent,
    EditWorkpeopleComponent,
    WorkpeopleComponent,
    EditUsersComponent,
    CrearUsersComponent,
    CrearReservationComponent,
    CrearPersonaComponent,
    EditPersonaComponent,
    CrearCanalComponent,
    EditCanalComponent,
    ConfiguracionComponent,
    CrearRedComponent,
    EditRedComponent,
    EditReservationComponent,
    AsistenciasComponent,
    PromocionesComponent
  ]
})

export class AdminLayoutModule {}
