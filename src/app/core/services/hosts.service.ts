import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as signalR from "@microsoft/signalr";
import { Host } from '../models/host.model';
import { HttpClient } from '@angular/common/http';
import { PowerOnHostRequest } from 'src/app/pages/create-reservation/models/poweron-host-request.model';
import { MessageService } from 'src/app/shared/components/toast/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class HostsService {
  private readonly webApiUrl = environment.webApiUrl;
  public hosts: Subject<Host[]> = new Subject();

  private hubConnection!: signalR.HubConnection;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(`${this.webApiUrl}/hostsHub`).build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started!"))
      .catch(err => this.messageService.showError(`Wystąpił błąd podczas łączenia z serwerem`));
    this.addConnectionListener();
    this.addHostsListener();
  }

  public addHostsListener() {
    this.hubConnection.on("update_hosts", (updatedHosts: Host[]) => this.hosts.next(updatedHosts));
  }

  public addConnectionListener() {
    this.hubConnection.onclose(() => this.messageService.showError(`Utracono połączenie z serwerem.`));
    this.hubConnection.onreconnected(() => this.messageService.showError(`Połączono z serwerem.`));
  }

  public getHosts(): Observable<any> {
    return this.http.get<any>(`${this.webApiUrl}/api/hosts`);
  }

  public powerOnHost(request: PowerOnHostRequest): Observable<void> {
    return this.http.put<void>(`${this.webApiUrl}/api/hosts/${request.hostName}`, request);
  }
}
