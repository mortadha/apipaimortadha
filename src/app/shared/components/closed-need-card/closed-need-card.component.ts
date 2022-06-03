import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NeedDTO, AuthDTO, CompanyPublicDTO, FreelanceNeedDTO, DurationTypeEnum } from '@neadz/dtos';

import { modalFactory } from '../../modal/modal.component';

import {
  MissionDetailsModalComponent,
  MissionsFreelanceData } from '@app/scenes/freelance/missions/modal/mission-details-modal/mission-details-modal.component';

// Services
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-closed-need-card',
  templateUrl: './closed-need-card.component.html',
  styleUrls: ['./closed-need-card.component.scss'],
})
export class ClosedNeedCardComponent implements OnInit {
  @Input() need: NeedDTO;
  @Input() company: CompanyPublicDTO;
  user: AuthDTO;
  isFullDescriptionDisplayed = false;
  durationType = DurationTypeEnum;

  constructor(public dialog: MatDialog, private userService: UserService) {
    this.user = this.userService.getCurrentUser();
  }

  ngOnInit() {
  }
  displayFullDescription() {
    this.isFullDescriptionDisplayed = true;
  }

  showMissionDetails() {
    const freelanceAnswer = new FreelanceNeedDTO();
    freelanceAnswer.needId = this.need.id;
    const data: MissionsFreelanceData = {
      companyId: this.company.id,
      need: this.need,
      freelanceNeed: freelanceAnswer
    };
    const modal = modalFactory<MissionDetailsModalComponent>(this.dialog);
    modal.open(data, MissionDetailsModalComponent);
  }
}
