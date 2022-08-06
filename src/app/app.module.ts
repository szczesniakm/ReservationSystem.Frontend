import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import '@angular/common/locales/global/pl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation.component';
import { SearchAvaliableHostsComponent } from './pages/create-reservation/components/search-avaliable-hosts/search-avaliable-hosts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AvaliableHostsListComponent } from './pages/create-reservation/components/avaliable-hosts-list/avaliable-hosts-list.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ShellComponent } from './core/components/shell/shell.component';
import { SideMenuComponent } from './core/components/side-menu/side-menu.component';
import { HeaderComponent } from './core/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateReservationComponent,
    SearchAvaliableHostsComponent,
    AvaliableHostsListComponent,
    ModalComponent,
    ShellComponent,
    SideMenuComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
