import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-popover',
  templateUrl: './confirm-popover.component.html',
  styleUrls: ['./confirm-popover.component.scss']
})
export class ConfirmPopoverComponent implements OnInit {
  @Input() popoverTop: number;
  @Input() popoverLeft: number;
  @Input() firstDate: Date;
  @Input() lastDate: Date;
  @Input() isPopoverToConfirm: boolean;
  @Output() datesConfirmed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  confirmDates() {
    this.datesConfirmed.emit(true);
  }

  cancelDates() {
    this.datesConfirmed.emit(false);
  }
}
