import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import * as _moment from 'moment';
const moment = _moment;

// Services
import { FreelanceService, ProfileService, UserService, TechService} from '@app/core/services/';
import {
  FreelancePrivateDTO,
  AccountType,
  AuthDTO,
} from '@neadz/dtos';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl} from '@angular/forms';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';
import { descriptionValidator } from '@app/shared/validator';

@Component({
  selector: 'app-profile-description-modal',
  templateUrl: './profile-description-modal.component.html',
  styleUrls: ['./profile-description-modal.component.scss']
})
export class ProfileDescriptionModalComponent implements OnInit, OnDestroy {
  freelance: FreelancePrivateDTO;
  user: AuthDTO;
  private originalFreelance: FreelancePrivateDTO;
  private componentDestroyed = new Subject();
  descriptionLength = new BehaviorSubject(0);
  public textControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<ProfileDescriptionModalComponent>,
    private profileService: ProfileService,
    private freelanceService: FreelanceService,
    private userService: UserService,
    private notification: NotificationService) {}

    ngOnInit() {
      this.textControl.valueChanges.subscribe((v) => this.descriptionLength.next(v.length));
      this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
      this.originalFreelance = new FreelancePrivateDTO();
      Object.assign(this.originalFreelance, this.freelance);
      if (!this.freelance.bio) {
        this.freelance.bio = '';
      }
      // Get user info
      this.user = this.userService.getCurrentUser();
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }


  checkInput() {
    if (descriptionValidator(this.freelance.bio, 1000)) {
      this.notification.show({
        title: 'Description',
        message: 'La description doit contenir moins de 1000 caractères',
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
