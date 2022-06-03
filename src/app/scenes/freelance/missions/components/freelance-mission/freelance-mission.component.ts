import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { NotificationService, NotificationType } from '@app/core/services';

// Components
import { MissionDetailsModalComponent, MissionsFreelanceData } from '../../modal/mission-details-modal/mission-details-modal.component';
import { FreelanceNeedDTO, FreelanceNeedStatus, CompanyNeedStatus } from '@neadz/dtos';
import { Subject } from 'rxjs/internal/Subject';
import { MissionsService } from '@app/core/services/missions.service';
import { UserService } from '@app/core/services';
import { DoubleConfirmValidationModalComponent,
  DoubleConfirmValidationModalData } from '@app/shared/modal/double-confirm-validation-modal/double-confirm-validation-modal.component';
import {
  ConfirmNotInterestedFreelanceModalComponent
} from '@app/scenes/company/needs/modal/confirm-not-interested-freelance-modal/confirm-not-interested-freelance-modal.component';
  import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-freelance-mission',
  templateUrl: './freelance-mission.component.html',
  styleUrls: ['./freelance-mission.component.scss']
})
export class FreelanceMissionComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  @Input() freelanceNeed: FreelanceNeedDTO;
  isFullDescriptionDisplayed = false;
  createdDate = null;
  freelanceStatus = FreelanceNeedStatus;
  companyStatus = CompanyNeedStatus;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private missionsService: MissionsService,
    private notification: NotificationService) {
    moment.locale('fr');
  }

  ngOnInit() {
    if (!this.freelanceNeed.need.skills) {
      this.freelanceNeed.need.skills = [];
    }

    if (this.freelanceNeed.need.jobTitle.length > 35) {
      this.freelanceNeed.need.jobTitle = this.freelanceNeed.need.jobTitle.substring(0, 35);
      this.freelanceNeed.need.jobTitle += '...';
    }
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  /**
   * Tell if Company has a profile picture
   */
  hasPicture(): boolean {
    return this.freelanceNeed.need.companyLogo &&
      this.freelanceNeed.need.companyLogo.url &&
      this.freelanceNeed.need.companyLogo.url.length > 0;
  }

  displayFullDescription() {
    this.isFullDescriptionDisplayed = true;
  }

  showMissionDetails() {
    const freelanceAnswer = new FreelanceNeedDTO();
    freelanceAnswer.freelanceId = this.userService.getFreelance().id;
    freelanceAnswer.needId = this.freelanceNeed.need.id;
    freelanceAnswer.freelanceStatus = this.freelanceNeed.freelanceStatus;
    const data: MissionsFreelanceData = {
      companyId: this.freelanceNeed.need.companyId,
      freelanceNeed: freelanceAnswer,
      need: this.freelanceNeed.need
    };
    const modal = modalFactory<MissionDetailsModalComponent>(this.dialog);
    modal.open(data, MissionDetailsModalComponent, (result: FreelanceNeedDTO) => {
      if (result) {
        this.freelanceNeed.freelanceStatus = result.freelanceStatus;
      }
    });
  }

  accepted() {
    const myPromise: Observable<string> = new Observable((observer) => {
      this.freelanceNeed.needId = this.freelanceNeed.need.id;
      this.freelanceNeed.freelanceId = this.userService.getFreelance().id;
      this.freelanceNeed.freelanceStatus = FreelanceNeedStatus.ACCEPTED;
      this.missionsService.updateStatusNeedFreelance(this.freelanceNeed.need.companyId, this.freelanceNeed)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelanceNeedDTO) => {
      observer.next('test');
      observer.complete();
      }, (err) => {
        console.error('An error occured ' + err);
      });
    });

    const data: DoubleConfirmValidationModalData<string> = {
      titreConfirmation: 'Confirmation',
      textConfirmation: 'Vous êtes intéressé par ce besoin ?',
      titreSuccess: 'Neadz traite votre demande',
      textSuccess: 'Neadz a bien reçu votre demande et la traite au plus vite',
      buttonConfirm: 'Je confirme',
      buttonCancel: 'Annuler',
      call: myPromise,
    };
    const modal = modalFactory<DoubleConfirmValidationModalComponent<string>>(this.dialog);
    modal.open<DoubleConfirmValidationModalData<string>>(data, DoubleConfirmValidationModalComponent, (result: Boolean) => {});
  }

  refused() {
    const modal = modalFactory(this.dialog);
    modal.open({}, ConfirmNotInterestedFreelanceModalComponent, (result) => {
      if (result) {
        this.freelanceNeed.freelanceStatus = FreelanceNeedStatus.REFUSED;
        this.freelanceNeed.freelanceReason = result;
        this.freelanceNeed.needId = this.freelanceNeed.need.id;
        this.freelanceNeed.freelanceId = this.userService.getFreelance().id;
        this.missionsService.updateStatusNeedFreelance(this.freelanceNeed.need.companyId, this.freelanceNeed)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe(
          (res: FreelanceNeedDTO) => {
            this.freelanceNeed = res;
          },
          err => {
            this.notification.show({
              title: 'Refus de mission',
              message: err,
              type: NotificationType.error
            });
          },
        );
      }
    });
  }
}
