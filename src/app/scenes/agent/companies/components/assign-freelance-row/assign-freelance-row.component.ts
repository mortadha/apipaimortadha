import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FreelancePrivateDTO, FreelanceAvailabilityTypeEnum } from '@neadz/dtos';

@Component({
  selector: 'app-assign-freelance-row',
  templateUrl: './assign-freelance-row.component.html',
  styleUrls: ['./assign-freelance-row.component.scss']
})
export class AssignFreelanceRowComponent implements OnInit {
  @Input() freelance: FreelancePrivateDTO;
  @Output() detailFreelanceEmitter = new EventEmitter();
  toggleDetails = false;
  availabilityType = FreelanceAvailabilityTypeEnum;

  constructor() { }

  ngOnInit() {}

  detailFreelance() {
    this.detailFreelanceEmitter.emit(this.freelance);
  }

  hasPicture(): boolean {
    return this.freelance.account.profilePicture &&
      this.freelance.account.profilePicture.url &&
      this.freelance.account.profilePicture.url.length > 0;
  }
}
