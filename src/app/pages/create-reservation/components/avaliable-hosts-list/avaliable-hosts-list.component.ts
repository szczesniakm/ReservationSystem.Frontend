import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Host } from 'src/app/core/models/host.model';
import { HostsService } from 'src/app/core/services/hosts.service';

@Component({
  selector: 'app-avaliable-hosts-list',
  templateUrl: './avaliable-hosts-list.component.html'
})
export class AvaliableHostsListComponent implements OnInit {
  hosts: Host[] = [];
  @Output() onHostSelected = new EventEmitter<Host>();

  constructor(private hostsService: HostsService) { }

  ngOnInit(): void {
    this.fetchHosts();
    this.hostsService.startConnection();
    this.hostsService.hosts.subscribe((hosts) => this.hosts = hosts);
  }

  fetchHosts(): void {
    this.hostsService.getHosts().subscribe((hosts) => this.hosts = hosts.hosts);
  }
}
