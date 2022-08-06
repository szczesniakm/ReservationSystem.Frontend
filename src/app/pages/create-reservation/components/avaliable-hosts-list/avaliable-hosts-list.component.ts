import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvaliableHost } from '../../models/avaliable-hosts.model';

@Component({
  selector: 'app-avaliable-hosts-list',
  templateUrl: './avaliable-hosts-list.component.html'
})
export class AvaliableHostsListComponent implements OnInit {
  @Input() avaliableHosts: AvaliableHost[] = [];
  @Output() onMakeReservationClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
