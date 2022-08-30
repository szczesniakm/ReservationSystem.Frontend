import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { MessageService } from 'src/app/shared/components/toast/services/message.service';
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

  isLoading: boolean = false;
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

  constructor(
    private createReservationService: CreateReservationService,
    private messageService: MessageService)
  { }

  ngOnInit(): void {
    this.createReservationService.getOsDictionary().subscribe(dictionary => this.operatingSystemsDictionary = dictionary);
  }

  handleAvaliableHostsSearch(request: AvaliableHostsRequest): void {
    this.avaliableHostsRequest = request;

    if(this.avaliableHostsRequest) {
      this.isLoading = true;
      this.createReservationService.getAvaliableHosts(this.avaliableHostsRequest).pipe(tap((x: AvaliableHost[]) => this.avaliableHosts = x)).subscribe(() => this.isLoading = false);
    }

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

    this.isLoading = true;
    this.createReservationService.makeReservation(body).pipe(
      switchMap(() => {
        this.messageService.showSuccess(`Pomyslnie zarezerwowano stacje ${body.hostName}!`);
        return this.createReservationService.getAvaliableHosts(this.avaliableHostsRequest!).pipe(tap((x: AvaliableHost[]) => this.avaliableHosts = x));
      })
    ).subscribe(() => this.isLoading = false);

    this.displayModal = false;
  }
}
