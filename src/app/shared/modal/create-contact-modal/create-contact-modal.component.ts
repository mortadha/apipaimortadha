import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CompanyPublicDTO, AccountDTO } from '@neadz/dtos';

import { CompanyService } from '@app/core/services/company.service';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';

import { environment } from '@env/environment';

import { emailValidator, nameValidator, phoneValidator } from '../../validator';
import { UserService } from '@app/core/services';

export interface CreateContactModalData {
  company: CompanyPublicDTO;
  isNew: Boolean;
  account:  AccountDTO;
}

@Component({
  selector: 'app-create-contact-modal',
  templateUrl: './create-contact-modal.component.html',
  styleUrls: ['./create-contact-modal.component.scss']
})
export class CreateContactModalComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  account = new AccountDTO();
  originalContact: AccountDTO;
  env: boolean;

  constructor(public dialogRef: MatDialogRef<CreateContactModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CreateContactModalData,
              private companyService: CompanyService,
              private notification: NotificationService,
              private userService: UserService) { }

  ngOnInit() {
    this.env = environment.production;
    if (this.data.account) {
      this.account = this.data.account;
    }
    if (this.data.isNew === false) {
      this.originalContact = new AccountDTO();
      Object.assign(this.originalContact, this.data.account);
    }
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  /**
   * Tell if form is valid or not
   */
  isFormValid(): boolean {
    return (this.account.email !== undefined);
  }

  close() {
    this.dialogRef.close(this.originalContact);
  }

  resendMail() {
    this.userService.resendMail(this.account.id)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: AccountDTO) => {
      this.notification.show({
        title: 'Contact',
        message: 'Un mail d\'activation a bien été envoyé au client',
        type: NotificationType.success
      });
    });
  }

  checkInput() {
    if (nameValidator(this.account.firstName)) {
      this.notification.show({
        title: 'Prénom',
        message: 'Le prénom n\'est pas correct',
        type: NotificationType.error
      });
      return false;
    } else if (nameValidator(this.account.lastName)) {
      this.notification.show({
        title: 'Nom',
        message: 'Le nom n\'est pas correct',
        type: NotificationType.error
      });
      return false;
    } else if (nameValidator(this.account.title)) {
      this.notification.show({
        title: 'Poste',
        message: 'Le poste n\'est pas correct',
        type: NotificationType.error
      });
      return false;
    } else if (phoneValidator(this.account.phone)) {
      this.notification.show({
        title: 'Téléphone',
        message: 'Le téléphone n\'est pas correct',
        type: NotificationType.error
      });
      return false;
    } else if (emailValidator(this.account.email, false)) {
      this.notification.show({
        title: 'Email',
        message: 'L\'email n\'est pas correct',
        type: NotificationType.error
      });
      return false;
    } else {
      return true;
    }
  }

  submit() {
    if (this.checkInput()) {
      if (this.data.isNew) {
        this.account.company = new CompanyPublicDTO();
        this.account.company.id = this.data.company.id;
        this.account.cguValidated = true;
        this.companyService.createClient(this.account)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((result: AccountDTO) => {
          this.notification.show({
            title: 'Contact',
            message: 'Le contact a bien été crée',
            type: NotificationType.success
          });
            this.dialogRef.close(result);
        }, (error) => {
          this.notification.show({
            title: 'Contact',
            message: error,
            type: NotificationType.error
          });
        });
      } else {
        this.companyService.updateClient(this.account)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((result: AccountDTO) => {
          this.notification.show({
            title: 'Contact',
            message: 'Le contact a bien été mis à jour',
            type: NotificationType.success
          });
            this.dialogRef.close(result);
        }, (error) => {
          this.notification.show({
            title: 'Contact',
            message: error,
            type: NotificationType.error
          });
        });
      }
    }
  }
}
