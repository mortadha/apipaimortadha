import { Component, OnInit, Input } from '@angular/core';
import { AccountType, MissionDTO, FreelancePrivateDTO, FreelanceAvailabilityTypeEnum } from '@neadz/dtos';

@Component({
  selector: 'app-freelance-card',
  templateUrl: './freelance-card.component.html',
  styleUrls: ['./freelance-card.component.scss']
})
export class FreelanceCardComponent implements OnInit {
  @Input() freelance: FreelancePrivateDTO;
  @Input() mission: MissionDTO;
  accountType = AccountType;
  availabilityType = FreelanceAvailabilityTypeEnum;
  isDatePassed = false;

  constructor() {
  }

  ngOnInit() {
    if (this.freelance.availabilityType === FreelanceAvailabilityTypeEnum.StartFrom) {
      this.isDatePassed = new Date().getTime() >= new Date(this.freelance.availabilityDate).getTime();
    }
  }

  /**
   * Where Freelance Card should redirect
   */
  redirectTo() {
    return `profile/${this.freelance.id}`;
  }

  /**
   * Tell if user has a profile picture
   */
  hasProfilePicture(): boolean {
    return this.freelance.account &&
      this.freelance.account.profilePicture &&
      this.freelance.account.profilePicture.url &&
      this.freelance.account.profilePicture.url.length > 0;
  }
}
