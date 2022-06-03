import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';

export interface ConfirmDeleteModalData {
  action: string;
}

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ConfirmDeleteModalData,
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    public dialog: MatDialog) { }

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
