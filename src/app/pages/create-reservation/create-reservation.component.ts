import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvaliableHostsRequest } from './models/avaliable-hosts-request.model';
import { AvaliableHost } from './models/avaliable-hosts.model';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit {
  makeReservationForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    hostName: new FormControl('', [Validators.required]),
    operatingSystem: new FormControl('', [Validators.required])
  });

  displayModal: boolean = false;
  avaliableHosts: AvaliableHost[] = []
  operatingSystemsDictionary =
    [
      { name: 'ArchLinux' },
      { name: 'Ubuntu Linux' },
      { name: 'FreeBSD' },
      { name: 'Windows 10' },
    ];

  avaliableHostsRequest?: AvaliableHostsRequest;

  get startDate() {
    return this.makeReservationForm.get("startDate");
  }

  get endDate() {
    return this.makeReservationForm.get("endDate");
  }

  get hostName() {
    return this.makeReservationForm.get("hostName");
  }

  get operatingSystem() {
    return this.makeReservationForm.get("operatingSystem");
  }

  constructor() { }

  ngOnInit(): void {
  }

  handleAvaliableHostsSearch(request: AvaliableHostsRequest): void {
    this.avaliableHostsRequest = request;
    const endDate = new Date(request.from.getTime());
    endDate.setMinutes(request.from.getMinutes() + request.reservationTime);
    this.startDate?.setValue(request.from.toUTCString());
    this.endDate?.setValue(endDate.toUTCString());

    this.avaliableHosts = [
      { hostName: 's1' },
      { hostName: 's2' },
      // { hostName: 's3' },
      // { hostName: 's4' },
      // { hostName: 's5' },
      // { hostName: 's6' },
      // { hostName: 's7' },
      // { hostName: 's8' },
      // { hostName: 's9' },
      // { hostName: 's0' },
      // { hostName: 'sa' },
      // { hostName: 'sb' },
      // { hostName: 'sc' }
    ];
  }

  showMakeReservationModal(hostName: string) {
    this.hostName?.setValue(hostName);
    this.displayModal = true;
  }

  makeReservation() {
    console.log(this.makeReservationForm.value);
    this.displayModal = false;
  }
}
