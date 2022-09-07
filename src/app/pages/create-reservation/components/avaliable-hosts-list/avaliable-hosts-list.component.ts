import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Host } from 'src/app/core/models/host.model';
import { SignalrService } from 'src/app/core/services/signalr.service';

@Component({
  selector: 'app-avaliable-hosts-list',
  templateUrl: './avaliable-hosts-list.component.html'
})
export class AvaliableHostsListComponent implements OnInit {
  avaliableHosts: Host[] = [];
  @Output() onMakeReservationClick = new EventEmitter<string>();

  constructor(private signalRService: SignalrService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addHostsListener();
    this.signalRService.hosts.subscribe((hosts) => this.avaliableHosts = hosts);
  }

}
