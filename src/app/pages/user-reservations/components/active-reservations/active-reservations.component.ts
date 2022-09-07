import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-reservations',
  templateUrl: './active-reservations.component.html'
})
export class ActiveReservationsComponent implements OnInit {

  @Input() activeReservations = [
    { hostName: 's1', osName: 'Windows', status: 'Aktywna', start: new Date(), end: new Date() },
    { hostName: 's1', osName: 'Windows', status: 'Aktywna', start: new Date(), end: new Date() },
    { hostName: 's1', osName: 'Windows', status: 'Aktywna', start: new Date(), end: new Date() },
    { hostName: 's1', osName: 'Windows', status: 'Aktywna', start: new Date(), end: new Date() },
    { hostName: 's2', osName: 'Linux', status: 'Nadchodząca', start: new Date(), end: new Date() }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
