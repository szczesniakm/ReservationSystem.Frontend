import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core/components/shell/shell.component';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '',
    component: ShellComponent,
    children: [
      { path: 'create-reservation', component: CreateReservationComponent }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
