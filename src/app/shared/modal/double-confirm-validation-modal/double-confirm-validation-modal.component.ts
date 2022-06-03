import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Subject, Observable } from 'rxjs';

import { NotificationService, NotificationType } from '@app/core/services';
export interface DoubleConfirmValidationModalData<N> {
  titreConfirmation: string;
  textConfirmation: string;
  titreSuccess: string;
  textSuccess: string;
  buttonConfirm: string;
  buttonCancel: string;
  call: Observable<N>;
}

@Component({
  selector: 'app-double-confirm-validation-modal',
  templateUrl: './double-confirm-validation-modal.component.html',
  styleUrls: ['./double-confirm-validation-modal.component.scss']
})
export class DoubleConfirmValidationModalComponent<N> implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  descriptionAreaOpen = false;
  titreConfirmation: string;
  textConfirmation: string;
  titreSuccess: string;
  textSuccess: string;
  isConfirmed = false;



  constructor(
    public dialogRef: MatDialogRef<DoubleConfirmValidationModalComponent<N>>,
    @Inject(MAT_DIALOG_DATA) public data: DoubleConfirmValidationModalData<N>,
    public dialog: MatDialog,
    private notification: NotificationService
  ) {
    this.titreConfirmation = this.data.titreConfirmation;
    this.textConfirmation = this.data.textConfirmation;
    this.titreSuccess = this.data.titreSuccess;
    this.textSuccess = this.data.textSuccess;
  }

  confirmation() {
    this.data.call.subscribe((result) => {
      this.isConfirmed = true;
    }, function(err) {
      this.notification.show({
        title: 'Erreur',
        message: err,
        type: NotificationType.error
      });
    });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  close(closeAll: boolean) {
    if (this.isConfirmed && !closeAll) {
      this.isConfirmed = false;
    } else {
      this.dialogRef.close(false);
    }
  }

  closeReasonModal() {
    this.dialogRef.close(true);
  }

}
