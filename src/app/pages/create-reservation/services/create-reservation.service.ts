import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AvaliableHost } from '../models/avaliable-hosts.model';

@Injectable({
  providedIn: 'root'
})
export class CreateReservationService {
  private readonly webApiUrl = environment.webApiUrl;

  constructor(private http: HttpClient) { }

  getAvaliableHosts(): Observable<AvaliableHost[]> {
    return this.http.get<AvaliableHost[]>('');
  }
}
