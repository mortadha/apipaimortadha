import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';

export interface MainProfilePdfModalData {
  tjm: number;
}

@Component({
  selector: 'app-main-profile-pdf-modal',
  templateUrl: './main-profile-pdf-modal.component.html',
  styleUrls: ['./main-profile-pdf-modal.component.scss']
})
export class MainProfilePdfModalComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  public pdfTJM: number;
  public pdfTJMProposal: number;

  constructor(@Inject(MAT_DIALOG_DATA) private data: MainProfilePdfModalData,
              public dialogRef: MatDialogRef<MainProfilePdfModalComponent>) {
    this.pdfTJMProposal = Math.ceil(data.tjm / environment.marginPercentage);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
  /**
   * Callback to submit changes
   */
  submit() {
    this.dialogRef.close(this.pdfTJM);
  }

  /**
   * Callback to close modal
   */
  close() {
    this.dialogRef.close(false);
  }
}
