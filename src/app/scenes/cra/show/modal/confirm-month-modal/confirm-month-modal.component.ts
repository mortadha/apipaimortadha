import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';

export interface ConfirmMonthModalData {
  date: Date;
}

@Component({
  selector: 'app-confirm-month-modal',
  templateUrl: './confirm-month-modal.component.html',
  styleUrls: ['./confirm-month-modal.component.scss']
})
export class ConfirmMonthModalComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmMonthModalData,
              public dialogRef: MatDialogRef<ConfirmMonthModalComponent>) { }

  ngOnInit() {
  }

  close(didValidate: boolean) {
    this.dialogRef.close(didValidate);
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
