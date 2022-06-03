import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

export class BaseModalComponent<T> {
  private dialogRef: MatDialogRef<T>;

  constructor(public dialog: MatDialog) {}

  // Need to do this because of DialogRef
  // tslint:disable-next-line:no-any
  open<D, R = any>(data: D, modal: ComponentType<T>, callback?: (result?: R) => void) {
    // Enable scrolling when modal open
    // document.getElementsByTagName('body')[0].classList.add('modal-open');
    this.dialogRef = this.dialog.open(modal, {
      panelClass: 'modal-no-padding',
      width: '700px',
      data: data,
      disableClose: true,
      hasBackdrop: true
    });
    this.dialogRef.afterClosed().subscribe(result => {
      // document.getElementsByTagName('body')[0].classList.remove('modal-open');
      if (callback !== undefined) {
        callback(result);
      }
    });
    this.dialogRef.backdropClick().subscribe(() => {
      // Close the dialog
      if (typeof this.dialogRef.componentInstance['close'] !== 'undefined') {
        this.dialogRef.componentInstance['close']();
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}

export function modalFactory<T>(dialog: MatDialog): BaseModalComponent<T> {
  return new BaseModalComponent<T>(dialog);
}
