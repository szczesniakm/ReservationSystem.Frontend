import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core/components/shell/shell.component';
import { AuthGuard } from './core/guards/auth-guard';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation.component';
import { LoginComponent } from './pages/login/login.component';
import { UserReservationsComponent } from './pages/user-reservations/user-reservations.component';

const routes: Routes = [
  { path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'create-reservation', pathMatch: 'prefix' },
      { path: 'create-reservation', component: CreateReservationComponent, canActivate: [AuthGuard] },
      { path: 'reservations', component: UserReservationsComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
