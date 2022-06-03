import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FreelancePrivateDTO, FreelanceAvailabilityTypeEnum } from '@neadz/dtos';
import { NotificationService, NotificationType } from '@app/core/services/';
import { tjmValidator } from '@app/shared/validator';
import { environment } from '@env/environment';

export interface AssignFreelanceModalData {
  companyId: string;
  needId: string;
  freelances: string[];
}
@Component({
  selector: 'app-confirm-assign-freelance',
  templateUrl: './confirm-assign-freelance.component.html',
  styleUrls: ['./confirm-assign-freelance.component.scss']
})
export class ConfirmAssignFreelanceComponent implements OnInit {
  @Input() freelance: FreelancePrivateDTO;
  @Output() confirmFreelance = new EventEmitter();
  @Output() backEmitter = new EventEmitter();
  tjmProposal: number;
  tjmDefault: number;
  availabilityType = FreelanceAvailabilityTypeEnum;
  constructor(private notification: NotificationService) {
  }

  ngOnInit() {
    this.tjmDefault = Math.ceil(this.freelance.tjm / environment.marginPercentage);
  }

  checkInput() {
    if (tjmValidator(this.tjmProposal)) {
      this.notification.show({
        title: 'TJM',
        message: 'Le TJM n\'est pas renseigné',
        type: NotificationType.error
      });
      return false;
    } else {
      return true;
    }
  }

  submit() {
    if (this.checkInput()) {
      this.confirmFreelance.emit({
        freelanceId : this.freelance.id,
        tjm: this.tjmProposal
      });
    }
  }

  hasPicture(): boolean {
    return this.freelance.account.profilePicture &&
      this.freelance.account.profilePicture.url &&
      this.freelance.account.profilePicture.url.length > 0;
  }

  back() {
    this.backEmitter.emit('back');
  }
}
