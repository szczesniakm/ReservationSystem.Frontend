import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as signalR from "@microsoft/signalr";
import { Host } from '../models/host.model';
import { HttpClient } from '@angular/common/http';
import { PowerOnHostRequest } from 'src/app/pages/create-reservation/models/poweron-host-request.model';

@Injectable({
  providedIn: 'root'
})
export class HostsService {
  private readonly webApiUrl = environment.webApiUrl;
  public hosts: Subject<Host[]> = new Subject();

  private hubConnection!: signalR.HubConnection;

  constructor(private http: HttpClient) { }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(`${this.webApiUrl}/hostsHub`).build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started!"))
      .catch(err => console.error(`Error while connecting to server ${err}`));
  }

  public addHostsListener() {
    this.hubConnection.on("update_hosts", (updatedHosts: Host[]) => this.hosts.next(updatedHosts));
  }

  public getHosts(): Observable<any> {
    return this.http.get<any>(`${this.webApiUrl}/api/hosts`);
  }

  public powerOnHost(request: PowerOnHostRequest): Observable<void> {
    return this.http.put<void>(`${this.webApiUrl}/api/hosts/${request.hostName}`, {});
  }
}
