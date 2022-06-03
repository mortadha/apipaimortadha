import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { FreelancePublicDTO, NeedDTO, FreelanceNeedDTO, AuthDTO, AccountType, DurationTypeEnum, FreelanceNeedStatus } from '@neadz/dtos';
import { MissionsService } from '@app/core/services/missions.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { UserService } from '@app/core/services/user.service';
import { FreelanceService } from '@app/core/services/freelance.service';

import { NotificationService, NotificationType } from '@app/core/services';
import { DoubleConfirmValidationModalComponent,
  DoubleConfirmValidationModalData } from '@app/shared/modal/double-confirm-validation-modal/double-confirm-validation-modal.component';
import { modalFactory } from '@app/shared/modal/modal.component';
import {FormControl} from '@angular/forms';

export interface MissionsFreelanceData {
  companyId: string;
  freelanceNeed: FreelanceNeedDTO;
  need: NeedDTO;
}

@Component({
  selector: 'app-mission-details-modal',
  templateUrl: './mission-details-modal.component.html',
  styleUrls: ['./mission-details-modal.component.scss'],
})
export class MissionDetailsModalComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  private oldStatus: FreelanceNeedStatus;
  freelance: FreelancePublicDTO;
  need: NeedDTO;
  user: AuthDTO;
  accountType = AccountType;
  durationType = DurationTypeEnum;
  refuseModal = false;
  notifyModal = false;
  reason: string;
  writenReason: string;
  freelanceStatus = FreelanceNeedStatus;
  reasonLength = new BehaviorSubject(0);
  public textControl = new FormControl('');
  seeMoreButton = true;

  constructor(
    public dialogRef: MatDialogRef<MissionDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MissionsFreelanceData,
    private missionsService: MissionsService,
    private userService: UserService,
    public dialog: MatDialog,
    private notification: NotificationService,
    private freelanceService: FreelanceService
  ) {
    this.freelance = new FreelancePublicDTO();
    this.need = this.data.need;
    this.user = this.userService.getCurrentUser();
    this.oldStatus = this.data.freelanceNeed.freelanceStatus;
    if (!this.need.description || this.need.description.length <= 300) {
      this.seeMoreButton = false;
    }

    if (!this.writenReason) {
      this.writenReason = '';
    }
    this.textControl.valueChanges.subscribe((v) => this.reasonLength.next(v.length));
  }

  ngOnInit() {
    this.reason = '';
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  notInterested() {
    this.oldStatus = this.data.freelanceNeed.freelanceStatus;
    this.data.freelanceNeed.freelanceStatus = FreelanceNeedStatus.NOT_INTERESTED;
    this.refuseModal = true;
  }

  refused() {
    this.oldStatus = this.data.freelanceNeed.freelanceStatus;
    this.data.freelanceNeed.freelanceStatus = FreelanceNeedStatus.REFUSED;
    this.refuseModal = true;
  }

  interested() {
    const myPromise: Observable<string> = new Observable((observer) => {
      this.data.freelanceNeed.freelanceStatus = FreelanceNeedStatus.INTERESTED;
      this.missionsService.updateStatusNeedFreelance(this.need.companyId, this.data.freelanceNeed)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelanceNeedDTO) => {
      this.dialogRef.close(result);
      observer.next('test');
      observer.complete();
      }, (err) => {
        console.error('An error occured ' + err);
      });
    });

    const data: DoubleConfirmValidationModalData<string> = {
      titreConfirmation: 'Confirmation',
      textConfirmation: 'Ce projet m\'intéresse',
      titreSuccess: 'Nous traitons votre demande',
      textSuccess: 'Nous ne manquerons pas de revenir vers vous dans les plus brefs délais ',
      buttonConfirm: 'Je confirme',
      buttonCancel: 'Annuler',
      call: myPromise,
    };
    const modal = modalFactory<DoubleConfirmValidationModalComponent<string>>(this.dialog);
    modal.open<DoubleConfirmValidationModalData<string>>(data, DoubleConfirmValidationModalComponent, (result: Boolean) => {
    });
  }

  accepted() {
    const myPromise: Observable<string> = new Observable((observer) => {
      this.data.freelanceNeed.freelanceStatus = FreelanceNeedStatus.ACCEPTED;
      this.missionsService.updateStatusNeedFreelance(this.need.companyId, this.data.freelanceNeed)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelanceNeedDTO) => {
      this.dialogRef.close(result);
      observer.next('test');
      observer.complete();
      }, (error) => {
        this.notification.show({
          title: 'Intérêt',
          message: error,
          type: NotificationType.error
        });
      });
    });

    const data: DoubleConfirmValidationModalData<string> = {
      titreConfirmation: 'Confirmation',
      textConfirmation: 'Vous êtes sur le point de confirmer votre disponibilité pour démarrer ce projet.',
      titreSuccess: 'Neadz traite votre demande',
      textSuccess: 'Félicitations ! Il semble que vous ayez trouvé le projet qui vous convienne.' +
      ' Nos équipes se rapprochent de vous dans les plus brefs délais afin de finaliser le processus de sélection.',
      buttonConfirm: 'Confirmer',
      buttonCancel: 'Annuler',
      call: myPromise,
    };
    const modal = modalFactory<DoubleConfirmValidationModalComponent<string>>(this.dialog);
    modal.open<DoubleConfirmValidationModalData<string>>(data, DoubleConfirmValidationModalComponent, (result: Boolean) => {});
  }

   /**
   * Tell if Company has a profile picture
   */
  hasPicture(): boolean {
    return this.need.companyLogo &&
      this.need.companyLogo.url &&
      this.need.companyLogo.url.length > 0;
  }

  /**
   * If user is canceling
   * @param closeAll should close all modals
   */
  close(closeAll: boolean) {
    if (this.refuseModal && !closeAll) {
      this.data.freelanceNeed.freelanceStatus = this.oldStatus;
      this.refuseModal = false;
    } else {
      this.data.freelanceNeed.freelanceStatus = this.oldStatus;
      this.dialogRef.close(this.data.freelanceNeed);
    }
  }

  /**
   * User finish
   * @param closeAll should close all modals
   */
  finish() {
    this.dialogRef.close(this.data.freelanceNeed);
  }

  closeReasonModal() {
    if (this.reason) {
      if (this.writenReason && this.reason === 'Autre') {
        this.reason = this.writenReason;
      }
      this.data.freelanceNeed.freelanceReason = this.reason;
      this.missionsService.updateStatusNeedFreelance(this.need.companyId, this.data.freelanceNeed)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(
        (result: FreelanceNeedDTO) => {
          this.notifyModal = true;
        },
        err => {
          this.notification.show({
            title: 'Refus de mission',
            message: err,
            type: NotificationType.error
          });
        },
      );
    } else {
      this.notification.show({
        title: 'Refus de mission',
        message: 'Le motif de refus n\'est pas valide',
        type: NotificationType.error
      });
    }
  }
}
