import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { Host } from 'src/app/core/models/host.model';
import { OperatingSystem } from 'src/app/core/models/operating-system.model';
import { HostsService } from 'src/app/core/services/hosts.service';
import { OperatingSystemService } from 'src/app/core/services/operatingSystem.service';
import { MessageService } from 'src/app/shared/components/toast/services/message.service';
import { PowerOnHostRequest } from './models/poweron-host-request.model';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html'
})
export class CreateReservationComponent implements OnInit {
  makeReservationForm = new FormGroup({
    hostName: new FormControl('', [Validators.required]),
    osName: new FormControl('', [Validators.required])
  });

  isLoading: boolean = false;
  displayModal: boolean = false;
  operatingSystemsDictionary: OperatingSystem[] = [];

  get hostName() {
    return this.makeReservationForm.get("hostName");
  }

  get osName() {
    return this.makeReservationForm.get("osName");
  }

  constructor(
    private hostsService: HostsService,
    private operatingSystemService: OperatingSystemService,
    private messageService: MessageService)
  { }

  ngOnInit(): void {
    this.getAvaliableOperatingSystems();
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
      hostName: this.hostName?.value!,
      osName: this.osName?.value!
    };

    this.isLoading = true;
    this.hostsService.powerOnHost(body).pipe(
      switchMap(() => of(this.messageService.showSuccess(`Pomyslnie zarezerwowano stacje ${body.hostName}!`))),
      catchError(err => of(this.messageService.showError(err.error.message))
      ),
      finalize(() => this.isLoading = false)).subscribe();

    this.displayModal = false;
  }

  private getAvaliableOperatingSystems(): void {
    this.operatingSystemService.getAvaliableOperatingSystems().pipe(
      tap(() => this.isLoading = true),
      switchMap((operatingSystems: OperatingSystem[]) => this.operatingSystemsDictionary = operatingSystems),
      catchError(err => of(this.messageService.showError(err.error.message))),
      finalize(() => this.isLoading = false)).subscribe();
  }
}
