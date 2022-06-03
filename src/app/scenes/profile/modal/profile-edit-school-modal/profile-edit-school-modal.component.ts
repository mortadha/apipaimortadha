import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

// Services
import { ProfileService } from '@app/core/services/profile.service';
import { EducationService } from '../../services/education.service';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';


import { ProfileEditExperienceModalComponent } from '../profile-edit-experience-modal/profile-edit-experience-modal.component';
import { EducationDTO, FreelancePublicDTO, UniversityDTO, UniversityCreationDTO, EducationWithCompletion } from '@neadz/dtos';
import { MatDatepicker } from '@angular/material';
import * as moment from 'moment';

import { nameValidator, datesValidator } from '@app/shared/validator';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export interface ProfileEditSchoolData {
  isNew: boolean;
  education: EducationDTO;
}
@Component({
  selector: 'app-profile-edit-school-modal',
  templateUrl: './profile-edit-school-modal.component.html',
  styleUrls: ['./profile-edit-school-modal.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})

export class ProfileEditSchoolModalComponent implements OnInit, OnDestroy {
  dates = ['', ''];
  modalTitle = 'Formation';
  education: EducationDTO;
  freelance: FreelancePublicDTO;
  autocompleteUniversities: UniversityDTO[] = [];
  autoCompFieldIsFocused: boolean;
  noUniversities = false;
  currentText = ''; // UniversityName
  private originalEducation: EducationDTO;
  private searchText = ''; // text tmp for limiter
  private componentDestroyed = new Subject();
  isAddingNewUniversity = false;
  newUniversityCity: string;
  newUniversityCountry: string;

  constructor(public dialogRef: MatDialogRef<ProfileEditExperienceModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProfileEditSchoolData,
              private educationService: EducationService,
              private profileService: ProfileService,
              private notification: NotificationService) {
    if (this.data.isNew === true) {
      this.modalTitle = 'Nouvelle formation';
    } else {
      this.originalEducation = new EducationDTO();
      Object.assign(this.originalEducation, this.data.education);
      this.currentText = this.data.education.university.name;
    }
    this.education = this.data.education;
    this.freelance = this.profileService.getCurrentFreelance();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  /**
   * Callback when a user validates a new company
   */
  createNewUniversity() {
    const newUniversity = new UniversityDTO();
    newUniversity.name = this.currentText;
    newUniversity.city = this.newUniversityCity;
    newUniversity.street = '';
    newUniversity.zipcode = '';
    newUniversity.code = 'UA' + this.currentText.substring(0, 2) + Math.floor((Math.random() * 100) + 1);
    newUniversity.country = this.newUniversityCountry;
    this.educationService.createUniversity(newUniversity)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res: UniversityDTO) => {
      this.education.university = res;
      this.noUniversities = false;
      this.autocompleteUniversities = [];
      this.searchText = '';
      this.currentText = res.name;
    }, (error) => {
      this.notification.show({
        title: 'Création d\'une université',
        message: error,
        type: NotificationType.error
      });
    });
  }

  addUniversity() {
    this.autocompleteUniversities = [];
    this.noUniversities = true;
    this.isAddingNewUniversity = true;
  }

  reset() {
    this.currentText = this.searchText = '';
    this.noUniversities = false;
    this.isAddingNewUniversity = false;
  }

  checkInput() {
    if (datesValidator(this.data.education.startedAt, this.data.education.endedAt, false)) {
      this.notification.show({
        title: 'Dates',
        message: 'Les dates ne sont pas correctes',
        type: NotificationType.error
      });
      return false;
    } else if (nameValidator(this.data.education.certificate)) {
      this.notification.show({
        title: 'Diplôme',
        message: 'Le nom du diplôme n\'est pas correct',
        type: NotificationType.error
      });
      return false;
    } else if (nameValidator(this.data.education.university.name)) {
      this.notification.show({
        title: 'Ecole',
        message: 'Le nom de l\'école n\'est pas correct',
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
        this.createEducation();
      } else {
        this.updateEducation();
      }
    }
  }

  /**
   * Create a new education
   */
  createEducation() {
    this.educationService.create(this.freelance.id, this.education)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: EducationWithCompletion) => {
      this.notification.show({
        title: 'Etudes',
        message: 'Vos études ont bien été mises à jour',
        type: NotificationType.success
      });
      this.dialogRef.close(result);
    }, () => {
      this.notification.show({
        title: 'Etudes',
        message: 'Un problème est survenu lors de la création de vos études',
        type: NotificationType.error
      });
    });
  }

  /**
   * Update an existing education
   */
  updateEducation() {
    this.educationService.update(this.education)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: EducationDTO) => {
      this.notification.show({
        title: 'Etudes',
        message: 'Vos études ont bien été mises à jour',
        type: NotificationType.success
      });
      this.dialogRef.close(result);
    });
  }

  /**
   * Callback when a specific company is selected through autocomplete
   * @param {UniversityDTO} university
   */
  selectUniversity(university: UniversityDTO) {
    this.education.university = university;
    this.autocompleteUniversities = [];
    this.searchText = '';
    this.currentText = university.name;
    this.noUniversities = false;
  }

  /**
   * Callback when a user wants to add a new university
   * @param {UniversityDTO} university
   */
  addNewUniversity() {
    const newUniversity = new UniversityDTO();
    newUniversity.name = this.currentText;
    newUniversity.street = '';
    newUniversity.zipcode = '';
    newUniversity.code = 'UA' + this.currentText.substring(0, 2) + Math.floor((Math.random() * 100) + 1);
    newUniversity.city = '';
    newUniversity.country = '';
    newUniversity.universityPictureMediaUrl = '';
    this.educationService.createUniversity(newUniversity)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res: UniversityDTO) => {
      this.education.university = res;
      this.noUniversities = false;
      this.autocompleteUniversities = [];
      this.searchText = '';
      this.currentText = res.name;
    }, (error) => {
      this.notification.show({
        title: 'Ajout d\'une université',
        message: error,
        type: NotificationType.error
      });
    });
  }

  /**
   * Callback when user close modal
   */
  close() {
    if (this.data.isNew === false) {
      this.freelance.educations = this.freelance.educations.map((ed) => {
        return (ed.id === this.originalEducation.id) ? this.originalEducation : ed;
      });
    }
    this.dialogRef.close();
  }

  /**
   * Delete Education
   */
  deleteEducation() {
   this.educationService.delete(this.education.id)
   .pipe(takeUntil(this.componentDestroyed)).subscribe((res) => {
      this.freelance.educations = this.freelance.educations.filter((ed) => ed.id !== this.education.id);
      this.dialogRef.close(res);
    }, (error) => {
      this.notification.show({
        title: 'Suprresion d\'études',
        message: error,
        type: NotificationType.error
      });
    });
  }

  /**
   * Callback when user inputs name of the company
   */
  schoolInputChange($event) {
    this.currentText = $event.target.value;
    if ($event.target.value.length === 0) {
      this.searchText = this.currentText = '';
      this.autocompleteUniversities = [];
      this.noUniversities = false;
      return ;
    }
    this.educationService.searchUniversities($event.target.value)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res) => {
      this.searchText = $event.target.value;
      this.autocompleteUniversities = res;
      this.noUniversities = (this.autocompleteUniversities.length === 0 && this.autoCompFieldIsFocused);
    }, (error) => {
      this.notification.show({
        title: 'Recherche',
        message: error,
        type: NotificationType.error
      });
    });
  }

  chosenStartYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue: moment.Moment = moment(this.education.startedAt);
    ctrlValue.year(normalizedYear.year());
    this.education.startedAt = ctrlValue.toDate();
  }

  chosenStartMonthHandler(normlizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue: moment.Moment = moment(this.education.startedAt);
    ctrlValue.month(normlizedMonth.month());
    this.education.startedAt = ctrlValue.toDate();
    datepicker.close();
  }

  chosenEndYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue: moment.Moment = moment(this.education.endedAt);
    ctrlValue.year(normalizedYear.year());
    this.education.endedAt = ctrlValue.toDate();
  }

  chosenEndMonthHandler(normlizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue: moment.Moment = moment(this.education.endedAt);
    ctrlValue.month(normlizedMonth.month());
    this.education.endedAt = ctrlValue.toDate();
    datepicker.close();
  }
}
