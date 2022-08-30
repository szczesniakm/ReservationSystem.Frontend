import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login-response.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private readonly webApi = environment.webApiUrl;

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private http: HttpClient
  ) {
    this.isAuthenticated.next(!jwtService.isTokenExpired())
  }

  async login(username: string, password: string): Promise<void> {
    var headers = new HttpHeaders();
    headers.append("Content-Type", "text/plain");
    return new Promise((resolve, reject) => {
      this.http.post<LoginResponse>(`${this.webApi}login`, { username, password }).subscribe({
        next: response => {
          this.jwtService.setToken(response.token);
          this.updateStatus();
          resolve();
        },
        error: err => {
          reject(err);
        }
      });
    });
  }

  logout(): void {
    this.jwtService.clearToken();
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/login');
  }

  updateStatus(): void {
    if(this.jwtService.isTokenExpired()) {
      this.isAuthenticated.next(false);
      return;
    }
    this.isAuthenticated.next(true);
  }

  isAuthenticatedObservable(): Observable<boolean> {
    this.updateStatus();
    return this.isAuthenticated.asObservable();
  }
}
