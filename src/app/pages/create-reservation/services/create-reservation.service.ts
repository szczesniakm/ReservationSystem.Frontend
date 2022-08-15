import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AvaliableHostsRequest } from '../models/avaliable-hosts-request.model';
import { AvaliableHost } from '../models/avaliable-hosts.model';
import { MakeReservationRequest } from '../models/make-reservation-request.model';

@Injectable({
  providedIn: 'root'
})
export class CreateReservationService {
  private readonly webApiUrl = environment.webApiUrl;

  constructor(private http: HttpClient) { }

  getAvaliableHosts(request: AvaliableHostsRequest): Observable<AvaliableHost[]> {
    const { from, to } = request;
    return this.http.get<AvaliableHost[]>(`${this.webApiUrl}Hosts/avaliable-hosts`, { params: { from, to } });
  }

  makeReservation(body: MakeReservationRequest): Observable<void> {
    return this.http.post<void>(`${this.webApiUrl}Reservations`, body);
  }

  getOsDictionary(): Observable<string[]> {
    return this.http.get<string[]>(`${this.webApiUrl}OSs/dictionary`);
  }
}
