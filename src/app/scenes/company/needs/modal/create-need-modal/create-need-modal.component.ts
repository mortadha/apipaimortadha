import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _moment from 'moment';
const moment = _moment;

import {
  NeedDTO,
  TechDTO,
  NeedStatusEnum,
  AuthDTO,
  DurationTypeEnum,
  CompanyPrivateDTO,
  AccountDTO,
  AccountType,
  SkillDTO,
  NeedAvailabilityTypeEnum,
  FreelancePublicDTO
} from '@neadz/dtos';

import { TechService, CompanyService, UserService, NeedService } from '@app/core/services/';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { NotificationService, NotificationType } from '@app/core/services/notification.service';

import { nameValidator, experienceLevelValidator, availabilityDateValidator } from '@app/shared/validator';
import { durationValidator } from '@app/shared/validator';
import { Router } from '@angular/router';

export interface CreateNeedModalData {
  companyId: string;
  need: NeedDTO;
  isNew: boolean;
  editable: boolean;
}

@Component({
  selector: 'app-create-need-modal',
  templateUrl: './create-need-modal.component.html',
  styleUrls: ['./create-need-modal.component.scss']
})

export class CreateNeedModalComponent implements OnInit, OnDestroy {
  myControl = new FormControl();
  filteredOptions: Observable<TechDTO[]>;
  need = new NeedDTO();
  needAvailabilityType = 1;
  techs: TechDTO[] = [];
  descriptionAreaOpen = false;
  date =  new Date();
  availibilityDateMonth = this.date.getMonth() + 1;
  availibilityDateYear = this.date.getFullYear();
  modalTitle = '';
  user: AuthDTO;
  accountType = AccountType;
  durationType = DurationTypeEnum;
  companyAccounts: AccountDTO[];
  notificationModal = false;
  updatedNeeds: NeedDTO[];
  descriptionLength = new BehaviorSubject(0);
  jobTitleLength = new BehaviorSubject(0);
  descTextControl = new FormControl('');
  titleTextControl = new FormControl('');
  accountAssigned: String = '';
  private componentDestroyed = new Subject();
  private originalNeed: NeedDTO;
  availibilityType = NeedAvailabilityTypeEnum;
  freelance: FreelancePublicDTO;
  editable: boolean;

