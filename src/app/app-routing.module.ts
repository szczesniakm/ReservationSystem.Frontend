import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation.component';

const routes: Routes = [
  { path: 'create-reservation', component: CreateReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
