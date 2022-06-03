import { Component, OnInit, Input } from '@angular/core';

// Services
import { AccountType, AuthDTO, FreelanceStatusEnum, FreelancePrivateDTO } from '@neadz/dtos';
import { UserService, NotificationType, FreelanceService, NotificationService, ProfileService } from '@app/core/services';
import { Observable, Subject } from 'rxjs';
import {
  DoubleConfirmValidationModalData,
  DoubleConfirmValidationModalComponent
} from '@app/shared/modal/double-confirm-validation-modal/double-confirm-validation-modal.component';
import { modalFactory } from '@app/shared/modal/modal.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-actions',
  templateUrl: './profile-actions.component.html',
  styleUrls: ['./profile-actions.component.scss']
})
export class ProfileActionsComponent implements OnInit {
  freelance: FreelancePrivateDTO;
  private componentDestroyed = new Subject();
  accountType = AccountType;
  statusEnum =  FreelanceStatusEnum;
  user: AuthDTO;
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private dialog: MatDialog,
    private freelanceService: FreelanceService,
    private router: Router,
    private notification: NotificationService) {
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.freelance = this.profileService.getCurrentFreelance() as FreelancePrivateDTO;
  }

  confirmDesactivate() {
    const myPromise: Observable<string> = new Observable((observer) => {
      observer.next('test');
      this.desactivate();
      observer.complete();
    });

    const data: DoubleConfirmValidationModalData<string> = {
      titreConfirmation: 'Confirmation',
      textConfirmation: 'Voulez vous désactiver le profil de ' + this.freelance.account.firstName + ' ' + this.freelance.account.lastName,
      titreSuccess: 'Profil désactivé',
      textSuccess:
      'Le profil de ' + this.freelance.account.firstName + ' ' + this.freelance.account.lastName +
      ' a bien été désactivé.',
      buttonConfirm: 'Désactiver',
      buttonCancel: 'Annuler',
      call: myPromise,
    };
    const modal = modalFactory<DoubleConfirmValidationModalComponent<string>>(this.dialog);
    modal.open<DoubleConfirmValidationModalData<string>>(data, DoubleConfirmValidationModalComponent,
    (result: Boolean) => {
      if (result) {
        this.router.navigate(['/agent/freelances']);
      }
    });
  }

  desactivate() {
    this.freelance.status = this.statusEnum.Desactivated;
    this.freelanceService.update(this.freelance)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: FreelancePrivateDTO) => {
    }, (error) => {
      this.notification.show({
        title: 'Profil mis à jour',
        message: error,
        type: NotificationType.error
      });
    });
  }

  confirmDelete() {
    const myPromise: Observable<string> = new Observable((observer) => {
      observer.next('test');
      this.delete();
      observer.complete();
    });

    const data: DoubleConfirmValidationModalData<string> = {
      titreConfirmation: 'Confirmation',
      textConfirmation: 'Voulez vous supprimer ce profil ? Cette action est définitive',
      titreSuccess: 'Profil supprimé',
      textSuccess:
      'Le profil de ' + this.freelance.account.lastName + ' ' + this.freelance.account.firstName +
      ' a bien été supprimé.',
      buttonConfirm: 'Supprimer',
      buttonCancel: 'Annuler',
      call: myPromise,
    };
    const modal = modalFactory<DoubleConfirmValidationModalComponent<string>>(this.dialog);
    modal.open<DoubleConfirmValidationModalData<string>>(data, DoubleConfirmValidationModalComponent,
    (result: Boolean) => {
      if (result) {
        this.router.navigate(['/agent/freelances']);
      }
    });
  }

  delete() {
    this.freelanceService.delete(this.freelance.id)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res) => {
    }, (error) => {
      this.notification.show({
        title: 'Activation du freelance',
        message: error,
        type: NotificationType.error
      });
    });
  }

  resendMail() {
    this.freelanceService.resendMail(this.freelance.account.id)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: FreelancePrivateDTO) => {
      this.notification.show({
        title: 'Freelance',
        message: 'Le mail d\'activation a bien été renvoyé',
        type: NotificationType.success
      });
    }, (error) => {
      this.notification.show({
        title: 'Freelance',
        message: error,
        type: NotificationType.error
      });
    });
  }
}
