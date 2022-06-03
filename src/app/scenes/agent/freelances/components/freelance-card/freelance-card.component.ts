import { Component, OnInit, Input } from '@angular/core';
import {
  AccountType,
  AuthDTO,
  MissionDTO,
  FreelancePrivateDTO,
  FreelanceAvailabilityTypeEnum,
  FreelanceRemoteEnum,
  FreelanceStatusEnum
} from '@neadz/dtos';

// Services
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-freelance-card',
  templateUrl: './freelance-card.component.html',
  styleUrls: ['./freelance-card.component.scss']
})
export class FreelanceCardComponent implements OnInit {
  @Input() freelance: FreelancePrivateDTO;
  @Input() mission: MissionDTO;
  accountType = AccountType;
  user: AuthDTO;
  availibilityType = FreelanceAvailabilityTypeEnum;
  remoteEnum = FreelanceRemoteEnum;
  statusEnum = FreelanceStatusEnum;
  currentDate: Date;
  isDatePassed = false;

  constructor(private userService: UserService) {
    this.user = this.userService.getCurrentUser();
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
    if (this.user.type === AccountType.Company) {
      return `profile/${this.freelance.id}`;
    } else if (this.user.type === AccountType.Agent) {
      return `profile/${this.freelance.id}`;
    }
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

  getColor(grade: number) {
    if (grade < 50) {
      return 'red';
    } else if (grade >= 50 && grade < 80) {
      return 'orange';
    } else if (grade >= 80) {
      return 'green';
    }
  }
}
