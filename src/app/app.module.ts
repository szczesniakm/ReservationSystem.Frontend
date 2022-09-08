import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import '@angular/common/locales/global/pl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AvaliableHostsListComponent } from './pages/create-reservation/components/avaliable-hosts-list/avaliable-hosts-list.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ShellComponent } from './core/components/shell/shell.component';
import { SideMenuComponent } from './core/components/side-menu/side-menu.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ProgressSpinnerComponent } from './core/components/progress-spinner/progress-spinner.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastMessageComponent } from './shared/components/toast/components/toast-message/toast-message.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateReservationComponent,
    AvaliableHostsListComponent,
    ModalComponent,
    ShellComponent,
    SideMenuComponent,
    HeaderComponent,
    LoginComponent,
    ProgressSpinnerComponent,
    ToastComponent,
    ToastMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
