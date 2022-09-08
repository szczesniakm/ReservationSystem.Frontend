import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { defer, map, tap } from 'rxjs';
import { Host } from 'src/app/core/models/host.model';
import { HostsService } from 'src/app/core/services/hosts.service';
import { MessageService } from 'src/app/shared/components/toast/services/message.service';
import { PowerOnHostRequest } from './models/poweron-host-request.model';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html'
})
export class CreateReservationComponent implements OnInit {
  makeReservationForm = new FormGroup({
    hostName: new FormControl('', [Validators.required]),
    //osName: new FormControl('', [Validators.required])
  });

  isLoading: boolean = false;
  displayModal: boolean = false;
  operatingSystemsDictionary: string[] = [];

  get hostName() {
    return this.makeReservationForm.get("hostName");
  }

  get osName() {
    return this.makeReservationForm.get("osName");
  }

  constructor(
    private hostsService: HostsService,
    private messageService: MessageService)
  { }

  ngOnInit(): void {
  }

  showPowerOnModal(host: Host) {
    this.hostName?.setValue(host.name);
    this.displayModal = true;
  }

  powerOnHost() {
    if(!this.makeReservationForm.valid) {
      return;
    }

    const body: PowerOnHostRequest = {
      hostName: this.hostName?.value!
    };

    let $powerOn = defer(() => {
      this.isLoading = true;
      return this.hostsService.powerOnHost(body).pipe(
        map(() => {
          this.messageService.showSuccess(`Pomyslnie zarezerwowano stacje ${body.hostName}!`);
        }),
        tap(() => this.isLoading = false))});

    $powerOn.subscribe(() => this.isLoading = false);

    this.displayModal = false;
  }
}
