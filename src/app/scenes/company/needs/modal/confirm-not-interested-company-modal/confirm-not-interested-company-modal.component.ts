import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subject, BehaviorSubject } from 'rxjs';
import { NotificationService, NotificationType } from '@app/core/services';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-confirm-not-interested-company-modal',
  templateUrl: './confirm-not-interested-company-modal.component.html',
  styleUrls: ['./confirm-not-interested-company-modal.component.scss']
})
export class ConfirmNotInterestedCompanyModalComponent implements OnInit, OnDestroy {
  reason: string;
  writenReason: string;
  private componentDestroyed = new Subject();
  notifyModal = false;
  reasonLength = new BehaviorSubject(0);
  public textControl = new FormControl('');

  constructor(public dialogRef: MatDialogRef<ConfirmNotInterestedCompanyModalComponent>,
              private notification: NotificationService) {
                if (!this.writenReason) {
                  this.writenReason = '';
                }
                this.textControl.valueChanges.subscribe((v) => this.reasonLength.next(v.length));
              }

  ngOnInit() {
    this.reason = '';
  }

  closeReason(exit: boolean) {
    if (exit) {
      this.dialogRef.close(false);
    } else if (this.reason === undefined) {
      this.notification.show({
        title: 'Refus de mission',
        message: 'Le motif de refus n\'est pas valide',
        type: NotificationType.error
      });
    } else {
      this.notifyModal = true;
    }
  }

  closeNotify() {
   if (this.reason === 'Autre') {
      this.dialogRef.close(this.writenReason);
    } else if (this.reason !== undefined) {
      this.dialogRef.close(this.reason);
    }
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
