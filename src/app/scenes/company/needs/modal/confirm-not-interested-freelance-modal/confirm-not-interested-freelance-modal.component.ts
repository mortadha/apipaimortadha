import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject, BehaviorSubject} from 'rxjs';
import { NotificationService, NotificationType } from '@app/core/services';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-confirm-not-interested-freelance-modal',
  templateUrl: './confirm-not-interested-freelance-modal.component.html',
  styleUrls: ['./confirm-not-interested-freelance-modal.component.scss']
})
export class ConfirmNotInterestedFreelanceModalComponent implements OnInit, OnDestroy {
  reason: string;
  writenReason: string;
  private componentDestroyed = new Subject();
  reasonLength = new BehaviorSubject(0);
  public textControl = new FormControl('');
  notifyModal = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmNotInterestedFreelanceModalComponent,
              public dialogRef: MatDialogRef<ConfirmNotInterestedFreelanceModalComponent>,
              private notification: NotificationService) {
                if (!this.writenReason) {
                  this.writenReason = '';
                }
                this.textControl.valueChanges.subscribe((v) => this.reasonLength.next(v.length));
              }

  ngOnInit() {
    this.reason = '';
  }

  close(usualClosing: boolean) {
    if (usualClosing || usualClosing === undefined) {
      this.dialogRef.close(false);
    } else if (this.reason === '') {
      this.notification.show({
        title: 'Refus de mission',
        message: 'Le motif de refus n\'est pas valide',
        type: NotificationType.error
      });
    } else {
      this.notifyModal = true;

      if (this.reason === 'Autre') {
        this.reason = this.writenReason;
      }
    }
  }

  finish() {
    this.dialogRef.close(this.reason);
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
