import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() display: boolean = false;
  @Input() title: string = '';
  @Output() onClose = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

}
