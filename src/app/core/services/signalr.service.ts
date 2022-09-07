import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as signalR from "@microsoft/signalr";
import { Host } from '../models/host.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private readonly webApiUrl = environment.webApiUrl;
  public hosts: Subject<Host[]> = new Subject();

  private hubConnection!: signalR.HubConnection;

  constructor() { }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(`https://localhost:7036/hostsHub`).build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started!"))
      .catch(err => console.error(`Error while connecting to server ${err}`));
  }

  public addHostsListener() {
    this.hubConnection.on("update_hosts", (updatedHosts: Host[]) => this.hosts.next(updatedHosts));
  }
}
