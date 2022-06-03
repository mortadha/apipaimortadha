import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { NotificationService, NotificationType } from '@app/core/services';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'D/MM/YYYY',
  },
  display: {
    dateInput: 'D/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface ConfirmValidateData {
  startingDate: string;
  finalTJM: number;
  finalCJM: number;
}

@Component({
  selector: 'app-confirm-validate-need-modal',
  templateUrl: './confirm-validate-need-modal.component.html',
  styleUrls: ['./confirm-validate-need-modal.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ConfirmValidateNeedModalComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  public startingDate = moment(new Date(this.data.startingDate));
  public finalTJM  = this.data.finalTJM;
  public finalCJM = this.data.finalCJM;

  constructor(
  @Inject(MAT_DIALOG_DATA) public data: ConfirmValidateData,
  public dialogRef: MatDialogRef<ConfirmValidateNeedModalComponent>,
  private notification: NotificationService) { }

  ngOnInit() {
    this.startingDate = moment(new Date(this.data.startingDate));
  }

  close(leave: boolean) {
    if (leave) {
      this.dialogRef.close(false);
    } else {
      if (this.startingDate !== undefined && this.finalTJM !== undefined && this.finalCJM !== undefined) {
        this.dialogRef.close(
          {
            'startingDate': this.startingDate.unix(),
            'finalTJM': this.finalTJM,
            'finalCJM': this.finalCJM
          }
        );
      } else {
        this.notification.show({
          title: 'Validation de mission',
          message: 'Tous les champs doivent être renseignés',
          type: NotificationType.error
        });
      }
    }
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
