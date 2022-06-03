import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { nameValidator, datesValidator } from '@app/shared//validator';

// Services
import { TechService, ProfileService } from '@app/core/services/';
import { ExperienceService } from '../../services/experience.service';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';

import { TechDTO, FreelancePublicDTO, ExperienceDTO, CompanyPublicDTO, CompanyStatusEnum, ExperienceWithCompletion } from '@neadz/dtos';
import { MatDatepicker } from '@angular/material';
import * as moment from 'moment';

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

export interface ProfileEditExperienceData {
  isNew: boolean;
  experience: ExperienceDTO;
}

@Component({
  templateUrl: './profile-edit-experience-modal.component.html',
  styleUrls: ['./profile-edit-experience-modal.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class ProfileEditExperienceModalComponent implements OnInit, OnDestroy {
  dates = ['', ''];
  isAddingNewCompany = false;
  modalTitle = 'Expérience';
  experience: ExperienceDTO;
  freelance: FreelancePublicDTO;
  techs: TechDTO[] = [];
  autocompleteCompanies: CompanyPublicDTO[] = [];
  autoCompFieldIsFocused: boolean;
  noCompanies = false;
  newCompanyCity = '';
  newCompanyCountry = '';
  newCompanyImage = '../../../../assets/img/add-logo-button.svg';
  currentText = ''; // CompanyName
  private originalExperience: ExperienceDTO;
  private searchText = ''; // text tmp for limiter
  private componentDestroyed = new Subject();
  myControl = new FormControl();
  filteredOptions: Observable<TechDTO[]>;

  constructor(public dialogRef: MatDialogRef<ProfileEditExperienceModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProfileEditExperienceData,
              private techService: TechService,
              private experienceService: ExperienceService,
              private profileService: ProfileService,
              private notification: NotificationService) {
    if (this.data.isNew === true) {
      this.modalTitle = 'Nouvelle expérience';
    } else {
      this.originalExperience = new ExperienceDTO();
      Object.assign(this.originalExperience, this.data.experience);
      this.currentText = this.data.experience.company.name;
    }
    this.experience = this.data.experience;
    this.freelance = this.profileService.getCurrentFreelance();
  }

  ngOnInit() {
    this.techService.getAll()
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res) => {
      this.techs = res.filter((value) => {
        return this.experience.techs.find((value2) => value.id === value2.id) === undefined;
      });
    }, (error) => {
      this.notification.show({
        title: 'Reception des informations',
        message: error,
        type: NotificationType.error
      });
    });

    // This handle the autocomplete for the competences
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map((name) => {
        if (typeof name !== 'string') {
          if (this.experience.techs.length >= 4) {
            this.notification.show({
              title: 'Compétences',
              message: 'Quatres compétences maximum',
              type: NotificationType.error
            });
          } else {
            this.experience.techs.push(name);
          }
          return null;
        } else {
          name = name.toLowerCase();
          let result = this.techs.filter(option => option.name.toLowerCase().indexOf(name) === 0);
          for (const pickedTech of this.experience.techs) {
            // This loop is here in order to avoid already picked tech displaying in the autocomplete
            result = result.filter(option => option.name.indexOf(pickedTech.name) !== 0);
          }
          return result;
        }
      })
    );
  }

  inputDisplay() {
    return null;
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  checkInput() {
    if (nameValidator(this.experience.company.name)) {
      this.notification.show({
        title: 'Nom de l\'entreprise',
        message: 'Le nom de l\'entreprise n\'est pas valable',
        type: NotificationType.error
      });
      return false;
    } else if (datesValidator(this.experience.startedAt, this.experience.endedAt, this.experience.presentPosition)) {
      this.notification.show({
        title: 'Dates',
        message: 'Les dates ne sont pas valables',
        type: NotificationType.error
      });
      return false;
    } else if (nameValidator(this.experience.jobTitle, 100)) {
      this.notification.show({
        title: 'Intitulé du poste',
        message: 'L\'intitulé du poste n\'est pas valable',
        type: NotificationType.error
      });
    } else {
      return true;
    }
  }

  /**
   * Callback when user submit the form to create
   * or update an experience
   */
  submit() {
    if (this.checkInput()) {
      if (this.data.isNew === true) {
        this.createExperience();
      } else {
        this.updateExperience();
      }
    }
  }

  /**
   * Create a new Experience
   */
  createExperience() {
    this.experienceService.create(this.freelance.id, this.experience)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: ExperienceWithCompletion) => {
      this.notification.show({
        title: 'Experience',
        message: 'L\'expérience a bien été crée',
        type: NotificationType.success
      });
      this.dialogRef.close(result);
    }, (error) => {
      this.notification.show({
        title: 'Expérience',
        message: error,
        type: NotificationType.error
      });
    });
  }

  /**
   * Update an Experience
   */
  updateExperience() {
    this.experienceService.update(this.experience)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: ExperienceDTO) => {
      this.dialogRef.close(result);
      this.notification.show({
        title: 'Mise à jour expérience',
        message: 'L\'expérience a bien été mise à jour',
        type: NotificationType.success
      });
    });
  }

  /**
   * Callback when a specific technology is deleted
   * @param $event
   */
  deleteTech(id) {
    const deletedTech = this.experience.techs.find((value) => value.id === id);
    this.experience.techs = this.experience.techs.filter((value) => value.id !== id);
    this.techs.push(deletedTech);
  }

  /**
   * Callback when a specific company is selected through autocomplete
   * @param {CompanyPublicDTO} company
   */
  selectCompany(company) {
    this.experience.company = company;
    this.autocompleteCompanies = [];
    this.searchText = '';
    this.currentText = company.name;
    this.noCompanies = false;
  }

  /**
   * Callback when a user wants to add a new company
   * @param {CompanyPublicDTO} company
   */
  addNewCompany() {
    this.autocompleteCompanies = [];
    this.noCompanies = true;
    this.isAddingNewCompany = true;
  }

  reset() {
    this.currentText = this.searchText = '';
    this.noCompanies = false;
    this.isAddingNewCompany = false;
  }

  /**
   * Callback when a user validates a new company
   */
  createNewCompany() {
    const newCompany = new CompanyPublicDTO();
    newCompany.name = this.currentText;
    newCompany.city = this.newCompanyCity;
    newCompany.street = '';
    newCompany.zipcode = '';
    newCompany.code = 'UA' + this.currentText.substring(0, 2) + Math.floor((Math.random() * 100) + 1);
    newCompany.country = this.newCompanyCountry;
    newCompany.status = CompanyStatusEnum.INACTIVE;
    this.experienceService.createCompany(newCompany)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res: CompanyPublicDTO) => {
      this.experience.company = res;
      this.noCompanies = false;
      this.autocompleteCompanies = [];
      this.searchText = '';
      this.currentText = res.name;
    }, (error) => {
      this.notification.show({
        title: 'Nouvelle entreprise',
        message: error,
        type: NotificationType.error
      });
    });
  }

  /**
   * Callback to close modal
   */
  close() {
    if (this.data.isNew === false) {
      this.freelance.experiences = this.freelance.experiences.map((ed) => {
        return (ed.id === this.originalExperience.id) ? this.originalExperience : ed;
      });
    }
    this.dialogRef.close();
  }

  /**
   * Delete Experience
   */
  deleteExperience() {
   this.experienceService.delete(this.experience.id)
   .pipe(takeUntil(this.componentDestroyed)).subscribe((res) => {
      this.freelance.experiences = this.freelance.experiences.filter((ed) => ed.id !== this.experience.id);
      this.dialogRef.close(res);
    }, (error) => {
      this.notification.show({
        title: 'Suppression d\'une expérience',
        message: error,
        type: NotificationType.error
      });
    });
  }

  /**
   * Callback when user inputs name of the company
   */
  companyInputChange($event) {
    this.currentText = $event.target.value;
    if ($event.target.value.length === 0) {
      this.searchText = this.currentText = '';
      this.autocompleteCompanies = [];
      this.noCompanies = false;
      return ;
    }
    // Limiter, call api after 2 characters
    this.experienceService.searchCompanies($event.target.value)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res) => {
      this.searchText = $event.target.value;
      this.autocompleteCompanies = res;
      this.noCompanies = (this.autocompleteCompanies.length === 0 && this.autoCompFieldIsFocused);
    }, (error) => {
      this.notification.show({
        title: 'Recherche',
        message: error,
        type: NotificationType.error
      });
    });
  }

  chosenStartYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue: moment.Moment = moment(this.experience.startedAt);
    ctrlValue.year(normalizedYear.year());
    this.experience.startedAt = ctrlValue.toDate();
  }

  chosenStartMonthHandler(normlizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue: moment.Moment = moment(this.experience.startedAt);
    ctrlValue.month(normlizedMonth.month());
    this.experience.startedAt = ctrlValue.toDate();
    datepicker.close();
  }

  chosenEndYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue: moment.Moment = moment(this.experience.endedAt);
    ctrlValue.year(normalizedYear.year());
    this.experience.endedAt = ctrlValue.toDate();
  }

  chosenEndMonthHandler(normlizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue: moment.Moment = moment(this.experience.endedAt);
    ctrlValue.month(normlizedMonth.month());
    this.experience.endedAt = ctrlValue.toDate();
    datepicker.close();
  }

  onResetEndAt() {
    if (this.experience.presentPosition === true) {
      this.experience.endedAt = undefined;
    }
  }
}
