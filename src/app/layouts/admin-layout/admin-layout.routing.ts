import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ReservationComponent } from 'src/app/pages/reservation/reservation.component';
import { VuelosComponent } from 'src/app/pages/vuelos/vuelos.component';
import { WorkpeopleComponent } from 'src/app/pages/workpeople/workpeople.component';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { EditUserProfileComponent } from 'src/app/pages/user-profile/edit-user-profile/edit-user-profile.component';
import { CrearTVueloComponent } from 'src/app/pages/configuracion/tipo-vuelo/crear-t-vuelo/crear-t-vuelo.component';
import { EditTVueloComponent } from 'src/app/pages/configuracion/tipo-vuelo/edit-t-vuelo/edit-t-vuelo.component';
import { EditPromocionesComponent } from 'src/app/pages/configuracion/promociones/edit-promociones/edit-promociones.component';
import { CrearPromocionesComponent } from 'src/app/pages/configuracion/promociones/crear-promociones/crear-promociones.component';
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
import { AuthGuard } from 'src/app/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador', 'Community Manager'] } },
  { path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador', 'Community Manager'] } },
  { path: 'vuelos', component: VuelosComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador', 'Community Manager'] } },
  { path: 'workpeople', component: WorkpeopleComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'edit-user-profile/:id', component: EditUserProfileComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador', 'Community Manager'] } },
  { path: 'crear-t-vuelo', component: CrearTVueloComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'edit-t-vuelo/:id', component: EditTVueloComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'crear-promociones', component: CrearPromocionesComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'edit-promociones/:id', component: EditPromocionesComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'crear-workpeople', component: CrearWorkpeopleComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'edit-workpeople/:id', component: EditWorkpeopleComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'edit-user-users', component: EditUsersComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'crear-users', component: CrearUsersComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'crear-reservation', component: CrearReservationComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador', 'Community Manager'] } },
  { path: 'crear-persona', component: CrearPersonaComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador', 'Community Manager'] } },
  { path: 'edit-persona', component: EditPersonaComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador', 'Community Manager'] } },
  { path: 'crear-canal', component: CrearCanalComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'edit-canal/:id', component: EditCanalComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'config', component: ConfiguracionComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'crear-red', component: CrearRedComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'edit-red', component: EditRedComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
  { path: 'edit-reservation', component: EditReservationComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador', 'Community Manager'] } },
  { path: 'asistencias', component: AsistenciasComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Administrador'] } },
];
