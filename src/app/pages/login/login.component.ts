import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private router: Router) { }

  get username(): any {
    return this.loginForm.get("login");
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  async login() {
    if(!this.loginForm.valid) {
      return;
    }
    try {
      await this.authenticationService.login(this.username.value, this.password.value);
      this.router.navigateByUrl('');
    } catch (error) {
      console.log(error);
    }
  }
}