  constructor(public dialogRef: MatDialogRef<CreateNeedModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CreateNeedModalData,
              private companyService: CompanyService,
              private techService: TechService,
              private notification: NotificationService,
              private needService: NeedService,
              private userService: UserService) {

    this.descTextControl.valueChanges.subscribe((v) => this.descriptionLength.next(v.length));
    this.titleTextControl.valueChanges.subscribe((v) => this.jobTitleLength.next(v.length));

    this.user = this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.need = this.data.need;
    if (this.editable === true) {
      this.modalTitle = this.data.isNew === true ? 'Nouveau besoin' : 'Modifier le besoin';
    } else {
      this.modalTitle = 'Besoin';
    }
    this.initNeed();
    this.editable = this.data.editable;

    if (this.editable === false) {
      this.titleTextControl.disable();
      this.descTextControl.disable();
    }
    this.techService.getAll()
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res: TechDTO[]) => {
      this.techs = res;
    });
    if (this.user.type === AccountType.Agent) {
      this.companyService.get(this.data.companyId)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: CompanyPrivateDTO) => {
        this.companyAccounts = result.accounts;
      }, () => {
        this.notification.show({
          title: 'Besoin',
          message: 'Un problème est survenu lors de la création du besoin',
          type: NotificationType.error
        });
        console.error('An error occured while creating need');
      });
    }
    // Handle Filter
    this.handleFilter();
  }

  initNeed() {
    if (this.data.isNew === false) {
      this.originalNeed = new NeedDTO();
      Object.assign(this.originalNeed, this.data.need);
    } else {
      this.need.renewable = true;
    }
    if (!this.need.jobTitle) {
      this.need.jobTitle = '';
    }
    if (!this.need.description) {
      this.need.description = '';
    }
    if (!this.need.skills) {
      this.need.skills = [];
    }
    if (this.need.accountCompany) {
      this.accountAssigned = this.need.accountCompany.id;
    }
    if (!this.need.availabilityType) {
      this.need.availabilityType = 1;
    } else {
      this.needAvailabilityType = this.need.availabilityType;
    }
    if (!this.need.durationType && this.need.durationType !== 0) {
      this.need.durationType = DurationTypeEnum.Month;
    }
    if (this.need.availabilityDate) {
      const date = new Date(this.need.availabilityDate);
      this.availibilityDateMonth = date.getMonth() + 1;
      this.availibilityDateYear = date.getFullYear();
    }
  }

  handleFilter() {
    // This handle the autocomplete for the competences
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map((name) => {
        if (typeof name !== 'string') {
          this.handleAddSkill(name);
          return null;
        } else {
          return this.handleSearchSkill(name.toLowerCase());
        }
      })
    );
  }

  handleAddSkill(tech: TechDTO) {
    if (this.need.skills.length >= 6) {
      this.notification.show({
        title: 'Compétences',
        message: 'Six compétences maximum',
        type: NotificationType.error
      });
    } else {
      const skill = new SkillDTO();
      skill.level = 50;
      skill.tech = tech;
      this.need.skills.push(skill);
    }
    this.techs = this.techs.filter(option => option.id !== tech.id);
  }

  handleSearchSkill(text: string): TechDTO[] {
    let result: TechDTO[] = [];
    if (this.techs !== undefined) {
      result = this.techs.filter(option => option.name.toLowerCase().indexOf(text) === 0);
    }
    return result;
  }

  inputDisplay() {
    return null;
  }

  /**
   * When Client removes a tech
   * @param $event
   */
  removeSkill(techId) {
    const deletedSkill = this.need.skills.find((value) => value.tech.id === techId);
    this.need.skills = this.need.skills.filter((value) => value.tech.id !== techId);
    this.techs.push(deletedSkill.tech);
  }

  /**
   * When user change value of a specific skill
   * @param $event new value in %
   * @param skill Skill to update
   */
  skillLevelChanged($event, skill) {
    this.need.skills.find((value) => value.tech.id === skill.tech.id).level = $event;
  }

  availabilityTypeChanged() {
    this.need.availabilityType = this.needAvailabilityType;
  }

  durationTypeChanged() {
    this.need.durationType = parseInt(`${this.need.durationType}`, 10);
  }

  /**
   * When user change his availibility date
   */
  availibilityDateChanged() {
    this.need.availabilityDate = moment(this.availibilityDateMonth + '-' + this.availibilityDateYear, 'MM-YYYY').toDate();
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  close() {
    if (this.data.isNew === false) {
      this.dialogRef.close(this.originalNeed);
    } else {
      this.dialogRef.close();
    }
  }

  closeAfterSucces() {
    this.dialogRef.close(this.updatedNeeds);
  }

  checkInput() {
   if (nameValidator(this.need.jobTitle)) {
      this.notification.show({
        title: 'Intitulé du poste',
        message: 'Le nom du poste n\'est pas renseigné',
        type: NotificationType.error
      });
      return false;
    } else if (this.need.skills.length <= 0) {
      this.notification.show({
        title: 'Technologies',
        message: 'Au moins une technologie doit être renseigné',
        type: NotificationType.error
      });
      return false;
    } else if (experienceLevelValidator(this.need.experienceLevel)) {
      this.notification.show({
        title: 'Niveau d\'expérience',
        message: 'Le niveau d\'expérience n\'est pas renseigné',
        type: NotificationType.error
      });
      return false;
    } else if (availabilityDateValidator(this.need.availabilityDate, this.need.availabilityType)) {
      this.notification.show({
        title: 'Date de disponibilité',
        message: 'La date de disponibilité n\'est pas valable',
        type: NotificationType.error
      });
      return false;
    } else if (durationValidator(this.need.durationLast, this.need.durationType)) {
      this.notification.show({
        title: 'Durée',
        message: 'La durée n\'est pas valable',
        type: NotificationType.error
      });
      return false;
    } else {
      return true;
    }
  }

  submit() {
    if (this.user.type === AccountType.Agent) {
      this.need.accountCompany = this.companyAccounts.filter((account) => account.id === this.accountAssigned)[0];
    } else if (this.user.type === AccountType.Company) {
      this.need.accountCompany = this.userService.getAccount();
    }
    this.need.availabilityDate = new Date(this.availibilityDateYear, this.availibilityDateMonth - 1, 1 );
    if (this.checkInput()) {
      if (this.data.isNew) {
        this.companyService.createNeed(this.need, this.data.companyId)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((result: NeedDTO[]) => {
            this.notification.show({
              title: 'Besoin',
              message: 'Le besoin a bien été crée',
              type: NotificationType.success
            });
            if (this.user.type !== AccountType.Agent) {
              this.updatedNeeds = result;
              this.notificationModal = true;
            } else {
              this.dialogRef.close(result);
            }
        }, (error) => {
          this.notification.show({
            title: 'Besoin',
            message: error,
            type: NotificationType.error
          });
        });
      } else {
        this.companyService.updateNeed(this.need)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((result: NeedDTO) => {
          this.notification.show({
            title: 'Besoin',
            message: 'Le besoin a bien été mise à jour',
            type: NotificationType.success
          });
          this.dialogRef.close(this.need);
        }, (error) => {
          this.notification.show({
            title: 'Besoin',
            message: error,
            type: NotificationType.error
          });
        });
    }
    }
  }

  deleteNeed() {
    this.needService.delete(this.need.id)
    .pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.dialogRef.close({status: false, need: this.need});
    }, (error) => {
      this.notification.show({
        title: 'Suppression d\'un besoin',
        message: error,
        type: NotificationType.error
      });
    });
  }

  updateStatus(status: NeedStatusEnum) {
    this.need.status = status;
    this.need.enabled = false;
  }
}
