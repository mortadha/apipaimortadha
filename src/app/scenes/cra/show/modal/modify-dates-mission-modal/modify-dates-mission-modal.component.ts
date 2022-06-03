import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, BehaviorSubject } from 'rxjs';
import { MissionsService } from '@app/core/services';
import { takeUntil } from 'rxjs/operators';
import * as _moment from 'moment';
const moment = _moment;

import {
  AuthDTO,
  AccountType,
  MissionDTO,
} from '@neadz/dtos';

import { UserService } from '@app/core/services/';

import {FormControl} from '@angular/forms';

import { NotificationService, NotificationType } from '@app/core/services/notification.service';

import { Router } from '@angular/router';

export interface ModifyDatesMissionModalData {
  start: Date;
  end: Date;
  mission: MissionDTO;
}

@Component({
  selector: 'app-modify-dates-mission-modal',
  templateUrl: './modify-dates-mission-modal.component.html',
  styleUrls: ['./modify-dates-mission-modal.component.scss']
})

export class ModifyDatesMissionModalComponent implements OnInit, OnDestroy {
  user: AuthDTO;
  accountType = AccountType;
  private componentDestroyed = new Subject();
  startingDate = new FormControl('');
  endingDate = new FormControl('');
  modalTitle = '';
  mission: MissionDTO;

  constructor(public dialogRef: MatDialogRef<ModifyDatesMissionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ModifyDatesMissionModalData,
              private missionService: MissionsService,
              private notification: NotificationService,
              private router: Router,
              private userService: UserService) {

    this.user = this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.startingDate = new FormControl(this.data.start);
    this.startingDate.valueChanges.subscribe((date) => {
      const newDate = new Date(date.getFullYear(), date.getMonth() + parseInt(this.mission.duration, 10), 1);
      this.endingDate.setValue(newDate);
    });

    this.endingDate = new FormControl(this.data.end);
    this.modalTitle = 'Dates de mission';
    this.mission = this.data.mission;

    this.dialogRef.updatePosition({ top: '300px' });
  }


  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    const start = new Date(this.startingDate.value);
    const end = new Date(this.endingDate.value);

    if (start.getTime() <= 0 || end.getTime() <= 0) {
      this.notification.show({
        title: 'Dates de mission',
        message: 'Erreur : une des dates n\'est pas valide',
        type: NotificationType.error
      });
    } else if (start.getTime() > end.getTime()) {
      this.notification.show({
        title: 'Dates de mission',
        message: 'Erreur : la date de début doit précéder la date de fin',
        type: NotificationType.error
      });
    } else {
      this.mission.start = this.startingDate.value;
      this.mission.end = this.endingDate.value;

      this.missionService.updateMission(this.mission)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((result: MissionDTO) => {
          this.notification.show({
            title: 'Dates de mission',
            message: 'Les dates de mission ont bien été modifiées ',
            type: NotificationType.success
          });
          this.dialogRef.close();
          this.router.navigateByUrl('/agent/missions');
        }, (error) => {
          this.notification.show({
            title: 'Dates de mission',
            message: error,
            type: NotificationType.error
          });
        });
    }
  }
}

