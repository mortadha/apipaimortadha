import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountDTO, FreelancePrivateDTO, FreelanceSourceEnum, FreelanceStatusEnum } from '@neadz/dtos';
import { environment } from '@env/environment';

// Services
import { FreelanceService } from '@app/core/services/freelance.service';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';


import { emailValidator, nameValidator, phoneValidator } from '@app/shared/validator';
import { UserService } from '@app/core/services';

@Component({
  selector: 'app-create-freelance-modal',
  templateUrl: './create-freelance-modal.component.html',
  styleUrls: ['./create-freelance-modal.component.scss']
})
export class CreateFreelanceModalComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  freelance = new FreelancePrivateDTO();
  account = new AccountDTO();
  env: boolean;

  constructor(public dialogRef: MatDialogRef<CreateFreelanceModalComponent>,
              private freelanceService: FreelanceService,
              private notification: NotificationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.env = environment.production;
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  checkInput() {
    if (this.freelance.account) {
      if (emailValidator(this.freelance.account.email, false)) {
        this.notification.show({
          title: 'Mail',
          message: 'Le mail n\'est pas correct',
          type: NotificationType.error
        });
        return false;
      } else if (phoneValidator(this.freelance.account.phone)) {
        this.notification.show({
          title: 'Téléphone',
          message: 'Le numéro de téléphone n\'est pas correct',
          type: NotificationType.error
        });
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  submit() {
    this.freelance.account = this.account;
    this.freelance.account.cguValidated = true;
    this.freelance.source = FreelanceSourceEnum.Agent;
    this.freelance.status = FreelanceStatusEnum.Qualified;
    if (this.checkInput()) {
      this.freelanceService.create(this.freelance)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelancePrivateDTO) => {
        this.notification.show({
          title: 'Freelance',
          message: 'Le freelance a bien été crée',
          type: NotificationType.success
        });
        this.dialogRef.close(result);
      }, (error) => {
        this.notification.show({
          title: 'Mot de passe',
          message: error,
          type: NotificationType.error
        });
      });
    }
  }
}
