import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { emailValidator, nameValidator, zipcodeValidator } from '@app/shared/validator';

// Services
import { FreelancePrivateDTO, AuthDTO, AccountType, AccountDTO } from '@neadz/dtos';
import { UserService, FreelanceService, ProfileService } from '@app/core/services/';

import { NotificationService, NotificationType } from '@app/core/services/notification.service';

@Component({
  selector: 'app-main-profile-data-modal',
  templateUrl: './main-profile-data-modal.component.html',
  styleUrls: ['./main-profile-data-modal.component.scss']
})
export class MainProfileDataModalComponent implements OnInit, OnDestroy {
  user: AuthDTO;
  freelance: FreelancePrivateDTO;
  accountType = AccountType;
  private originalFreelance: FreelancePrivateDTO;
  private originalAccount: AccountDTO;
  private componentDestroyed = new Subject();

  constructor(public dialogRef: MatDialogRef<MainProfileDataModalComponent>,
              private profileService: ProfileService,
              private freelanceService: FreelanceService,
              private userService: UserService,
              private notification: NotificationService) {
                this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
                this.originalFreelance = new FreelancePrivateDTO();
                this.originalAccount = new AccountDTO();
                Object.assign(this.originalFreelance, this.freelance);
                Object.assign(this.originalAccount, this.freelance.account);
                this.user = this.userService.getCurrentUser();
              }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  checkInput() {
    if (nameValidator(this.freelance.account.firstName)) {
      this.notification.show({
        title: 'Prénom',
        message: 'Le prénom doit contenir au moins deux caractères',
        type: NotificationType.error
      });
      return false;
    } else if (nameValidator(this.freelance.account.lastName)) {
      this.notification.show({
        title: 'Nom',
        message: 'Le nom doit contenir au moins deux caractères',
        type: NotificationType.error
      });
      return false;
    } else if (emailValidator(this.freelance.account.email, false)) {
      this.notification.show({
        title: 'Email',
        message: 'L\'adresse email n\'est pas valide',
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
      this.freelanceService.update(this.freelance)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelancePrivateDTO) => {
        this.profileService.setCurrentFreelance(result);
        if (this.user.type === AccountType.Freelance) {
          this.userService.setAccount(this.freelance.account);
        }
        this.dialogRef.close();
        this.notification.show({
          title: 'Profil mis à jour',
          message: 'Les coordonnées personnelles ont bien été mises à jour',
          type: NotificationType.success
        });
      }, (error) => {
        this.notification.show({
          title: 'Profil mis à jour',
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
    this.originalFreelance.account = this.originalAccount;
    this.profileService.setCurrentFreelance(this.originalFreelance);
    if (this.user.type === AccountType.Freelance) {
      this.userService.setAccount(this.originalAccount);
    }
    this.dialogRef.close();
  }
}
