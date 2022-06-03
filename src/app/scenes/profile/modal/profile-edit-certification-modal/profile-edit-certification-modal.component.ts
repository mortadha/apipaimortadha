import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

// Services
import { ProfileService } from '@app/core/services/profile.service';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';
import { CertificationService } from '../../services/certification.service';

import { ProfileEditExperienceModalComponent } from '../profile-edit-experience-modal/profile-edit-experience-modal.component';
import { FreelancePublicDTO, LanguageDTO, LanguageLevelEnum, CertificationDTO } from '@neadz/dtos';
import { descriptionValidator, titleValidator, datesValidator } from '@app/shared/validator';

import * as moment from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDatepicker } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'D/MM/YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

export interface ProfileEditCertificationData {
  isNew: boolean;
  certification: CertificationDTO;
}
@Component({
  selector: 'app-profile-edit-certification-modal',
  templateUrl: './profile-edit-certification-modal.component.html',
  styleUrls: ['./profile-edit-certification-modal.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class ProfileEditCertificationModalComponent implements OnInit, OnDestroy {
  modalTitle = 'Editer une certification';
  certification: CertificationDTO;
  freelance: FreelancePublicDTO;
  languageLevelEnum = LanguageLevelEnum;
  private originalCertification: CertificationDTO;
  private componentDestroyed = new Subject();

  constructor(public dialogRef: MatDialogRef<ProfileEditExperienceModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProfileEditCertificationData,
              private profileService: ProfileService,
              private notification: NotificationService,
              private certificationService: CertificationService) {
    if (this.data.isNew === true) {
      this.modalTitle = 'Ajouter une certification';
    } else {
      this.originalCertification = new CertificationDTO();
      Object.assign(this.originalCertification, this.data.certification);
    }
    this.certification = this.data.certification;
    this.freelance = this.profileService.getCurrentFreelance();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  checkInput() {
    if (titleValidator(this.certification.title)) {
      this.notification.show({
        title: 'Title',
        message: 'La descrition doit contenir moins de 400 caractères',
        type: NotificationType.error
      });
    } else if (descriptionValidator(this.certification.description)) {
      this.notification.show({
        title: 'Description',
        message: 'La descrition doit contenir moins de 400 caractères',
        type: NotificationType.error
      });
      return false;
    } else if (!this.certification.obtainingDate) {
      this.notification.show({
        title: 'Date',
        message: 'La date n\'est pas renseignée',
        type: NotificationType.error
      });
      return false;
    } else {
      return true;
    }
  }

  /**
   * Callback when user submit the form to create
   * or update a school
   *
   */
  submit() {
    if (this.checkInput()) {
      if (this.data.isNew === true) {
        this.createCertification();
      } else {
        this.updateCertification();
      }
    }
  }

  /**
   * Create a new certification
   */
  createCertification() {
    this.certificationService.create(this.freelance.id, this.certification)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: CertificationDTO) => {
      this.notification.show({
        title: 'Certifications',
        message: 'Votre certification a bien été mises à jour',
        type: NotificationType.success
      });
      this.dialogRef.close(result);
    }, () => {
      this.notification.show({
        title: 'Certification',
        message: 'Un problème est survenu lors de la création de la certification',
        type: NotificationType.error
      });
    });
  }

  /**
   * Update an existing certification
   */
  updateCertification() {
    this.certificationService.update(this.certification)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: LanguageDTO) => {
      this.notification.show({
        title: 'Certification',
        message: 'Votre certification a bien été mises à jour',
        type: NotificationType.success
      });
      this.dialogRef.close(result);
    });
  }

  /**
   * Callback when user close modal
   */
  close() {
    if (this.data.isNew === false) {
      this.freelance.certifications = this.freelance.certifications.map((ed) => {
        return (ed.id === this.originalCertification.id) ? this.originalCertification : ed;
      });
    }
    this.dialogRef.close();
  }

  /**
   * Delete Language
   */
  deleteCertification() {
   this.certificationService.delete(this.certification.id)
   .pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.freelance.certifications = this.freelance.certifications.filter((ed) => ed.id !== this.certification.id);
      this.dialogRef.close();
    }, (error) => {
      this.notification.show({
        title: 'Suppresion de certification',
        message: error,
        type: NotificationType.error
      });
    });
  }

  chosenStartYearHandler(normalizedYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue: moment.Moment = moment(this.certification.obtainingDate);
    ctrlValue.year(normalizedYear.year());
    this.certification.obtainingDate = ctrlValue.toDate();
    datepicker.close();
  }
}
