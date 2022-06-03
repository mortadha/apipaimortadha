import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  NeedDTO,
  AuthDTO,
  CompanyPublicDTO,
  FreelanceNeedDTO,
  DurationTypeEnum,
  NeedSource,
  NeedAvailabilityTypeEnum
} from '@neadz/dtos';

import { modalFactory } from '../../modal/modal.component';

import {
  MissionDetailsModalComponent,
  MissionsFreelanceData
} from '@app/scenes/freelance/missions/modal/mission-details-modal/mission-details-modal.component';

import {
  CreateNeedModalComponent,
  CreateNeedModalData
} from '../../../scenes/company/needs/modal/create-need-modal/create-need-modal.component';
// Services
import { UserService } from '@app/core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-need-card',
  templateUrl: './need-card.component.html',
  styleUrls: ['./need-card.component.scss'],
})

export class NeedCardComponent implements OnInit {
  @Output() NeedRefreshNeeds: EventEmitter<NeedDTO> = new EventEmitter();
  @Output() NeedSupp: EventEmitter<String> = new EventEmitter();
  @Input() need: NeedDTO;
  @Input() company: CompanyPublicDTO;
  user: AuthDTO;
  isFullDescriptionDisplayed = false;
  durationType = DurationTypeEnum;
  needSource = NeedSource;
  availibilityType = NeedAvailabilityTypeEnum;

  constructor(public dialog: MatDialog, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.user = this.userService.getCurrentUser();
  }

  ngOnInit() {}

  displayFullDescription() {
    this.isFullDescriptionDisplayed = true;
  }

  showMissionDetails() {
    const freelanceAnswer = new FreelanceNeedDTO();
    freelanceAnswer.needId = this.need.id;
    const data: MissionsFreelanceData = {
      companyId : this.need.companyId,
      need: this.need,
      freelanceNeed: freelanceAnswer
    };
    const modal = modalFactory<MissionDetailsModalComponent>(this.dialog);
    modal.open(data, MissionDetailsModalComponent);
  }

  editNeed() {
    const modal = modalFactory<CreateNeedModalComponent>(this.dialog);
    const data: CreateNeedModalData = {
      companyId: this.company.id,
      need: this.need,
      isNew: false,
      editable: true
    };
    modal.open<CreateNeedModalData>(data, CreateNeedModalComponent, (result: NeedDTO | {status: boolean, need: NeedDTO}) => {
      if (result.status !== false) {
        this.need = result as NeedDTO;
        this.NeedRefreshNeeds.emit();
      } else if (result.status === false) {
        this.NeedSupp.emit(result.need.id);
      }
    });
  }

  redirect() {
    this.router.navigate([`agent/besoins/${this.need.id}`], { queryParams: {'type': 'entreprise'}});
  }
}
