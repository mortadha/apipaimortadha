import { Component, OnInit, OnDestroy } from '@angular/core';

import * as _moment from 'moment';
const moment = _moment;

// Services
import { FreelanceService, ProfileService, UserService } from '@app/core/services/';
import {
  FreelancePrivateDTO,
  AccountType,
  AuthDTO,
  FreelanceAvailabilityTypeEnum,
  FreelanceMobilityEnum,
  FreelanceRemoteEnum
} from '@neadz/dtos';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';
import { titleValidator, tjmValidator, availabilityDateValidator } from '@app/shared/validator';

@Component({
  selector: 'app-main-profile-infos-modal',
  templateUrl: './main-profile-infos-modal.component.html',
  styleUrls: ['./main-profile-infos-modal.component.scss']
})
export class MainProfileInfosModalComponent implements OnInit, OnDestroy {
  freelance: FreelancePrivateDTO;
  availibilityDateMonth: string;
  availibilityDateYear: string;
  user: AuthDTO;
  private originalFreelance: FreelancePrivateDTO;
  private componentDestroyed = new Subject();
  public accountType = AccountType;
  availibilityType = FreelanceAvailabilityTypeEnum;
  mobilityEnum = FreelanceMobilityEnum;
  remoteEnum = FreelanceRemoteEnum;
  // availibilityYear: number;
  // availibilityMonth: number;
  // form: FormGroup;

  constructor(public dialogRef: MatDialogRef<MainProfileInfosModalComponent>,
              private profileService: ProfileService,
              private freelanceService: FreelanceService,
              private userService: UserService,
              private notification: NotificationService) {
    this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
    this.originalFreelance = new FreelancePrivateDTO();
    Object.assign(this.originalFreelance, this.freelance);
    this.availibilityDateMonth = moment(this.freelance.availabilityDate).format('MM');
    this.availibilityDateYear = moment(this.freelance.availabilityDate).format('YYYY');
    if (!this.freelance.bio) {
      this.freelance.bio = '';
    }

  }
    ngOnInit() {
    // Get user info
    this.user = this.userService.getCurrentUser();

    // Implemented a full form but not using it yet because of some bugs we need to get ride of
    // this.form = new FormGroup({
    //   'title': new FormControl(this.freelance.account.title, [
    //     Validators.required,
    //     Validators.maxLength(255),
    //   ]),
    //   'availabilityDateMonth': new FormControl(this.freelance.availabilityDate, [
    //     Validators.required,
    //     Validators.maxLength(255),
    //   ]),
    //   'availabilityDateYear': new FormControl(this.freelance.availabilityDate, [
    //     Validators.required,
    //     Validators.maxLength(255),
    //   ]),
    //   'availabilityType': new FormControl(this.freelance.availabilityType, [
    //     Validators.required,
    //     Validators.maxLength(255),
    //   ]),
    //   'cjm': new FormControl(this.freelance.tjm, [
    //     Validators.required,
    //     Validators.maxLength(255),
    //   ]),
    //   'experience': new FormControl(this.freelance.experienceLevel, [
    //     Validators.required,
    //     Validators.maxLength(255),
    //   ]),
    //   'bio': new FormControl(this.freelance.bio, [
    //     Validators.required,
    //     Validators.maxLength(400),
    //   ]),
    //   'missionDuration': new FormControl(this.freelance.missionDuration, [
    //     Validators.required,
    //     Validators.maxLength(255),
    //   ]),
    //   'mobility': new FormControl(this.freelance.mobility, [
    //     Validators.required,
    //     Validators.maxLength(255),
    //   ]),
    //   'workingRemotly': new FormControl(this.freelance.workingRemotely, [
    //     Validators.required,
    //     Validators.maxLength(255),
    //   ])
    // });
  }

  // get titleForm() { return this.form.get('title'); }
  // get availabilityDateForm() { return this.form.get('availabilityDate'); }
  // get availabilityTypeForm() { return this.form.get('availabilityType'); }
  // get cjmForm() { return this.form.get('cjm'); }
  // get experienceForm() { return this.form.get('experience'); }
  // get bioForm() { return this.form.get('bio'); }
  // get missionDurationForm() { return this.form.get('missionDuration'); }
  // get mobilityForm() { return this.form.get('mobility'); }
  // get workingRemotlyForm() { return this.form.get('workingRemotly'); }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  /**
   * When user change value of his experience
   * @param $event new value in years
   * @param skill Skill to update
   */
  experienceChanged($event) {
    this.freelance.experienceLevel = $event;
  }

  /**
   * When user change his availibility date
   */
  availibilityDateChanged() {
    this.freelance.availabilityDate = moment(this.availibilityDateMonth + '-' + this.availibilityDateYear, 'MM-YYYY').toDate();
  }

  checkInput() {
    if (titleValidator(this.freelance.headline)) {
      this.notification.show({
        title: 'Titre',
        message: 'Le titre doit contenir au moins 5 caractères',
        type: NotificationType.error
      });
      return false;
    } else if (tjmValidator(this.freelance.tjm)) {
      this.notification.show({
        title: 'TJM',
        message: 'La TJM doit être supérieur à zéro',
        type: NotificationType.error
      });
      return false;
    } else if (availabilityDateValidator(this.freelance.availabilityDate, this.freelance.availabilityType)) {
      this.notification.show({
        title: 'Date de disponibilité',
        message: 'La date de disponibilité ne peut être vide',
        type: NotificationType.error
      });
      return false;
    } else {
      return true;
    }
  }

  /**
   * When user confirm information updates
   */
  submit() {
    if (this.checkInput()) {
      this.freelanceService.update(this.freelance)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelancePrivateDTO) => {
        this.profileService.setCurrentFreelance(result);
        this.dialogRef.close();
        this.notification.show({
          title: 'Profil mis à jour',
          message: 'Votre profil a bien été mis à jour',
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
    this.profileService.setCurrentFreelance(this.originalFreelance);
    this.dialogRef.close();
  }
}
