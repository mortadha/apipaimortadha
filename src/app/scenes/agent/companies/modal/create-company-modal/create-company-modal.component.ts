import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { modalFactory } from '@app/shared/modal/modal.component';

import { CompanyPublicDTO, MediaDTO, CompanyStatusEnum } from '@neadz/dtos';

import { CompanyService } from '@app/core/services/company.service';

import { MediaService } from '@app/core/services/media.service';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';
import { CropImageModalComponent } from '@app/shared/modal/crop-image-modal/crop-image-modal.component';

import { nameValidator, phoneValidator } from '@app/shared/validator';

export interface CreateCompanyModalData {
  company: CompanyPublicDTO;
  isNew: boolean;
}

@Component({
  selector: 'app-create-company-modal',
  templateUrl: './create-company-modal.component.html',
  styleUrls: ['./create-company-modal.component.scss']
})
export class CreateCompanyModalComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  private originalCompany: CompanyPublicDTO;
  public company = new CompanyPublicDTO();

  constructor(public dialogRef: MatDialogRef<CreateCompanyModalComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: CreateCompanyModalData,
              private companyService: CompanyService,
              private mediaService: MediaService,
              private notification: NotificationService) { }

  ngOnInit() {
    if (this.data.company) {
      this.company = this.data.company;
      this.originalCompany = new CompanyPublicDTO();
      Object.assign(this.originalCompany, this.data.company);
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
    return true;
    // return (this.company.account.email !== undefined &&
    //   this.company.name !== undefined);
  }

  cropImageModal($event) {
    const modal = modalFactory<CropImageModalComponent>(this.dialog);
      modal.open({}, CropImageModalComponent, (result) => {
        if (result) {
          this.fileUploaded(result);
        }
      });
  }

  fileUploaded(file) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.mediaService.upload(formData).subscribe(
      data => {
        this.company.companyLogo = new MediaDTO();
        this.company.companyLogo.url = data['url'];
        this.company.companyLogo.id = data['id'];
      }, (error) => {
        this.notification.show({
          title: 'Envoi de fichier',
          message: error,
          type: NotificationType.error
        });
      });
  }

  /**
   * Tell if Company has a profile picture
   */
  hasPicture(): boolean {
    return this.company.companyLogo &&
      this.company.companyLogo.url &&
      this.company.companyLogo.url.length > 0;
  }

  close() {
    if (this.data.isNew === false) {
      this.dialogRef.close(this.originalCompany);
    } else {
      this.dialogRef.close();
    }
  }

  /**
   * Generate Company Code
   */
  generateCode(): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const name = this.company.name.split(' ')[0];
    return `${name}${timestamp}`;
  }

  checkInput() {
    if (nameValidator(this.company.name)) {
      this.notification.show({
        title: 'Nom de l\'entreprise',
        message: 'Le nom de l\'entreprise n\'est pas valable',
        type: NotificationType.error
      });
      return false;
    } else if (!this.company.zipcode) {
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
   * Submit Company
   */
  submit() {
    if (this.checkInput()) {
      if (this.data.isNew) {
        this.company.code = this.generateCode();
        this.company.status = CompanyStatusEnum.PROSPECT;
        this.companyService.create(this.company)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((result: CompanyPublicDTO) => {
          this.notification.show({
            title: 'Entreprise',
            message: 'L\'entreprise a bien été crée',
            type: NotificationType.success
          });
          this.dialogRef.close(result);
        }, (error) => {
          this.notification.show({
            title: 'Entreprise',
            message: error,
            type: NotificationType.error
          });
        });
      } else {
        this.companyService.update(this.company)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((result: CompanyPublicDTO) => {
          this.notification.show({
            title: 'Entreprise',
            message: 'L\'entreprise a bien été mise à jour',
            type: NotificationType.success
          });
          this.dialogRef.close(result);
        }, (error) => {
          this.notification.show({
            title: 'Entreprise',
            message: error,
            type: NotificationType.error
          });
        });
      }
    }
  }
}
