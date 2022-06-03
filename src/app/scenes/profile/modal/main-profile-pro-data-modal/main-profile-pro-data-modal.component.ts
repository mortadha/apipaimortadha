import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { FreelancePrivateDTO, AuthDTO, AccountType, LegalStatusDTO, CompanyStatusEnum, LegalStatusEnum } from '@neadz/dtos';
import { UserService, FreelanceService, ProfileService } from '@app/core/services/';

import { NotificationService, NotificationType } from '@app/core/services/notification.service';

import { siretValidator, nameValidator } from '@app/shared/validator';
@Component({
  selector: 'app-main-profile-pro-data-modal',
  templateUrl: './main-profile-pro-data-modal.component.html',
  styleUrls: ['./main-profile-pro-data-modal.component.scss']
})
export class MainProfileProDataModalComponent implements OnInit, OnDestroy {
  user: AuthDTO;
  freelance: FreelancePrivateDTO;
  accountType = AccountType;
  private originalFreelance: LegalStatusDTO;
  private componentDestroyed = new Subject();
  statusEnum = LegalStatusEnum;

  constructor(public dialogRef: MatDialogRef<MainProfileProDataModalComponent>,
              private profileService: ProfileService,
              private freelanceService: FreelanceService,
              private userService: UserService,
              private notification: NotificationService) {
    this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
    this.originalFreelance = new LegalStatusDTO();
    Object.assign(this.originalFreelance, this.freelance.legal);
    this.user = this.userService.getCurrentUser();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  checkInput() {
    if (siretValidator(Number(this.freelance.legal.siret))) {
      this.notification.show({
        title: 'Siret',
        message: 'Le numéro de siret n\'est pas valable',
        type: NotificationType.error
      });
      return false;
    } else if (nameValidator(this.freelance.legal.companyName) && this.freelance.legal.status !== this.statusEnum.AE) {
      this.notification.show({
        title: 'Nom d\'entreprise',
        message: 'Le nom d\'entreprise n\'est pas valable',
        type: NotificationType.error
      });
    } else if (!this.freelance.legal.zipcode) {
      this.notification.show({
        title: 'Code postal',
        message: 'Le code postal n\'est pas valide',
        type: NotificationType.error
      });
      return false;
    } else {
      return true;
    }
  }

  /**
   * Callback to submit changes
   */
  submit() {
    if (this.checkInput()) {
      if (this.freelance.legal.status === this.statusEnum.AE) {
        this.freelance.legal.companyName = '';
      }
      this.freelanceService.update(this.freelance)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelancePrivateDTO) => {
        this.profileService.setCurrentFreelance(result);
        this.notification.show({
          title: 'Experience',
          message: 'Les coordonnées professionelles ont bien été mises à jour',
          type: NotificationType.success
        });
        this.dialogRef.close();
      }, (error) => {
        this.notification.show({
          title: 'Experience',
          message: error,
          type: NotificationType.error
        });
      });
    }
  }

  /**
   * Callback to close modal
   */
  close() {
    this.freelance.legal = this.originalFreelance;
    this.profileService.setCurrentFreelance(this.freelance);
    this.dialogRef.close();
  }
}
