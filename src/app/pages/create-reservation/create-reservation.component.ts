import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AvaliableHostsRequest } from './models/avaliable-hosts-request.model';
import { AvaliableHost } from './models/avaliable-hosts.model';
import { MakeReservationRequest } from './models/make-reservation-request.model';
import { CreateReservationService } from './services/create-reservation.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html'
})
export class CreateReservationComponent implements OnInit {
  makeReservationForm = new FormGroup({
    startDate: new FormControl(new Date(), [Validators.required]),
    endDate: new FormControl(new Date(), [Validators.required]),
    hostName: new FormControl('', [Validators.required]),
    osName: new FormControl('', [Validators.required])
  });

  displayModal: boolean = false;
  avaliableHosts: AvaliableHost[] = []
  operatingSystemsDictionary: string[] = [];

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

  get osName() {
    return this.makeReservationForm.get("osName");
  }

  constructor(private createReservationService: CreateReservationService) { }

  ngOnInit(): void {
    this.createReservationService.getOsDictionary().subscribe(dictionary => this.operatingSystemsDictionary = dictionary);
    console.log(this.operatingSystemsDictionary);
  }

  handleAvaliableHostsSearch(request: AvaliableHostsRequest): void {
    this.createReservationService.getAvaliableHosts(request).pipe(tap((x: AvaliableHost[]) => this.avaliableHosts = x)).subscribe();

    this.startDate?.setValue(new Date(request.from));
    this.endDate?.setValue(new Date(request.to));
  }

  showMakeReservationModal(hostName: string) {
    this.hostName?.setValue(hostName);
    this.displayModal = true;
  }

  makeReservation() {
    if(!this.makeReservationForm.valid) {
      return;
    }
    const body: MakeReservationRequest = {
      hostName: this.hostName?.value!,
      osName: this.osName?.value!,
      from: this.startDate?.value?.toISOString()!,
      to: this.endDate?.value?.toISOString()!
    };
    this.createReservationService.makeReservation(body).subscribe( () => console.log("reserved") );
    this.displayModal = false;
  }
}
