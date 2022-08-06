import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvaliableHostsRequest } from '../../models/avaliable-hosts-request.model';

@Component({
  selector: 'app-search-avaliable-hosts',
  templateUrl: './search-avaliable-hosts.component.html',
  styleUrls: ['./search-avaliable-hosts.component.scss']
})
export class SearchAvaliableHostsComponent implements OnInit {
  @Output() onAvaliableHostsSearch = new EventEmitter<AvaliableHostsRequest>();

  avaliableHostsForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    reservationTime: new FormControl('', [Validators.required])
  });

  constructor(private datePipe: DatePipe) {
  }

  get startDate() {
    return this.avaliableHostsForm.get("startDate");
  }

  get startTime() {
    return this.avaliableHostsForm.get("startTime");
  }

  get reservationTime() {
    return this.avaliableHostsForm.get("reservationTime");
  }

  ngOnInit(): void {
    this.initForm();
  }

  searchAvaliableHosts(): void {
    if(!this.avaliableHostsForm.valid) {
      return;
    }
    const from = new Date(`${this.startDate?.value} ${this.startTime?.value}`);
    const reservationTime = Number(this.reservationTime?.value);

    this.onAvaliableHostsSearch.emit({ from, reservationTime });
  }

  private initForm(): void {
    const currentDate = new Date();
    this.startDate?.setValue(this.datePipe.transform(currentDate, 'yyyy-MM-dd'));
    this.startTime?.setValue(this.datePipe.transform(currentDate, 'HH:mm'));
    this.reservationTime?.setValue('30');
  }
}
